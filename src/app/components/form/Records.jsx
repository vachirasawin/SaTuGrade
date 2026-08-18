"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import RecordInput from "./input/RecordInput"
import ButtonInput from "./input/ButtonInput"

import SuccessAlert from "../alert/SuccessAlert"
import WarningAlert from "../alert/WarningAlert"
import ErrorAlert from "../alert/ErrorAlert"
import LoadingSpinnerAlert from "../alert/LoadingSpinnerAlert"

import { terms, maxInputTerm } from "../../utils/termsData"
import { subjects } from "../../utils/subjectsData"
import { withMinLoadingTime, formatDataForModel, isCurrentTermIncomplete, getDisplayValue } from "../../utils/records"

function Records({ id }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [successTitle, setSuccessTitle] = useState("");
    const [successDetail, setSuccessDetail] = useState("");
    const [successButton, setSuccessButton] = useState("");

    const [isWarning, setIsWarning] = useState(false);
    const [warningTitle, setWarningTitle] = useState("");
    const [warningDetail, setWarningDetail] = useState("");
    const [warningButton, setWarningButton] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorTitle, setErrorTitle] = useState("");
    const [errorDetail, setErrorDetail] = useState("");
    const [errorButton, setErrorButton] = useState("");
        
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [loadingSpinnerTitle, setLoadingSpinnerTitle] = useState("");
        
    const { data: session } = useSession();
    
    if (!session) redirect("/");

    const currentId = Number(id);

    if (currentId > maxInputTerm) redirect(`/records/${maxInputTerm}`);

    const currentTerm = terms[currentId];
    const prevId = currentId - 1;
    const nextId = currentId + 1;
    const maxTerm = maxInputTerm;

    const modelType = session.user.program;
    const currentSubjects = subjects[modelType];
    const totalSubjects = currentSubjects.length;

    const [recordData, setRecordData] = useState({});

    useEffect(() => {
        const fetchSavedRecord = async () => {
            const userId = session?.user?.id || session?.user?.email;

            if (!userId) {
                setRecordData({});
                return;
            }

            const storageKey = `record_data_${userId}`;

            setIsLoadingSpinner(true);
            setLoadingSpinnerTitle("กำลังโหลดข้อมูล");

            try {
                await withMinLoadingTime(async () => {
                    const response = await fetch(`/api/record/createRecord?userId=${encodeURIComponent(userId)}`,
                        { cache: 'no-store' }
                    );
                    const data = await response.json();

                    if (response.ok && data.recordData && Object.keys(data.recordData).length > 0) {
                        setRecordData(data.recordData);
                        localStorage.setItem("record_data", JSON.stringify(data.recordData));
                    } else {
                        const savedLocal = localStorage.getItem(storageKey);
                        setRecordData(savedLocal ? JSON.parse(savedLocal) : {});
                    }
                });
            } catch (error) {
                console.error("Error fetching record data:", error);
                const savedLocal = localStorage.getItem("record_data");
                if (savedLocal) {
                    setRecordData(JSON.parse(savedLocal));
                }
            } finally {
                setIsLoadingSpinner(false);
            }
        };

        fetchSavedRecord();
    }, [session?.user?.id, session?.user?.email]);

    const handleInputChange = (code, term, type, value) => {
        const key = `${code}_${term}_${type}`;
        setRecordData(prev => {
            const updated = {
                ...prev,
                [key]: value === "" ? "" : Number(value)
            };
            localStorage.setItem("record_data", JSON.stringify(updated));
            return updated;
        });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setRecordData({});
        localStorage.removeItem("record_data");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isCurrentTermIncomplete(recordData, currentSubjects, currentId)) {
            setIsWarning(true);
            setWarningTitle("กรอกข้อมูลไม่ครบถ้วน");
            setWarningDetail("กรุณากรอกข้อมูลในช่องที่มีเครื่องหมายสำคัญให้ครบถ้วนก่อนยืนยัน");
            setWarningButton("ตกลงเพื่อแก้ไข");
            return;
        }

        const payload = formatDataForModel(recordData, currentSubjects, maxTerm);

        setIsLoadingSpinner(true);
        setLoadingSpinnerTitle("กำลังบันทึกข้อมูล");

        try {
            const response = await withMinLoadingTime(() =>
                fetch("/api/record/createRecord", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: session?.user?.id || session?.user?.email, 
                        program: modelType, 
                        payload: payload,
                    }),
                })
            );

            if (response.ok) {
                setIsSuccess(true);
                setSuccessTitle("บันทึกข้อมูลสำเร็จ");
                setSuccessDetail("ส่งข้อมูลเกรดและหน่วยกิตเข้าสู่ระบบเรียบร้อยแล้ว");
                setSuccessButton("ตกลง");
            } else {
                throw new Error("Failed to save data");
            }
        } catch (error) {
            setIsError(true);
            setErrorTitle("เกิดข้อผิดพลาด");
            setErrorDetail("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
            setErrorButton("ตกลง");
        } finally {
            setIsLoadingSpinner(false);
        }
    };

    return (
        <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-transparent z-30 flex py-4 px-4 overflow-y-auto styleScrollbar">
            <form onSubmit = {handleSubmit} onReset = {handleReset} className = "bg-white p-8 max-lg:p-4 max-lg:w-full rounded-xl shadow-md flex flex-col gap-4 mx-auto my-auto">
                <div className = "flex flex-col gap-4 justify-center items-center">
                    <p className = "text-xl font-bold">{currentTerm}</p>
                    <div className = "flex flex-row w-full gap-4">
                        {currentId > 1 &&
                            <Link href = {`/records/${prevId}`} className = {`w-1/2 ${currentId === maxTerm && "w-full"} h-12 cursor-pointer rounded-sm text-sm font-medium transition-colors duration-200 flex justify-center items-center border border-gray-200 text-blue-500 hover:bg-blue-500 hover:text-neutral-50`}>ย้อนกลับ</Link>
                        }
                        {currentId < maxTerm &&
                            <Link href = {`/records/${nextId}`} className = {`w-1/2 ${currentId === 1 && "w-full"} h-12 cursor-pointer rounded-sm text-sm font-medium transition-colors duration-200 flex justify-center items-center border border-gray-200 text-blue-500 hover:bg-blue-500 hover:text-neutral-50`}>ถัดไป</Link>
                        }
                    </div>
                </div>
                {currentSubjects.map((subject, index) => {
                    const creditKey = `${subject.code}_${currentId}_Credit`;
                    const gradeKey = `${subject.code}_${currentId}_Grade`;

                    const displayCredit = getDisplayValue(recordData[creditKey]);
                    const displayGrade = getDisplayValue(recordData[gradeKey]);

                    return (
                        <RecordInput key = {index} symbol = {subject.symbol} title = {subject.title} placeholder = {subject.placeholder} creditValue = {displayCredit} gradeValue = {displayGrade} onCreditChange={(e) => handleInputChange(subject.code, currentId, "Credit", e.target.value)} onGradeChange={(e) => handleInputChange(subject.code, currentId, "Grade", e.target.value)} request/>
                    );
                })}
                <div className = "flex gap-4 max-lg:flex-col">
                    <ButtonInput title = "บันทึกข้อมูล" type = "submit" width = "w-full" color = "text-blue-500 hover:bg-blue-500"/>
                    <ButtonInput title = "ยกเลิกการบันทึกข้อมูล" type = "reset" width = "w-full" color = "text-red-500 hover:bg-red-500"/>
                </div>
            </form>

            {isWarning && (
                <WarningAlert title = {warningTitle} detail = {warningDetail} button = {warningButton} onClose = {() => setIsWarning(false)}/>
            )}
            {isError && (
                <ErrorAlert title = {errorTitle} detail = {errorDetail} button = {errorButton} onClose = {() => setIsError(false)}/>
            )}
            {isSuccess && (
                <SuccessAlert title = {successTitle} detail = {successDetail} button = {successButton} onClose = {() => setIsSuccess(false)}/>
            )}
            {isLoadingSpinner && (
                <LoadingSpinnerAlert title = {loadingSpinnerTitle}/>
            )}
        </div>
    )
}

export default Records