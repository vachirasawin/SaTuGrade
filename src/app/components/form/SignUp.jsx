"use client"

import React, { useState } from "react"
import Link from "next/link"

import TextInput from "./TextInput"
import EmailInput from "./EmailInput"
import SelectInput from "./SelectInput"
import PasswordInput from "./PasswordInput"
import ButtonInput from "./ButtonInput"

import SuccessAlert from "../alert/SuccessAlert"
import WarningAlert from "../alert/WarningAlert"
import ErrorAlert from "../alert/ErrorAlert"

function SignUp() {
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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [program, setProgram] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const options = [
        { value: "SM", label: "วิทย์-คณิต" },
        { value: "AL", label: "ศิลป์-ภาษา" },
        { value: "AC", label: "ศิลป์-คำนวณ" }
    ]

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setProgram("");
        setPassword("");
        setConfirmPassword("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !username || !email || !program || !password || !confirmPassword) {
            setIsWarning(true);
            setWarningTitle("กรอกข้อมูลไม่ครบถ้วน");
            setWarningDetail("กรุณากรอกข้อมูลในช่องที่มีเครื่องหมายสำคัญให้ครบถ้วนก่อนยืนยัน");
            setWarningButton("ตกลงเพื่อแก้ไข");
            return;
        }

        if (password != confirmPassword) {
            setIsWarning(true);
            setWarningTitle("รหัสผ่านไม่ตรงกัน");
            setWarningDetail("กรุณากรอกรหัสผ่านให้ตรงกัน");
            setWarningButton("ตกลงเพื่อแก้ไข");
            return;
        }
    }

    return (
        <div className = "fixed top-24 left-0 w-screen h-[calc(100vh-6rem)] bg-transparent z-30 flex justify-center items-center max-lg:items-start max-lg:py-4 px-4 overflow-y-auto styleScrollbar">
            <form onSubmit = {handleSubmit} onReset = {handleReset} className = "bg-white p-8 max-lg:p-4 max-lg:w-full rounded-xl shadow-md flex flex-col gap-4">
                <div className = "flex gap-4 max-lg:flex-col">
                    <TextInput title = "ชื่อจริง" placeholder = "กรอกชื่อจริงของผู้ใช้งาน" onChange = {(e) => setFirstname(e.target.value)} request/>
                    <TextInput title = "นามสกุล" placeholder = "กรอกนามสกุลของผู้ใช้งาน" onChange = {(e) => setLastname(e.target.value)} request/>
                </div>
                <div className = "flex gap-4 max-lg:flex-col">
                    <TextInput symbol = "fa-regular fa-user" title = "ชื่อผู้ใช้งาน" placeholder = "กรอกชื่อผู้ใช้งาน" onChange = {(e) => setUsername(e.target.value)} request/>
                    <EmailInput title = "ที่อยู่อีเมล" placeholder = "กรอกที่อยู่อีเมลของผู้ใช้งาน" onChange = {(e) => setEmail(e.target.value)} request/>
                </div>
                <SelectInput title = "สายการเรียน" data = {options} value = {program} onChange = {(value) => setProgram(value)} request/>
                <div className = "flex gap-4 max-lg:flex-col">
                    <PasswordInput title = "รหัสผ่าน" placeholder = "กรอกรหัสผ่านของผู้ใช้งาน" onChange = {(e) => setPassword(e.target.value)} request/>
                    <PasswordInput title = "ยืนยันรหัสผ่าน" placeholder = "กรอกรหัสผ่านอีกครั้งเพื่อยืนยันรหัสผ่าน" onChange = {(e) => setConfirmPassword(e.target.value)} request/>
                </div>
                <div className = "w-full flex justify-center items-center gap-2 text-sm font-medium">
                    <p>หากมีบัญชีผู้ใช้แล้ว</p>
                    <Link href = "/sign%20in" className = "text-blue-500">เข้าสู่ระบบ</Link>
                </div>
                <div className = "flex gap-4 max-lg:flex-col">
                    <ButtonInput title = "ยืนยันการสมัครสมาชิก" type = "submit" width = "w-full" color = "text-blue-500 hover:bg-blue-500"/>
                    <ButtonInput title = "ยกเลิกการสมัครสมาชิก" type = "reset" width = "w-full" color = "text-red-500 hover:bg-red-500"/>
                </div>
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

export default SignUp