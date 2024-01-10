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
  FormMessage,
} from "@/components/ui/form";
interface props {
  testId: string;
}
import { attendWrittenSchema } from "@/lib/validation";
import { attendWritten } from "@/lib/actions/question.action";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const AddsTrueFalse = ({ questionn, qno, userId }: any) => {
  const question = JSON.parse(questionn);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  //   const router = useRouter();
  //   const pathname = usePathname();

  const form = useForm<z.infer<typeof attendWrittenSchema>>({
    resolver: zodResolver(attendWrittenSchema),
    defaultValues: {
      answer: " ",
    },
  });

  async function onSubmit(values: z.infer<typeof attendWrittenSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const { answer } = values;

      await attendWritten({
        writtenId: question._id,
        userId: JSON.parse(userId),
        answer: answer ? answer : " ",
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
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="space-y-3.5">
                    <FormControl>
                      <Textarea
                        placeholder="Your answer here."
                        className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                        {...field}
                      />
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
      </div>
    </>
  );
};

export default AddsTrueFalse;
