import { ILead, visaOptions, statusOptions } from "@/types/lead";
import mongoose, { Document, Model, Schema } from "mongoose";

interface LeadDocument extends ILead, Document {}

const LeadSchema: Schema<LeadDocument> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    linkedin: { type: String, required: true },
    country: { type: String, required: true },
    visas: {
      type: [String],
      enum: visaOptions,
      required: true,
    },
    status: { type: String, enum: statusOptions, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const Lead: Model<LeadDocument> =
  mongoose.models.Lead || mongoose.model<LeadDocument>("Lead", LeadSchema);

export default Lead;
