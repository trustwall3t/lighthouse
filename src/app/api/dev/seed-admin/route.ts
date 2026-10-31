import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

/**
 * Dev-only: upsert an admin using the same DATABASE_URL as the running app.
 * POST with Authorization: Bearer <JWT_SECRET>
 * Body: { email, password, name? }
 */
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

  let body: { email?: string; password?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  const name = body.name?.trim() || "Admin";

  if (!email || !password) {
    return NextResponse.json({ error: "email and password required" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await db.admin.upsert({
    where: { email },
    create: { email, name, password: passwordHash },
    update: { name, password: passwordHash },
  });

  return NextResponse.json({
    ok: true,
    email: admin.email,
    id: admin.id,
  });
}
