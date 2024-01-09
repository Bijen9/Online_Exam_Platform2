import Link from "next/link";
import { getTestById } from "@/lib/actions/test.action";
import { getMarkableQuestions } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/lib/actions/user.action";
import Helper from "./helper";
import PublishTestResults from "@/components/manual/buttons/PublishTestResults";

const teacherPage = async ({ params, searchParams }: any) => {
  const { id } = params;
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const test = await getTestById({ testId: id });
  const { written, canBePublished } = await getMarkableQuestions({
    testId: test._id,
    userId: userId,
  });
  const questionAll = written;

  return (
    <>
      {canBePublished ? (
        <div>
          <h1 className="h1-bold text-dark100_light900">{test.name}</h1>
          <span className="text-sm text-neutral-500">
            test results can now be published as all marking is completed.
          </span>
          <PublishTestResults test={JSON.stringify(test)} />
        </div>
      ) : (
        <div>
          <h1 className="h1-bold text-dark100_light900">{test.name}</h1>
          <h4 className="text-sm text-neutral-500">
            {" "}
            your markings will be recorded automatically.
          </h4>

          {questionAll?.map((question: any, index: any) => {
            return (
              <Helper
                testId={test._id}
                question={question}
                index={index}
                key={index}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
export default teacherPage;
