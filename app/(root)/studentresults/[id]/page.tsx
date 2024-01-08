import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TestCard from "@/components/cards/TestCard";
import { getEditTest, getTestById } from "@/lib/actions/test.action";
import { getUserId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { getResultMarks } from "@/lib/actions/result.action";

const ResultDetail = async ({ params, searchParams }: any) => {
  const { id } = params;
  const test = await getTestById({ testId: id });
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const tests: any = await getEditTest({ userId });
  const results = await getResultMarks({
    userId,
    testId: id,
  });
  return (
    <div>
      <div className="mt-10 flex w-full flex-col justify-between gap-6 sm:flex-column sm:item-center">
        <h1 className="h1-bold text-dark100_light900">Results</h1>
        {results && results.status == "success" ? (
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="h1-bold text-dark100_light900">Results</h1>
              <h1 className="h1-bold text-dark100_light900">
                Total Marks: {results.totalMarks}
              </h1>
            </div>
            {results.correctMCQAnswers!.map((result: any, index: any) => (
              <div className="flex flex-row justify-between" key={index}>
                <h1 className="h1-bold text-dark100_light900">
                  {result.question}
                </h1>
                <h1 className="h1-bold text-dark100_light900">
                  Marks: {result.marks}
                </h1>
              </div>
            ))}

            {results.correctTFAnswers!.map((result: any, index: any) => (
              <div className="flex flex-row justify-between" key={index}>
                <h1 className="h1-bold text-dark100_light900">
                  {result.question}
                </h1>
                <h1 className="h1-bold text-dark100_light900">
                  Marks: {result.marks}
                </h1>
              </div>
            ))}

            {results.correctWrittenAnswers!.map((result: any, index: any) => (
              <div className="flex flex-row justify-between" key={index}>
                <h1 className="h1-bold text-dark100_light900">
                  {result.question}
                </h1>
                <h1 className="h1-bold text-dark100_light900">
                  Marks: {result.marks}
                </h1>
              </div>
            ))}
          </div>
        ) : (
          "No results published for this test yet."
        )}
      </div>
    </div>
  );
};

export default ResultDetail;
