import type { Crew } from "../types";

export const CURRENT_USER: Crew = {
  id: "you",
  name: "Sam Mac",
  role: "DOP",
  secondaryRoles: ["Camera Operator"],
  location: "London",
  availability: "AVAILABLE_NOW",
  trustScore: 82,
  badges: ["IDENTITY_VERIFIED", "PEER_VOUCHED"],
  credits: [
    { title: "Inland", role: "DOP", year: 2025, type: "doc" },
    { title: "Run", role: "Camera Op", year: 2024, type: "spot" },
    { title: "Held", role: "2nd unit DOP", year: 2024, type: "feature" },
  ],
  companies: ["BBC Films", "Pulse Films", "Channel 4"],
  genres: ["Documentary", "Drama"],
  skills: ["Handheld", "Single-camera doc", "Mixed format"],
  certifications: ["Public liability £5m", "First aid"],
  kitOwned: ["Sony FX6", "Sigma 18-35"],
  showreel: "vimeo.com/sam-mac",
  bio: "London-based DOP and operator. Documentary, longform factual, occasional drama. Comfortable on long doc rigs and tight commercial schedules.",
  dayRate: 620,
  responseRate: 87,
  bookingsCount: 19,
  avatarHue: 14,
  vouches: [
    {
      fromName: "Asha Patel",
      fromRole: "DOP",
      tags: ["Worked with", "Technically reliable", "Would hire again"],
      note: "Steady operator, fast on his feet, never grumbles when the schedule shifts.",
      date: "2026-02-14",
    },
    {
      fromName: "Marc Reyes",
      fromRole: "Gaffer",
      tags: ["Hired before", "Safe pair of hands"],
      date: "2025-11-09",
    },
  ],
};
