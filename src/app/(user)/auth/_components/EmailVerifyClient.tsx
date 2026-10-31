"use client";

import { useSearchParams, redirect } from "next/navigation";
import VerifyForm from "./VerifyForm";

export function EmailVerifyClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    redirect("/auth/signup");
  }

  return <VerifyForm email={email} />;
}
