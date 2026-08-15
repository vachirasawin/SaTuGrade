"use client"

import React from "react"

function ButtonInput({ title, type, width, color }) {
    return (
        <button type = {type} className = {`${width} h-12 py-[13px] cursor-pointer rounded-sm text-sm font-medium transition-colors duration-200 flex justify-center items-center border border-gray-200 ${color} hover:text-neutral-50`}>{title}</button>
    )
}

export default ButtonInput