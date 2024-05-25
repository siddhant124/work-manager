import { TaskStatus } from "@/shared/common-interfaces";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export const Task = mongoose.models.task || mongoose.model("task", taskSchema);
