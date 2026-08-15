import React from "react"
import Image from "next/image"

function Banner({ title, image }) {
    return (
        <div className = "relative w-full h-52 max-lg:h-56 overflow-hidden">
            <Image src = {image} alt = {title} fill priority sizes = "100vw" className = "object-cover"/>
            <div className = "absolute inset-0 bg-black/50 z-10"></div>
            <div className = "absolute inset-0 z-20 flex items-center justify-center p-4 text-center container mx-auto px-4">
                <p className = "text-2xl lg:text-3xl font-extrabold text-white drop-shadow-md leading-relaxed">
                    {title}
                </p>
            </div>
        </div>
    )
}

export default Banner