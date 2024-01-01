import { Schema, models, model, Document } from "mongoose";

export interface IWanswer extends Document {
  StudentId: Schema.Types.ObjectId;
  QuestionId: Schema.Types.ObjectId;
  answer: string;
  correct: boolean;
  createdAt: Date;
}

const WanswerSchema = new Schema({
  StudentId: { type: Schema.Types.ObjectId, ref: "User" },
  QuestionId: { type: Schema.Types.ObjectId, ref: "Wquestion" },
  answer: { type: String, required: true },
  correct: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

const Wanswer = models.Wanswer || model(" Wanswer ", WanswerSchema);

export default Wanswer;
