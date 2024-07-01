import { getResponseMessage } from "@/helper/response-message";
import { Task } from "@/modles/task";
import User from "@/modles/user";
import { JWTVerifyResponse, TaskDetails } from "@/shared/common-interfaces";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

// get all task
export async function GET(_: NextRequest) {
  await connectDb()
   
  let response = (await Task.find()) as TaskDetails[];
  try {
    return NextResponse.json(
      {
        tasks: response,
        success: true,
        length: response.length,
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
  const { title, content, status } = await request.json();

  // fetching loggedIn user id
  const authToken = request.cookies.get("authToken")?.value;
  const data = jwt.verify(
    `${authToken}`,
    `${process.env.JWT_KEY}`
  ) as JWTVerifyResponse;

  await connectDb()

  try {
    const task = new Task({
      title,
      content,
      status,
      userId: data._id,
    });

    await task.save();
    return getResponseMessage(`'${title}' created successfully`, 200, true);
  } catch (error) {
    console.log("failed to create task");
    return getResponseMessage(`failed to create task: ${error}}`, 402, false);
  }
}
