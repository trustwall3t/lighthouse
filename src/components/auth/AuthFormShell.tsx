import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
};

export function AuthFormShell({
  title,
  description,
  children,
  className,
  size = "md",
}: Props) {
  return (
    <div
      className={cn(
        "mx-4 w-full space-y-4 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm sm:p-10",
        size === "lg" ? "max-w-lg" : "max-w-md",
        className,
      )}
    >
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
