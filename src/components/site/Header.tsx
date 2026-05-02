"use client";

import { useEffect, useState } from "react";
import { Container } from "./Container";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-rule bg-bg/80 border-b backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-14 items-center justify-between md:h-16">
        <a
          href="#top"
          className="text-ink flex items-baseline gap-2 tracking-tight"
        >
          <span className="serif text-2xl md:text-[26px]">KitFolk</span>
          <span className="label text-dim hidden md:inline">/ network</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Problem", "#problem"],
            ["Product", "#solution"],
            ["Trust", "#trust"],
            ["Circles", "#circles"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="label text-mute hover:text-ink transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="label text-mute hidden md:inline">
            <span className="text-rec animate-rec mr-1.5 inline-block">●</span>
            EARLY ACCESS · OPEN
          </span>
          <a
            href="#cta"
            className="bg-ink text-bg label hover:bg-bone px-4 py-2.5 transition-colors"
          >
            Join the network →
          </a>
        </div>
      </Container>
    </header>
  );
}
