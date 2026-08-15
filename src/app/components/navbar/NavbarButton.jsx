"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";

function NavbarButton() {
    const ButtonsData = [
        { href: "/sign in", label: "เข้าสู่ระบบ", backgroundColor: "bg-blue-500", textColor: "text-blue-500", borderColor: "border-blue-500" },
        { href: "/sign out", label: "ออกจากระบบ", backgroundColor: "bg-red-500", textColor: "text-red-500", borderColor: "border-red-500" }
    ]

    const pathname = decodeURIComponent(usePathname());

    return (
        <div className = "flex flex-row max-md:flex-col justify-center items-center gap-4 max-md:w-full">
            {ButtonsData.map((button, index) => (
                <Link key = {index} href = {button.href} className = {`w-max max-md:w-full h-10 flex justify-center items-center shadow-md rounded-md text-sm font-medium px-4 border-2 ${button.borderColor} ${pathname === button.href ? `bg-white ${button.textColor}` : `${button.backgroundColor} text-white`}`}>
                    {button.label}
                </Link>
            ))}
        </div>
    )
}

export default NavbarButton