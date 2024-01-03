import * as z from "zod";

export const createTestSchema = z.object({
  name: z.string().min(2).max(100),
  discription: z.string().min(2).max(100),
  startTime: z.date({
    required_error: "A date to start test is required.",
  }),
  endTime: z.date({
    required_error: "A date to end test is required.",
  }),
});
