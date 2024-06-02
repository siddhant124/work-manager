"use client";

import React, { useState } from "react";
import addTaskSgv from "@/app/assets/sign_up_image.svg";
import Image from "next/image";
import { UserDetailsProps } from "@/shared/common-interfaces";
import { toast } from "react-toastify";
import { CreateUserAPI } from "@/services/userService";
import axios from "axios";

interface Errors {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userPasswordConfirm?: string;
}

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [userDetailsData, setUserDetailsData] = useState<UserDetailsProps>({
    name: "",
    email: "",
    password: "",
    userPasswordConfirm: "",
    about: "",
    profileUrl: "https://i.sstatic.net/l60Hf.png",
  });

  const [errors, setErrors] = useState<Errors>();

  const validateForm = () => {
    const newErrors: Errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[!@#%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!userDetailsData.name.trim()) {
      newErrors.userName = "Name is required";
      toast.warning("Name is required");
    }
    if (!emailPattern.test(userDetailsData.email.trim())) {
      newErrors.userName = "Invalid email address";
      toast.warning("Invalid email address");
    }
    if (!passwordPattern.test(userDetailsData.password.trim())) {
      newErrors.userPassword =
        "Password must be at least 8 characters long and include one uppercase letter and one special character (excluding '-' and '$')";
    }
    if (userDetailsData.password !== userDetailsData.userPasswordConfirm) {
      newErrors.userPasswordConfirm = "Passwords do not match";
      toast.error("Passwords do not match", {
        position: "top-right",
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async () => {
    setIsLoading(true);
    try {
      if (validateForm()) {
        await CreateUserAPI(userDetailsData);
        toast.success("User created successfully!", {
          position: "top-right",
        });
        void handleReset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.result || "Failed to create user";
        toast.error(errorMessage, {
          position: "top-right",
        });
      } else {
        toast.error("An unexpected error occurred", {
          position: "top-right",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserDetailsData({
      name: "",
      email: "",
      password: "",
      userPasswordConfirm: "",
      about: "",
      profileUrl: "https://i.sstatic.net/l60Hf.png",
    });
    setErrors({});
  };

  return (
    <div className="flex w-full justify-center ">
      <div className="w-2/4">
        <div className="flex mt-10 justify-center">
          <Image
            src={addTaskSgv}
            alt={"add task image"}
            style={{
              width: "40%",
            }}
          />
        </div>

        {/* Name */}
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-3/5 self-center flex-col mt-5">
            <label
              htmlFor="userName"
              className="block text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              className="p-2.5 flex rounded-xl border border-orange-400"
              id="userName"
              placeholder="Enter name"
              name="userName"
              value={userDetailsData.name}
              onChange={(event) => {
                setUserDetailsData({
                  ...userDetailsData,
                  name: event.target.value,
                });
              }}
            />
            {errors?.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-3/5 self-center flex-col mt-5">
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="p-2.5 flex rounded-xl border border-orange-400"
              id="userEmail"
              placeholder="Enter email"
              name="userEmail"
              value={userDetailsData.email}
              onChange={(event) => {
                setUserDetailsData({
                  ...userDetailsData,
                  email: event.target.value,
                });
              }}
            />
            {errors?.userEmail && (
              <p className="text-red-500 text-sm">{errors.userEmail}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-3/5 self-center flex-col mt-5">
            <label
              htmlFor="userPassword"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="p-2.5 flex rounded-xl border border-orange-400"
              id="userPassword"
              placeholder="Enter password"
              name="userPassword"
              value={userDetailsData.password}
              onChange={(event) => {
                setUserDetailsData({
                  ...userDetailsData,
                  password: event.target.value,
                });
              }}
            />
            {errors?.userPassword && (
              <p className="text-red-500 text-sm">{errors.userPassword}</p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-3/5 self-center flex-col mt-5">
            <label
              htmlFor="userPasswordConfirm"
              className="block text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="p-2.5 flex rounded-xl border border-orange-400"
              id="userPasswordConfirm"
              placeholder="Re-enter password"
              name="userPasswordConfirm"
              value={userDetailsData.userPasswordConfirm}
              onChange={(event) => {
                setUserDetailsData({
                  ...userDetailsData,
                  userPasswordConfirm: event.target.value,
                });
              }}
            />
            {errors?.userPasswordConfirm && (
              <p className="text-red-500 text-sm">
                {errors.userPasswordConfirm}
              </p>
            )}
          </div>
        </div>

        {/* About */}
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-3/5 self-center flex-col mt-5">
            <label
              htmlFor="userAbout"
              className="block text-sm font-medium mb-2"
            >
              About
            </label>
            <textarea
              className="w-full p-2.5 rounded-xl border border-orange-400"
              id="userAbout"
              placeholder="Enter about"
              rows={5}
              name="userAbout"
              value={userDetailsData.about}
              onChange={(event) => {
                setUserDetailsData({
                  ...userDetailsData,
                  about: event.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* add and clear button */}
        <div className="mt-6 w-full flex flex-row justify-center space-x-5">
          <button
            type="submit"
            className="bg-green-300 hover:bg-green-500 p-4 rounded-2xl"
            onClick={handleCreateUser}
          >
            {isLoading ? "SigningIn..." : "Sign Up"}
          </button>
          <button
            type="button"
            className="bg-red-300 hover:bg-red-500 p-4 rounded-2xl"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
