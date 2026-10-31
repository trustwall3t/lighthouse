import { AuthBrandLogo } from "@/components/auth/AuthBrandLogo";
import { AuthToolbar } from "@/components/auth/AuthToolbar";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Split auth shell — hero image left, form right (Hana / admin auth pattern). */
export function AuthSplitLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <div className="relative hidden min-h-screen w-full bg-[url('/bg-1.jpg')] bg-cover bg-center p-10 md:block md:max-w-[50%] md:flex-1">
        <div className="absolute inset-0 bg-background/20 dark:bg-background/50" />
        <div className="relative flex items-start">
          <AuthBrandLogo priority />
        </div>
      </div>
      <div className="relative flex w-full flex-1 flex-col bg-background">
        <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6 md:hidden">
          <AuthBrandLogo />
          <AuthToolbar />
        </div>
        <div className="relative flex flex-1 items-center justify-center overflow-y-auto px-2 py-8 sm:px-4">
          <div className="absolute right-4 top-4 z-10 hidden sm:right-6 sm:top-6 md:block">
            <AuthToolbar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
