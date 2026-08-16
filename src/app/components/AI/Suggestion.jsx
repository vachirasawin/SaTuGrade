import React from "react"

function Suggestion({ subjects = [] }) {
    const hasSuggestion = subjects.length > 0

    return (
        <div className = "bg-white p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-4" id = "suggestion">
            <p className = "text-xl font-bold text-red-500">วิชาที่ต้องตั้งใจเป็นพิเศษ</p>

            {hasSuggestion ? (
                <>
                    <p className = "text-gray-400 text-sm font-medium">
                        วิชาต่อไปนี้มีผลการเรียนที่คาดการณ์ไม่เกิน 2.5 ควรให้ความสนใจเป็นพิเศษ
                    </p>

                    <div className = "grid grid-cols-2 max-lg:grid-cols-1 gap-4">
                        {subjects.map((item, index) => (
                            <div key = {index} className = "flex border border-red-200 rounded-lg h-max items-center shadow-sm">
                                <div className = "w-16 max-sm:w-20 h-16 max-sm:h-20 shrink-0 flex justify-center items-center border-r border-red-200 text-xl text-red-500">
                                    <i className = {item.subject.symbol}></i>
                                </div>
                                <div className = "w-full h-16 max-sm:h-20 flex flex-row max-sm:flex-col justify-between max-sm:justify-center items-center max-sm:items-start px-4 gap-1">
                                    <p className = "font-semibold">
                                        {item.subject.title}
                                    </p>
                                    <p className = "w-max px-3 h-max py-1 bg-red-200 text-red-500 shadow-sm flex justify-center items-center text-[12px] font-medium rounded-full">
                                        ผลการเรียนที่คาดการณ์: {item.predictedGrade.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className = "flex items-center gap-3 border border-green-200 bg-green-50 rounded-lg px-4 py-4 shadow-sm">
                    <i className = "fa-regular fa-circle-check text-green-500 text-xl"></i>
                    <p className = "text-green-500 font-medium">
                        ยอดเยี่ยม! ไม่มีวิชาที่คาดการณ์ว่าจะมีผลการเรียนต่ำกว่า 2.5
                    </p>
                </div>
            )}
        </div>
    )
}

export default Suggestion