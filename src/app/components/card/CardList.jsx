import React from "react"

import Card from "./Card"

async function CardList({ title, cardsData }) {
    return (
        cardsData.length > 0 && (
            <div className = "w-full h-max bg-neutral-50 px-4 py-18 max-lg:py-6 border-b border-gray-200 flex flex-col gap-12 max-lg:gap-4">
                <p className = "container mx-auto flex justify-center items-center text-3xl max-lg:text-2xl font-bold">
                    {title}
                </p>
                <div className = "flex flex-col gap-2">
                    <div className = "container mx-auto w-full max-w-full overflow-x-auto styleScrollbar pb-4 px-2">
                        <div className = "flex gap-6 items-stretch w-max min-w-full justify-center m-auto">
                            {cardsData.map((data, index) => (
                                <Card key = {index} datas = {data}/>
                            ))}
                        </div>
                    </div>
                    <div className = "container mx-auto hidden max-md:flex justify-end">
                        <p className = "text-[12px] font-medium text-gray-400">เลื่อนเพื่อดูต่อ</p>
                    </div>
                </div>
            </div>
        )
    )
}

export default CardList