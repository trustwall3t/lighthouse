"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
	Check,
	Info,
	Loader2,
	OctagonX,
	TriangleAlert,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useEffect, useState } from "react";

const toastSurface =
	"relative flex w-full items-start gap-3 overflow-hidden rounded-xl border bg-card/95 px-3.5 py-3 pr-9 text-card-foreground shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-card/90 dark:shadow-[0_8px_32px_rgb(0,0,0,0.45)]";

const toastClassNames = {
	toast: cn("group toast app-toast", toastSurface),
	title:
		"text-[13px] font-medium leading-5 tracking-[-0.01em] text-foreground",
	description:
		"mt-0.5 text-xs font-normal leading-[1.45] text-muted-foreground",
	content: "flex min-w-0 flex-1 flex-col justify-center gap-0.5 py-0.5",
	actionButton:
		"shrink-0 rounded-lg bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand-muted",
	cancelButton:
		"shrink-0 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
	closeButton:
		"!absolute !right-1.5 !top-1.5 !left-auto !translate-y-0 !border-0 !bg-transparent !p-1 !text-muted-foreground/80 !shadow-none transition-colors hover:!bg-muted hover:!text-foreground",
} as const;

function StatusIcon({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<span
			className={cn(
				"app-toast__icon mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
				className,
			)}
		>
			{children}
		</span>
	);
}

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Sonner
			theme={mounted ? (theme as ToasterProps["theme"]) : "light"}
			className="toaster group app-toaster"
			position="top-right"
			offset={{ top: 72, right: 20 }}
			mobileOffset={{ top: 64, right: 16, left: 16 }}
			gap={10}
			visibleToasts={3}
			expand={false}
			closeButton
			richColors={false}
			toastOptions={{
				classNames: toastClassNames,
				duration: 4000,
			}}
			icons={{
				success: (
					<StatusIcon className="border-[color-mix(in_oklab,var(--success)_28%,var(--border))] bg-[color-mix(in_oklab,var(--success)_10%,var(--card))]">
						<Check className="h-4 w-4 text-[var(--success)]" strokeWidth={2.5} />
					</StatusIcon>
				),
				error: (
					<StatusIcon className="border-[color-mix(in_oklab,var(--destructive)_30%,var(--border))] bg-[color-mix(in_oklab,var(--destructive)_10%,var(--card))]">
						<OctagonX
							className="h-4 w-4 text-destructive"
							strokeWidth={2.25}
						/>
					</StatusIcon>
				),
				warning: (
					<StatusIcon className="border-amber-500/25 bg-amber-500/10">
						<TriangleAlert
							className="h-4 w-4 text-amber-600 dark:text-amber-400"
							strokeWidth={2.25}
						/>
					</StatusIcon>
				),
				info: (
					<StatusIcon className="border-[color-mix(in_oklab,var(--brand)_28%,var(--border))] bg-brand-soft">
						<Info className="h-4 w-4 text-brand" strokeWidth={2.25} />
					</StatusIcon>
				),
				loading: (
					<StatusIcon className="border-[color-mix(in_oklab,var(--brand)_28%,var(--border))] bg-brand-soft">
						<Loader2
							className="h-4 w-4 animate-spin text-brand"
							strokeWidth={2.25}
						/>
					</StatusIcon>
				),
			}}
			style={
				{
					"--normal-bg": "var(--card)",
					"--normal-text": "var(--card-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "0.75rem",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
