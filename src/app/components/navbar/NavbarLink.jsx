"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";

function NavbaeLink() {
    const LinksData = [
        { href: "/", label: "หน้าหลัก" },
        { href: "/manual", label: "วิธีการใช้งาน"},
        { href: "/faqs", label: "คำถามที่พบบ่อย"},
        { href: "/records", label: "เพิ่มข้อมูล"},
        { href: "/suggest", label: "คำแนะนำ"}
    ]
    
    const pathname = decodeURIComponent(usePathname());

    return (
        <div className = "flex flex-row max-md:flex-col gap-16 max-md:gap-6 text-sm font-medium">
            {LinksData.map((link, index) => (
                <Link key = {index} href = {link.href} className = {`${pathname === link.href ? "text-neutral-900" : "text-gray-400"}`}>
                    {link.label}
                </Link>
            ))}
        </div>
    )
}

export default NavbaeLink