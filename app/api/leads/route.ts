import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import { ILead, VisaType } from "../../../types/lead";
import Lead from "@/models/lead";

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;

  const search = url.searchParams.get("search") || "";
  const status = url.searchParams.get("status") || "";

  const query: any = {};

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const total = await Lead.countDocuments(query);
  const leads = await Lead.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({
    success: true,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    leads,
  });
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const visasArray: VisaType[] = Array.isArray(body.visas)
      ? body.visas
      : JSON.parse(body.visas || "[]");

    const lead: ILead = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      linkedin: body.linkedin,
      country: body.country,
      status: body.status,
      visas: visasArray,
      notes: body.notes,
    };

    const createdLead = await Lead.create(lead);
    return NextResponse.json({
      success: true,
      message: "Lead created successfully",
      lead: createdLead,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create lead" },
      { status: 400 }
    );
  }
}
