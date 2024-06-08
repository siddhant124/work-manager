import { getResponseMessage } from "@/helper/response-message";
import User from "@/modles/user";
import { ErrorType, UserParamsType } from "@/shared/common-interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: UserParamsType }
) {
  try {
    const userDetails = await User.findOne({ email: params.userId }).select(
      "-password"
    );
    if (userDetails !== null)
      return getResponseMessage(`${userDetails}`, 200, true);

    return getResponseMessage(
      `No user found with '${params.userId}'`,
      404,
      true
    );
  } catch (error) {
    console.log("Failed to get user Details: ", error);

    return getResponseMessage(
      `Failed to get users ${(error as ErrorType).errorResponse.errmsg}`,
      500,
      false
    );
  }
}

// Delete specific user
export async function DELETE(
  request: NextRequest,
  { params }: { params: UserParamsType }
) {
  try {
    await User.deleteOne({ email: params.userId });
    return getResponseMessage(
      `'${params.userId}' deleted successfully!`,
      200,
      true
    );
  } catch (error) {
    console.log(error);

    return getResponseMessage(
      `Failed to Delete '${params.userId}':  ${
        (error as ErrorType).errorResponse.errmsg
      }`,
      500,
      false
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: UserParamsType }
) {
  const { name, password, about, profileUrl } = await request.json();
  try {
    const user = await User.findOne({ email: params.userId });
    user.name = name;
    user.password = password;
    user.about = about;
    user.profileUrl = profileUrl;

    await user.save();
    return getResponseMessage(
      `'${params.userId}' updated successfully`,
      200,
      true
    );
  } catch (error) {
    console.log(error);

    return getResponseMessage(
      `Failed to Update '${params.userId}':  ${
        (error as ErrorType).errorResponse.errmsg
      }`,
      500,
      false
    );
  }
}
