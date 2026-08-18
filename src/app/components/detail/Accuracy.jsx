import React from "react"

import CardList from "../card/CardList"

import { accuracy } from "../../utils/detail/accuracyData"

function Accuracy() {
    const accuracyData = accuracy;

    return (
        <div id = "accuracy">
            <CardList title = "ความแม่นยำของระบบปัญญาประดิษฐ์" cardsData = {accuracyData}/>
        </div>
    )
}

export default Accuracy