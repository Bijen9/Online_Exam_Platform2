import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button"
import Link from "next/link";

const questions = [
  {
    _id:1,
    title: 'MATH 207 unit test 1',
    tags: [{ _id: 1, name: 'python'}, { _id: 2, name: 'sql'}],
    author: 'Shyam Sundar Saha',
    views: 57,
    questions: 8,
    createdAt: '2023-12-31T12:00.000Z'
  },
  {
    _id:2,
    title: 'DATABASE MCQs Test 2',
    tags: [{ _id: 1, name: 'python'}, { _id: 2, name: 'sql'}],
    author: 'Santosh Khanal',
    views: 37,
    questions: 6,
    createdAt: '2023-12-31T12:00.000Z'
  },

]

export default function Home() {
  return (
    <>
       <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link  href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
          
        </Link>
       </div>

       <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:item-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assests/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

       </div>

       <div className="mt-10 flex w-full flex-col gap-6">
          {questions.map((question) => (
                'QuestionCard'
          ))}
       </div>


        
    </>

  )
  
}

