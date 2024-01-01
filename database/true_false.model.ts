import { Schema, models, model, Document } from "mongoose";

export interface ITrue_False extends Document {
  testId: Schema.Types.ObjectId;
  question: string;
  answer: string;
  marks: number;
  CorrectStudents: Schema.Types.ObjectId[];
  createdAt: Date;
}

const True_FalseSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: "Test" },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  marks: { type: Number, required: true },
  CorrectStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const True_False =
  models.True_False || model<ITrue_False>(" True_False ", True_FalseSchema);

export default True_False;
