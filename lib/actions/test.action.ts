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

    testData.CreatedBy = userId._id;
    const test = await Test.create(testData);

    return test;
  } catch (error) {
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
    throw error;
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
    throw error;
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
      result: false,
    });
    return issuedTest;
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
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
      return editableTest1;
    }
    return [];
  } catch (error) {
    throw error;
  }
}

// get tests which results are published and the user must have been issued to the test
export async function getResultPublishedTest(params: any) {
  try {
    connectTodatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (user) {
      const publishedTest = await Test.find({
        _id: { $in: user.TestIssued },
        result: true,
      });
      return publishedTest;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function getMarkTest(params: any) {
  try {
    connectTodatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (user) {
      let markableTest = await Test.find({
        CreatedBy: userId,
        published: false,
        status: false,
        result: false,
      });
      const markableTest1: any = [];
      // see if the tests have any written type test.
      // if they have then check if the written test has any answers
      // if they have then the test is markable
      await Promise.all(
        markableTest.map(async (test, index) => {
          const written = await Written.find({
            testId: test._id,
          });
          if (written.length > 0) {
            const wanswer = await Wanswer.find({
              writtenId: written[0]._id,
            });
            if (wanswer.length > 0) {
              markableTest1.push(test);
            }
          }
          return null;
        })
      );

      return markableTest1;
    }
    return [];
  } catch (error) {
    throw error;
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
    const count = {
      MCQs,
      TFs,
      Writtens,
      total,
    };

    return count;
  } catch (error) {
    throw error;
  }
}

export async function updateTest(params: any) {
  try {
    connectTodatabase();
    const { testData, test } = params;
    const parsedTest = JSON.parse(test);
    const testnew = await Test.findByIdAndUpdate(
      parsedTest._id,

      testData,

      { new: true }
    );
    return testnew;
  } catch (error) {
    throw error;
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
    throw error;
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
        test.CompletedBy.push(userId);
        await test.save();
        user.TestAttempted.push(testId);
        await User.updateOne(
          { _id: userId },
          { $push: { TestIssued: testId } }
        );
        user.TestIssued.pull(testId);
        await User.updateOne(
          { _id: userId },
          { $push: { TestAttempted: testId } }
        );
        return test;
      }
      return null;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function getUserAttemptCheck(params: any) {
  try {
    connectTodatabase();
    const { userId, testId } = params;
    const user = await User.findById(userId);
    if (user) {
      const test = await Test.findById(testId);
      if (test) {
        const check = test.CompletedBy.find((id: any) => {
          return JSON.stringify(id) === JSON.stringify(userId);
        });
        if (check) {
          return true;
        }
        return false;
      }
      return null;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
