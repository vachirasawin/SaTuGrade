import React from "react"
import Link from "next/link"

function Card({ datas }) {
    return (
        <div className = {`p-8 max-lg:p-4 rounded-xl shadow-md flex flex-col gap-8 max-lg:gap-4 bg-white shrink-0 max-w-full max-sm:h-auto overflow-hidden ${datas.width} ${datas.height}`}>
            <div className = "flex gap-4 items-center">
                {datas.symbol &&
                    <div className = "rounded-sm shadow-sm w-16 h-16 max-lg:w-12 max-lg:h-12 flex justify-center items-center bg-white border border-gray-200 text-xl max-lg:text-lg">
                        <i className = {datas.symbol}></i>
                    </div>
                }
                <p className = "text-xl max-lg:text-lg font-bold">{datas.title}</p>
            </div>
            <p className = "flex-1 text-base font-medium text-gray-400 max-lg:text-sm break-words overflow-y-auto styleScrollbar">{datas.detail}</p>
            <div className = "mt-auto flex justify-start items-center gap-2">
                {datas.url && datas.url.map((data, index) => (
                    <Link key = {index} href = {data[1]} className = "rounded-sm shadow-sm w-max h-7 flex justify-center items-center bg-white border border-gray-200 text-sm font-semibold text-blue-500 px-4 py-1 hover:border-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-200">
                        {data[0]}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Card