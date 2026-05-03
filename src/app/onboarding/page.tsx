import { auth } from "@/auth";
import { OnboardingFlow } from "./OnboardingFlow";

export default async function OnboardingPage() {
  const session = await auth();

  return (
    <OnboardingFlow
      defaultName={session?.user?.name ?? ""}
      avatarUrl={session?.user?.image ?? undefined}
      email={session?.user?.email ?? undefined}
    />
  );
}
