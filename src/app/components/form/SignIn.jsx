"use client"

import React, { useState } from "react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

import TextInput from "./input/TextInput"
import PasswordInput from "./input/PasswordInput"
import ButtonInput from "./input/ButtonInput"

import SuccessAlert from "../alert/SuccessAlert"
import WarningAlert from "../alert/WarningAlert"
import ErrorAlert from "../alert/ErrorAlert"

function SignIn() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [successTitle, setSuccessTitle] = useState("");
    const [successDetail, setSuccessDetail] = useState("");
    const [successButton, setSuccessButton] = useState("");

    const [isWarning, setIsWarning] = useState(false);
    const [warningTitle, setWarningTitle] = useState("");
    const [warningDetail, setWarningDetail] = useState("");
    const [warningButton, setWarningButton] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorTitle, setErrorTitle] = useState("");
    const [errorDetail, setErrorDetail] = useState("");
    const [errorButton, setErrorButton] = useState("");

    const router = useRouter();
    const { data: session } = useSession();

    if (session) redirect("/");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clearFormState = () => {
        setUsername("");
        setPassword("");
    };

    const handleReset = (e) => {
        if (e) e.preventDefault();
        clearFormState();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setIsWarning(true);
            setWarningTitle("กรอกข้อมูลไม่ครบถ้วน");
            setWarningDetail("กรุณากรอกข้อมูลในช่องที่มีเครื่องหมายสำคัญให้ครบถ้วนก่อนยืนยัน");
            setWarningButton("ตกลงเพื่อแก้ไข");
            return;
        }

        try {
            const response = await signIn("credentials", {
                username, password, redirect: false
            });

            if (response.error) {
                setIsError(true);
                setErrorTitle("เข้าสู่ระบบไม่สำเร็จ");
                setErrorDetail("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง");
                setErrorButton("ลองใหม่อีกครั้ง");
                return;
            }

            router.replace("/");
        } catch(error) {
            setIsError(true);
            setErrorTitle("เกิดข้อผิดพลาด");
            setErrorDetail("เกิดข้อผิดพลาดขณะเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง");
            setErrorButton("ลองใหม่อีกครั้ง");
        }
    }

    return (
        <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-transparent z-30 flex justify-center items-center max-lg:items-start max-lg:py-4 px-4 overflow-y-auto styleScrollbar">
            <form onSubmit = {handleSubmit} onReset = {handleReset} className = "bg-white p-8 max-lg:p-4 max-lg:w-full rounded-xl shadow-md flex flex-col gap-4">
                <TextInput symbol = "fa-regular fa-user" title = "ชื่อผู้ใช้งาน" placeholder = "กรอกชื่อผู้ใช้งาน" value = {username} onChange = {(e) => setUsername(e.target.value)} request/>
                <PasswordInput title = "รหัสผ่าน" placeholder = "กรอกรหัสผ่านของผู้ใช้งาน" value = {password} onChange = {(e) => setPassword(e.target.value)} request/>
                <div className = "w-full flex justify-center items-center gap-2 text-sm font-medium">
                    <p>หากยังไม่มีบัญชีผู้ใช้</p>
                    <Link href = "/sign%20up" className = "text-blue-500">สมัครสมาชิก</Link>
                </div>
                <ButtonInput title = "ยืนยันการเข้าสู่ระบบ" type = "submit" width = "w-full" color = "text-blue-500 hover:bg-blue-500"/>
                <ButtonInput title = "ยกเลิกการเข้าสู่ระบบ" type = "reset" width = "w-full" color = "text-red-500 hover:bg-red-500"/>
            </form>

            {isWarning && (
                <WarningAlert title = {warningTitle} detail = {warningDetail} button = {warningButton} onClose = {() => setIsWarning(false)}/>
            )}
            {isError && (
                <ErrorAlert title = {errorTitle} detail = {errorDetail} button = {errorButton} onClose = {() => setIsError(false)}/>
            )}
            {isSuccess && (
                <SuccessAlert title = {successTitle} detail = {successDetail} button = {successButton} onClose = {() => setIsSuccess(false)}/>
            )}
        </div>
    )
}

export default SignIn