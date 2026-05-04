"use client";

import { ChevronLeft, Send } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { Avatar } from "@/components/app/Avatar";
import { THREADS } from "@/lib/mock/messages";
import type { Message, Thread } from "@/lib/types";
import { relativeTime } from "@/lib/utils";

export default function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? THREADS.find((t) => t.id === activeId) : null;

  if (active) {
    return <ThreadView thread={active} onBack={() => setActiveId(null)} />;
  }

  return (
    <>
      <AppHeader title="MESSAGES" />
      <ul className="divide-rule divide-y">
        {THREADS.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => setActiveId(t.id)}
              className="flex w-full items-start gap-3 px-4 py-4 text-left hover:bg-ink/[0.02]"
            >
              <Avatar name={t.withName} hue={t.withHue} size={44} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-ink truncate text-[14px]">{t.withName}</p>
                  <span className="mono text-dim shrink-0 text-[11px]">
                    {relativeTime(t.lastSentAt)}
                  </span>
                </div>
                <p className="label text-bone mt-0.5">{t.withRole.toUpperCase()}</p>
                {t.context && (
                  <p className="label text-flare mt-1.5">● {t.context}</p>
                )}
                <p className="text-mute mt-1.5 line-clamp-2 text-[13px] leading-snug">
                  {t.lastMessage}
                </p>
              </div>
              {t.unread > 0 && (
                <span className="bg-flare text-bg label mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5">
                  {t.unread}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function ThreadView({ thread, onBack }: { thread: Thread; onBack: () => void }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(thread.messages);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { id: String(Date.now()), from: "me", body: text, sentAt: new Date().toISOString() },
    ]);
    setText("");
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-rule bg-bg/85 sticky top-0 z-30 border-b backdrop-blur-md">
        <div className="flex items-center gap-3 px-3 py-2">
          <button
            onClick={onBack}
            className="text-mute hover:text-ink -ml-1 flex h-10 w-10 items-center justify-center"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
          <Avatar name={thread.withName} hue={thread.withHue} size={36} />
          <div className="min-w-0 flex-1">
            <p className="text-ink truncate text-[14px] leading-tight">
              {thread.withName}
            </p>
            <p className="label text-mute mt-0.5">{thread.withRole.toUpperCase()}</p>
          </div>
        </div>
        {thread.context && (
          <p className="label text-flare border-rule border-t px-4 py-2">
            ● {thread.context}
          </p>
        )}
      </header>

      <ul className="flex-1 space-y-2.5 px-4 py-5">
        {messages.map((m) => (
          <li
            key={m.id}
            className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] border px-3.5 py-2.5 text-[14px] leading-snug ${
                m.from === "me"
                  ? "bg-ink text-bg border-ink"
                  : "bg-surface text-ink border-rule-strong"
              }`}
            >
              {m.body}
              <div
                className={`mono mt-1 text-[10px] tracking-wide ${
                  m.from === "me" ? "text-bg/50" : "text-dim"
                }`}
              >
                {new Date(m.sentAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <form
        onSubmit={send}
        className="border-rule bg-bg/90 sticky bottom-16 z-20 flex items-center gap-2 border-t px-3 py-2 backdrop-blur-md"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message…"
          className="border-rule-strong bg-surface text-ink placeholder:text-dim flex-1 border px-3 py-2.5 text-[14px] outline-none focus:border-ink/30"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-ink text-bg flex h-11 w-11 items-center justify-center disabled:opacity-50"
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
