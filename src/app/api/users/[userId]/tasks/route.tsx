import { getResponseMessage } from "@/helper/response-message";
import { Task } from "@/modles/task";
import { UserParamsType } from "@/shared/common-interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: UserParamsType }
) {
  const tasks = await Task.find({ userId: params.userId });
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
    console.log(error);
    return getResponseMessage(
      `Failed to get all tasks belong to '${params.userId}': ${error}`,
      500,
      false
    );
  }
}

export async function DELETE(
  request: NextRequest
) {
  const { deleteTaskIds } = await request.json();

  try {
    const deletePromises = deleteTaskIds.map((id: string) => Task.findByIdAndDelete({_id: id}));

    await Promise.all(deletePromises);

    return getResponseMessage(
      `Successfully deleted ${deleteTaskIds.length} tasks.`,
      200,
      true
    );
    
  } catch (error) {
    console.log(error);
    return getResponseMessage(
      `Failed to delete: ${error}`,
      500,
      false
    );
  }
}