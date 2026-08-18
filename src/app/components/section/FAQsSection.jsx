import React from "react"

import CardList from "../card/CardList";

import { FAQs } from "../../utils/card/FAQsData"

function FAQsSection() {
    return (
        <div id = "faqs">
            <CardList title = {<><span className = "text-blue-500">คำถาม</span>ที่พบบ่อย</>} cardsData = {FAQs}/>
        </div>
    )
}

export default FAQsSection