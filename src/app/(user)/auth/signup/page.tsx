import { SignupForm } from "../_components/signupForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ referral: string }>;
}) {
  const params = await searchParams;
  const referral = params.referral;

  return <SignupForm refby={referral || ""} />;
}
