import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuestionCard from "@/components/cards/QuestionCard";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "MATH 207 unit test 1",
    tags: [
      { _id: 1, name: "python" },
      { _id: 2, name: "sql" },
    ],
    author: {
      _id: "1",
      name: "Shyam Sundar Saha",
      picture: "ShyamSundar.jpg",
    },
    views: 57,
    questions: [],
    createdAt: new Date("2023-12-31T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "DATABASE MCQs Test 2",
    tags: [
      { _id: 1, name: "python" },
      { _id: 2, name: "sql" },
    ],
    author: {
      _id: "2",
      name: "Santosh Khanal",
      picture: "SantoshKhanal.jpg",
    },
    views: 57,
    questions: [],
    createdAt: new Date("2023-12-31T12:00:00.000Z"),
  },
];

const teacherPage = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">Profile</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:item-center">
     
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">

      </div>
    </>
  );
};

export default teacherPage;
