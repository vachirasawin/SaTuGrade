import React from "react"

import Navbar from "../components/navbar/Navbar"
import Banner from "../components/Banner"
import Prediction from "../components/AI/Prediction"

function page() {
    return (
        <div>
            <Navbar/>
            <Banner title = "ผลการพยากรณ์ของผลการเรียนในเทอมถัดไป" image = "/prediction.png"/>
            <Prediction/>
        </div>
    )
}

export default page