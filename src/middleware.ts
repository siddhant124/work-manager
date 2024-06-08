import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware executed");
  const authToken = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/api/login" || pathname === "/api/users") {
    return;
  }

  const isLoginsignUpPageOpen = pathname === "/login" || pathname === "/signup";

  if (isLoginsignUpPageOpen) {
    // When user tries to access login, signup routes when already logged in, we will redirect the user to profile
    if (authToken !== undefined) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  } else {
    // When user tries to access secured routes when not logged in, we will redirect the user to login page
    if (authToken == undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/add-task",
    "/show-task",
    "/login",
    "/signup",
    "/api/:path*",
    "/profile/:path*",
  ],
};
