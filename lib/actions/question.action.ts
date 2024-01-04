"use server";

import Test, { ITest } from "@/database/test.model";
import { connectTodatabase } from "../mongoose";
import MCQ from "@/database/mcq.model";
import True_False from "@/database/true_false.model";
import Written from "@/database/written.model";
import Wanswer from "@/database/wanswer.model";
import User from "@/database/user.model";

// add an mcq to a test
export async function addMcq(params: any) {
  try {
    connectTodatabase();
    const { mcqData } = params;
    const mcq = await MCQ.create(mcqData);
    return mcq;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// delete an mcq from a test
export async function deleteMcq(params: any) {
  try {
    connectTodatabase();
    const { mcqId } = params;
    console.log(mcqId);
    const mcq = await MCQ.findByIdAndDelete(mcqId);
    return mcq;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// attend MCQ test
export async function attendMcq(params: any) {
  try {
    connectTodatabase();
    const { mcqId, userId, answer } = params;
    const mcq = await MCQ.findById(mcqId);
    // if if the answer is correct
    if (mcq.answer === answer) {
      // add the user to the correct students
      mcq.CorrectStudents.push(userId);
      mcq.save();
    }
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// add a true_false to a test
export async function addTrueFalse(params: any) {
  try {
    connectTodatabase();
    const { trueFalseData } = params; //add mechanism to check if user can add mcq to the test later
    console.log("true here", trueFalseData);
    const trueFalse = await True_False.create(trueFalseData);
    return trueFalse;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// delete a true_false from a test
export async function deleteTrueFalse(params: any) {
  try {
    connectTodatabase();
    const { trueFalseId } = params;
    const trueFalse = await True_False.findByIdAndDelete(trueFalseId);
    return trueFalse;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// attend true_false test
export async function attendTrueFalse(params: any) {
  try {
    connectTodatabase();
    const { trueFalseId, userId, answer } = params;
    const trueFalse = await True_False.findById(trueFalseId);
    // if if the answer is correct
    console.log(trueFalse.answer, answer, userId);
    if (trueFalse.answer === answer) {
      // add the user to the correct students
      trueFalse.CorrectStudents.push(userId);
      trueFalse.save();
      console.log("trueFalse Saved");
    }
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// add a written to a test
export async function addWritten(params: any) {
  try {
    connectTodatabase();
    const { writtenData } = params;

    const written = await Written.create(writtenData);

    return written;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// delete a written from a test
export async function deleteWritten(params: any) {
  try {
    connectTodatabase();
    const { writtenId } = params;
    const written = await Written.findByIdAndDelete(writtenId);
    return written;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// attend written test
export async function attendWritten(params: any) {
  try {
    connectTodatabase();
    const { writtenId, userId, answer } = params;

    const wAnswer = await Wanswer.create({
      StudentId: userId,
      QuestionId: writtenId,
      answer,
    });
    return wAnswer;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// mark written test
export async function markWritten(params: any) {
  try {
    connectTodatabase();
    const { writtenId, userId, studentId, decision } = params;

    const written = await Written.findById(writtenId);
    const testId = written.testId;
    const requestedBy = await User.findById(userId);
    const authorised = requestedBy.TestIssued.find((test: ITest) => {
      return test.toString() === testId;
    });
    if (!authorised) {
      return { status: "not authorized" };
    }
    // if if the answer is correct
    if (decision === true) {
      // add the user to the correct students
      written.CorrectStudents.push(studentId);
      written.save();
    }
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// give comment in written test
export async function commentWritten(params: any) {
  try {
    connectTodatabase();
    const { writtenId, userId, comment, studentId } = params;
    const written = await Written.findById(writtenId);
    const testId = written.testId;
    const requestedBy = await User.findById(userId);
    const authorised = requestedBy.TestIssued.find((test: ITest) => {
      return test.toString() === testId;
    });
    if (!authorised) {
      return { status: "not authorized" };
    }
    const wanswer = await Wanswer.findOneAndUpdate(
      { StudentId: studentId, QuestionId: writtenId },
      { comment }
    );
    return wanswer;
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

// get all questions of the test.
export async function getQuestions(params: any) {
  try {
    connectTodatabase();
    const { testId, userId } = params;
    // filter results based on the user
    const test = await Test.findById(testId);
    const mcq = await MCQ.find({ testId });
    const trueFalse = await True_False.find({ testId });
    const written = await Written.find({ testId });
    if (test.CreatedBy === userId) {
      return { mcq, trueFalse, written };
    }
    // if not return filtered data
    mcq.forEach((element) => {
      element.answer = null;
      element.CorrectStudents = null;
    });
    trueFalse.forEach((element) => {
      element.answer = null;
      element.CorrectStudents = null;
    });
    written.forEach((element) => {
      element.answer = null;
      element.CorrectStudents = null;
    });
    return { mcq, trueFalse, written };
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}

export async function publishResult(params: any) {
  try {
    connectTodatabase();
    const { testId, userId } = params;
    const test = await Test.findById(testId);
    if (test.CreatedBy === userId) {
      test.published = true;
      test.save();
      return { status: "success" };
    }
    return { status: "not authorized" };
  } catch (error) {
    console.log("error occured");
    console.log(error);
  }
}
