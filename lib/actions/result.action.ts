"use server";
import User from "@/database/user.model";
import { connectTodatabase } from "../mongoose";
import { ITest } from "@/database/test.model";
import MCQ, { IMCQ } from "@/database/mcq.model";
import True_False, { ITrue_False } from "@/database/true_false.model";
import Written, { IWritten } from "@/database/written.model";
import Wanswer from "@/database/wanswer.model";

export async function getFullResult(params: any) {
  try {
    connectTodatabase();
    const { userId, testId } = params;
    const user = await User.findById(userId);
    if (user) {
      //   check if the user has already taken the test
      const testAttempted = user.TestAttempted.find((test: ITest) => {
        return test.toString() === testId;
      });
      if (testAttempted) {
        //   user has already taken the test

        //
        //counting total number of test questions
        const totalMCQs = await MCQ.find({ testId });
        const totalTFs = await True_False.find({
          testId,
        });
        const totalWritten = await Written.find({
          testId,
        });

        const attemptedWritten = await Wanswer.find({
          StudentId: userId,
          QuestionId: totalWritten[0]._id,
        });

        //
        //

        // check all MCQ which has the following testId and userID inside correctAnswers
        const correctMCQAnswers: IMCQ[] = await MCQ.find({
          testId,
          correctAnswers: { $elemMatch: { userId } },
        });
        const MCQsMarks = correctMCQAnswers.length * correctMCQAnswers[0].marks;

        // check all the true false questions which has the following testId and userID inside correctAnswers
        const correctTFAnswers: ITrue_False[] = await True_False.find({
          testId,
          correctAnswers: { $elemMatch: { userId } },
        });
        const TFsMarks = correctTFAnswers.length * correctTFAnswers[0].marks;

        // check all the written questions which has the following testId and userID inside correctAnswers
        const correctWrittenAnswers: IWritten[] = await Written.find({
          testId,
          correctAnswers: { $elemMatch: { userId } },
        });
        const writtenMarks =
          correctWrittenAnswers.length * correctWrittenAnswers[0].marks;

        const totalMarks = MCQsMarks + TFsMarks + writtenMarks;

        return {
          status: "success",
          totalMCQs,
          totalTFs,
          totalWritten,
          attemptedWritten,
          correctMCQAnswers,
          correctTFAnswers,
          correctWrittenAnswers,
          totalMarks,
        };

        //
      } else {
        //
        //   user has not taken the test
        const testIssued = user.TestIssued.find((test: ITest) => {
          return test.toString() === testId;
        });
        //
        if (testIssued) {
          //   user has been issued the test
          return { status: "You didn't attempt the test" };
        } else {
          //   user has not been issued the test
          return { status: "not issued" };
        }
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function getResultMarks(params: any) {
  try {
    connectTodatabase();
    const { userId, testId } = params;
    const user = await User.findById(userId);
    if (user) {
      //   check if the user has already taken the test
      const testAttempted = user.TestAttempted.find((test: ITest) => {
        return test.toString() === testId;
      });
      if (testAttempted) {
        //   user has already taken the test
        const totalMarks = { total: 0 };

        const TFAnswers: ITrue_False[] = await True_False.find({
          testId,
        });

        TFAnswers.forEach((TF) => {
          const correctAnswer = TF.CorrectStudents.find((id) => {
            if (JSON.stringify(id) === JSON.stringify(userId)) {
              totalMarks.total += TF.marks;
            }
          });
        });

        const MCQAnswers: IMCQ[] = await MCQ.find({
          testId,
        });

        MCQAnswers.forEach((MCQ) => {
          const correctAnswer = MCQ.CorrectStudents.find((id) => {
            if (JSON.stringify(id) === JSON.stringify(userId)) {
              totalMarks.total += MCQ.marks;
            }
          });
        });

        const WrittenAnswers: IWritten[] = await Written.find({
          testId,
        });

        WrittenAnswers.forEach((Written) => {
          const correctAnswer = Written.CorrectStudents.find((id) => {
            if (JSON.stringify(id) === JSON.stringify(userId)) {
              totalMarks.total += Written.marks;
            }
          });
        });

        return {
          status: "success",
          MCQAnswers,
          TFAnswers,
          WrittenAnswers,
          totalMarks: totalMarks.total,
        };

        //
      } else {
        //
        //   user has not taken the test
        const testIssued = user.TestIssued.find((test: ITest) => {
          return test.toString() === testId;
        });
        //
        if (testIssued) {
          //   user has been issued the test
          return { status: "You didn't attempt the test" };
        } else {
          //   user has not been issued the test
          return { status: "not issued" };
        }
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function getUserAnswer(params: any) {
  try {
    connectTodatabase();
    const { StudentId, QuestionId } = params;
    const userAnswer = await Wanswer.findOne({
      StudentId,
      QuestionId,
    });
    return userAnswer?.answer ? userAnswer.answer : "no answer";
  } catch (error) {
    throw error;
  }
}

export async function getTotalPoints(params: any) {
  try {
    connectTodatabase();
    const { userId, testId } = params;
    const totalMarks = { total: 0 };

    const TFAnswers: ITrue_False[] = await True_False.find({
      testId,
    });

    TFAnswers.forEach((TF) => {
      totalMarks.total += TF.marks;
    });

    const MCQAnswers: IMCQ[] = await MCQ.find({
      testId,
    });

    MCQAnswers.forEach((MCQ) => {
      totalMarks.total += MCQ.marks;
    });

    const WrittenAnswers: IWritten[] = await Written.find({
      testId,
    });

    WrittenAnswers.forEach((Written) => {
      totalMarks.total += Written.marks;
    });

    return totalMarks.total;
  } catch (error) {
    throw error;
  }
}
