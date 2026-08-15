import { connectDatabase } from "../../../../../lib/database";
import CreateRecord from "../../../../../models/createRecord";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request) {
    try {
        const { userId, program, payload } = await request.json();

        if (!userId || !payload) {
            return NextResponse.json(
                { message: "ข้อมูลไม่ครบถ้วน กรุณาระบุ userId และ payload" },
                { status: 400 }
            );
        }

        await connectDatabase();

        const record = await CreateRecord.findOneAndUpdate(
            { userId },
            { program, recordData: payload },
            { new: true, upsert: true }
        );

        revalidatePath("/records");

        return NextResponse.json(
            { message: "บันทึกข้อมูลเรียบร้อยแล้ว", data: record },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving record:", error);
        return NextResponse.json(
            { message: "ไม่สามารถบันทึกข้อมูลได้", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { message: "กรุณาระบุ userId" },
                { status: 400 }
            );
        }

        await connectDatabase();
        const record = await CreateRecord.findOne({ userId });

        return NextResponse.json({ recordData: record ? record.recordData : {} }, { status: 200 });
    } catch (error) {
        console.error("Error fetching record:", error);
        return NextResponse.json(
            { message: "เกิดข้อผิดพลาดในการดึงข้อมูล", error: error.message },
            { status: 500 }
        );
    }
}