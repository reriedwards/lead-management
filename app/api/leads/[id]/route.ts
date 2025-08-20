import dbConnect from "@/lib/dbConnect";
import Lead from "@/models/lead";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await req.json();
    const updatedLead = await Lead.findByIdAndUpdate(id, body, { new: true });

    if (!updatedLead) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update lead" },
      { status: 400 }
    );
  }
}
