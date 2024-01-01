import { Schema, models, model, Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  location: string;
  type: string;
  createdAt: Date;
}

const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Organization =
  models.Organization || model(" Organization ", OrganizationSchema);

export default Organization;
