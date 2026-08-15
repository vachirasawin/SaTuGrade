"use client"

import React, { useState, useEffect } from "react"

import NavbarLink from "./NavbarLink"
import NavbarButton from "./NavbarButton"

function NavbarMenu() {
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menu]);

    return (
        <div className = "flex justify-center items-center gap-4">
            <button type = "button" onClick = {() => setMenu(!menu)} className = {`w-10 h-10 hidden max-md:flex justify-center items-center border border-gray-200 shadow-md rounded-md text-base relative z-30 transition-colors duration-200 ${menu ? "text-neutral-900" : "text-gray-400"}`}>
                <i className = "fa-solid fa-bars"></i>
            </button>

            <div className = {`fixed top-0 left-0 w-full h-[calc(100vh-6rem)] bg-white border-b border-gray-200 p-4 flex flex-col gap-4 -z-10 transition-all duration-500 ease-in-out ${menu ? "translate-y-24" : "-translate-y-[calc(100vh-6rem)]"}`}>
                <NavbarLink/>
                <NavbarButton/>
            </div>
        </div>
    )
}

export default NavbarMenu