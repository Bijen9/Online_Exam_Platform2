import { SignIn } from "@clerk/nextjs";
import React from "react";

const signIn = () => {
  return <SignIn afterSignInUrl="/user" />;
};

export default signIn;
