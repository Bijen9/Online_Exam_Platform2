import AddQuestion from "@/components/test/TrueFalse";
import { ITest } from "@/database/test.model";
import { getTestById } from "@/lib/actions/test.action";
import { getUserId } from "@/lib/actions/user.action";
import React from "react";
import { auth } from "@clerk/nextjs";

const AddTrueFalse = async ({ params, searchParams }) => {
  const testId = params.id;
  const clerkId: string = auth().userId!;
  const userId = await getUserId({ clerkId });
  const test: ITest = await getTestById({ userId, testId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Adding True False</h1>
      <h2 className="h2 text-dark100_light900">for test {test.name}</h2>
      <AddQuestion testId={JSON.stringify(testId)} />
    </>
  );
};

export default AddTrueFalse;
