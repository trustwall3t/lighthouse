"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-auth";
import { emitTraderTrades } from "@/lib/copy-trading/service";
import { db } from "@/lib/db";

const COPY_TRADERS_PATH = "/admin/dashboard/copy-traders";

async function requireAdmin() {
  const admin = await getAdminSession();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

export type AdminTraderRow = {
  id: number;
  name: string;
  market: string;
  description: string | null;
  strategy: string | null;
  winRate: number | null;
  followers: number;
  totalTrades: number;
  isActive: boolean;
  activeCopiers: number;
};

export async function emitCopyTradeAdmin(traderId: number) {
  await requireAdmin();
  const result = await emitTraderTrades(traderId);
  revalidatePath(COPY_TRADERS_PATH);
  return result;
}

export async function createCopyTraderAdmin(input: {
  name: string;
  market: string;
  description?: string;
  strategy?: string;
  winRate?: number;
  followers?: number;
  totalTrades?: number;
  isActive?: boolean;
}) {
  await requireAdmin();

  const name = input.name.trim();
  if (!name) throw new Error("Trader name is required.");
  const market = input.market.trim().toUpperCase();
  if (market !== "CRYPTO" && market !== "STOCK") {
    throw new Error("Market must be CRYPTO or STOCK.");
  }

  const existing = await db.trader.findFirst({ where: { name } });
  if (existing) throw new Error("A trader with this name already exists.");

  const assetCount = await db.copyAsset.count({ where: { market } });
  if (assetCount === 0) {
    throw new Error(
      `No copy assets for ${market}. Run db seed (npm run db:seed).`,
    );
  }

  await db.trader.create({
    data: {
      name,
      market,
      description: input.description?.trim() || null,
      strategy: input.strategy?.trim() || null,
      winRate: input.winRate ?? null,
      followers: input.followers ?? 0,
      totalTrades: input.totalTrades ?? 0,
      isActive: input.isActive ?? true,
    },
  });

  revalidatePath(COPY_TRADERS_PATH);
  return { ok: true as const };
}

export async function setCopyTraderActiveAdmin(
  traderId: number,
  isActive: boolean,
) {
  await requireAdmin();
  await db.trader.update({
    where: { id: traderId },
    data: { isActive },
  });
  revalidatePath(COPY_TRADERS_PATH);
  return { ok: true as const };
}

export async function updateCopyTraderStatsAdmin(
  traderId: number,
  input: {
    followers?: number;
    totalTrades?: number;
    winRate?: number | null;
  },
) {
  await requireAdmin();

  const data: {
    followers?: number;
    totalTrades?: number;
    winRate?: number | null;
  } = {};

  if (input.followers !== undefined) {
    if (!Number.isFinite(input.followers) || input.followers < 0) {
      throw new Error("Followers must be 0 or greater.");
    }
    data.followers = Math.floor(input.followers);
  }
  if (input.totalTrades !== undefined) {
    if (!Number.isFinite(input.totalTrades) || input.totalTrades < 0) {
      throw new Error("Total trades must be 0 or greater.");
    }
    data.totalTrades = Math.floor(input.totalTrades);
  }
  if (input.winRate !== undefined) {
    if (input.winRate === null) {
      data.winRate = null;
    } else if (
      !Number.isFinite(input.winRate) ||
      input.winRate < 0 ||
      input.winRate > 100
    ) {
      throw new Error("Win rate must be between 0 and 100.");
    } else {
      data.winRate = input.winRate;
    }
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nothing to update.");
  }

  await db.trader.update({
    where: { id: traderId },
    data,
  });

  revalidatePath(COPY_TRADERS_PATH);
  revalidatePath("/dashboard/copy");
  return { ok: true as const };
}
