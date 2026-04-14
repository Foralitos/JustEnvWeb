# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build (also runs next-sitemap via postbuild)
npm run start     # Start production server
npm run lint      # Run ESLint via Next.js
```

There are no automated tests configured. Test Stripe webhooks locally with the Stripe CLI.

## Architecture

This is a **Next.js 15 SaaS boilerplate** (ShipFast) using the App Router. The stack: React 19, NextAuth v5, MongoDB + Mongoose, Stripe, Tailwind CSS v4, DaisyUI v5, Resend email.

### Key directories

- `app/` — App Router pages and API routes
  - `app/api/` — API routes (auth, stripe checkout/portal/webhook, admin, lead capture)
  - `app/(private)/` — Protected routes requiring auth (admin dashboard, user dashboard)
  - `app/blog/` — Blog section
- `components/` — React components (landing page sections, forms, admin UI)
- `libs/` — Utilities and service integrations
- `models/` — Mongoose schemas (User, Lead)
- `config.js` — **Single source of truth** for app config (name, domain, Stripe plans, email, theme, auth paths)

### Authentication flow

NextAuth v5 is configured in `libs/auth.js`. Providers: Google OAuth + Email (magic link via Resend). Sessions use JWT strategy. The `middleware.js` (edge-compatible) protects routes matching everything except API routes, static files, and images. Auth callbacks redirect to `config.auth.callbackUrl` (`/dashboard`).

Get the session in server context: `const session = await auth()` from `@/libs/auth`.

### Database

Two Mongoose connections exist intentionally:
- `libs/mongo.js` — Native MongoDB client used by NextAuth adapter
- `libs/mongoose.js` — Mongoose connection (`connectMongo()`) used for model operations

Always call `connectMongo()` before any Mongoose model operations in API routes.

### Stripe payments

- `libs/stripe.js` — `createCheckout()` and `createCustomerPortal()` helpers
- `app/api/stripe/` — Checkout and portal endpoints
- `app/api/webhook/stripe/route.js` — Handles payment events, sets `user.hasAccess = true` on successful payment
- Plans are defined in `config.stripe.plans` — each plan needs a `priceId` (separate dev/prod values)
- User model stores `customerId`, `priceId`, and `hasAccess` fields

### API route pattern

```javascript
import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import connectMongo from "@/libs/mongoose";

export async function POST(req) {
  try {
    const session = await auth();
    const body = await req.json();
    await connectMongo();
    // logic
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
```

### Client component with API call

Use `apiClient` from `@/libs/api` (Axios instance with built-in auth handling — auto-redirects on 401):

```javascript
"use client";
import apiClient from "@/libs/api";

// apiClient.post("/api/endpoint", data)
```

### Mongoose model pattern

```javascript
import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const schema = mongoose.Schema({ ... }, { timestamps: true, toJSON: { virtuals: true } });
schema.plugin(toJSON);
export default mongoose.models.ModelName || mongoose.model("ModelName", schema);
```

## Conventions

- **Imports**: Use `@/` absolute imports (maps to project root via `jsconfig.json`)
- **Components**: PascalCase filenames, `export default`, `"use client"` only when needed
- **API directories**: kebab-case with `route.js`
- **Config access**: Always import from `@/config`, never hardcode app name/domain/URLs
- **Roles**: User model has `role` field with values: `user`, `admin`, `editor`, `moderator`
- **Theme**: DaisyUI theme set in `config.colors.theme`; custom themes must also be added to Tailwind config

## Environment variables

Copy `.env.example` to `.env.local`. Required: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `MONGODB_URI`, `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`. Optional: `GOOGLE_ID`, `GOOGLE_SECRET`.
