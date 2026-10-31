import {
  ADMIN_SCREENS,
  adminRouteKey,
} from "@/app/(admin)/admin/dashboard/_screens/registry";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ segments?: string[] }> };

export default async function AdminDashboardRouterPage({ params }: Props) {
  const { segments } = await params;
  const resolved = adminRouteKey(segments);
  if (!resolved) notFound();

  if (resolved.kind === "user") {
    const mod = await import("../_screens/user-detail");
    const Screen = mod.default;
    return <Screen params={Promise.resolve({ id: resolved.id })} />;
  }

  const mod = await ADMIN_SCREENS[resolved.key]();
  const Screen = mod.default;
  return <Screen />;
}
