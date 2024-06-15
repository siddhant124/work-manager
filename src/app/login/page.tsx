import { Metadata } from "next";
import React from "react";
import LoginScreen from "./login-screen";
import { connectDb } from "@/helper/db";

export const metadata: Metadata = {
  title: "Login: Work Manager",
};

const LoginPage = () => {
  connectDb();

  return <LoginScreen/>
};

export default LoginPage;
