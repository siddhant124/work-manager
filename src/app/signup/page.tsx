import React from "react";
import { Metadata } from "next";
import SignUpPage from "./sign-up";

export const metadata: Metadata = {
  title: "SignUp: Work Manager",
};

const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;
