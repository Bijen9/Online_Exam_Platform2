import { Schema, models, model, Document } from "mongoose";

export interface ITest extends Document {
  name: string;
  description: string;
  CreatedBy: Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: boolean;
  published: boolean;
  result: boolean;
  completedBy: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  CreatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: Boolean, default: true },
  published: { type: Boolean, default: false },
  result: { type: Boolean, default: false },
  CompletedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Test = models.Test || model<ITest>("Test", TestSchema);

export default Test;
