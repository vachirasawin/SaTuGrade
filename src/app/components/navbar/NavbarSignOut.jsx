"use client"

import React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function NavbarSignOut() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className = "cursor-pointer flex flex-row max-md:flex-col justify-center items-center gap-4 max-md:w-full">
            <div onClick = {() => signOut()} className = "w-max max-md:w-full h-10 flex justify-center items-center shadow-md rounded-md text-sm font-medium px-4 border-2 border-red-500 bg-red-500 text-white">
                ออกจากระบบ
            </div>
        </div>
    )
}

export default NavbarSignOut