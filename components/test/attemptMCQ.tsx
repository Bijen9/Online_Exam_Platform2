"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface props {
  testId: string;
}
import { attendMCQsSchema } from "@/lib/validation";
import { attendMcq } from "@/lib/actions/question.action";
import { useForm } from "react-hook-form";

const AddsMCQs = ({ questionn, qno, userId }: any) => {
  const question = JSON.parse(questionn);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  //   const router = useRouter();
  //   const pathname = usePathname();

  const form = useForm<z.infer<typeof attendMCQsSchema>>({
    resolver: zodResolver(attendMCQsSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof attendMCQsSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const { answer } = values;
      //   const answerValue = answer === "true" ? true : false;

      //  { trueFalseId, userId, answer }
      const studentAnswer = answer ? answer : "0";

      await attendMcq({
        mcqId: question._id,
        userId: JSON.parse(userId),
        answer: parseInt(studentAnswer),
      });
      setIsSubmitting(false);
      setFinished(true);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <div
        className="card-wrapper p-9
    sm:px-11 rounded-[10px] dark:text-white dark:shadow-gray-900"
      >
        <div>Question no.{qno + 1}</div>
        <div>&rarr; {question.question}</div>
        {finished ? (
          ""
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-9 flex w-full gap-9 flex-col"
            >
              <div className="flex flex-wrap-reverse gap-1 align-center sm:flex-row sm:item-center">
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem className=" flex flex-col align-center  ">
                      <FormControl className="">
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-15 h-full "
                        >
                          <FormItem className="flex items-center space-x-3  h-full">
                            <FormControl className="h-full">
                              <RadioGroupItem value="0" />
                            </FormControl>
                            <FormLabel className="font-normal"></FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3  h-full">
                            <FormControl className="h-full">
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal"></FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3  h-full">
                            <FormControl className="h-full">
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="font-normal"></FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 h-full">
                            <FormControl className="h-full">
                              <RadioGroupItem value="3" />
                            </FormControl>
                            <FormLabel className="font-normal"></FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="h-full" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-1 flex-col gap-6">
                  {question.options.map((option: any, index: any) => {
                    return (
                      <div
                        className="flex flex-col gap
                    -3"
                        key={index}
                      >
                        {index + 1}.{` `}
                        {option}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-7 flex justify-end">
                <Button
                  type="submit"
                  className="primary-gradient w-fit"
                  disabled={isSubmitting}
                  onClick={() => {}}
                >
                  {isSubmitting ? "Confirming..." : "Confirm"}
                </Button>
              </div>
            </form>
          </Form>
        )}
        {finished ? "Saved Successfully" : ""}
      </div>
    </>
  );
};

export default AddsMCQs;
