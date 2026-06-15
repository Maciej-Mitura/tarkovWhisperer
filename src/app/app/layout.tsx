import { redirect } from "next/navigation";

import { AppProfileProvider } from "@/components/layout/app-profile-provider";
import { ROUTES } from "@/config/routes";
import { getCurrentUserProfile } from "@/lib/actions/profile";
import { getAuthenticatedUser } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return <>{children}</>;
  }

  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(ROUTES.login);
  }

  const profileResult = await getCurrentUserProfile();

  if (!profileResult.success) {
    redirect(ROUTES.login);
  }

  return (
    <AppProfileProvider profile={profileResult.data}>
      {children}
    </AppProfileProvider>
  );
}
