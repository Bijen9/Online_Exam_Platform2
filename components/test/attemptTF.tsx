"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
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
import { attendTrueFalseSchema } from "@/lib/validation";
import { useRouter, usePathname } from "next/navigation";
import { attendTrueFalse } from "@/lib/actions/question.action";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const addsTrueFalse = ({ questionn, qno, userId }: any) => {
  const question = JSON.parse(questionn);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  //   const router = useRouter();
  //   const pathname = usePathname();

  const form = useForm<z.infer<typeof attendTrueFalseSchema>>({
    resolver: zodResolver(attendTrueFalseSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof attendTrueFalseSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const { answer } = values;
      const answerValue = answer === "true" ? true : false;

      //  { trueFalseId, userId, answer }
      await attendTrueFalse({
        trueFalseId: question._id,
        userId: JSON.parse(userId),
        answer: answerValue,
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
                            True
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
                            False
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
      </div>
    </>
  );
};

export default addsTrueFalse;
