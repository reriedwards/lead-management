export const visaOptions = [
  "EB-1A",
  "O-1",
  "EB-2 NIW",
  "I don't know",
] as const;

export const statusOptions = ["pending", "reached out"] as const;

export type VisaType = (typeof visaOptions)[number];
export type StatusType = (typeof statusOptions)[number];

export interface ILeadWithId extends ILead {
  _id: string;
}

export interface ILead {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  country: string;
  visas: VisaType[];
  status: StatusType;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  country: string;
  visas: VisaType[];
  notes?: string;
  status: StatusType;
}
