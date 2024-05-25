import { getResponseMessage } from "@/helper/response-message";
import { Task } from "@/modles/task";
import { NextRequest, NextResponse } from "next/server";

// get all task
export async function GET(request: NextRequest) {
  let tasks = await Task.find();
  try {
    return NextResponse.json(
      {
        result: tasks,
        success: true,
        length: tasks.length,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return getResponseMessage(`Task not found: ${error}`, 404, false);
  }
}

// create taks
export async function POST(request: NextRequest) {
  const { title, content, userId } = await request.json();
  try {
    const task = new Task({
      title,
      content,
      userId,
    });

    const createdtask = await task.save();
    return getResponseMessage(`'${title}' created successfully`, 200, true);
  } catch (error) {
    console.log("failed to create task");
    return getResponseMessage(`failed to create task: ${error}}`, 402, false);
  }
}
