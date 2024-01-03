import { ITest } from "@/database/test.model";
import { getTestById } from "@/lib/actions/test.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const AddTrueFalse = async ({ params, searchParams }) => {
  const testId = params.id;
  const clerkId: string = auth().userId!;

  const userId = await getUserById({ clerkId });
  const test: ITest = await getTestById({ userId, testId });
  return <div>{testId}</div>;
};

export default AddTrueFalse;
