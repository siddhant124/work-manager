"use client";

import Link from "next/link";
import React from "react";

export const CustomNavbar = () => {
  return (
    <nav className="bg-red-300 h-16 py-2 px-3 flex justify-between items-center fixed w-full">
      <div className="brand">
        <h1 className="text-2xl font-mono font-semibold">Work Manager</h1>
      </div>
      <div>
        <ul className="flex space-x-6">
          <li>
            <Link href={"/"} className="hover:text-red-50">
              Home
            </Link>
          </li>
          <li>
            <Link href="/add-task" className="hover:text-red-50">
              Add task
            </Link>
          </li>
          <li>
            <Link href="/show-task" className="hover:text-red-50">
              Show Task
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link href="#!" className="hover:font-semibold">
              LogIn
            </Link>
          </li>
          <li>
            <Link href="#!" className="hover:font-semibold">
              SignUp
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
