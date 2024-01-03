import { Schema, models, model, Document } from "mongoose";

export interface IWritten extends Document {
  testId: Schema.Types.ObjectId;
  question: string;
  correctAnswer: string;
  marks: number;
  CorrectStudents: Schema.Types.ObjectId[];
  createdAt: Date;
}

const WrittenSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: "Test" },
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  marks: { type: Number, required: true },
  CorrectStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Written = models.Written || model<IWritten>("Written", WrittenSchema);

export default Written;
