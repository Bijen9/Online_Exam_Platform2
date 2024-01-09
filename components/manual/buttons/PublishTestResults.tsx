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
        className="h4-bold    primary-gradient  
              text-dark400_light500 rounded-md border-none my-2 px-4 py-2 uppercase "
        onClick={async () => {
          const testData = {
            published: false,
            status: false,
            result: true,
          };
          await updateTest({ test, testData });
          router.push(`/teacher/mark-test`);
        }}
      >
        Publish
      </Button>
    </div>
  );
};

export default PublishTest;
