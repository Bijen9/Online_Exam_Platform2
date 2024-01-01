"use server";

import Test from "@/database/test.model";
import { connectTodatabase } from "../mongoose";
import MCQ from "@/database/mcq.model";
import True_False from "@/database/true_false.model";
import Written from "@/database/written.model";
import Wanswer from "@/database/wanswer.model";

export default async function createTest(params: any) {
  try {
    connectTodatabase();
    const { testData } = params;

    const test = await Test.create({
      testData,
    });
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function getTest(params: any) {
  try {
    connectTodatabase();
    const { testData } = params;

    const test = await Test.find({
      testData,
    });
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function updateTest(params: any) {
  try {
    connectTodatabase();
    const { testData, testId } = params;

    const test = await Test.findByIdAndUpdate(testId, {
      testData,
    });
    return test;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function deleteTest(params: any) {
  try {
    connectTodatabase();
    const { testId } = params;

    // find all the questions with this testId and delete them
    const mcq = await MCQ.find({ testId });
    mcq.forEach(async (element) => {
      await MCQ.findByIdAndDelete(element._id);
    });

    // find all the true false questions with this testId and delete them
    const trueFalse = await True_False.find({ testId });
    trueFalse.forEach(async (element) => {
      await True_False.findByIdAndDelete(element._id);
    });

    // delete all written answers with this testId
    const writtenAnswer = await Written.find({ testId });
    writtenAnswer.forEach(async (element) => {
      await Wanswer.findOneAndDelete({
        writtenId: element._id,
      });
      await Written.findByIdAndDelete(element._id);
    });

    const test = await Test.findByIdAndDelete(testId);
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}
