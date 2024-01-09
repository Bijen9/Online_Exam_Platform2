import Link from "next/link";
import { getTestById, submitTest } from "@/lib/actions/test.action";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/lib/actions/user.action";
import AttemptTF from "@/components/test/attemptTF";
import AttemptMCQ from "@/components/test/attemptMCQ";
import AttemptWritten from "@/components/test/attemptWritten";
import { getQuestions } from "@/lib/actions/question.action";

const teacherPage = async ({ params, searchParams }: any) => {
  const { id } = params;
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const test = await getTestById({ testId: id });
  await submitTest({ testId: id, userId: userId });
  const questionAll = await getQuestions({
    testId: test._id,
    userId: userId,
  });

  const { mcq, trueFalse, written } = questionAll as any;

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">{test.name}</h1>
        <h4 className="text-sm text-neutral-500">
          {" "}
          your progress will be saved automatically after pressing Confirm
        </h4>

        {trueFalse?.map((question: any, index: any) => {
          return (
            <AttemptTF
              userId={JSON.stringify(userId)}
              questionn={JSON.stringify(question)}
              qno={index}
              key={index}
            />
          );
        })}

        {mcq?.map((question: any, index: any) => {
          return (
            <AttemptMCQ
              userId={JSON.stringify(userId)}
              questionn={JSON.stringify(question)}
              qno={index}
              key={index}
            />
          );
        })}

        {written?.map((question: any, index: any) => {
          return (
            <AttemptWritten
              userId={JSON.stringify(userId)}
              questionn={JSON.stringify(question)}
              qno={index}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};
export default teacherPage;
