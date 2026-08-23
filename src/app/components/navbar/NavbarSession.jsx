"use client"

import React from "react"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function NavbarSession() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className = "flex flex-row max-lg:flex-col justify-center items-center gap-4 max-lg:w-full">
            <Link href = "/profile" className = "cursor-pointer w-max max-lg:w-full h-10 flex justify-center items-center shadow-md rounded-md text-sm font-medium px-4 border-2 border-gray-200 bg-neutral-50 text-neutral-900">
                <p>โปรไฟล์</p>
            </Link>
            <div onClick = {() => signOut()} className = "cursor-pointer w-max max-lg:w-full h-10 flex justify-center items-center shadow-md rounded-md text-sm font-medium px-4 border-2 border-red-500 bg-red-500 text-white">
                <p>ออกจากระบบ</p>
            </div>
        </div>
    )
}

export default NavbarSession