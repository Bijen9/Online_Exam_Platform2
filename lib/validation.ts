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

export const createTrueFalseSchema = z.object({
  question: z.string().min(2).max(300),
  answer: z.enum(["true", "false"]),
  marks: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(1, "Must be 1 and above").lte(100, "Must be less than 100")
  ),
});

export const attendTrueFalseSchema = z.object({
  answer: z.enum(["true", "false"]),
});

export const attendMCQsSchema = z.object({
  answer: z.enum(["0", "1", "2", "3"]),
});

export const attendWrittenSchema = z.object({
  answer: z.string(),
});

export const createMCQsSchema = z.object({
  question: z.string().min(2).max(300),
  option1: z.string(),
  option2: z.string(),
  option3: z.string(),
  option4: z.string(),
  answer: z.string(),
  marks: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(1, "Must be 1 and above").lte(100, "Must be less than 100")
  ),
});

export const createWrittenSchema = z.object({
  question: z.string().min(2).max(300),
  correctAnswer: z.string(),
  marks: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(1, "Must be 1 and above").lte(100, "Must be less than 100")
  ),
});
