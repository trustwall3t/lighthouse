import {
  placeSelfTrade,
  settleDueTrades,
  startCopying,
} from "@/lib/copy-trading/service";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { joinInvestmentPlan } from "@/lib/investment/join-plan";
import { runAutomaticRoi } from "@/lib/investment/roi-cron";
import type { MarketAsset } from "@/lib/market";
import {
  fetchCryptosMarkets,
  fetchStocksBySymbols,
} from "@/lib/market/fetch-quotes";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

const TOP_STOCKS = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "META", name: "Meta" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "BRK-B", name: "Berkshire Hathaway" },
  { symbol: "JPM", name: "JPMorgan Chase" },
  { symbol: "V", name: "Visa" },
  { symbol: "UNH", name: "UnitedHealth" },
  { symbol: "XOM", name: "Exxon Mobil" },
  { symbol: "JNJ", name: "Johnson & Johnson" },
  { symbol: "WMT", name: "Walmart" },
  { symbol: "MA", name: "Mastercard" },
] as const;

function cronAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function handleApiGet(
  pathKey: string,
  req: Request,
): Promise<NextResponse> {
  switch (pathKey) {
    case "auth/session": {
      try {
        const session = await getSession();
        if (!session) {
          return NextResponse.json({ user: null }, { status: 401 });
        }
        return NextResponse.json({ user: session.user });
      } catch (error) {
        console.error("Error in session route:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      }
    }
    case "market/quotes": {
      const { searchParams } = new URL(req.url);
      const type = searchParams.get("type") === "stocks" ? "stocks" : "crypto";
      try {
        const assets: MarketAsset[] =
          type === "stocks"
            ? await fetchStocksBySymbols([...TOP_STOCKS])
            : await fetchCryptosMarkets();
        return NextResponse.json({
          type,
          updatedAt: new Date().toISOString(),
          assets,
        });
      } catch (error) {
        console.error("Market quotes error:", error);
        return NextResponse.json(
          { error: "Failed to load market data" },
          { status: 502 },
        );
      }
    }
    case "cron/run-all": {
      if (!cronAuthorized(req)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const [copy, roi] = await Promise.all([
        settleDueTrades(),
        runAutomaticRoi(),
      ]);
      return NextResponse.json({
        ok: true,
        at: new Date().toISOString(),
        copy,
        roi,
      });
    }
    default:
      return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function handleApiPost(
  pathKey: string,
  req: Request,
): Promise<NextResponse> {
  if (pathKey === "cron/run-all") {
    return handleApiGet(pathKey, req);
  }

  switch (pathKey) {
    case "investment/join": {
      const session = await getSession();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const body = (await req.json()) as { planId?: number; amount?: number };
      if (!body.planId || !body.amount) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
      }
      try {
        const plan = await joinInvestmentPlan(
          session.userId,
          body.planId,
          body.amount,
        );
        return NextResponse.json({ plan });
      } catch (e) {
        const message = e instanceof Error ? e.message : "Could not join plan";
        return NextResponse.json({ error: message }, { status: 422 });
      }
    }
    case "trade/self": {
      const session = await getSession();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const body = (await req.json()) as {
        symbol?: string;
        market?: string;
        direction?: "up" | "down";
        durationSeconds?: number;
        stake?: number;
      };
      try {
        const trade = await placeSelfTrade(
          session.userId,
          body.symbol ?? "BTC",
          body.market ?? "CRYPTO",
          body.direction ?? "up",
          body.durationSeconds ?? 900,
          body.stake ?? 0,
        );
        return NextResponse.json({ trade });
      } catch (e) {
        const message = e instanceof Error ? e.message : "Trade failed";
        return NextResponse.json({ error: message }, { status: 422 });
      }
    }
    case "copy/subscribe": {
      const session = await getSession();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const body = (await req.json()) as {
        traderId?: number;
        allocation?: number;
      };
      if (!body.traderId || !body.allocation) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
      }
      try {
        const sub = await startCopying(
          session.userId,
          body.traderId,
          body.allocation,
        );
        return NextResponse.json({ subscription: sub });
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to subscribe";
        return NextResponse.json({ error: message }, { status: 422 });
      }
    }
    case "upload": {
      try {
        const session = await getSession();
        if (!session) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) {
          return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
          return NextResponse.json(
            { error: "File size must be less than 10MB" },
            { status: 400 },
          );
        }
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "application/pdf",
        ];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { error: "Invalid file type. Only images and PDFs are allowed" },
            { status: 400 },
          );
        }
        const imageUrl = await uploadToCloudinary(file);
        return NextResponse.json({ url: imageUrl }, { status: 200 });
      } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 },
        );
      }
    }
    default:
      return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
