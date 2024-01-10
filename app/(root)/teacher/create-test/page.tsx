import React from "react";
import { auth } from "@clerk/nextjs";
import CreateTest from "@/components/test/createTest";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

const page = () => {
  const userId: string = auth().userId!;

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900"> Create A Test</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:item-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assests/icons/search.svg"
          placeholder="Search for results"
          otherClasses="flex-1"
        />
      </div>
      <CreateTest userId={JSON.stringify(userId)} />
    </>
  );
};

export default page;
