"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  deleteMcq,
  deleteTrueFalse,
  deleteWritten,
} from "@/lib/actions/question.action";
import Metric from "../shared/Metric";
import { Badge } from "../ui/badge";
import { useRouter, usePathname } from "next/navigation";
import { updateTest } from "@/lib/actions/test.action";

const publishTest = ({ test }: any) => {
  const router = useRouter();
  const Test = JSON.parse(test);
  const testId = Test.id;
  return (
    <div>
      <Button
        className="h4-bold  background-light800_dark300
              text-dark400_light500 rounded-md border-none px-4 py-2 uppercase focus:bg-slate-100 dark:focus:bg-light-300"
        onClick={async () => {
          const testData = {
            published: false,
            status: false,
          };
          await updateTest({ testId: testId, testData });
          // router.push(`/teacher/edit-test`);
        }}
      >
        Publish
      </Button>
    </div>
  );
};

export default publishTest;
