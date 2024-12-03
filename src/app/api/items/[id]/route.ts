import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/taskSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET(request:NextRequest, { params }:RouteParams) {
    const { id } = params;
    await connectMongoDB();
    const task = await Task.findOne({_id: id });
    return NextResponse.json({ task }, { status: 200 });
} 

export async function PUT(request:NextRequest, { params}:RouteParams ) {
    const { id } = params;
    const { text: text, dueDate: dueDate, time: time, notes: notes, image: image } = await request.json();
    await connectMongoDB();
    await Task.findByIdAndUpdate(id, { text, dueDate, time, notes, image });
    return NextResponse.json({ message: "Task updated" }, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
        return NextResponse.json( { message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
}