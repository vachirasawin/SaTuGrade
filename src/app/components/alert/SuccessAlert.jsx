"use client"

import React, { useState } from "react"

import ButtonInput from "../form/input/ButtonInput"

function SuccessAlert() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && (
                <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-neutral-900/80 z-30 flex justify-center items-center max-lg:items-start max-lg:py-4 px-4 overflow-y-auto styleScrollbar">
                    <form onReset = {() => setIsOpen(!isOpen)} className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4 w-sm">
                        <div className = "w-full flex justify-between items-center gap-4">
                            <p className = "text-lg font-bold max-lg:w-72">เกิดความผิดพลาด</p>
                            <i className = "fa-regular fa-circle-check text-green-500"></i>
                        </div>
                        <p className = "text-sm font-medium text-gray-400">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien.
                        </p>
                        <ButtonInput title = "รับทราบข้อผิดพลาด" type = "reset" width = "w-full" color = "text-green-500 hover:bg-green-500"/>
                    </form>
                </div>
            )}
        </>
    )
}

export default SuccessAlert