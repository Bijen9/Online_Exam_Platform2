import Link from "next/link";
import { getTestById, submitTest } from "@/lib/actions/test.action";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/lib/actions/user.action";
import AttemptTest from "@/components/test/attemptTest";
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

  console.log(
    "..........................................................................HERE",
    questionAll
  );

  return (
    <>
      <div className="flex w-full flex-row justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">{test.name}</h1>
        <AttemptTest
          testId={JSON.stringify(test._id)}
          userId={JSON.stringify(userId)}
        />
      </div>
    </>
  );
};
export default teacherPage;
