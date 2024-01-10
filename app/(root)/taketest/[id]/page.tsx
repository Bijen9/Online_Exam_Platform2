import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Link from "next/link";
import { getTestById, getUserAttemptCheck } from "@/lib/actions/test.action";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import { getTimestamp } from "@/lib/utils";
import moment from "moment";

const teacherPage = async ({ params, searchParams }: any) => {
  const { id } = params;
  const clerkId: string = auth().userId!;
  const userId = await getUserId({ clerkId });
  const test = await getTestById({ testId: id });
  const userAttemptCheck = await getUserAttemptCheck({
    testId: test._id,
    userId,
  });
  const startDate = moment(test.startTime);
  const timeEnd = moment(test.endTime);
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">Take Test</h1>
      </div>

      <div
        className="card-wrapper p-9
    sm:px-11 rounded-[10px] dark:text-white dark:shadow-gray-900"
      >
        <div className="h2-bold">{test.name}</div>
        <div>{test.description}</div>

        <div className="mt-5">
          <div>Started Date: {startDate.format("MMM Do YYYY, h:mm:ss a")}</div>
          <div>Duration: {diffDuration.asMinutes()} Minutes</div>
        </div>
      </div>
      {userAttemptCheck === false ? (
        <Link href={`/taketest/${test._id}/attempt`}>
          <Button className="primary-gradient mt-5">Enter Test</Button>
        </Link>
      ) : (
        <div className="mt-5">
          <div className="text-dark100_light900">
            You have already attempted this test.
          </div>
          <Link href={`/`}>
            <Button className="primary-gradient mt-5">Go to Tests</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default teacherPage;
