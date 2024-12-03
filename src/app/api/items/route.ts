import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/taskSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    await connectMongoDB();
    const tasks = await Task.find();
    return NextResponse.json({ tasks });
}

export async function POST(request: NextRequest) {
    const { text, dueDate, time, notes, image } = await request.json();
    await connectMongoDB();
    await Task.create({ text, dueDate, time, notes, image });
    return NextResponse.json({ message: "Task added successfully" }, { status: 201 })
}
