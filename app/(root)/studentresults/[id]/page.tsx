import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ResultTF from "@/components/cards/ResultTF";
import ResultMCQ from "@/components/cards/ResultMCQ";
import ResultWritten from "@/components/cards/ResultWritten";
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
        <h3 className="h1-bold text-dark100_light900">Results</h3>
        {results && results.status == "success" ? (
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="h2-bold text-dark100_light900"></h1>
              <h1 className="h3-bold text-dark100_light900">
                Total Marks: {results.totalMarks}
              </h1>
            </div>
            <br />
            <h3 className="h3-bold text-dark100_light900">True False(s)</h3>
            {results.TFAnswers!.map((result: any, index: any) => (
              <ResultTF
                result={result}
                index={index}
                key={index}
                userId={userId}
              />
            ))}
            <br />
            <h3 className="h3-bold text-dark100_light900">MCQ(s)</h3>
            {results.MCQAnswers!.map((result: any, index: any) => (
              <ResultMCQ
                result={result}
                index={index}
                key={index}
                userId={userId}
              />
            ))}
            <br />
            <h3 className="h3-bold text-dark100_light900">Written(s)</h3>
            {results.WrittenAnswers!.map((result: any, index: any) => (
              <ResultWritten
                result={result}
                index={index}
                key={index}
                userId={userId}
              />
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
