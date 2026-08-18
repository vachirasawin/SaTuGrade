"use client"

import React, { useState } from "react"

import { accuracies } from "../../utils/detail/accuraciesData"
import { subjects } from "../../utils/subjectsData"
import { programs } from "../../utils/programsData"

import SelectInput from "../form/input/SelectInput"
import CardList from "../card/CardList"

function AccuracySection() {
    const options = [
        { value: "SM", label: "วิทย์-คณิต" },
        { value: "AL", label: "ศิลป์-ภาษา" },
        { value: "AC", label: "ศิลป์-คำนวณ" }
    ]

    const [program, setProgram] = useState("SM");

    return (
        <div id = "accuracy">
            <div className = "w-full h-max bg-neutral-50 px-4 py-18 max-lg:py-6 border-b border-gray-200 flex flex-col gap-12 max-lg:gap-4">
                <p className = "container mx-auto flex justify-center items-center text-3xl max-lg:text-2xl font-bold">
                    ข้อมูล
                    <span className = "text-blue-500">ความแม่นยำ</span>
                    ของการพยากรณ์ในแต่ละสายการเรียน
                </p>
                <div className = "container mx-auto flex flex-col gap-8 max-md:gap-4">
                    <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        {program ? (
                            <p className = "text-xl font-bold mb-2">
                                สายการเรียน <span className = "text-blue-500">{programs[program]}</span>
                            </p>
                        ) : (
                            <p className = "text-xl font-bold mb-2">
                                กรุณาเลือกสายการเรียน
                            </p>
                        )}
                        <SelectInput data = {options} value = {program} onChange = {(value) => setProgram(value)}/>
                    </div>
                    <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4">
                        <p className = "text-xl font-bold mb-2">
                            ความแม่นยำของการพยากรณ์ในสายการเรียน <span className = "text-blue-500">{programs[program]}</span>
                        </p>
                        <div className = "grid grid-cols-2 max-lg:grid-cols-1 gap-4">
                            {subjects[program].map((subject, subject_index) => (
                                <div key = {subject_index} className = "flex border border-gray-200 rounded-lg h-max items-center shadow-sm">
                                    <div className = "w-16 max-sm:w-20 h-16 max-sm:h-20 shrink-0 flex justify-center items-center border-r border-gray-200 text-xl text-blue-500">
                                        <i className = {subject.symbol}></i>
                                    </div>
                                    <div className = "w-full h-16 max-sm:h-20 flex flex-row max-sm:flex-col justify-between max-sm:justify-center items-center max-sm:items-start px-4 gap-1">
                                        <p className = "font-semibold">
                                            {subject.title}
                                        </p>
                                        <div className = "w-max flex gap-2">
                                            {accuracies[program][subject.code].map((accuracy, accuracy_index) => (
                                                <p key = {accuracy_index} className = {`w-max px-3 h-max py-1 ${accuracy_index % 2 === 0 ? "bg-blue-200 text-blue-500" : "bg-green-200 text-green-500"} shadow-sm flex justify-center items-center text-[12px] font-medium rounded-full`}>
                                                    {accuracy[0]} {accuracy[1]}
                                                </p>
                                            ))}
                                        </div>
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

export default AccuracySection