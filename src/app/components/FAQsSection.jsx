import React from "react"

import CardList from "./card/CardList";

import { FAQs } from "../utils/FAQsData"

function FAQsSection() {
    const FAQsData = FAQs;

    return (
        <div id = "faqs">
            <CardList title = "คำถามที่พบบ่อย" cardsData = {FAQsData}/>
        </div>
    )
}

export default FAQsSection