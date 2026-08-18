import React from "react"

import CardList from "../card/CardList"

import { manuals } from "../../utils/card/manualsData"

function ManualsSection() {
    return (
        <div id = "manual">
            <CardList title = {<><span className = "text-blue-500">วิธีการใช้</span>งาน SaTuGrade</>} cardsData = {manuals}/>
        </div>
    )
}

export default ManualsSection