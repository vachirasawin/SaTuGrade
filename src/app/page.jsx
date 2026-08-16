import React from "react"

import Navbar from "./components/navbar/Navbar"
import Banner from "./components/Banner"
import FAQsSection from "./components/section/FAQsSection"
import ManualsSection from "./components/section/ManualsSection"
import FrontendSection from "./components/section/FrontendSection"
import BackendSection from "./components/section/BackendSection"
import DatabaseSection from "./components/section/databaseSection"
import DeploymentSection from "./components/section/DeploymentSection"

async function page() {
    return (
        <div>
            <Navbar/>
            <Banner title = "การพัฒนาเว็บแอปพลิเคชันวิเคราะห์และพยากรณ์แนวโน้มผลการเรียนวิชาหลักเฉพาะสายการเรียนด้วยปัญญาประดิษฐ์เพื่อการวางแผนการเรียน" image = "/classroom.png"/>
            <FAQsSection/>
            <ManualsSection/>
            <FrontendSection/>
            <BackendSection/>
            <DatabaseSection/>
            <DeploymentSection/>
        </div>
    )
}

export default page