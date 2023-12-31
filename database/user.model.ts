import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  fullName: string;
  TestCreated: Schema.Types.ObjectId[];
  TestIssued: Schema.Types.ObjectId[];
  Organization: Schema.Types.ObjectId;
  Role: Schema.Types.ObjectId;
  createdAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String },
  TestCreated: [{ type: Schema.Types.ObjectId, ref: "Test" }],
  TestIssued: [{ type: Schema.Types.ObjectId, ref: "Test" }],
  Organization: { type: Schema.Types.ObjectId, ref: "Organization" },
  Role: { type: Schema.Types.ObjectId, ref: "Role" },
  createdAt: { type: Date, default: Date.now },
});
const User = models.User || model<IUser>("User", UserSchema);
export default User;
