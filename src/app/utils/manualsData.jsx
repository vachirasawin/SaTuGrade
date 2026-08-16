export const manuals = [
    {
        symbol: "fa-solid fa-arrow-right-to-bracket",
        title: "เข้าสู่ระบบ",
        detail: "เข้าสู่ระบบเพื่อบันทึกข้อมูลผลการเรียน หากไม่มีบัญชีสามารถสมัครสมาชิกเพื่อสร้างบัญชีได้",
        width: "w-[442px]",
        height: "h-[296px]",
        url: [
            [ "เข้าสู่ระบบ", "/sign in" ],
            [ "สมัครสมาชิก", "/sign up" ]
        ]
    },
    {
        symbol: "fa-solid fa-arrow-right-to-bracket rotate-90",
        title: "เพิ่มข้อมูลผลการเรียน",
        detail: "เพิ่มข้อมูลผลการเรียนทั้งหมดเพื่อเป็นข้อมูลในการพยากรณ์ผลกรเรียนในเทอมถัดไป",
        width: "w-[442px]",
        height: "h-[296px]",
        url: [
            [ "เพิ่มข้อมูล", "/records/1" ]
        ]
    },
    {
        symbol: "fa-regular fa-file-lines",
        title: "ตรวจสอบผลการพยากรณ์",
        detail: "ตรวจสอบผลการพยากรณ์ผลการเรียนในเทอมถัดไป",
        width: "w-[442px]",
        height: "h-[296px]",
        url: [
            [ "ผลการพยากรณ์", "/prediction#predicted" ]
        ]
    },
    {
        symbol: "fa-solid fa-triangle-exclamation",
        title: "ตรวจสอบวิชาที่ควรระวัง",
        detail: "ตรวจสอบผลการพยากรณ์วิชาที่ควรระวังในเทอมถัดไป",
        width: "w-[442px]",
        height: "h-[296px]",
        url: [
            [ "วิชาที่ควรระวัง", "/prediction#caution" ]
        ]
    },
    {
        symbol: "fa-regular fa-circle-xmark",
        title: "ตรวจสอบวิชาที่ต้องตั้งใจเป็นพิเศษ",
        detail: "ตรวจสอบผลการพยากรณ์วิชาที่ต้องตั้งใจเป็นพิเศษในเทอมถัดไป",
        width: "w-[442px]",
        height: "h-[296px]",
        url: [
            [ "วิชาที่ต้องตั้งใจเป็นพิเศษ", "/prediction#suggestion" ]
        ]
    }
]