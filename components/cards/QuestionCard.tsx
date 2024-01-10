"use client";
import React from "react";
import {
  deleteMcq,
  deleteTrueFalse,
  deleteWritten,
} from "@/lib/actions/question.action";
import Metric from "../shared/Metric";
import { Badge } from "../ui/badge";
import { useRouter, usePathname } from "next/navigation";

const QuestionCard = ({ id, question, answer, type, testId }: any) => {
  const router = useRouter();
  return (
    <div
      className="card-wrapper p-9
    sm:px-11 rounded-[10px] mt-2 "
    >
      <div
        className="flex flex-col-reverse items-start justify-between gap-5
        sm:flex-row"
      >
        <div>
          <h3
            className="sm:h3-semibold base-semibold 
                    text-dark200_light900 line-clamp-1 flex-1"
          >
            {question}
          </h3>
        </div>
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div></div>
        <div className="flex flex-row">
          <Metric
            imgurl="/assets/icons/message.svg"
            alt="message"
            value={type}
            title=""
            textStyles="small-medium text-dark400_light800"
          />
          <Badge
            className="h4-bold  background-light800_dark300 
          text-dark400_light500 rounded-md border-none px-4 py-2 uppercase focus:bg-slate-100 dark:focus:bg-light-300"
            style={{
              cursor: "pointer",
            }}
            onClick={async () => {
              if (type === "MCQ") {
                await deleteMcq({ mcqId: JSON.parse(id) });

                // router.push(`/teacher/edit-test/${testId}`);
                router.refresh();
              } else if (type === "True-False") {
                await deleteTrueFalse({ trueFalseId: JSON.parse(id) });

                router.refresh();
              } else if (type === "Written") {
                await deleteWritten({ writtenId: JSON.parse(id) });
                router.refresh();
              }
            }}
          >
            Delete
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
