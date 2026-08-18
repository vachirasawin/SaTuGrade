import React from "react"

import CardList from "../card/CardList"

import { frontend } from "../../utils/card/frontendData"

function FrontendSection() {
    return (
        <div id = "frontend">
            <CardList title = "เทคโนโลยีที่ใช้สำหรับ Frontend" cardsData = {frontend}/>
        </div>
    )
}

export default FrontendSection