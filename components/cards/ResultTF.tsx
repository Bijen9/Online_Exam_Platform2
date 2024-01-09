import React from "react";
import Metric from "../shared/Metric";
import { Badge } from "@/components/ui/badge";

const TestCard = async ({ result, index, userId }: any) => {
  // check if the answer is correct or not

  const userCorrect = result.CorrectStudents.includes(userId) ? true : false;

  return (
    <div
      className="card-wrapper p-9
    sm:px-11 rounded-[10px] mt-1"
    >
      <div
        className="flex flex-col-reverse items-start justify-between gap-5
        sm:flex-row"
      >
        <div>
          <span
            className="subtle-regular text-dark-400_light700
                line-clamp-1 flex sm:hidden"
          >
            here
          </span>

          <h3
            className="sm:h3-semibold base-semibold 
                    text-dark200_light900 line-clamp-1 flex-1"
          >
            {index + 1}. {result.question}
          </h3>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        <Badge
          className={`${
            result.answer === true
              ? "primary-gradient body-semibold text-white"
              : "background-light800_dark300 subtle-medium text-light400_light500 "
          }
         rounded-md border-none px-4 py-2 uppercase`}
        >
          True
        </Badge>
        <Badge
          className={`${
            result.answer === false
              ? "primary-gradient body-semibold text-white"
              : "background-light800_dark300 subtle-medium text-light400_light500 "
          }
         rounded-md border-none px-4 py-2 uppercase`}
        >
          False
        </Badge>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="text-dark200_light900">
          your answer was{" "}
          {userCorrect ? (
            <span className="text-green-500">correct.</span>
          ) : (
            <span className="text-red-500">incorrect.</span>
          )}
        </div>

        <div>
          {userCorrect ? (
            <span className="text-green-500">{result.marks} Points</span>
          ) : (
            <span className="text-red-500">0/{result.marks} Points</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
