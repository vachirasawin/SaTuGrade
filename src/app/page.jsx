import React from "react"

import Navbar from "./components/navbar/Navbar"
import Banner from "./components/Banner"
import Project from "./components/detail/Project"
import SubjectsSection from "./components/section/SubjectsSection"
import ManualsSection from "./components/section/ManualsSection"
import FAQsSection from "./components/section/FAQsSection"
import Dataset from "./components/detail/Dataset"
import Model from "./components/detail/Model"
import AccuracySection from "./components/section/AccuracySection"
import AccuracyDescription from "./components/section/AccuracyDescription"
import FrontendSection from "./components/section/FrontendSection"
import BackendSection from "./components/section/BackendSection"
import DatabaseSection from "./components/section/DatabaseSection"
import DeploymentSection from "./components/section/DeploymentSection"

async function page() {
    return (
        <div>
            <Navbar/>
            <Banner title = "การพัฒนาเว็บแอปพลิเคชันวิเคราะห์และพยากรณ์แนวโน้มผลการเรียนวิชาหลักเฉพาะสายการเรียนด้วยปัญญาประดิษฐ์เพื่อการวางแผนการเรียน" image = "/classroom.png"/>
            <Project/>
            <SubjectsSection/>
            <ManualsSection/>
            <FAQsSection/>
            <Banner title = "ระบบปัญญาประดิษฐ์สำหรับพยากรณ์แนวโน้มผลการเรียนวิชาหลักเฉพาะสายการเรียน" image = "/ai.jpg"/>
            <Dataset/>
            <Model/>
            <AccuracySection/>
            <AccuracyDescription/>
            <Banner title = "เทคโนโลยีที่ใช้ในการพัฒนาเว็บแอปพลิเคชันและปัญญาประดิษฐ์" image = "/technology.jpg"/>
            <FrontendSection/>
            <BackendSection/>
            <DatabaseSection/>
            <DeploymentSection/>
        </div>
    )
}

export default page