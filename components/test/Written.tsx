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
import { createWrittenSchema } from "@/lib/validation";
import { useRouter, usePathname } from "next/navigation";
import { addWritten } from "@/lib/actions/question.action";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const addWrittens = ({ testId }: any) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof createWrittenSchema>>({
    resolver: zodResolver(createWrittenSchema),
    defaultValues: {
      question: "",
      correctAnswer: "",
      marks: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof createWrittenSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const { question, correctAnswer, marks } = values;

      const writtenData = {
        question,
        correctAnswer,
        marks,
        testId: JSON.parse(testId),
      };
      console.log(writtenData);
      await addWritten({ writtenData });

      router.push(`/teacher/edit-test/${JSON.parse(testId)}`);
    } catch (error) {
      console.log(error);
    }

    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-9 flex w-full gap-9 flex-col"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark100_light900">
                  Question <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Is wordpress a programming IDE ?"
                    className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark100_light900">
                  Answer for teacher's refrence.{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Yes wordpress is a programming IDE."
                    className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marks"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-xs">
                <FormLabel className="text-dark100_light900">Points</FormLabel>
                <Input
                  className="background-light700_dark300 text-dark300_light700"
                  type="number"
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-7 flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit"
              disabled={isSubmitting}
              onClick={() => {
                console.log("button clicked");
              }}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default addWrittens;
