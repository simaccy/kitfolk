export type Role =
  | "DOP"
  | "Camera Operator"
  | "1st AC"
  | "2nd AC"
  | "Gaffer"
  | "Best Boy"
  | "Grip"
  | "Sound Mixer"
  | "Boom Op"
  | "Editor"
  | "Colourist"
  | "1st AD"
  | "2nd AD"
  | "Producer"
  | "Production Designer"
  | "Drone Operator"
  | "Steadicam Op"
  | "Director"
  | "Production Manager"
  | "DIT";

export type AvailabilityMode =
  | "AVAILABLE_NOW"
  | "AVAILABLE_FROM"
  | "KIT_ONLY"
  | "KIT_PLUS_OPERATOR"
  | "REMOTE_ONLY"
  | "TRAVEL_READY"
  | "INTERNATIONAL_READY"
  | "STANDBY"
  | "PENCIL"
  | "CONFIRMED"
  | "ON_SET";

export type TrustBadge =
  | "IDENTITY_VERIFIED"
  | "CREDIT_VERIFIED"
  | "PEER_VOUCHED"
  | "KITFOLK_TRUSTED"
  | "PRODUCTION_READY"
  | "PREMIUM_KIT_OWNER"
  | "INTERNATIONAL_READY";

export type VouchTag =
  | "Worked with"
  | "Hired before"
  | "Kit borrowed"
  | "Technically reliable"
  | "Good under pressure"
  | "Safe pair of hands"
  | "Specialist knowledge"
  | "Would hire again";

export interface Credit {
  title: string;
  role: string;
  year: number;
  company?: string;
  type?: "feature" | "doc" | "series" | "spot" | "branded" | "music video";
}

export interface Vouch {
  fromName: string;
  fromRole: string;
  tags: VouchTag[];
  note?: string;
  date: string;
}

export interface Crew {
  id: string;
  name: string;
  role: Role;
  secondaryRoles?: Role[];
  location: string;
  availability: AvailabilityMode;
  availableFrom?: string;
  trustScore: number;
  badges: TrustBadge[];
  credits: Credit[];
  companies: string[];
  genres: string[];
  skills: string[];
  certifications: string[];
  kitOwned?: string[];
  showreel?: string;
  bio?: string;
  dayRate?: number;
  responseRate: number;
  bookingsCount: number;
  vouches: Vouch[];
  avatarHue: number;
}

export type KitCategory =
  | "Camera"
  | "Lens"
  | "Lighting"
  | "Sound"
  | "Grip"
  | "Drone"
  | "Monitor"
  | "Power";

export interface Kit {
  id: string;
  name: string;
  category: KitCategory;
  ownerId: string;
  ownerName: string;
  location: string;
  description: string;
  dayRate: number;
  weekRate: number;
  deposit: number;
  insured: boolean;
  conditionScore: number;
  includes: string[];
  operatorAvailable: boolean;
  availability: "AVAILABLE_NOW" | "AVAILABLE_FROM" | "BOOKED";
  availableFrom?: string;
  handoverPreference: "Pickup" | "Delivery" | "Either";
  hue: number;
}

export type CallType = "CREW" | "KIT" | "BOTH";
export type CallUrgency = "URGENT" | "THIS_WEEK" | "FLEXIBLE";

export interface Call {
  id: string;
  title: string;
  type: CallType;
  location: string;
  startDate: string;
  endDate?: string;
  urgency: CallUrgency;
  budgetMin?: number;
  budgetMax?: number;
  rateUnit: "day" | "project" | "hour";
  requirements: string[];
  details: string;
  postedById: string;
  postedByName: string;
  postedByCompany?: string;
  postedAt: string;
  responses: number;
  verified: boolean;
}

export interface CircleMember {
  id: string;
  name: string;
  role: Role;
  avatarHue: number;
}

export interface Circle {
  id: string;
  name: string;
  description?: string;
  members: CircleMember[];
  kitIds: string[];
  notes?: string;
  tags: string[];
  lastActiveISO: string;
  type: "CREW" | "REGION" | "PROJECT" | "POST";
}

export type BookingStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "AT_HANDOVER"
  | "IN_USE"
  | "RETURNED"
  | "DISPUTED"
  | "CANCELLED";

export type BookingProtection =
  | "STANDARD"
  | "DEPOSIT"
  | "INSURED"
  | "PRODUCTION_COVER";

export interface HandoverState {
  pickupConfirmed: boolean;
  pickupPhotos: number;
  pickupChecklistDone: number;
  pickupChecklistTotal: number;
  pin?: string;
  returnConfirmed: boolean;
  returnPhotos: number;
  conditionNotes?: string;
  depositReleased: boolean;
}

export interface Booking {
  id: string;
  ref: string;
  type: "KIT" | "CREW";
  subjectId: string;
  subjectName: string;
  subjectMeta: string;
  counterpartName: string;
  startDate: string;
  endDate: string;
  total: number;
  protection: BookingProtection;
  status: BookingStatus;
  handover: HandoverState;
  postedAt: string;
}

export interface Message {
  id: string;
  from: "me" | "them";
  body: string;
  sentAt: string;
}

export interface Thread {
  id: string;
  withName: string;
  withRole: string;
  withHue: number;
  context?: string;
  lastMessage: string;
  lastSentAt: string;
  unread: number;
  messages: Message[];
}
