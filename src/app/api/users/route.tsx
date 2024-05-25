import { User } from "@/modles/user";
import { ErrorType, UserDetailsProps } from "@/shared/common-interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let users = [];

  try {
    users = await User.find().select("-password");
    return NextResponse.json(
      {
        users: users,
        success: true,
      },
      {
        status: 200,
        statusText: "success",
      }
    );
  } catch (error) {
    console.log("Failed to get user:", error);
    return NextResponse.json(
      {
        message: `Failed to get users ${
          (error as ErrorType).errorResponse.errmsg
        }`,
        success: false,
        status: 500,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}

// Create User
export async function POST(request: NextRequest) {
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
    const createdUser = await user.save();
    const response = NextResponse.json(user, {
      status: 201,
    });

    return response;
  } catch (error: unknown) {
    console.log("Failed to create user:", error);
    // Check if the error is a duplicate key error
    if ((error as ErrorType).errorResponse.code === 11000) {
      console.log("Duplicate email error:", error);
      return NextResponse.json(
        {
          message: "Email already exists. Please use a different email.",
          success: false,
          status: 409, // 409 Conflict
        },
        {
          status: 409,
          statusText: "Duplicate Email",
        }
      );
    }
    return NextResponse.json(
      {
        message: `Failed to create user: ${
          (error as ErrorType).errorResponse.errmsg
        }`,
        success: false,
        status: 500,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}

export function DELETE() {}

export function PUT() {}
