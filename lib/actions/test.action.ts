"use server";

import Test from "@/database/test.model";
import { connectTodatabase } from "../mongoose";

export default async function createTest(params: any) {
  try {
    connectTodatabase();
    const { name, description, createdBy } = params;

    const test = await Test.create({
      name,
      description,
      createdBy,
    });
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}
