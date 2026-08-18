import React from "react"

import CardList from "../card/CardList";

import { FAQs } from "../../utils/card/FAQsData"

function FAQsSection() {
    return (
        <div id = "faqs">
            <CardList title = "คำถามที่พบบ่อย" cardsData = {FAQs}/>
        </div>
    )
}

export default FAQsSection