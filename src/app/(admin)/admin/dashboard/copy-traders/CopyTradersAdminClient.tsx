"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  createCopyTraderAdmin,
  emitCopyTradeAdmin,
  setCopyTraderActiveAdmin,
  updateCopyTraderStatsAdmin,
  type AdminTraderRow,
} from "@/actions/admin/copyTraders";
import { Loader2, Plus, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function CopyTradersAdminClient({ traders }: { traders: AdminTraderRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [emittingId, setEmittingId] = useState<number | null>(null);
  const [savingStatsId, setSavingStatsId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    market: "CRYPTO",
    description: "",
    strategy: "",
    winRate: "",
    followers: "0",
    totalTrades: "0",
  });

  function emit(traderId: number) {
    setEmittingId(traderId);
    startTransition(async () => {
      try {
        const j = await emitCopyTradeAdmin(traderId);
        const msg =
          j.notice ??
          `Opened ${j.opened} copier trade(s), skipped ${j.skipped} · ${j.symbol} ${j.direction}`;
        if (j.opened === 0 && j.skipped === 0 && j.notice) {
          toast.message(msg);
        } else if (j.opened === 0) {
          toast.warning(msg);
        } else {
          toast.success(msg);
        }
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Emit failed");
      } finally {
        setEmittingId(null);
      }
    });
  }

  function createProfile() {
    startTransition(async () => {
      try {
        await createCopyTraderAdmin({
          name: form.name,
          market: form.market,
          description: form.description || undefined,
          strategy: form.strategy || undefined,
          winRate: form.winRate ? Number(form.winRate) : undefined,
          followers: Number(form.followers) || 0,
          totalTrades: Number(form.totalTrades) || 0,
          isActive: true,
        });
        toast.success("Trader profile created");
        setForm({
          name: "",
          market: "CRYPTO",
          description: "",
          strategy: "",
          winRate: "",
          followers: "0",
          totalTrades: "0",
        });
        setShowForm(false);
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not create trader");
      }
    });
  }

  function saveStats(
    traderId: number,
    followers: string,
    totalTrades: string,
    winRate: string,
  ) {
    setSavingStatsId(traderId);
    startTransition(async () => {
      try {
        await updateCopyTraderStatsAdmin(traderId, {
          followers: Number(followers),
          totalTrades: Number(totalTrades),
          winRate: winRate.trim() === "" ? null : Number(winRate),
        });
        toast.success("Trader stats updated");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Update failed");
      } finally {
        setSavingStatsId(null);
      }
    });
  }

  function toggleActive(trader: AdminTraderRow, next: boolean) {
    startTransition(async () => {
      try {
        await setCopyTraderActiveAdmin(trader.id, next);
        toast.success(next ? "Trader activated" : "Trader deactivated");
        router.refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Update failed");
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Emit trade</span> opens
          the same signal for every user actively copying that trader (with
          wallet balance and allocation). Users must subscribe on{" "}
          <span className="text-foreground">Dashboard → Copy trading</span> first.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Trader profiles
        </h2>
        <Button
          type="button"
          size="sm"
          variant={showForm ? "secondary" : "default"}
          onClick={() => setShowForm((v) => !v)}
        >
          <Plus className="mr-2 h-4 w-4" />
          {showForm ? "Cancel" : "New trader profile"}
        </Button>
      </div>

      {showForm ? (
        <div className="grid gap-4 rounded-xl border border-border p-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="trader-name">Display name</Label>
            <Input
              id="trader-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Alpha_Crypto"
            />
          </div>
          <div className="space-y-2">
            <Label>Market</Label>
            <Select
              value={form.market}
              onValueChange={(v) => setForm((f) => ({ ...f, market: v }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CRYPTO">Crypto</SelectItem>
                <SelectItem value="STOCK">Stocks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="win-rate">Win rate % (optional)</Label>
            <Input
              id="win-rate"
              type="number"
              min={0}
              max={100}
              value={form.winRate}
              onChange={(e) => setForm((f) => ({ ...f, winRate: e.target.value }))}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="trader-desc">Description</Label>
            <Input
              id="trader-desc"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="trader-strategy">Strategy</Label>
            <Input
              id="trader-strategy"
              value={form.strategy}
              onChange={(e) =>
                setForm((f) => ({ ...f, strategy: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="followers">Followers (display)</Label>
            <Input
              id="followers"
              type="number"
              min={0}
              step={1}
              value={form.followers}
              onChange={(e) =>
                setForm((f) => ({ ...f, followers: e.target.value }))
              }
              placeholder="e.g. 1250"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-trades">Total trades (display)</Label>
            <Input
              id="total-trades"
              type="number"
              min={0}
              step={1}
              value={form.totalTrades}
              onChange={(e) =>
                setForm((f) => ({ ...f, totalTrades: e.target.value }))
              }
              placeholder="e.g. 480"
            />
          </div>
          <div className="sm:col-span-2">
            <Button
              type="button"
              disabled={pending || !form.name.trim()}
              onClick={createProfile}
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create profile
            </Button>
          </div>
        </div>
      ) : null}

      {traders.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No traders yet. Create a profile or run{" "}
          <code className="rounded bg-muted px-1">npm run db:seed</code>.
        </p>
      ) : (
        <ul className="space-y-3">
          {traders.map((t) => {
            const busy = pending && emittingId === t.id;
            const savingStats = pending && savingStatsId === t.id;
            return (
              <TraderStatsRow
                key={t.id}
                trader={t}
                busy={busy}
                savingStats={savingStats}
                pending={pending}
                onEmit={() => emit(t.id)}
                onToggleActive={(next) => toggleActive(t, next)}
                onSaveStats={(followers, totalTrades, winRate) =>
                  saveStats(t.id, followers, totalTrades, winRate)
                }
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

function TraderStatsRow({
  trader: t,
  busy,
  savingStats,
  pending,
  onEmit,
  onToggleActive,
  onSaveStats,
}: {
  trader: AdminTraderRow;
  busy: boolean;
  savingStats: boolean;
  pending: boolean;
  onEmit: () => void;
  onToggleActive: (next: boolean) => void;
  onSaveStats: (
    followers: string,
    totalTrades: string,
    winRate: string,
  ) => void;
}) {
  const [followers, setFollowers] = useState(String(t.followers));
  const [totalTrades, setTotalTrades] = useState(String(t.totalTrades));
  const [winRate, setWinRate] = useState(
    t.winRate != null ? String(t.winRate) : "",
  );

  useEffect(() => {
    setFollowers(String(t.followers));
    setTotalTrades(String(t.totalTrades));
    setWinRate(t.winRate != null ? String(t.winRate) : "");
  }, [t.followers, t.totalTrades, t.winRate]);

  return (
    <li className="flex flex-col gap-4 rounded-xl border border-border px-4 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="font-medium">
            {t.name}{" "}
            <span className="text-muted-foreground font-normal">
              · {t.market}
            </span>
          </p>
          {t.description ? (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {t.description}
            </p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            {t.activeCopiers} active copier
            {t.activeCopiers === 1 ? "" : "s"}
            {!t.isActive ? " · Profile inactive (emit disabled)" : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              checked={t.isActive}
              disabled={pending}
              onCheckedChange={(v) => onToggleActive(v === true)}
            />
            <span className="text-xs text-muted-foreground">Active</span>
          </label>
          <Button
            size="sm"
            disabled={!t.isActive || busy}
            onClick={onEmit}
          >
            {busy ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" strokeWidth={2} />
            )}
            Emit trade
          </Button>
        </div>
      </div>
      <div className="grid gap-3 border-t border-border pt-3 sm:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor={`followers-${t.id}`} className="text-xs">
            Followers
          </Label>
          <Input
            id={`followers-${t.id}`}
            type="number"
            min={0}
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`trades-${t.id}`} className="text-xs">
            Total trades
          </Label>
          <Input
            id={`trades-${t.id}`}
            type="number"
            min={0}
            value={totalTrades}
            onChange={(e) => setTotalTrades(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`win-${t.id}`} className="text-xs">
            Win rate %
          </Label>
          <Input
            id={`win-${t.id}`}
            type="number"
            min={0}
            max={100}
            value={winRate}
            onChange={(e) => setWinRate(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="w-full"
            disabled={pending || savingStats}
            onClick={() => onSaveStats(followers, totalTrades, winRate)}
          >
            {savingStats ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save stats
          </Button>
        </div>
      </div>
    </li>
  );
}
