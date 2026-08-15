import React from "react"

import CardList from "./card/CardList"

import { manuals } from "../utils/manualsData"

function ManualsSection() {
    const manualsData = manuals;

    return (
        <div id = "manual">
            <CardList title = "วิธีการใช้งาน" cardsData = {manualsData}/>
        </div>
    )
}

export default ManualsSection