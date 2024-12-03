import mongoose, { Schema, Document, Model } from "mongoose";

interface ITask extends Document {
    text: string;
    dueDate: string;
    // completed: boolean;
    time?: string;
    notes?: string;
    image?: string | null;
}

const TaskSchema = new Schema<ITask>({
    text: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
    },
    time: {
        type: String,
    },
    notes: {
        type: String,
    },
    image: {
        type: String,
    }
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
export default Task;