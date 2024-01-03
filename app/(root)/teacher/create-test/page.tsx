import React from "react";
import { auth } from "@clerk/nextjs";
import CreateTest from "@/components/test/createTest";

const page = () => {
  const userId: string = auth().userId!;

  return <CreateTest userId={JSON.stringify(userId)} />
};

export default page;
