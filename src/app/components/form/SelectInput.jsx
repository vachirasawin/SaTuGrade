"use client"

import React, { useState } from "react"

function SelectInput({ title, data = [], value, onChange, request }) {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className = "flex flex-col gap-2 w-full">
            <div className = "w-full flex justify-between items-center gap-4">
                <p className = "text-lg font-bold">{title}</p>
                {request && (<i className = "fa-solid fa-asterisk text-red-500 text-[8px]"></i>)}
            </div>
            <div tabIndex = {0} onFocus = {() => setIsFocus(true)} onBlur = {() => setIsFocus(false)} className = {`flex h-12 w-full border rounded-sm transition-colors duration-200 outline-none ${isFocus ? "border-blue-500" : "border-gray-200"}`}>
                {data.map((item, index) => {
                    const isSelected = value === item.value;
                    const isFirst = index === 0;
                    const isLast = index === data.length - 1;

                    return (
                        <button key = {item.value || index} type = "button" onClick = {() => onChange(item.value)} className = {`flex-1 flex justify-center items-center gap-2 h-full text-sm font-medium transition-all duration-200 cursor-pointer ${isFirst ? "rounded-l-sm" : ""} ${isLast ? "rounded-r-sm" : ""} ${!isLast ? "border-r border-gray-200" : ""} ${isSelected ? "bg-blue-500 text-white font-semibold" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
                            {item.symbol && (
                                <i className = {item.symbol}></i>
                            )}
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default SelectInput