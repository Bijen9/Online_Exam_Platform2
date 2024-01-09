"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface props {
  testId: string;
}
import { markWrittenSchema } from "@/lib/validation";
import { markWritten } from "@/lib/actions/question.action";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const MarkWritten = ({ studentAnswerStringified }: any) => {
  const studentAnswer = JSON.parse(studentAnswerStringified);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const form = useForm<z.infer<typeof markWrittenSchema>>({
    resolver: zodResolver(markWrittenSchema),
    defaultValues: {
      answer: "false",
    },
  });

  async function onSubmit(values: z.infer<typeof markWrittenSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const { answer } = values;

      const decision = answer === "true" ? true : false;
      await markWritten({
        QuestionId: studentAnswer.QuestionId,
        StudentId: studentAnswer.StudentId,
        decision,
        answerId: studentAnswer._id,
      });
      setIsSubmitting(false);
      setFinished(true);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      {finished ? (
        ""
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-9 flex w-full gap-9 flex-col"
          >
            {/* one radio button on press answer value is true */}
            <div>
              <h4 className="h4 text-dark100_light900">
                {studentAnswer.answer}
              </h4>
            </div>
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 "
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            className=" text-dark300_light700"
                            value="true"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-dark100_light900">
                          Correct
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            className=" text-dark300_light700"
                            value="false"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-dark100_light900">
                          Incorrect
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
    </>
  );
};

export default MarkWritten;
