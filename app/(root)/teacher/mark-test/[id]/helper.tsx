import { getMarkableanswer } from "@/lib/actions/question.action";

import MarkWritten from "@/components/test/markWritten";
import { IWanswer } from "@/database/wanswer.model";

const TeacherPage = async ({ question, testId, index }: any) => {
  const allwrittenAnswer: IWanswer[] = await getMarkableanswer({
    QuestionId: question._id,
  });

  return (
    <>
      <div
        className="card-wrapper p-9
    sm:px-11 rounded-[10px] dark:text-white dark:shadow-gray-900"
      >
        <div>Question no.{index + 1}</div>
        <div>&rarr; {question.question}</div>
        <div> Correct answer for teachers refrence</div>
        <div>&rarr; {question.correctAnswer}</div>
        <br></br>
        <div> Students Answer :-</div>
        {allwrittenAnswer.map((answer: any, index: any) => (
          <MarkWritten
            studentAnswerStringified={JSON.stringify(answer)}
            key={index}
          />
        ))}
        {allwrittenAnswer.length === 0 && (
          <div>No written answer for this question to mark.</div>
        )}
      </div>
    </>
  );
};
export default TeacherPage;
