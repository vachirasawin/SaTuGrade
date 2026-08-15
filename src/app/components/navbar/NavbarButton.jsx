"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import NavbarSignOut from "./NavbarSignOut";

function NavbarButton() {
    const ButtonsData = [
        { href: "/sign in", label: "เข้าสู่ระบบ", backgroundColor: "bg-blue-500", textColor: "text-blue-500", borderColor: "border-blue-500", nonuser: true }
    ]

    const pathname = decodeURIComponent(usePathname());
    const { data: session } = useSession();

    return (
        <div className = "flex flex-row max-md:flex-col justify-center items-center gap-4 max-md:w-full">
            {ButtonsData.map((button, index) => {
                if (button.nonuser && session) return null;
                if (button.user && !session) return null;
                if (button.admin && session?.user?.access !== "admin") return null;

                return (
                    <Link key = {index} href = {button.href} className = {`w-max max-md:w-full h-10 flex justify-center items-center shadow-md rounded-md text-sm font-medium px-4 border-2 ${button.borderColor} ${pathname === button.href ? `bg-white ${button.textColor}` : `${button.backgroundColor} text-white`}`}>
                        {button.label}
                    </Link>
                )
            })}
            <NavbarSignOut/>
        </div>
    )
}

export default NavbarButton