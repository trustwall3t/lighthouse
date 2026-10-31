"use client";

import { useSearchParams, redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

export function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    redirect("/auth/login");
  }

  return <ResetPasswordForm id={id} />;
}
