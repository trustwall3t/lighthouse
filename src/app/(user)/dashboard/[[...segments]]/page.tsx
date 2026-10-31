import {
  DASHBOARD_SCREENS,
  dashboardRouteKey,
} from "@/app/(user)/dashboard/_screens/registry";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ segments?: string[] }> };

export default async function DashboardRouterPage({ params }: Props) {
  const { segments } = await params;
  if (segments?.length === 1 && segments[0] === "trade") {
    const { redirect } = await import("next/navigation");
    redirect("/dashboard/live-trading");
  }
  const key = dashboardRouteKey(segments);
  if (key === null) notFound();

  const mod = await DASHBOARD_SCREENS[key]();
  const Screen = mod.default;
  return <Screen />;
}
