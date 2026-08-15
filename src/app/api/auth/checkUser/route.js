import { NextResponse } from "next/server";
import { connectDatabase } from "../../../../../lib/database";
import Authentication from "../../../../../models/authentication";

export async function POST(request) {
    try {
        await connectDatabase();

        const { username } = await request.json();
        const user = await Authentication.findOne({ username }).select("_id");

        return NextResponse.json({ user });
    } catch(error) {
        console.log(error);
    }
}