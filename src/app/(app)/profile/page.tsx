import { auth } from "@/auth";
import { CURRENT_USER } from "@/lib/mock/current-user";
import { signOutAction } from "./actions";
import { ProfileView } from "./ProfileView";

export default async function ProfilePage() {
  const session = await auth();

  // Overlay the signed-in user's identity on top of the (mock) profile data.
  // Credits, trust score, vouches etc. would come from a database in production.
  const user = {
    ...CURRENT_USER,
    name: session?.user?.name ?? CURRENT_USER.name,
    email: session?.user?.email ?? null,
    image: session?.user?.image ?? null,
  };

  return <ProfileView user={user} onSignOut={signOutAction} />;
}
