import React from "react"

import CardList from "../card/CardList"

import { manuals } from "../../utils/card/manualsData"

function ManualsSection() {
    return (
        <div id = "manual">
            <CardList title = "วิธีการใช้งาน" cardsData = {manuals}/>
        </div>
    )
}

export default ManualsSection