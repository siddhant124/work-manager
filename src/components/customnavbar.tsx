"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import UserContext from "@/helper/context/user-context";
import { LogOutUser } from "@/services/userService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserContextData } from "@/shared/common-interfaces";

export const CustomNavbar = () => {
  const pathname = usePathname();
  const context = useContext(UserContext) as UserContextData;
  const router = useRouter();

  async function doLogOut() {
    try {
      const _ = await LogOutUser();
      context.setUser(undefined);
      toast.success("Logged Out Successfully!!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("failed to logout", {
        position: "top-right",
      });
    }
  }

  return (
    <nav className="bg-red-300 dark:bg-black dark:text-white h-16 py-2 px-3 flex justify-between items-center fixed w-full">
      <div className="brand">
        <h1 className="text-2xl font-mono font-semibold">Work Manager</h1>
      </div>
      {context.user?.currentUser && (
        <div>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className={`hover:text-red-50 ${
                  pathname === "/" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/add-task"
                className={`hover:text-red-50 ${
                  pathname === "/add-task" ? "font-bold" : ""
                }`}
              >
                Add task
              </Link>
            </li>
            <li>
              <Link
                href="/show-task"
                className={`hover:text-red-50 ${
                  pathname === "/show-task" ? "font-bold" : ""
                }`}
              >
                Show Task
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div>
        {context.user?.currentUser ? (
          <>
            <ul className="flex space-x-4">
              <li>{context.user.currentUser.name}</li>
              <li>
                <button onClick={doLogOut}>Log Out</button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/login"
                  className={`hover:font-semibold ${
                    pathname === "/login" ? "font-bold" : ""
                  }`}
                >
                  LogIn
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className={`hover:font-semibold ${
                    pathname === "/signup" ? "font-bold" : ""
                  }`}
                >
                  SignUp
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};
