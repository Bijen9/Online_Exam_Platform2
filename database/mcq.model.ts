import { Schema, models, model, Document } from "mongoose";

export interface IMCQ extends Document {
  testId: Schema.Types.ObjectId;
  question: string;
  options: string[];
  answer: number;
  marks: number;
  CorrectStudents: Schema.Types.ObjectId[];
  createdAt: Date;
}

const MCQSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: "Test" },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true },
  marks: { type: Number, required: true },
  CorrectStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const MCQ = models.MCQ || model<IMCQ>("MCQ", MCQSchema);

export default MCQ;
