"use client";

import { createContext, useContext } from "react";

import type { Profile } from "@/types/database";

const AppProfileContext = createContext<Profile | null>(null);

export function AppProfileProvider({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  return (
    <AppProfileContext.Provider value={profile}>
      {children}
    </AppProfileContext.Provider>
  );
}

export function useAppProfile() {
  return useContext(AppProfileContext);
}
