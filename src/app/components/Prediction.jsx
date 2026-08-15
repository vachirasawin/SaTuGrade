"use client"

import React, { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import { terms } from "../utils/termsData";
import { subjects } from "../utils/subjectsData";
import { programs } from "../utils/programsData";

import LoadingAleft from "./alert/LoadingAleft";

function Prediction() {
    const { data: session } = useSession();

    if (!session) redirect("/");

    const [isLoading, setIsLoading] = useState(true);
    const [loadingTitle, setLoadingTitle] = useState("");

    const [recordData, setRecordData] = useState({});

    const modelType = session?.user?.program;
    const currentSubjects = subjects[modelType] || [];
    const maxTerm = Object.keys(terms).length;

    useEffect(() => {
        const fetchRecord = async () => {
            setIsLoading(true);
            setLoadingTitle("กำลังโหลดข้อมูล");
            const userId = session?.user?.id || session?.user?.email;
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/record/createRecord?userId=${encodeURIComponent(userId)}`);
                const data = await response.json();

                if (response.ok && data.recordData && Object.keys(data.recordData).length > 0) {
                    setRecordData(data.recordData);
                } else {
                    const savedLocal = localStorage.getItem("record_data");
                    if (savedLocal) setRecordData(JSON.parse(savedLocal));
                }
            } catch (error) {
                console.error("Error fetching record:", error);
                const savedLocal = localStorage.getItem("record_data");
                if (savedLocal) setRecordData(JSON.parse(savedLocal));
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecord();
    }, [session]);

    const getRecordedTermsCount = () => {
        let completedTerms = 0;

        for (let t = 1; t <= maxTerm; t++) {
            const isTermComplete = currentSubjects.every(subject => {
                const creditKey = `${subject.program}_${t}_Credit`;
                const gradeKey = `${subject.program}_${t}_Grade`;

                const creditVal = recordData[creditKey];
                const gradeVal = recordData[gradeKey];

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

    const recordedTermsCount = getRecordedTermsCount();
    const targetTermId = Math.min(recordedTermsCount + 1, maxTerm);
    const targetTermName = terms[targetTermId];
    const program = programs[session.user.program];

    return (
        <div>
            <div className = "w-full border-b border-gray-200 px-4 py-18 max-lg:py-6">
                <div className = "container mx-auto flex flex-col gap-4">
                    <div className="bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        <p className = "text-xl font-bold mb-2">ผลการพยากรณ์ผลการเรียน</p>
                        <div>
                            <p className = "text-gray-400">
                                ข้อมูลที่คุณกรอกแล้ว: <span className = "font-semibold text-blue-500">{recordedTermsCount}</span> / {maxTerm} เทอม
                            </p>
                            <p className = "text-gray-400">
                                ทำการพยากรณ์ผลการเรียนใน <span className = "font-semibold text-blue-500">{targetTermName}</span> สายการเรียน <span className = "font-semibold text-blue-500">{program}</span>
                            </p>
                        </div>
                    </div>

                    <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        <p className = "text-xl font-bold">
                            ผลการพยากรณ์ผลการเรียนรายวิชาหลักในสายการเรียน <span className = "font-semibold text-blue-500">{program}</span>
                        </p>
                        
                        <div className = "grid grid-cols-2 max-lg:grid-cols-1 gap-4">
                            {currentSubjects.map((subject, index) => (
                                <div key = {index} className = "flex border border-gray-200 rounded-lg h-max">
                                    <div className = "w-14 h-14 shrink-0 flex justify-center items-center border-r border-gray-200 text-xl text-blue-500">
                                        <i className = {subject.symbol}></i>
                                    </div>
                                    <div className = "w-full h-14 flex justify-between items-center px-4">
                                        <p className = "font-semibold">{subject.title}</p>
                                        <div className = "w-32 h-max py-1 bg-blue-200 text-blue-500 flex justify-center items-center text-[12px] font-medium rounded-full">
                                            <p>รอผลการพยากรณ์</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && (
                <LoadingAleft title = {loadingTitle}/>
            )}
        </div>
    )
}

export default Prediction