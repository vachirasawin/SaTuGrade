import React from "react"

import CardList from "../card/CardList"

import { descriptions } from "../../utils/detail/accuracyDescriptions"

function AccuracyDescription() {
    return (
        <div id = "description">
            <CardList title = {<>ค่าใน<span className = "text-blue-500">การวัดผล</span>การพยากรณ์</>} cardsData = {descriptions}/>
        </div>
    )
}

export default AccuracyDescription
