import React from "react"

import CardList from "../card/CardList"

import { database } from "../../utils/card/databaseData"

function DatabaseSection() {
    const databaseData = database;

    return (
        <div id = "database">
            <CardList title = "เทคโนโลยีที่ใช้สำหรับ Database" cardsData = {databaseData}/>
        </div>
    )
}

export default DatabaseSection