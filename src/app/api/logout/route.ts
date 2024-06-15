import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    message: "Logged Out Successfully!!",
    success: true,
  });

  response.cookies.set("authToken", "", {
    expires: new Date(0),
  });

  return response
}
