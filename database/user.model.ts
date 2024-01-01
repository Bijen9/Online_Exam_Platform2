import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  name: string;
  username: string;
  image: string;
  TestCreated: Schema.Types.ObjectId[];
  TestIssued: Schema.Types.ObjectId[];
  Organization: Schema.Types.ObjectId;
  Role: Schema.Types.ObjectId;
  createdAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  username: { type: String },
  image: { type: String },
  TestCreated: [{ type: Schema.Types.ObjectId, ref: "Test" }],
  TestIssued: [{ type: Schema.Types.ObjectId, ref: "Test" }],
  Organization: { type: Schema.Types.ObjectId, ref: "Organization" },
  Role: { type: Schema.Types.ObjectId, ref: "Role" },
  createdAt: { type: Date, default: Date.now },
});
const User = models.User || model<IUser>("User", UserSchema);
export default User;
