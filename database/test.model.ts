import { Schema, models, model, Document } from "mongoose";

export interface ITest extends Document {
  name: string;
  description: string;
  CreatedBy: Schema.Types.ObjectId;
  IssuedTo: Schema.Types.ObjectId[];
  MCQs: Schema.Types.ObjectId[];
  Written: Schema.Types.ObjectId[];
  True_false: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TestSchema = new Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  CreatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  IssuedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  MCQs: [{ type: Schema.Types.ObjectId, ref: "MCQ" }],
  Written: [{ type: Schema.Types.ObjectId, ref: "Written" }],
  True_false: [{ type: Schema.Types.ObjectId, ref: "True_False" }],
  createdAt: { type: Date, default: Date.now },
});

const Test = models.Test || model(" Test ", TestSchema);

export default Test;
