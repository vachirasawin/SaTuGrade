import React from "react"

import CardList from "../card/CardList"

import { descriptions } from "../../utils/detail/accuracyDescriptions"

function AccuracyDescription() {
    return (
        <div id = "description">
            <CardList title = "ค่าในการวัดผลการพยากรณ์" cardsData = {descriptions}/>
        </div>
    )
}

export default AccuracyDescription