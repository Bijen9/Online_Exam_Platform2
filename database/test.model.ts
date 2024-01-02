import { Schema, models, model, Document } from "mongoose";

export interface ITest extends Document {
  name: string;
  description: string;
  CreatedBy: Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: boolean;
  completedBy: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TestSchema = new Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  CreatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  StartTime: { type: Date, required: true },
  EndTime: { type: Date },
  Status: { type: Boolean, default: true },
  CompletedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Test = models.Test || model<ITest>(" Test ", TestSchema);

export default Test;
