import React from "react"

import CardList from "../card/CardList"

import { database } from "../../utils/card/databaseData"

function DatabaseSection() {
    return (
        <div id = "database">
            <CardList title = {<>เทคโนโลยีที่ใช้สำหรับ <span className = "text-blue-500">&nbsp;Database</span></>} cardsData = {database}/>
        </div>
    )
}

export default DatabaseSection