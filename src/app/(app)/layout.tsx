import { BottomNav } from "@/components/app/BottomNav";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-bg text-ink min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-[520px] flex-col border-x border-white/[0.04]">
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
