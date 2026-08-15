"use client"

import React, { useState } from "react"

import ButtonInput from "../form/ButtonInput"

function WarningAlert({ title, detail, button, onClose }) {
    return (
        <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-neutral-900/80 z-40 flex justify-center items-center max-lg:items-start max-lg:py-4 px-4 overflow-y-auto styleScrollbar">
            <form onReset = {onClose} className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4 w-sm">
                <div className = "w-full flex justify-between items-center gap-4">
                    <p className = "text-lg font-bold max-lg:w-72">{title}</p>
                    <i className = "fa-solid fa-triangle-exclamation text-yellow-500"></i>
                </div>
                <p className = "text-sm font-medium text-gray-400">
                    {detail}
                </p>
                <ButtonInput title = {button} type = "reset" width = "w-full" color = "text-yellow-500 hover:bg-yellow-500"/>
            </form>
        </div>
    )
}

export default WarningAlert