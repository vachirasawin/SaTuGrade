import React from "react"

import CardList from "../card/CardList"

import { deployment } from "../../utils/deploymentData"

function DeploymentSection() {
    const deploymentData = deployment;

    return (
        <div id = "deployment">
            <CardList title = "เทคโนโลยีที่ใช้สำหรับ Deployment" cardsData = {deploymentData}/>
        </div>
    )
}

export default DeploymentSection