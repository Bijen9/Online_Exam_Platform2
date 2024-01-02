"use server";

import User from "@/database/user.model";
import { connectTodatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { connect } from "http2";

export async function getUserById(params: any) {
  try {
    connectTodatabase();
    const { userId } = params;
    console.log("THis is from backend", userId);
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      // console.log("user found");
      return user;
    }
    console.log("user not found");
    return null;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// live search user by name
export async function searchUser(params: any) {
  try {
    connectTodatabase();
    const { userName } = params;
    const user = await User.find({
      name: { $regex: userName, $options: "i" },
    });
    return user;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function getUserByEmail(params: any) {
  try {
    connectTodatabase();
    const { email } = params;
    const user = await User.find({ email: email });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function getUsersByOrganization(params: any) {
  try {
    connectTodatabase();
    const { organizationId, roleId } = params;
    const users = await User.find({
      Role: roleId,
      Organization: organizationId,
    });
    if (users) {
      return users;
    }
    return null;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function creteUser(userData: any) {
  try {
    connectTodatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function updateUser(userData: any) {
  try {
    connectTodatabase();
    const { clerkId, updateData, path } = userData;
    const updatedUser = await User.findOneAndUpdate(
      {
        clerkId: clerkId,
      },
      updateData,
      { new: true }
    );
    revalidatePath(path);
    return updatedUser;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function deleteUser(userData: any) {
  try {
    connectTodatabase();
    const { clerkId } = userData;

    const user = await User.findOne({
      clerkId: clerkId,
    });

    if (!user) {
      throw new Error("User not found");
    }

    // delete everything related to user

    /*{
    const userTests = await Test.find ({
      userId: user._id
    })
    for (const test of userTests) {
      await Test.deleteOne({
        _id: test._id
      })
    }

  }*/

    // for now we are just deleting user.
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}
