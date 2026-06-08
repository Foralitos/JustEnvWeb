import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import config from "@/config";
import { verifyAppToken } from "@/libs/appToken";

// Called by the native macOS app with `Authorization: Bearer <app-token>`.
// Returns the current entitlement so the app can set its project limit.
// hasAccess is read LIVE from Mongo on every call → reflects purchases/refunds.
// This route is excluded from middleware (matcher skips /api), so it relies
// solely on the bearer token, not a session cookie.
export async function GET(req) {
  const authz = req.headers.get("authorization") || "";
  const token = authz.startsWith("Bearer ") ? authz.slice(7).trim() : "";

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  let payload;
  try {
    payload = await verifyAppToken(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    await connectMongo();
    const user = await User.findById(payload.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const plan =
      config.stripe.plans.find((p) => p.priceId === user.priceId)?.name || null;

    // Read fields explicitly — the toJSON plugin strips `email` (marked private).
    return NextResponse.json({
      email: user.email,
      hasAccess: !!user.hasAccess,
      plan,
    });
  } catch (e) {
    console.error("entitlement error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
