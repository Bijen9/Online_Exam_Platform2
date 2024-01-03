"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createTestSchema } from "@/lib/validation";
import { useRouter, usePathname } from "next/navigation";
import { createTest } from "@/lib/actions/test.action";

interface props {
  userId: string;
}

const createTestPage = ({ userId }: props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof createTestSchema>>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      name: "",
      discription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createTestSchema>) {
    // Do something with the form values.
    setIsSubmitting(true);
    try {
      const testData = {
        name: values.name,
        description: values.discription,
        startTime: values.startTime,
        endTime: values.endTime,
      };

      await createTest({ testData, clerkId: userId });

      router.push("/teacher/edit-test");
    } catch (error) {
      console.log(error);
    }

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full gap-9 flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5 text-dark100_light900">
              <FormLabel>
                Name <span className="text-primary-500">*</span>
              </FormLabel>
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
          name="discription"
          render={({ field }) => (
            <FormItem className="space-y-3.5 text-dark100_light900">
              <FormLabel>
                Description <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Test Description"
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
          name="startTime"
          render={({ field }) => (
            <FormItem className="flex flex-col text-dark100_light900">
              <FormLabel>Test time from</FormLabel>
              <Popover >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Start date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-dark100_light900" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="text-dark100_light900 bg-white dark:bg-zinc-950"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Test will be open to students at this time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="flex flex-col text-dark100_light900">
              <FormLabel>Test time until</FormLabel>
              <Popover >
                <PopoverTrigger asChild>
                  <FormControl className="text-dark100_light900">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>End date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="text-dark100_light900 bg-white dark:bg-zinc-950"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Test will be Colsed to students at this date.
              </FormDescription>
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
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default createTestPage;
