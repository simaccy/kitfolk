"use client";

import { createContext, useContext, useState } from "react";

interface RequestAccessCtx {
  isOpen: boolean;
  initialEmail: string;
  open: (email?: string) => void;
  close: () => void;
}

const Ctx = createContext<RequestAccessCtx | null>(null);

export function RequestAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");

  function open(email = "") {
    setInitialEmail(email);
    setIsOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }

  function close() {
    setIsOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }

  return (
    <Ctx.Provider value={{ isOpen, initialEmail, open, close }}>
      {children}
    </Ctx.Provider>
  );
}

export function useRequestAccess() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRequestAccess must be used inside RequestAccessProvider");
  return ctx;
}
