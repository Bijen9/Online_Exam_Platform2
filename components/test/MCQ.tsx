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
import { createMCQsSchema as createMCQsSchema } from "@/lib/validation";
import { useRouter, usePathname } from "next/navigation";
import { addMcq } from "@/lib/actions/question.action";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const addMCQ = ({ testId }: any) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [numberOfOptions, setnumberOfOptions] = React.useState([3]);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof createMCQsSchema>>({
    resolver: zodResolver(createMCQsSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      marks: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof createMCQsSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const { question, option1, option2, option3, option4, answer, marks } =
        values;
      const options = [];
      options.push(option1, option2, option3, option4);

      const mcqData = {
        question,
        answer: parseInt(answer),
        // how to pass options array to mongodb
        options: options,
        marks,
        testId: JSON.parse(testId),
      };
      console.log(mcqData);
      await addMcq({ mcqData });

      // router.push(`/teacher/edit-test/${JSON.parse(testId)}`);
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
                <FormLabel>
                  Question <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="KU is located in Dhulikhel."
                    className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:item-center">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className=" flex flex-col space-y-3 h-full ">
                  <FormControl className="h-full">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 h-full"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 h-full">
                        <FormControl className="h-full">
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">--</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 h-full">
                        <FormControl className="h-full">
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">--</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 h-full">
                        <FormControl className="h-full">
                          <RadioGroupItem value="2" />
                        </FormControl>
                        <FormLabel className="font-normal">--</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 h-full">
                        <FormControl className="h-full">
                          <RadioGroupItem value="3" />
                        </FormControl>
                        <FormLabel className="font-normal">--</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="h-full" />
                </FormItem>
              )}
            />
            <div className="flex flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="option1"
                render={({ field }) => (
                  <FormItem className="space-y-3.5 text-dark100_light900">
                    <FormControl>
                      <Input
                        placeholder="Test Name"
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
                name="option2"
                render={({ field }) => (
                  <FormItem className="space-y-3.5 text-dark100_light900">
                    <FormControl>
                      <Input
                        placeholder="Test Name"
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
                name="option3"
                render={({ field }) => (
                  <FormItem className="space-y-3.5 text-dark100_light900">
                    <FormControl>
                      <Input
                        placeholder="Test Name"
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
                name="option4"
                render={({ field }) => (
                  <FormItem className="space-y-3.5 text-dark100_light900">
                    <FormControl>
                      <Input
                        placeholder="Test Name"
                        className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="marks"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-xs">
                <FormLabel>Points</FormLabel>
                <Input type="number" {...field} />

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

export default addMCQ;
