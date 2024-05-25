import { User } from "@/modles/user";
import { ErrorType } from "@/shared/common-interfaces";
import { NextRequest, NextResponse } from "next/server";

interface ParamsType {
  userId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: ParamsType }
) {
  try {
    const userDetails = await User.findOne({ email: params.userId }).select("-password");
    if (userDetails !== null)
      return NextResponse.json(
        {
          userDetails: userDetails,
          success: true,
        },
        {
          status: 200,
          statusText: "success",
        }
      );

    return NextResponse.json(
      {
        userDetails: `No user found with ${params.userId}`,
        success: true,
      },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  } catch (error) {
    console.log("Failed to get user Details: ", error);
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

// Delete specific user
export async function DELETE(
  request: NextRequest,
  { params }: { params: ParamsType }
) {
  try {
    await User.deleteOne({ email: params.userId });
    return NextResponse.json(
      {
        message: `${params.userId} deleted successfully!`,
        success: true,
        status: 200,
      },
      {
        status: 200,
        statusText: "Deleted",
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: `Failed to Delete ${params.userId}:  ${
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

export async function PUT(
  request: NextRequest,
  { params }: { params: ParamsType }
) {
  const { name, password, about, profileUrl } = await request.json();
  try {
    const user = await User.findOne({ email: params.userId });
    user.name = name;
    user.password = password;
    user.about = about;
    user.profileUrl = profileUrl;

    const updatedUser = await user.save();

    return NextResponse.json({
      user: updatedUser,
      message: `${params.userId} updated successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: `Failed to Update ${params.userId}:  ${
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
