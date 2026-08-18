import React from "react"

import CardList from "../card/CardList"

import { backend } from "../../utils/card/backendData"

function BackendSection() {
    return (
        <div id = "backend">
            <CardList title = {<>เทคโนโลยีที่ใช้สำหรับ <span className = "text-blue-500">&nbsp;Backend</span></>} cardsData = {backend}/>
        </div>
    )
}

export default BackendSection