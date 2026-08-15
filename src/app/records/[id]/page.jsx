import React from "react"

import Navbar from "../../components/navbar/Navbar"
import Records from "../../components/form/Records"

async function page({ params }) {
    const { id } = await params;

    return (
        <div>
            <Navbar/>
            <Records id = {id}/>
        </div>
    )
}

export default page