import { Schema, models, model, Document } from "mongoose";

export interface IRole extends Document {
  // type  : enum {admin, user};
  type: string;
  roleName: string;
  createdAt: Date;
}

const RoleSchema = new Schema({
  type: { type: String, required: true },
  roleName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Role = models.Role || model<IRole>(" Role ", RoleSchema);

export default Role;
