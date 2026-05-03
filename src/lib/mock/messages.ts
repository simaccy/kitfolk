import type { Thread } from "../types";

export const THREADS: Thread[] = [
  {
    id: "th-1",
    withName: "Tom Bevan",
    withRole: "Sound Mixer · Bristol",
    withHue: 100,
    context: "Booking · KF-2284 · FX6",
    lastMessage: "Sounds good — see you at 08:30 outside Stokes Croft.",
    lastSentAt: "2026-05-02T20:14:00Z",
    unread: 1,
    messages: [
      { id: "m1", from: "me", body: "Hey Tom — confirmed for Tuesday. OK to pick up at 8?", sentAt: "2026-05-02T19:11:00Z" },
      { id: "m2", from: "them", body: "Yeah perfect, kit's all charged. PIN is 47-22.", sentAt: "2026-05-02T19:14:00Z" },
      { id: "m3", from: "me", body: "Brilliant. I'll bring my own media.", sentAt: "2026-05-02T19:50:00Z" },
      { id: "m4", from: "them", body: "Sounds good — see you at 08:30 outside Stokes Croft.", sentAt: "2026-05-02T20:14:00Z" },
    ],
  },
  {
    id: "th-2",
    withName: "Lily Kerr",
    withRole: "Producer · Northwind",
    withHue: 14,
    context: "Call · Camera op + FX6 — Leeds",
    lastMessage: "Great. We'll send the call sheet by 9pm.",
    lastSentAt: "2026-05-02T18:30:00Z",
    unread: 0,
    messages: [
      { id: "m1", from: "them", body: "Hi — saw your response on the Leeds call. Available tomorrow?", sentAt: "2026-05-02T17:55:00Z" },
      { id: "m2", from: "me", body: "Yes, all set. Day rate £550 inclusive of FX6.", sentAt: "2026-05-02T18:11:00Z" },
      { id: "m3", from: "them", body: "Great. We'll send the call sheet by 9pm.", sentAt: "2026-05-02T18:30:00Z" },
    ],
  },
  {
    id: "th-3",
    withName: "Asha Patel",
    withRole: "DOP · London",
    withHue: 14,
    context: "Booking · KF-2271",
    lastMessage: "Perfect. I'll lock in the Cooke set as well.",
    lastSentAt: "2026-04-29T16:00:00Z",
    unread: 0,
    messages: [
      { id: "m1", from: "me", body: "Locked in for the 22nd. Can we add the SmallHD?", sentAt: "2026-04-29T15:00:00Z" },
      { id: "m2", from: "them", body: "Perfect. I'll lock in the Cooke set as well.", sentAt: "2026-04-29T16:00:00Z" },
    ],
  },
  {
    id: "th-4",
    withName: "Bristol docs crew",
    withRole: "Circle · 5 members",
    withHue: 100,
    context: "Group chat",
    lastMessage: "Marc: Call sheet up — pickup 6.30am Friday.",
    lastSentAt: "2026-04-30T09:42:00Z",
    unread: 2,
    messages: [
      { id: "m1", from: "them", body: "Joel: Heading down Friday. Anyone going via Bath?", sentAt: "2026-04-30T08:11:00Z" },
      { id: "m2", from: "them", body: "Tom: Yes, can pick up.", sentAt: "2026-04-30T08:23:00Z" },
      { id: "m3", from: "them", body: "Marc: Call sheet up — pickup 6.30am Friday.", sentAt: "2026-04-30T09:42:00Z" },
    ],
  },
];

export function findThread(id: string): Thread | undefined {
  return THREADS.find((t) => t.id === id);
}
