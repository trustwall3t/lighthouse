import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { EmailVerifyClient } from "../_components/EmailVerifyClient";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loader />}>
      <EmailVerifyClient />
    </Suspense>
  );
}
