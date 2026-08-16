"use client"

import React, { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import { terms } from "../../utils/termsData";
import { subjects } from "../../utils/subjectsData";
import { programs } from "../../utils/programsData";

import LoadingSpinnerAlert from "../alert/LoadingSpinnerAlert";
import Suggestion from "./Suggestion";
import Caution from "./Caution";

const MIN_LOADING_TIME = 1000;
const SUGGESTION_THRESHOLD = 2.5;
const CAUTION_DROP_THRESHOLD = 0.5;

const MOCK_PREDICTION = false;
const MOCK_RECORDED_GRADE = 3.0;
const MOCK_PREDICTED_GRADE = 2.0;

const buildMockRecordData = (currentSubjects) => {
    const mockRecord = {};

    currentSubjects.forEach(subject => {
        mockRecord[`${subject.program}_1_Credit`] = 3;
        mockRecord[`${subject.program}_1_Grade`] = MOCK_RECORDED_GRADE;
    });

    return mockRecord;
};

const buildMockPredictions = (currentSubjects) => {
    const mockPredictions = {};

    currentSubjects.forEach(subject => {
        mockPredictions[subject.program] = MOCK_PREDICTED_GRADE;
    });

    return mockPredictions;
};

const withMinLoadingTime = async (task) => {
    const startTime = Date.now();
    const result = await task();
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
    }

    return result;
};

