"use client";

import { RequestAccessProvider } from "./RequestAccessContext";
import { RequestAccessModal } from "./RequestAccessModal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <RequestAccessProvider>
      {children}
      <RequestAccessModal />
    </RequestAccessProvider>
  );
}
