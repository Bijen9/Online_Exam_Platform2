import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TestCard from "@/components/cards/TestCard";
import { getEditTest } from "@/lib/actions/test.action";
import { getUserId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function EditTest() {
  const clerkId: string = auth().userId!;

  const userId = await getUserId({ clerkId });
  const tests: any = await getEditTest({ userId });

  return (
    <>
      <div className="mt-10 flex w-full flex-col justify-between gap-6 sm:flex-column sm:item-center">
        <h1 className="h1-bold text-dark100_light900">Edit Test</h1>
        {tests!.map((test: any) => (
          <Link href={`/teacher/edit-test/${test._id}`}>
            <TestCard
              key={test._id}
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
      </div>
    </>
  );
}
