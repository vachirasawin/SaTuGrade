import React from "react"

import Navbar from "./components/navbar/Navbar"
import Banner from "./components/Banner"
import ManualsSection from "./components/section/ManualsSection"
import FAQsSection from "./components/section/FAQsSection"
import FrontendSection from "./components/section/FrontendSection"
import BackendSection from "./components/section/BackendSection"
import DatabaseSection from "./components/section/databaseSection"
import DeploymentSection from "./components/section/DeploymentSection"
import Detail from "./components/information/Detail"
import Accuracy from "./components/information/Accuracy"

async function page() {
    return (
        <div>
            <Navbar/>
            <Banner title = "การพัฒนาเว็บแอปพลิเคชันวิเคราะห์และพยากรณ์แนวโน้มผลการเรียนวิชาหลักเฉพาะสายการเรียนด้วยปัญญาประดิษฐ์เพื่อการวางแผนการเรียน" image = "/classroom.png"/>
            <Detail/>
            <ManualsSection/>
            <FAQsSection/>
            <Banner title = "ระบบปัญญาประดิษฐ์สำหรับพยากรณ์แนวโน้มผลการเรียนวิชาหลักเฉพาะสายการเรียน" image = "/ai.jpg"/>
            <Accuracy/>
            <FrontendSection/>
            <BackendSection/>
            <DatabaseSection/>
            <DeploymentSection/>
        </div>
    )
}

export default page