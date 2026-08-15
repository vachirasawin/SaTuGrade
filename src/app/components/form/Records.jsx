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

import { terms } from "../../utils/termsData"
import { subjects } from "../../utils/subjectsData"

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
        
    const { data: session } = useSession();
    
    if (!session) redirect("/");

    const currentId = Number(id);
    const currentTerm = terms[currentId];
    const prevId = currentId - 1;
    const nextId = currentId + 1;
    const maxTerm = Object.keys(terms).length;

    const modelType = session.user.program;
    const currentSubjects = subjects[modelType];
    const totalSubjects = currentSubjects.length;

    const [recordData, setRecordData] = useState({});

    useEffect(() => {
        const fetchSavedRecord = async () => {
            const userId = session?.user?.id || session?.user?.email;
            if (!userId) return;

            try {
                const response = await fetch(`/api/record/createRecord?userId=${encodeURIComponent(userId)}`);
                const data = await response.json();

                if (response.ok && data.recordData && Object.keys(data.recordData).length > 0) {
                    setRecordData(data.recordData);
                    localStorage.setItem("record_data", JSON.stringify(data.recordData));
                } else {
                    const savedLocal = localStorage.getItem("record_data");
                    if (savedLocal) {
                        setRecordData(JSON.parse(savedLocal));
                    }
                }
            } catch (error) {
                console.error("Error fetching record data:", error);
                const savedLocal = localStorage.getItem("record_data");
                if (savedLocal) {
                    setRecordData(JSON.parse(savedLocal));
                }
            }
        };

        fetchSavedRecord();
    }, [session]);

    const handleInputChange = (program, term, type, value) => {
        const key = `${program}_${term}_${type}`;
        setRecordData(prev => {
            const updated = {
                ...prev,
                [key]: value === "" ? "" : Number(value)
            };
            localStorage.setItem("record_data", JSON.stringify(updated));
            return updated;
        });
    };

    const formatDataForModel = () => {
        const payload = {};
        for (let t = 1; t <= maxTerm; t++) {
            currentSubjects.forEach(subject => {
                const creditKey = `${subject.program}_${t}_Credit`;
                const gradeKey = `${subject.program}_${t}_Grade`;

                payload[creditKey] = recordData[creditKey] ?? 0;
                payload[gradeKey] = recordData[gradeKey] ?? 0;
            });
        }
        return payload;
    };

    const handleReset = (e) => {
        e.preventDefault();
        setRecordData({});
        localStorage.removeItem("record_data");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isCurrentTermIncomplete = currentSubjects.some(subject => {
            const creditKey = `${subject.program}_${currentId}_Credit`;
            const gradeKey = `${subject.program}_${currentId}_Grade`;

            const creditVal = recordData[creditKey];
            const gradeVal = recordData[gradeKey];

            const isCreditEmpty = creditVal === undefined || creditVal === null || creditVal === "";
            const isGradeEmpty = gradeVal === undefined || gradeVal === null || gradeVal === "";

            return isCreditEmpty || isGradeEmpty;
        });

        if (isCurrentTermIncomplete) {
            setIsWarning(true);
            setWarningTitle("กรอกข้อมูลไม่ครบถ้วน");
            setWarningDetail("กรุณากรอกข้อมูลในช่องที่มีเครื่องหมายสำคัญให้ครบถ้วนก่อนยืนยัน");
            setWarningButton("ตกลงเพื่อแก้ไข");
            return;
        }

        const payload = formatDataForModel();
        
        try {
            const response = await fetch("/api/record/createRecord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: session?.user?.id || session?.user?.email, 
                    program: modelType, 
                    payload: payload,
                }),
            });

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
        }
    };

    return (
        <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-transparent z-30 flex justify-center items-center max-lg:items-start py-4 px-4 overflow-y-auto styleScrollbar">
            <form onSubmit = {handleSubmit} onReset = {handleReset} className = "bg-white p-8 max-lg:p-4 max-lg:w-full rounded-xl shadow-md flex flex-col gap-4">
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
                        const creditKey = `${subject.program}_${currentId}_Credit`;
                        const gradeKey = `${subject.program}_${currentId}_Grade`;

                        return (
                            <RecordInput key = {index} symbol = {subject.symbol} title = {subject.title} placeholder = {subject.placeholder}creditValue = {recordData[creditKey]}gradeValue = {recordData[gradeKey]}onCreditChange={(e) => handleInputChange(subject.program, currentId, "Credit", e.target.value)}onGradeChange={(e) => handleInputChange(subject.program, currentId, "Grade", e.target.value)}request/>
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
        </div>
    )
}

export default Records