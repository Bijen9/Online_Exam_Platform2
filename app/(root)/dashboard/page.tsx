import React from "react";
import { UserButton } from "@clerk/nextjs";
const askQuestion = () => {
  return (
    <div>
      ask Questions in this page.
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default askQuestion;
