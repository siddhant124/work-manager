import { getResponseMessage } from "@/helper/response-message";
import User from "@/modles/user";
import { ErrorType, UserDetailsProps } from "@/shared/common-interfaces";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { connectDb } from "@/helper/db";

export async function GET() {
  await connectDb()

  try {
    let users = await User.find().select("-password");
    return getResponseMessage(users, 200, true);
  } catch (error) {
    console.log("Failed to get user:", error);

    return getResponseMessage(
      `Failed to get users ${(error as ErrorType).errorResponse.errmsg}`,
      500,
      false
    );
  }
}

// Create User
export async function POST(request: NextRequest) {
  await connectDb()

  // fetch user details from request
  const { name, email, password, about, profileUrl }: UserDetailsProps =
    await request.json();

  // Create user object woth user model
  const user = new User({
    name,
    email,
    password,
    about,
    profileUrl,
  });

  try {
    // save the object to database
    user.password = await bcrypt.hash(user.password, 10);
     await user.save();
    return getResponseMessage(`'${name}' created successfully!`, 200, true);
  } catch (error) {
    console.log("Failed to create user:", error);
    // Check if the error is a duplicate key error
    if ((error as ErrorType).errorResponse.code === 11000) {
      console.log("Duplicate email error:", error);
      return getResponseMessage(
        "Email already exists. Please use a different email.",
        409,
        false
      );
    }

    return getResponseMessage(
      `Failed to create user: ${(error as ErrorType).errorResponse.errmsg}`,
      500,
      false
    );
  }
}
