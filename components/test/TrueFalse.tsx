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
import { createTrueFalseSchema } from "@/lib/validation";
import { useRouter, usePathname } from "next/navigation";
import { addMcq, addTrueFalse } from "@/lib/actions/question.action";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const AddsTrueFalse = ({ testId }: any) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof createTrueFalseSchema>>({
    resolver: zodResolver(createTrueFalseSchema),
    defaultValues: {
      question: "",
      answer: "false",
      marks: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof createTrueFalseSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const { question, answer, marks } = values;

      const trueFalseData = {
        question,
        answer: answer == "true" ? true : false,
        marks,
        testId: JSON.parse(testId),
      };

      await addTrueFalse({ trueFalseData });
      router.push(`/teacher/edit-test/${JSON.parse(testId)}`);
    } catch (error) {
      throw error;
    }
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
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddsTrueFalse;
