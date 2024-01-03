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

export const createMCQSchema = z.object({
  question: z.string().min(2).max(300),
  answer: z.enum(["true", "false"]),
  marks: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(1, "Must be 1 and above").lte(100, "Must be less than 100")
  ),
});
