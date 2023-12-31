"use server";

import User from "@/database/user.model";
import { connectTodatabase } from "../mongoose";

export default async function getUserById(params: any) {
  try {
    connectTodatabase();
    const { userId, email } = params;
    console.log("THis is from backend", userId);
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      console.log("user found");
      return user;
    }
    console.log("user not found");

    const newUser = await User.create({
      clerkId: userId,
      email: "notset@host.com",
      fullName: "notset",
    });
    console.log("new user created");
    return newUser;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}
