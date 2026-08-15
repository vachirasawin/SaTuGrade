"use client"

import React, { useState } from "react"

function TextInput({ symbol, title, placeholder, value, onChange, request }) {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className = "flex flex-col gap-2 w-72 max-lg:w-full">
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
                <input type = "text" value = {value} onChange = {onChange} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} className = {`w-full h-12 py-[13px] border ${isFocus ? "border-blue-500" : "border-gray-200"} ${symbol ? "rounded-r-sm" : "rounded-sm"} outline-none text-sm font-medium px-4 transition-colors duration-200`} placeholder = {placeholder}/>
            </div>
        </div>
    )
}

export default TextInput