"use client"

import React, { useState } from "react"
import Link from "next/link"

import TextInput from "./input/TextInput"
import ButtonInput from "./input/ButtonInput"

import SuccessAlert from "../alert/SuccessAlert"
import WarningAlert from "../alert/WarningAlert"
import ErrorAlert from "../alert/ErrorAlert"

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

    const terms = {
        "1": "มัธยมศึกษาปีที่ 4 เทอมที่ 1",
        "2": "มัธยมศึกษาปีที่ 4 เทอมที่ 2",
        "3": "มัธยมศึกษาปีที่ 5 เทอมที่ 1",
        "4": "มัธยมศึกษาปีที่ 5 เทอมที่ 2",
        "5": "มัธยมศึกษาปีที่ 6 เทอมที่ 1"
    };

    const subjects = {
        SM: [
            { symbol: "fa-solid fa-calculator", title: "วิชาคณิตศาสตร์พื้นฐาน", placeholder: "กรอกเกรดวิชาคณิตศาสตร์พื้นฐาน" },
            { symbol: "fa-solid fa-calculator", title: "วิชาคณิตศาสตร์เพิ่มเติม", placeholder: "กรอกเกรดวิชาคณิตศาสตร์เพิ่มเติม" },
            { symbol: "fa-solid fa-atom", title: "วิชาฟิสิกส์", placeholder: "กรอกเกรดวิชาฟิสิกส์" },
            { symbol: "fa-solid fa-flask", title: "วิชาเคมี", placeholder: "กรอกเกรดวิชาเคมี" },
            { symbol: "fa-solid fa-microscope", title: "วิชาชีวะ", placeholder: "กรอกเกรดวิชาชีวะ" },
        ],
        AL: [
            { symbol: "fa-solid fa-calculator", title: "วิชาคณิตศาสตร์พื้นฐาน", placeholder: "กรอกเกรดวิชาคณิตศาสตร์พื้นฐาน" },
            { symbol: "fa-solid fa-language", title: "วิชาภาษาไทย", placeholder: "กรอกเกรดวิชาภาษาไทย" },
            { symbol: "fa-solid fa-language", title: "วิชาภาษาอังกฤษ", placeholder: "กรอกเกรดวิชาภาษาอังกฤษ" },
            { symbol: "fa-solid fa-language", title: "วิชาภาษาอังกฤษเพิ่มเติม", placeholder: "กรอกเกรดวิชาภาษาอังกฤษเพิ่มเติม" },
            { symbol: "fa-solid fa-language", title: "วิชาภาษาเอก", placeholder: "กรอกเกรดวิชาภาษาเอก" },
            { symbol: "fa-solid fa-people-group", title: "วิชาสังคม", placeholder: "กรอกเกรดวิชาสังคม" },
        ],
        AC: [
            { symbol: "fa-solid fa-calculator", title: "วิชาคณิตศาสตร์พื้นฐาน", placeholder: "กรอกเกรดวิชาคณิตศาสตร์พื้นฐาน" },
            { symbol: "fa-solid fa-calculator", title: "วิชาคณิตศาสตร์เพิ่มเติม", placeholder: "กรอกเกรดวิชาคณิตศาสตร์เพิ่มเติม" },
            { symbol: "fa-solid fa-language", title: "วิชาภาษาไทย", placeholder: "กรอกเกรดวิชาภาษาไทย" },
            { symbol: "fa-solid fa-language", title: "วิชาภาษาอังกฤษ", placeholder: "กรอกเกรดวิชาภาษาอังกฤษ" },
            { symbol: "fa-solid fa-people-group", title: "วิชาสังคม", placeholder: "กรอกเกรดวิชาสังคม" },
        ]
    };

    const currentId = Number(id);
    const currentTerm = terms[currentId];
    const prevId = currentId - 1;
    const nextId = currentId + 1;
    const maxTerm = Object.keys(terms).length;
    const currentSubjects = subjects["SM"];
    const totalSubjects = currentSubjects.length;

    return (
        <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-transparent z-30 flex justify-center items-center max-lg:items-start py-4 px-4 overflow-y-auto styleScrollbar">
            <form className = "bg-white p-8 max-lg:p-4 max-lg:w-full rounded-xl shadow-md flex flex-col gap-4">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {currentSubjects.map((subject, index) => {
                        const isLastAndOdd = totalSubjects % 2 !== 0 && index === totalSubjects - 1;

                        return (
                            <div key = {index} className = {isLastAndOdd ? "lg:col-span-2 lg:w-1/2 lg:justify-self-center w-full" : "w-full"}>
                                <TextInput symbol = {subject.symbol} title = {subject.title} placeholder = {subject.placeholder} onChange={(e) => setSubjectGrade(e.target.value)} request/>
                            </div>
                        );
                    })}
                </div>
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