import { getResponseMessage } from "@/helper/response-message";
import User from "@/modles/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

//  Steps:
// 1. Get user from database with help of email and password
// 2. check if user is present or not
// 3. Check if password matches or not
// 4. If everything works fine then generste token
// 5. create response
// 6. set token into cookie (send direct token)

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    //1. Create user
    const user = await User.findOne({
      email: email,
    });

    // 2. Check if user exists
    if (user === null) throw new Error("User not Found");

    // 3. Check if password matches
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) throw new Error("Password does not match!!");

    // 4. Create JWT token
    const token = Jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      `${process.env.JWT_KEY}`
    );

    // 5. add token to nextResponse cookie
    const response = NextResponse.json({
      token: token,
      message: "LoggedIn Successfully",
      success: true,
    });

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + oneDayInMilliseconds);

    response.cookies.set("authToken", token, {
      expires: expirationDate,
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return getResponseMessage(`${errorMessage}`, 500, false);
  }
}
