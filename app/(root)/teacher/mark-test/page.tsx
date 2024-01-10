import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TestCard from "@/components/cards/TestCard";
import { getMarkTest } from "@/lib/actions/test.action";
import { getUserId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function MarkTest() {
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const tests: any = await getMarkTest({ userId });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900"> Mark Tests</h1>
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
      {tests!.map((test: any) => (
        <Link href={`/teacher/mark-test/${test._id}`} key={test._id}>
          <TestCard
            name={test.name}
            description={test.description}
            startTime={test.startTime}
            endTime={test.endTime}
            status={test.status}
            totalQuestion={test.totalQuestions}
            createdAt={test.createdAt}
          />
        </Link>
      ))}
    </>
  );
}
