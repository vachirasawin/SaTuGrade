import React from "react"

function LoadingAleft({ title }) {
    return (
        <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-neutral-900/80 z-40 flex justify-center items-center max-lg:items-start max-lg:py-4 px-4 overflow-y-auto styleScrollbar">
            <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4 w-sm">
                <div className = "w-full flex justify-between items-center gap-4">
                    <p className = "text-lg font-bold max-lg:w-72">{title}</p>
                </div>
                
                <div className = "w-full flex justify-center items-center">
                    <div className = "w-12 h-12 border-6 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingAleft