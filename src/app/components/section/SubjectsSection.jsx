"use client"

import React, { useState } from "react"

import SelectInput from "../form/input/SelectInput";
import { subjects } from "../../utils/subjectsData"
import { programs } from "../../utils/programsData";

function SubjectsSection() {
    const options = [
        { value: "SM", label: "วิทย์-คณิต" },
        { value: "AL", label: "ศิลป์-ภาษา" },
        { value: "AC", label: "ศิลป์-คำนวณ" }
    ]

    const [program, setProgram] = useState("SM");

    return (
        <div id = "subjects">
            <div className = "w-full h-max bg-neutral-50 px-4 py-18 max-lg:py-6 border-b border-gray-200 flex flex-col gap-12 max-lg:gap-4">
                <p className = "container mx-auto text-center text-3xl max-lg:text-2xl font-bold">
                    ข้อมูล
                    <span className = "text-blue-500">รายวิชาหลัก</span>
                    ในแต่ละสายการเรียน
                </p>
                <div className = "container mx-auto flex flex-col gap-8 max-md:gap-4">
                    <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        <p className = "text-xl font-bold mb-2">
                            สายการเรียน <span className = "text-blue-500">{programs[program]}</span>
                        </p>
                        <SelectInput data = {options} value = {program} onChange = {(value) => setProgram(value)}/>
                    </div>
                    <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        <p className = "text-xl font-bold mb-2">
                            รายวิชาหลักในสายการเรียน <span className = "text-blue-500">{programs[program]}</span>
                        </p>
                        <div className = "grid grid-cols-2 max-lg:grid-cols-1 gap-4">
                            {subjects[program].map((subject, index) => (
                                <div key = {index} className = "flex border border-gray-200 rounded-lg h-max items-center shadow-sm">
                                    <div className = "w-16 max-sm:w-20 h-16 max-sm:h-20 shrink-0 flex justify-center items-center border-r border-gray-200 text-xl text-blue-500">
                                        <i className = {subject.symbol}></i>
                                    </div>
                                    <div className = "w-full h-16 max-sm:h-20 flex flex-row max-sm:flex-col justify-between max-sm:justify-center items-center max-sm:items-start px-4 gap-1">
                                        <p className = "font-semibold">
                                            {subject.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SubjectsSection