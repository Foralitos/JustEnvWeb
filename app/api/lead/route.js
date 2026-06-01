import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// This route stores leads captured from the landing page download modal.
// Duplicate emails just return 200 OK without creating a new record.
export async function POST(req) {
  await connectMongo();

  const body = await req.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400 }
    );
  }

  try {
    const existing = await Lead.findOne({ email });
    if (!existing) {
      await Lead.create({ email });
    }
    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
