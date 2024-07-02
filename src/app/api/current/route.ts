import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/modles/user";
import { getResponseMessage } from "@/helper/response-message";
import { ContextProps, JWTVerifyResponse } from "@/shared/common-interfaces";
import { connectDb } from "@/helper/db";

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  try {

    if(!authToken){
      return NextResponse.json({
        message: "User is not logged In"
      })
    }

    const data = jwt.verify(
      `${authToken}`,
      `${process.env.JWT_KEY}`
    ) as JWTVerifyResponse;

    await connectDb();

    const currentUser = (await User.findById(data._id).select(
      "-password"
    )) as ContextProps;

    const response = NextResponse.json({
      currentUser: currentUser,
      successs: true,
    });

    currentUser === null &&
      response.cookies.set("authToken", "", {
        expires: new Date(0),
      });

    return response;
  } catch (error) {
    console.log(error);
    return getResponseMessage(`${error}`, 400, false);
  }
}
