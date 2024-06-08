"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export const CustomNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-red-300 h-16 py-2 px-3 flex justify-between items-center fixed w-full">
      <div className="brand">
        <h1 className="text-2xl font-mono font-semibold">Work Manager</h1>
      </div>
      <div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className={`hover:text-red-50 ${pathname === "/" ? "font-bold" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/add-task" className={`hover:text-red-50 ${pathname === "/add-task" ? "font-bold" : ""}`}>
              Add task
            </Link>
          </li>
          <li>
            <Link href="/show-task" className={`hover:text-red-50 ${pathname === "/show-task" ? "font-bold" : ""}`}>
              Show Task
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/login" className={`hover:font-semibold ${pathname === "/login" ? "font-bold" : ""}`}>
              LogIn
            </Link>
          </li>
          <li>
            <Link href="/signup" className={`hover:font-semibold ${pathname === "/signup" ? "font-bold" : ""}`}>
              SignUp
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
