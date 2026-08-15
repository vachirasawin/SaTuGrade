"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function NavbarLink() {
    const LinksData = [
        { href: "/", label: "หน้าหลัก" },
        { href: "/manual", label: "วิธีการใช้งาน" },
        { href: "/faqs", label: "คำถามที่พบบ่อย" },
        { href: "/records/1", label: "เพิ่มข้อมูล", matchPrefix: "/records", user: true },
        { href: "/suggest", label: "คำแนะนำ" }
    ]
    
    const pathname = decodeURIComponent(usePathname());
    const { data: session } = useSession();

    return (
        <div className = "flex flex-row max-md:flex-col gap-16 max-md:gap-6 text-sm font-medium">
            {LinksData.map((link, index) => {
                if (link.nonuser && session) return null;
                if (link.user && !session) return null;
                if (link.admin && session?.user?.access !== "admin") return null;

                const prefix = link.matchPrefix || link.href;
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(prefix);

                return (
                    <Link key = {index} href = {link.href} className = {`${isActive ? "text-neutral-900" : "text-gray-400"}`}>
                        {link.label}
                    </Link>
                )
            })}
        </div>
    )
}

export default NavbarLink