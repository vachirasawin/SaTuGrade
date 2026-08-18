import React from "react"

import Navbar from "./components/navbar/Navbar"
import Banner from "./components/Banner"
import SubjectsSection from "./components/section/SubjectsSection"
import ManualsSection from "./components/section/ManualsSection"
import FAQsSection from "./components/section/FAQsSection"
import FrontendSection from "./components/section/FrontendSection"
import BackendSection from "./components/section/BackendSection"
import DatabaseSection from "./components/section/databaseSection"
import DeploymentSection from "./components/section/DeploymentSection"
import Project from "./components/detail/Project"
import Dataset from "./components/detail/Dataset"
import Model from "./components/detail/Model"
import Accuracy from "./components/detail/Accuracy"

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
            <Accuracy/>
            <FrontendSection/>
            <BackendSection/>
            <DatabaseSection/>
            <DeploymentSection/>
        </div>
    )
}

export default page