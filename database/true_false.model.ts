import { Schema, models, model, Document } from "mongoose";

export interface ITrue_False extends Document {
  question: string;
  answer: string;
  marks: number;
  CorrectStudents: Schema.Types.ObjectId[];
  createdAt: Date;
}

const True_FalseSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  marks: { type: Number, required: true },
  CorrectStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const True_False = models.True_False || model(" True_False ", True_FalseSchema);

export default True_False;
