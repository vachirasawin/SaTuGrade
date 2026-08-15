import { NextResponse } from "next/server";
import { connectDatabase } from "../../../../../lib/database";
import Authentication from "../../../../../models/authentication";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { firstname, lastname, username, email, program, password, access } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectDatabase();
        await Authentication.create({ firstname, lastname, username, email, program, password: hashedPassword, access: access || "user" });

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "An error occured while registrating the user." }, { status: 500 });
    }
}