function Prediction() {
    const { data: session } = useSession();

    if (!session) redirect("/");

    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [loadingSpinnerTitle, setLoadingSpinnerTitle] = useState("");

    const [recordData, setRecordData] = useState({});
    const [predictions, setPredictions] = useState({});
    const [predictionError, setPredictionError] = useState(null);

    const modelType = session?.user?.program;
    const currentSubjects = subjects[modelType] || [];
    const maxTerm = Object.keys(terms).length;

    const getRecordedTermsCount = (data = recordData) => {
        let completedTerms = 0;

        for (let t = 1; t <= maxTerm; t++) {
            const isTermComplete = currentSubjects.every(subject => {
                const creditKey = `${subject.program}_${t}_Credit`;
                const gradeKey = `${subject.program}_${t}_Grade`;

                const creditVal = data[creditKey];
                const gradeVal = data[gradeKey];

                const hasCredit = creditVal !== undefined && creditVal !== null && creditVal !== "";
                const hasGrade = gradeVal !== undefined && gradeVal !== null && gradeVal !== "";

                return hasCredit && hasGrade;
            });

            if (isTermComplete) {
                completedTerms++;
            } else {
                break;
            }
        }

        return completedTerms;
    };

    const getLatestGrade = (subject, data = recordData, latestTerm) => {
        if (!latestTerm || latestTerm < 1) return null;

        const gradeKey = `${subject.program}_${latestTerm}_Grade`;
        const gradeVal = data[gradeKey];

        if (gradeVal === undefined || gradeVal === null || gradeVal === "") return null;

        const parsed = parseFloat(gradeVal);
        return Number.isNaN(parsed) ? null : parsed;
    };

    const getSuggestionSubjects = () => {
        return currentSubjects.reduce((result, subject) => {
            const predictedGrade = predictions[subject.program];

            if (predictedGrade !== undefined && predictedGrade < SUGGESTION_THRESHOLD) {
                result.push({ subject, predictedGrade });
            }

            return result;
        }, []);
    };

    const getCautionSubjects = (latestTerm) => {
        return currentSubjects.reduce((result, subject) => {
            const predictedGrade = predictions[subject.program];
            if (predictedGrade === undefined) return result;

            const latestGrade = getLatestGrade(subject, recordData, latestTerm);
            if (latestGrade === null) return result;

            if (predictedGrade < latestGrade - CAUTION_DROP_THRESHOLD) {
                result.push({ subject, predictedGrade, latestGrade });
            }

            return result;
        }, []);
    };

    useEffect(() => {
        const runFlow = async () => {
            setIsLoadingSpinner(true);
            setLoadingSpinnerTitle("กำลังโหลดข้อมูล");
            setPredictionError(null);

            if (MOCK_PREDICTION) {
                const mockRecord = buildMockRecordData(currentSubjects);
                await withMinLoadingTime(async () => mockRecord);

                setRecordData(mockRecord);
                setLoadingSpinnerTitle("กำลังพยากรณ์ผลการเรียน");
                await withMinLoadingTime(async () => null);

                setPredictions(buildMockPredictions(currentSubjects));
                setIsLoadingSpinner(false);
                return;
            }

            const userId = session?.user?.id || session?.user?.email;
            if (!userId) {
                setIsLoadingSpinner(false);
                return;
            }

            let fetchedRecord = {};

            try {
                await withMinLoadingTime(async () => {
                    const response = await fetch(`/api/record/createRecord?userId=${encodeURIComponent(userId)}`);
                    const data = await response.json();

                    if (response.ok && data.recordData && Object.keys(data.recordData).length > 0) {
                        fetchedRecord = data.recordData;
                    } else {
                        const savedLocal = localStorage.getItem("record_data");
                        if (savedLocal) fetchedRecord = JSON.parse(savedLocal);
                    }
                });
            } catch (error) {
                console.error("Error fetching record:", error);
                const savedLocal = localStorage.getItem("record_data");
                if (savedLocal) fetchedRecord = JSON.parse(savedLocal);
            }

            setRecordData(fetchedRecord);

            const recordedTermsCount = getRecordedTermsCount(fetchedRecord);
            const targetTerm = Math.min(recordedTermsCount + 1, maxTerm);

            if (targetTerm >= 2 && Object.keys(fetchedRecord).length > 0) {
                setLoadingSpinnerTitle("กำลังพยากรณ์ผลการเรียน");
                try {
                    const predictionResponse = await fetch(`/api/models/${session.user.program}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ recordData: fetchedRecord, targetTerm }),
                    });
                    const predictionResult = await predictionResponse.json();

                    if (predictionResponse.ok && predictionResult.success) {
                        setPredictions(predictionResult.predictions);
                    } else {
                        setPredictionError(predictionResult.error || "ไม่สามารถพยากรณ์ผลการเรียนได้");
                    }
                } catch (error) {
                    console.error("Error fetching prediction:", error);
                    setPredictionError("ไม่สามารถเชื่อมต่อระบบพยากรณ์ได้");
                }
            }

            setIsLoadingSpinner(false);
        };

        runFlow();
    }, [session]);

    const recordedTermsCount = getRecordedTermsCount();
    const targetTermId = Math.min(recordedTermsCount + 1, maxTerm);
    const targetTermName = terms[targetTermId];
    const program = programs[session.user.program];

    const suggestionSubjects = getSuggestionSubjects();
    const cautionSubjects = getCautionSubjects(recordedTermsCount);

    const renderStatusBadge = (subject) => {
        if (targetTermId < 2) {
            return (
                <p className = "w-max px-3 h-max py-1 bg-gray-200 text-gray-400 shadow-sm flex justify-center items-center text-[12px] font-medium rounded-full">
                    กรุณากรอกข้อมูลผลการเรียน
                </p>
            );
        }

        if (predictionError) {
            return (
                <p className = "w-max px-3 h-max py-1 bg-red-200 text-red-500 shadow-sm flex justify-center items-center text-[12px] font-medium rounded-full">
                    พยากรณ์ไม่สำเร็จ
                </p>
            );
        }

        const predictedGrade = predictions[subject.program];

        if (predictedGrade === undefined) {
            return (
                <p className = "w-max px-3 h-max py-1 bg-blue-200 text-blue-500 shadow-sm flex justify-center items-center text-[12px] font-medium rounded-full">
                    รอผลการพยากรณ์
                </p>
            );
        }

        return (
            <p className = {`w-max px-3 h-max py-1 ${predictedGrade.toFixed(2) >= 2.50 ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"} shadow-sm flex justify-center items-center text-[12px] font-semibold rounded-full`}>
                ผลการเรียนที่คาดการณ์: {predictedGrade.toFixed(2)}
            </p>
        );
    };

    return (
        <div id = "predicted">
            <div className = "w-full border-b border-gray-200 px-4 py-18 max-lg:py-6">
                <div className = "container mx-auto flex flex-col gap-8 max-md:gap-4">
                    <div className="bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        <p className = "text-xl font-bold mb-2">ผลการพยากรณ์ของผลการเรียน</p>
                        <div>
                            <p className = "text-gray-400">
                                ข้อมูลที่คุณกรอกแล้ว: <span className = "font-semibold text-blue-500">{recordedTermsCount}</span> / {maxTerm} เทอม
                            </p>
                            {targetTermId >= 2 ? (
                                <p className = "text-gray-400">
                                    ทำการพยากรณ์ผลการเรียนใน <span className = "font-semibold text-blue-500">{targetTermName}</span> สายการเรียน <span className = "font-semibold text-blue-500">{program}</span>
                                </p>
                            ) : (
                                <p className = "text-gray-400">
                                    กรุณากรอกข้อมูลผลการเรียนอย่างน้อย 1 เทอม เพื่อเริ่มการพยากรณ์
                                </p>
                            )}
                            {predictionError && (
                                <p className = "text-red-400 text-sm mt-1">{predictionError}</p>
                            )}
                        </div>
                    </div>

                    <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        <p className = "text-xl font-bold">
                            ผลการเรียนรายวิชาหลักที่คาดการณ์ในสายการเรียน <span className = "font-semibold text-blue-500">{program}</span>
                        </p>
                        
                        <div className = "grid grid-cols-2 max-lg:grid-cols-1 gap-4">
                            {currentSubjects.map((subject, index) => (
                                <div key = {index} className = "flex border border-gray-200 rounded-lg h-max items-center shadow-sm">
                                    <div className = "w-16 max-sm:w-20 h-16 max-sm:h-20 shrink-0 flex justify-center items-center border-r border-gray-200 text-xl text-blue-500">
                                        <i className = {subject.symbol}></i>
                                    </div>
                                    <div className = "w-full h-16 max-sm:h-20 flex flex-row max-sm:flex-col justify-between max-sm:justify-center items-center max-sm:items-start px-4 gap-1">
                                        <p className = "font-semibold">
                                            {subject.title}
                                        </p>
                                        {renderStatusBadge(subject)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {targetTermId >= 2 && !predictionError && (
                        <>
                            <Caution subjects = {cautionSubjects} />
                            <Suggestion subjects = {suggestionSubjects} />
                        </>
                    )}
                </div>
            </div>

            {isLoadingSpinner && (
                <LoadingSpinnerAlert title = {loadingSpinnerTitle}/>
            )}
        </div>
    )
}

export default Prediction