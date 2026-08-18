import React from "react"

import CardList from "../card/CardList"

import { deployment } from "../../utils/card/deploymentData"

function DeploymentSection() {
    return (
        <div id = "deployment">
            <CardList title = "เทคโนโลยีที่ใช้สำหรับ Deployment" cardsData = {deployment}/>
        </div>
    )
}

export default DeploymentSection