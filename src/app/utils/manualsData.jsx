export const manuals = [
    {
        symbol: "fa-solid fa-arrow-right-to-bracket",
        title: "เข้าสู่ระบบ",
        detail: "เข้าสู่ระบบเพื่อบันทึกข้อมูลผลการเรียน หากไม่มีบัญชีสามารถสมัครสมาชิกเพื่อสร้างบัญชีได้",
        width: "w-[442px]",
        height: "h-[286px]",
        url: [
            ["เข้าสู่ระบบ", "/sign in"],
            ["สมัครสมาชิก", "/sign up"]
        ]
    },
    {
        symbol: "fa-solid fa-arrow-right-to-bracket rotate-90",
        title: "เพิ่มข้อมูลผลการเรียน",
        detail: "เพิ่มข้อมูลผลการเรียนทั้งหมดเพื่อเป็นข้อมูลในการพยากรณ์ผลกรเรียนในเทอมถัดไป",
        width: "w-[442px]",
        height: "h-[286px]",
        url: [
            ["เพิ่มข้อมูล", "/records/1"]
        ]
    },
    {
        symbol: "fa-regular fa-file-lines",
        title: "ตรวจสอบผลการพยากรณ์",
        detail: "ตรวจสอบผลการพยากรณ์ผลการเรียนในเทอมถัดไป และคำแนะนำวิชาที่ควรให้ความสำคัญ",
        width: "w-[442px]",
        height: "h-[286px]",
        url: [
            ["ผลการพยากรณ์", "/prediction"]
        ]
    }
]