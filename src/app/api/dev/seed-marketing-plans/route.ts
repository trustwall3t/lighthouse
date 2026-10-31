import { db } from "@/lib/db";
import { syncMarketingInvestmentPlans } from "@/lib/investment/sync-marketing-plans";
import { NextResponse } from "next/server";

/** Dev-only: sync plans from marketing `/investments`. POST + Bearer JWT_SECRET */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "JWT_SECRET not configured" }, { status: 500 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let removeUnused = true;
  try {
    const body = await request.json();
    if (body && typeof body.removeUnused === "boolean") {
      removeUnused = body.removeUnused;
    }
  } catch {
    /* empty body ok */
  }

  const result = await syncMarketingInvestmentPlans(db, { removeUnused });

  return NextResponse.json({ ok: true, ...result });
}
