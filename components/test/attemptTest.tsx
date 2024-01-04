"use client";

import React, { useState } from "react";
import { useEffect } from "react";

const attemptTest = ({ testId, userId }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {});
  console.log("attemptTest", testId, userId);
  return (
    <>
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">Test Name</h1>
      </div>
    </>
  );
};

export default attemptTest;
