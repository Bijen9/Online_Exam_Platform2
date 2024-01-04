import Link from "next/link";
import { getTestById, submitTest } from "@/lib/actions/test.action";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/lib/actions/user.action";
import AttemptTF from "@/components/test/attemptTF";
import { getQuestions } from "@/lib/actions/question.action";

const teacherPage = async ({ params, searchParams }) => {
  const { id } = params;
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const test = await getTestById({ testId: id });
  await submitTest({ testId: id, userId: userId });
  const questionAll = await getQuestions({
    testId: test._id,
    userId: userId,
  });

  const { mcq, trueFalse, written } = questionAll;

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">{test.name}</h1>
        <> your progress will be saved automatically after pressing Confirm</>
        {trueFalse?.map((question, index) => {
          return (
            <AttemptTF
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
