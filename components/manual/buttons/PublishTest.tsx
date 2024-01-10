"use client";
import React from "react";
import { Button } from "../../ui/button";

import { useRouter } from "next/navigation";
import { updateTest } from "@/lib/actions/test.action";

const PublishTest = ({ test }: any) => {
  const router = useRouter();
  // const Test = JSON.parse(test);
  // const testId = Test.id;

  return (
    <div>
      <Button
        className="h4-bold    primary-gradient body-semibold text-white
              rounded-md border-none my-4 px-4 py-2 uppercase "
        onClick={async () => {
          const testData = {
            published: false,
            status: false,
          };
          await updateTest({ test, testData });
          router.push(`/teacher/edit-test`);
        }}
      >
        Publish
      </Button>
    </div>
  );
};

export default PublishTest;
