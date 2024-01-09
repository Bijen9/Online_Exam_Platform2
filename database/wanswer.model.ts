import { Schema, models, model, Document } from "mongoose";

export interface IWanswer extends Document {
  StudentId: Schema.Types.ObjectId;
  QuestionId: Schema.Types.ObjectId;
  comment: string;
  answer: string;
  marked: boolean;
  createdAt: Date;
}

const WanswerSchema = new Schema({
  StudentId: { type: Schema.Types.ObjectId, ref: "User" },
  QuestionId: { type: Schema.Types.ObjectId, ref: "Wquestion" },
  answer: { type: String, required: true },
  comment: { type: String },
  marked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Wanswer = models.Wanswer || model<IWanswer>("Wanswer", WanswerSchema);

export default Wanswer;
