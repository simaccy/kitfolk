"use client";

import { Compass, Megaphone, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/discover", label: "Discover", Icon: Compass },
  { href: "/calls", label: "Calls", Icon: Megaphone },
  { href: "/circles", label: "Circles", Icon: Users },
  { href: "/profile", label: "Profile", Icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="border-rule bg-bg/90 fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-[520px] grid-cols-4">
        {ITEMS.map(({ href, label, Icon }) => {
          const active =
            pathname === href || pathname?.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                className={`relative flex h-16 flex-col items-center justify-center gap-1 transition-colors ${
                  active ? "text-ink" : "text-mute hover:text-bone"
                }`}
              >
                {active && (
                  <span className="bg-flare absolute top-0 h-px w-10" />
                )}
                <Icon size={20} strokeWidth={active ? 2 : 1.6} />
                <span
                  className={`text-[10px] tracking-wide ${
                    active ? "text-ink" : "text-mute"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {label.toUpperCase()}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
