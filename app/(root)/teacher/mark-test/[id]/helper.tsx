import { getMarkableanswer, markWritten } from "@/lib/actions/question.action";

import MarkWritten from "@/components/test/markWritten";
import { IWanswer } from "@/database/wanswer.model";

const TeacherPage = async ({ question, testId, index }: any) => {
  const allwrittenAnswer: IWanswer[] = await getMarkableanswer({
    QuestionId: question._id,
  });

  if (allwrittenAnswer.length === 0) {
    await markWritten({
      QuestionId: question._id,
      decision: false,
    });
  }

  return (
    <>
      <div
        className="card-wrapper p-9
    sm:px-11 rounded-[10px] dark:text-white dark:shadow-gray-900 mt-4"
      >
        <div className="h3-bold">
          Question no. {index + 1} &#41; {question.question}
        </div>
        <br />
        <div> Correct answer : &rarr; {question.correctAnswer}</div>

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
