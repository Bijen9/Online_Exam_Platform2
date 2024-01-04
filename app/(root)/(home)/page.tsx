import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Link from "next/link";
import TestCard from "@/components/cards/TestCard";
import { getIssuedTest } from "@/lib/actions/test.action";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/lib/actions/user.action";

export default async function Home() {
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const tests: any = await getIssuedTest({ userId });
  console.log(tests);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">All Tests</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:item-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assests/icons/search.svg"
          placeholder="Search for tests"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {tests.map((test: any) => (
          <Link href={`/student/test/${test._id}`}>
            <TestCard
              key={test._id}
              _id={test._id}
              name={test.name}
              description={test.description}
              startTime={test.startTime}
              endTime={test.endTime}
              status={test.status}
              totalQuestion={test.totalQuestions}
              createdAt={test.createdAt}
              published={test.published}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
