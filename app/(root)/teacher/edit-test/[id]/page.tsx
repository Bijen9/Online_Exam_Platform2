import React from "react";
import { getTestById } from "@/lib/actions/test.action";
import { getUserId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { ITest } from "@/database/test.model";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const TestEditpage = async ({ params, searchParams }) => {
  const testId = params.id;
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const test: ITest = await getTestById({ userId, testId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{test.name}</h1>
      <h2 className="h2 text-dark100_light900">Include Students for Test</h2>
      <>this part is to be done later</>
      <div
        className="card-wrapper p-9
    sm:px-11 rounded-[10px] "
      >
        <div
          className="flex flex-col-reverse items-start justify-between gap-5
        sm:flex-row"
        >
          <div>
            <h3
              className="sm:h3-semibold base-semibold 
                    text-dark200_light900 line-clamp-1 flex-1"
            >
              Add Question
            </h3>
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2">
          <Link
            href={`/teacher/edit-test/${testId}/addMCQ`}
            className="flex justify-between gap-2"
          >
            <Badge
              className="h4-bold  background-light800_dark300 
        text-dark400_light500 rounded-md border-none px-4 py-2 uppercase focus:bg-slate-100 dark:focus:bg-light-300"
            >
              MCQ
            </Badge>
          </Link>
          <Link
            href={`/teacher/edit-test/${testId}/addTrueFalse`}
            className="flex justify-between gap-2"
          >
            <Badge
             
              className="h4-bold  background-light800_dark300 
              text-dark400_light500 rounded-md border-none px-4 py-2 uppercase "
            >
              True False
            </Badge>
          </Link>
          <Link
            href={`/teacher/edit-test/${testId}/addWritten`}
            className="flex justify-between gap-2"
          >
            <Badge
              className="h4-bold background-light800_dark300 
              text-dark400_light500 rounded-md border-none px-4 py-2 uppercase"
            >
              Word Question
            </Badge>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TestEditpage;
