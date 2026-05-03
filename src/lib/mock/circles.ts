import type { Circle } from "../types";

export const CIRCLES: Circle[] = [
  {
    id: "bristol-docs",
    name: "Bristol docs crew",
    description: "Go-to people for natural history & long-form factual.",
    type: "CREW",
    members: [
      { id: "tom-bevan", name: "Tom Bevan", role: "Sound Mixer", avatarHue: 100 },
      { id: "marc-reyes", name: "Marc Reyes", role: "Gaffer", avatarHue: 200 },
      { id: "j-mwangi", name: "Joel Mwangi", role: "DOP", avatarHue: 130 },
      { id: "harriet-lowe", name: "Harriet Lowe", role: "Editor", avatarHue: 250 },
      { id: "noor-h", name: "Noor Hassan", role: "Drone Operator", avatarHue: 175 },
    ],
    kitIds: ["fx6-bristol-01", "soundkit-bristol-05", "aputure-london-04"],
    notes:
      "Used this team on Cold Front and Open Sky. Quick to mobilise, all PL covered, all happy to do longer doc rigs.",
    tags: ["Doc", "Bristol", "PL covered"],
    lastActiveISO: "2026-04-30T18:11:00Z",
  },
  {
    id: "ne-commercial",
    name: "North-East commercial team",
    description: "Manchester / Leeds / Sheffield commercial crew.",
    type: "REGION",
    members: [
      { id: "kit-foster", name: "Kit Foster", role: "Steadicam Op", avatarHue: 60 },
      { id: "daniel-okafor", name: "Daniel Okafor", role: "1st AD", avatarHue: 36 },
      { id: "asha-patel", name: "Asha Patel", role: "DOP", avatarHue: 14 },
      { id: "marc-reyes", name: "Marc Reyes", role: "Gaffer", avatarHue: 200 },
    ],
    kitIds: ["ronin4d-manchester-06", "alexa35-london-02"],
    tags: ["Commercial", "North-East", "Quick turnaround"],
    lastActiveISO: "2026-05-02T09:24:00Z",
  },
  {
    id: "post-chain",
    name: "My grade & post chain",
    description: "Trusted post chain — keeps a film looking like itself.",
    type: "POST",
    members: [
      { id: "sara-vidal", name: "Sara Vidal", role: "Colourist", avatarHue: 16 },
      { id: "harriet-lowe", name: "Harriet Lowe", role: "Editor", avatarHue: 250 },
    ],
    kitIds: [],
    notes: "Invite-only. Sundown ran end-to-end on this chain.",
    tags: ["Post", "Trusted"],
    lastActiveISO: "2026-04-22T14:00:00Z",
  },
  {
    id: "would-hire-again",
    name: "Would hire again",
    description: "Quiet list of people I'd rebook without thinking.",
    type: "CREW",
    members: [
      { id: "asha-patel", name: "Asha Patel", role: "DOP", avatarHue: 14 },
      { id: "lena-karlsson", name: "Lena Karlsson", role: "Sound Mixer", avatarHue: 280 },
      { id: "daniel-okafor", name: "Daniel Okafor", role: "1st AD", avatarHue: 36 },
      { id: "sara-vidal", name: "Sara Vidal", role: "Colourist", avatarHue: 16 },
    ],
    kitIds: [],
    tags: ["Personal", "Hire-again"],
    lastActiveISO: "2026-04-15T11:00:00Z",
  },
];

export function findCircle(id: string): Circle | undefined {
  return CIRCLES.find((c) => c.id === id);
}
