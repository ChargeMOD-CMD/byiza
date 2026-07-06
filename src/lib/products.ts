import chairErgonomic from "@/assets/chair-ergonomic.jpg";
import chairExecutive from "@/assets/chair-executive.jpg";
import chairHighback from "@/assets/chair-highback.jpg";
import chairStaff from "@/assets/chair-staff.jpg";
import chairVisitor from "@/assets/chair-visitor.jpg";
import chairConference from "@/assets/chair-conference.jpg";

export interface Product {
  slug: string;
  name: string;
  category: string;
  short: string;
  image: string;
  features: string[];
  bestFor: string[];
}

export const products: Product[] = [
  {
    slug: "byiza-ergo-pro",
    name: "Ergo Pro",
    category: "Ergonomic",
    short: "Adaptive mesh back with adjustable lumbar for long working hours.",
    image: chairErgonomic,
    features: ["Breathable mesh back", "Adjustable lumbar", "3D armrests", "Synchro-tilt mechanism"],
    bestFor: ["Long working hours", "Home office", "Team workspace"],
  },
  {
    slug: "byiza-executive-noir",
    name: "Executive Noir",
    category: "Executive",
    short: "Full-grain style leather high-back for executive cabins.",
    image: chairExecutive,
    features: ["Premium leatherette", "High-back support", "Contoured seat", "Class-4 gas lift"],
    bestFor: ["Executive cabin", "Director office", "Meeting room"],
  },
  {
    slug: "byiza-summit-highback",
    name: "Summit High-Back",
    category: "High Back",
    short: "Statement high-back with headrest for demanding workdays.",
    image: chairHighback,
    features: ["Adjustable headrest", "Reinforced mesh", "Tilt lock", "Polished aluminium base"],
    bestFor: ["Executive", "Long hours", "Focused work"],
  },
  {
    slug: "byiza-taskflow",
    name: "TaskFlow",
    category: "Staff / Task",
    short: "Everyday task chair engineered for open workspaces.",
    image: chairStaff,
    features: ["Mesh back", "Height adjust", "PU castors", "Fixed / adjustable arms"],
    bestFor: ["Team desks", "Call centers", "IT floors"],
  },
  {
    slug: "byiza-guest-line",
    name: "Guest Line",
    category: "Visitor",
    short: "Sled-base visitor chair with a refined, minimal profile.",
    image: chairVisitor,
    features: ["Chrome sled base", "Stackable", "Mesh back", "Durable frame"],
    bestFor: ["Reception", "Cabin visitor", "Waiting area"],
  },
  {
    slug: "byiza-boardline",
    name: "BoardLine",
    category: "Conference",
    short: "Warm leather conference chair with balanced proportions.",
    image: chairConference,
    features: ["Cushioned seat", "Fixed arms", "Swivel base", "Tilt tension"],
    bestFor: ["Boardroom", "Training room", "Conference"],
  },
];

export const categories = [
  "Ergonomic Chairs",
  "Executive Chairs",
  "High Back Chairs",
  "Mid Back Chairs",
  "Staff Chairs",
  "Task Chairs",
  "Visitor Chairs",
  "Conference Chairs",
  "Training Chairs",
  "Workstation Chairs",
  "Premium Recliner Seating",
  "Custom Office Seating",
];

export const requirementTypes = [
  "Ergonomic Office Chair",
  "Executive Chair",
  "Staff Chair",
  "Visitor Chair",
  "Conference Chair",
  "Training Chair",
  "Workstation Seating",
  "Recliner / Premium Seating",
  "Chair Parts",
  "Bulk Office Requirement",
  "Custom Requirement",
];

export const BYIZA = {
  name: "Byiza Office Seating Solutions",
  city: "Kollam, Kerala",
  phone: "7012902232",
  phoneIntl: "+917012902232",
  email: "byizaofficeseatingsolution@gmail.com",
  website: "www.byiza.in",
  tagline: "Premium Office Chairs for Smart Workspaces",
};