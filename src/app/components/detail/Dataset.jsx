import React from "react"

import CardList from "../card/CardList"

import { dataset } from "../../utils/detail/datasetData"

function Dataset() {
    const datasetData = dataset;

    return (
        <div id = "dataset">
            <CardList title = {<>ข้อมูลสำหรับการ<span className = "text-blue-500">สอนปัญญาประดิษฐ์</span></>} cardsData = {datasetData}/>
        </div>
    )
}

export default Dataset