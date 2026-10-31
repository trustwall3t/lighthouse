import { handleApiGet, handleApiPost } from "@/lib/api/http-handlers";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ path?: string[] }> };

async function pathKey(params: Ctx["params"]): Promise<string> {
  const { path } = await params;
  return path?.join("/") ?? "";
}

export async function GET(req: Request, ctx: Ctx) {
  const key = await pathKey(ctx.params);
  if (!key) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return handleApiGet(key, req);
}

export async function POST(req: Request, ctx: Ctx) {
  const key = await pathKey(ctx.params);
  if (!key) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return handleApiPost(key, req);
}
