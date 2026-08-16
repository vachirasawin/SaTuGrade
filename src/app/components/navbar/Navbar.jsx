import React from "react"

import NavbarLink from "./NavbarLink"
import NavbarMenu from "./NavbarMenu"
import NavbarButton from "./NavbarButton"

function Navbar() {
    return (
        <div className = "mb-24">
            <div className = "z-40 fixed top-0 left-0">
                <div className = "w-screen h-24 bg-white border-b border-gray-200 px-4">
                    <div className = "container mx-auto flex justify-between items-center h-full">
                        <p className = "text-3xl font-bold">
                            <span className = "text-neutral-900">SaTu</span>
                            <span className = "text-blue-500">Grade</span>
                        </p>
                        <div className = "flex max-lg:hidden"><NavbarLink/></div>
                        <div className = "hidden max-lg:flex"><NavbarMenu/></div>
                        <div className = "flex max-lg:hidden"><NavbarButton/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar