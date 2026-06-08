import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Lead from "@/models/Lead";
import { sendWelcomeEmail } from "@/libs/sendWelcome";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Legacy lead-capture route (still used by the <ButtonLead /> component).
// The Download modal now goes through auth, which creates the lead + user and
// sends the welcome email in the NextAuth createUser event instead.
// New leads still get a one-time welcome email; repeat submitters skip it.
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
      await sendWelcomeEmail(email);
    }
    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
