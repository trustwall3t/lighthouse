"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authSignupUrl } from "@/lib/public/auth-links";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  logoUrl: string;
  initialCode: string;
};

export function BerkforteVerifyGate({ logoUrl, initialCode }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const hint = useMemo(() => initialCode, [initialCode]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toUpperCase() !== hint.trim().toUpperCase()) {
      setError("Code does not match. Copy the code shown above exactly.");
      return;
    }
    window.location.href = authSignupUrl;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm">
        <Link href="/" className="mx-auto block w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="" className="h-10 w-auto object-contain" />
        </Link>
        <div>
          <h1 className="text-center text-lg font-semibold text-foreground">
            Registration check
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Confirm you are not a robot by entering the code below. This step
            is required before you can register.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hint-code">Your code</Label>
            <Input
              id="hint-code"
              readOnly
              className="bg-brand/10 text-center font-mono tracking-widest"
              value={hint}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enter-code">
              Enter code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="enter-code"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              required
              autoComplete="off"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full">
            Verify &amp; continue
          </Button>
        </form>
      </div>
    </div>
  );
}
