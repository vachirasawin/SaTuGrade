import React from "react"
import Link from "next/link"
import Image from "next/image"

function Project() {
    return (
        <div className = "w-screen border-b border-gray-200">
            <div className = "container mx-auto flex max-lg:flex-col-reverse justify-around max-lg:justify-center items-center px-4 py-18 max-lg:py-4 gap-12 max-lg:gap-4">
                <div className = "flex flex-col gap-6 max-lg:gap-4 w-md max-lg:w-full">
                    <div className = "fle flex-col gap-2 justify-start">
                        <p className = "text-4xl max-md:text-3xl font-bold">
                            SaTu<span className = "text-blue-500">Grade</span>
                        </p>
                        <div className = "w-36 border-2 border-blue-500 rounded-md mt-2"></div>
                    </div>
                    <div className = "text-gray-400">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien.
                        </p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien.
                        </p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien.
                        </p>
                    </div>
                    <div className = "w-full flex gap-4 max-lg:gap-2 max-lg:flex-col">
                        <Link href = "/sign%20up" className = "w-1/2 max-lg:w-full h-12 cursor-pointer rounded-sm text-sm font-medium transition-colors duration-200 flex justify-center items-center border border-gray-200 text-blue-500 hover:bg-blue-500 hover:text-neutral-50">สมัครสมาชิก</Link>
                        <Link href = "#manual" className = "w-1/2 max-lg:w-full h-12 cursor-pointer rounded-sm text-sm font-medium transition-colors duration-200 flex justify-center items-center border border-gray-200 hover:text-blue-500 bg-blue-500 hover:bg-neutral-50 text-neutral-50">วิธีการใช้งาน</Link>
                    </div>
                </div>
                <div className = "relative w-lg max-lg:w-full h-84 max-lg:h-72">
                    <Image src = "/project.png" alt = "Project" fill className = "object-cover rounded-xl shadow-md"/>
                </div>
            </div>
        </div>
    )
}

export default Project