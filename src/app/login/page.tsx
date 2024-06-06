import { Metadata } from "next";
import React from "react";
import LoginScreen from "./login-screen";

export const metadata: Metadata = {
  title: "Login: Work Manager",
};

const LoginPage = () => {
  return <LoginScreen/>
};

export default LoginPage;
