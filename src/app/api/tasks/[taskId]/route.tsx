import { getResponseMessage } from "@/helper/response-message";
import { Task } from "@/modles/task";
import { TaskDetailsProps, TaskParamsType } from "@/shared/common-interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: TaskParamsType }
) {
  const task = await Task.findById(params.taskId);
  try {
    return getResponseMessage(task, 200, true);
  } catch (error) {
    console.log(error);
    return getResponseMessage(`Failed to get task: ${error}`, 500, false);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: TaskParamsType }
) {
  const task = await Task.findByIdAndDelete(params.taskId);
  try {
    return getResponseMessage(
      `${params.taskId} deleted successfully`,
      200,
      true
    );
  } catch (error) {
    console.log(error);
    return getResponseMessage(`Failed to delete task: ${error}`, 500, false);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: TaskParamsType }
) {
  const { title, content, status } = (await request.json()) as TaskDetailsProps;
  const task = await Task.findById(params.taskId);

  try {
    task.title = title;
    task.content = content;
    task.status = status;

    await task.save();

    return getResponseMessage(
      `'${params.taskId}' updated successfully`,
      200,
      true
    );
  } catch (error) {
    console.log(error);
    return getResponseMessage(`Failed to update task: ${error}`, 500, false);
  }
}
