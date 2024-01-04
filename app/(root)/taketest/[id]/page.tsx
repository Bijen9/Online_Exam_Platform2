import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Link from "next/link";
import { getTestById } from "@/lib/actions/test.action";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import { getTimestamp } from "@/lib/utils";

const teacherPage = async ({ params, searchParams }) => {
  const { id } = params;
  const clerkId: string = auth().userId!;
  const userId = await getUserId({ clerkId });
  const test = await getTestById({ testId: id });

  console.log(
    "..........................................................................HERE",
    test
  );

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">Take Test</h1>
      </div>

      <div>{test.name}</div>
      <div>{test.description}</div>
      <div>{getTimestamp(test.startTime)}</div>
      <div>{getTimestamp(test.endTime)}</div>

      <Link href={`/taketest/${test._id}/attempt`}>
        <Button>Start Test</Button>
      </Link>
    </>
  );
};

export default teacherPage;
