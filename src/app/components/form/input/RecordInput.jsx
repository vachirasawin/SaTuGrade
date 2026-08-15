"use client"

import React, { useState } from "react"

function RecordInput({ symbol, title, placeholder = [], creditValue, gradeValue, onCreditChange, onGradeChange, request }) {
    const [isFocus, setIsFocus] = useState(false);
    
    return (
        <div className = "flex flex-col gap-2 w-84 max-lg:w-full">
            <div className = "w-full flex justify-between items-center gap-4">
                <p className = "text-lg font-bold">{title}</p>
                {request && (<i className = "fa-solid fa-asterisk text-red-500 text-[8px]"></i>)}
            </div>
            <div className = "flex">
                {symbol && (
                    <div className = {`w-12 h-12 shrink-0 flex justify-center items-center border ${isFocus ? "border-blue-500 text-blue-500" : "border-gray-200"} rounded-l-sm border-r-0 transition-all duration-200`}>
                        <i className = {symbol}></i>
                    </div>
                )}
                <input type = "number" step = "0.5" min = "0" value = {creditValue ?? ""} onChange = {onCreditChange} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} className = {`w-full h-12 py-[13px] border border-r-0 ${isFocus ? "border-blue-500" : "border-gray-200"} ${!symbol && "rounded-l-sm"} outline-none text-sm font-medium px-4 transition-colors duration-200`} placeholder = {placeholder[0]}/>
                <input type = "number" step = "0.5" min = "0" value = {gradeValue ?? ""} onChange = {onGradeChange} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} className = {`w-full h-12 py-[13px] border ${isFocus ? "border-blue-500" : "border-gray-200"} rounded-r-sm outline-none text-sm font-medium px-4 transition-colors duration-200`} placeholder = {placeholder[1]}/>
            </div>
        </div>
    )
}

export default RecordInput