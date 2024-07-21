"use client";

import React, { useContext, useState } from "react";
import loginImage from "@/app/assets/login_image.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  UserContextData,
  UserLoginProps,
  UserResponse,
} from "@/shared/common-interfaces";
import { CurrentUser, UserLogIn } from "@/services/userService";
import { useRouter } from "next/navigation";
import UserContext from "@/helper/context/user-context";

const LoginScreen = () => {
  const [loginData, setLoginData] = useState<UserLoginProps>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const context = useContext(UserContext) as UserContextData;
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = async () => {
    setIsLoading(true);
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Email or password is empty!!", {
        position: "top-right",
      });
      setIsLoading(false);
      return;
    }
    try {
      const _ = await UserLogIn(loginData);
      toast.success("LoggedIn Successfully!");
      try {
        const loggedInUser = (await CurrentUser()) as UserResponse;
        context.setUser({ ...loggedInUser });
      } catch (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
        context.setUser(undefined);
      }
      //redirect to homepage
      router.push("/profile");
    } catch (error) {
      console.log("error", error);
      //@ts-ignore
      toast.error(error.response.data.result, {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-2/4">
        <div className="flex mt-10 justify-center">
          <Image
            src={loginImage}
            alt={"add task image"}
            style={{
              width: "40%",
            }}
          />
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
              className="p-2.5 flex rounded-xl border border-blue-400 dark:bg-black"
              id="userEmail"
              placeholder="Enter email"
              name="userEmail"
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                })
              }
              value={loginData.email}
            />
            {/* {errors?.userEmail && (
                  <p className="text-red-500 text-sm">{errors.userEmail}</p>
                )} */}
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
              className="p-2.5 flex rounded-xl border border-blue-400 dark:bg-black"
              id="userPassword"
              placeholder="Enter password"
              name="userPassword"
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                })
              }
              value={loginData.password}
            />
            {/* {errors?.userPassword && (
                  <p className="text-red-500 text-sm">{errors.userPassword}</p> */}
            {/* )} */}
          </div>
        </div>

        {/* add and clear button */}
        <div className="mt-6 w-full flex flex-row justify-center space-x-5">
          <button
            type="button"
            className="bg-red-300 hover:bg-red-500 p-4 rounded-2xl dark:bg-red-700 dark:hover:bg-red-800 dark:text-gray-200"
            onClick={() => {
              setLoginData({
                email: "",
                password: "",
              });
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-green-300 hover:bg-green-500 p-4 rounded-2xl dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-gray-200"
            onClick={() => void handleUserLogin()}
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
