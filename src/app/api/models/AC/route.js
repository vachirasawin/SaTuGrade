import { NextResponse } from "next/server";

const AC_MODEL_API_URL = process.env.AC_MODEL_API_URL;

export async function POST(request) {
    try {
        if (!AC_MODEL_API_URL) {
            return NextResponse.json(
                { success: false, error: "ยังไม่ได้ตั้งค่า AC_MODEL_API_URL ใน .env" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { recordData, targetTerm } = body;

        if (!recordData || !targetTerm) {
            return NextResponse.json(
                { success: false, error: "ต้องระบุ recordData และ targetTerm" },
                { status: 400 }
            );
        }

        const response = await fetch(`${AC_MODEL_API_URL}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recordData, targetTerm }),
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: result.detail || "การพยากรณ์ล้มเหลว" },
                { status: response.status }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in /api/models/AC:", error);
        return NextResponse.json(
            { success: false, error: "เกิดข้อผิดพลาดขณะพยากรณ์ผลการเรียน" },
            { status: 500 }
        );
    }
}