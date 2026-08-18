import React from "react"

import CardList from "../card/CardList"

import { deployment } from "../../utils/card/deploymentData"

function DeploymentSection() {
    return (
        <div id = "deployment">
            <CardList title = {<>เทคโนโลยีที่ใช้สำหรับ <span className = "text-blue-500">&nbsp;Deployment</span></>} cardsData = {deployment}/>
        </div>
    )
}

export default DeploymentSection