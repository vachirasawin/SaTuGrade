import React from "react"

import Navbar from "./components/navbar/Navbar"
import Banner from "./components/Banner"
import FAQsSection from "./components/FAQsSection"
import ManualsSection from "./components/ManualsSection"

async function page() {
    return (
        <div>
            <Navbar/>
            <Banner title = "การพัฒนาเว็บแอปพลิเคชันวิเคราะห์และพยากรณ์แนวโน้มผลการเรียนวิชาหลักเฉพาะสายการเรียนด้วยปัญญาประดิษฐ์เพื่อการวางแผนการเรียน" image = "/classroom.png"/>
            <FAQsSection/>
            <ManualsSection/>
        </div>
    )
}

export default page