import React from "react";
import Metric from "../shared/Metric";
import { getTimestamp } from "@/lib/utils";

import moment from "moment";
import { getQuestionCountInTest } from "@/lib/actions/test.action";

const TestCard = async ({
  _id,
  name,
  description,
  startTime,
  endTime,
  status,
  published,
  totalQuestions,
  createdAt,
}: any) => {
  const startDate = moment(startTime);
  const timeEnd = moment(endTime);
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);

  const count = await getQuestionCountInTest({ testId: _id });

  return (
    <div
      className="card-wrapper p-9
    sm:px-11 rounded-[10px] mt-2"
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
            {name}
          </h3>
        </div>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgurl="/assets/icons/avatar.svg"
          alt="user"
          value={` Starts ${startDate.format("MMM Do YYYY, h:mm:ss a")}
          `}
          title={` - Duration ${diffDuration.asMinutes()} Minutes`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        {/* <Metric
          imgurl="/assets/icons/message.svg"
          alt="message"
          value={count!.total}
          title=" Question"
          textStyles="small-medium text-dark400_light800"
        /> */}
      </div>
    </div>
  );
};

export default TestCard;
