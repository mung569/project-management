import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
}


export async function POST(request: NextRequest) {
    await connectMongoDB();
    const { username, email, password } = await request.json();
    
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = { username, email, password: hashedPassword }

        // const newUser = { username, email, password }
    
        await User.create(newUser);
        return NextResponse.json({ message: "User added successfully" }, { status: 201 })
    } catch {
        return NextResponse.json({ message: "Unable to add user; check that all fields are entered" }, { status: 400 })
    }
   }
