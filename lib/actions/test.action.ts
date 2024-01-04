"use server";

import Test from "@/database/test.model";
import { connectTodatabase } from "../mongoose";
import MCQ from "@/database/mcq.model";
import True_False from "@/database/true_false.model";
import Written from "@/database/written.model";
import Wanswer from "@/database/wanswer.model";
import User from "@/database/user.model";

export async function createTest(params: any) {
  try {
    connectTodatabase();
    const { testData, clerkId } = params;

    // find the user who is creating the test
    const userId = await User.findOne({ clerkId: JSON.parse(clerkId) }).select(
      "_id"
    );
    if (!userId) {
      return null;
    }
    console.log(userId, testData);
    testData.CreatedBy = userId._id;
    const test = await Test.create(testData);
    console.log(test);
    return test;
  } catch (error) {
    console.log("error occured , error");
    throw error;
  }
}

// search test by name but only return test issued by the user or to the user
export async function searchTest(params: any) {
  try {
    connectTodatabase();
    const { testName, userId } = params;
    const user = await User.findById(userId);
    if (user) {
      const test = await Test.find({
        testName: { $regex: testName, $options: "i" },
        $or: [
          { _id: { $in: user.TestIssued } },
          { _id: { $in: user.TestCreated } },
        ],
      });
      return test;
    }
    return null;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// return tests of user whose time is not over
export async function getActiveTest(params: any) {
  try {
    connectTodatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (user) {
      const test = await Test.find({
        _id: { $in: user.TestIssued },
        endTime: { $gt: Date.now() },
      });
      return test;
    }
    return null;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function getIssuedTest(params: any) {
  try {
    connectTodatabase();
    // const { userId } = params;
    // const user = await User.findById(userId);
    // if (user) {
    //   const issuedTest = await Test.find({
    //     _id: { $in: user.TestIssued },
    //   });
    //   return issuedTest;
    // }
    // return null;

    const issuedTest = await Test.find({
      status: false,
      published: false,
    });
    return issuedTest;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function getTestById(params: any) {
  try {
    connectTodatabase();
    const { userId, testId } = params;
    const test = await Test.findById(testId);

    // if (JSON.stringify(test.CreatedBy) === JSON.stringify(userId)) {
    return test;
    // }
    // return "not your test to edit";
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function getCreatedTest(params: any) {
  try {
    connectTodatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (user) {
      const createdTest = await Test.find({
        _id: { $in: user.TestCreated },
      });
      return createdTest;
    }
    return null;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function getEditTest(params: any) {
  try {
    connectTodatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (user) {
      let editableTest = await Test.find({
        CreatedBy: userId,
        published: false,
        status: true,
      });

      const editableTest1 = await Promise.all(
        editableTest.map(async (test, index) => {
          const totalMCQsCount = await MCQ.find({
            testId: test._id,
          }).countDocuments();

          const totalTFsCount = await True_False.find({
            testId: test._id,
          }).countDocuments();

          const totalWrittenCount = await Written.find({
            testId: test._id,
          }).countDocuments();

          test.totalQuestions =
            totalMCQsCount + totalTFsCount + totalWrittenCount;
          return test;
        })
      );

      console.log("logged from here", editableTest1[0]);
      return editableTest1;
    }
    return [];
  } catch (error) {
    console.log("error occurred");
    console.log(error);
  }
}

export async function getQuestionCountInTest(params: any) {
  try {
    connectTodatabase();
    const { testId } = params;

    const MCQs = await MCQ.find({
      testId,
    }).countDocuments();
    const TFs = await True_False.find({
      testId,
    }).countDocuments();
    const Writtens = await Written.find({
      testId,
    }).countDocuments();
    const total = MCQs + TFs + Writtens;
    console.log();
    const count = {
      MCQs,
      TFs,
      Writtens,
      total,
    };

    return count;
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
    mcq!.forEach(async (element) => {
      await MCQ.findByIdAndDelete(element._id);
    });

    // find all the true false questions with this testId and delete them
    const trueFalse = await True_False.find({ testId });
    trueFalse!.forEach(async (element) => {
      await True_False.findByIdAndDelete(element._id);
    });

    // delete all written answers with this testId
    const writtenAnswer = await Written.find({ testId });
    writtenAnswer!.forEach(async (element) => {
      await Wanswer!.findOneAndDelete({
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

// add userId to completedBy array in test also add testId to TestIssued and TestAttempted array in user
export async function submitTest(params: any) {
  try {
    connectTodatabase();
    const { testId, userId } = params;
    const user = await User.findById(userId);
    if (user) {
      const test = await Test.findById(testId);
      if (test) {
        test.completedBy.push(userId);
        await test.save();
        user.TestAttempted.push(testId);
        await user.save();
        user.TestIssued.pull(testId);
        await user.save();
        return test;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}
