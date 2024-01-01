import { Schema, models, model, Document } from "mongoose";

export interface IWritten extends Document {
  question: string;
  correctAnswer: string;
  marks: number;
  Wanswers: Schema.Types.ObjectId[];
  CorrectStudents: Schema.Types.ObjectId[];
  createdAt: Date;
}

const WrittenSchema = new Schema({
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  marks: { type: Number, required: true },
  Wanswers: [{ type: Schema.Types.ObjectId, ref: "Wanswer" }],
  CorrectStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Written = models.Written || model(" Written ", WrittenSchema);

export default Written;
