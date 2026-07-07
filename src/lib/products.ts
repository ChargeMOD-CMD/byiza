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
  specs: {
    backType: string;
    material: string;
    mechanism: string;
    armrests: string;
    headrest: string;
    lumbar: string;
    base: string;
    gasLift: string;
    weightCapacity: string;
    warranty: string;
  };
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
    specs: {
      backType: "High-back mesh",
      material: "Breathable mesh + moulded foam",
      mechanism: "Synchro-tilt with tension",
      armrests: "3D adjustable",
      headrest: "Adjustable",
      lumbar: "Adjustable",
      base: "Nylon 5-star",
      gasLift: "Class-4",
      weightCapacity: "120 kg",
      warranty: "3 years",
    },
  },
  {
    slug: "byiza-executive-noir",
    name: "Executive Noir",
    category: "Executive",
    short: "Full-grain style leather high-back for executive cabins.",
    image: chairExecutive,
    features: ["Premium leatherette", "High-back support", "Contoured seat", "Class-4 gas lift"],
    bestFor: ["Executive cabin", "Director office", "Meeting room"],
    specs: {
      backType: "High-back cushioned",
      material: "Premium leatherette",
      mechanism: "Multi-tilt lock",
      armrests: "Fixed padded",
      headrest: "Integrated",
      lumbar: "Contoured built-in",
      base: "Polished aluminium",
      gasLift: "Class-4",
      weightCapacity: "130 kg",
      warranty: "3 years",
    },
  },
  {
    slug: "byiza-summit-highback",
    name: "Summit High-Back",
    category: "High Back",
    short: "Statement high-back with headrest for demanding workdays.",
    image: chairHighback,
    features: ["Adjustable headrest", "Reinforced mesh", "Tilt lock", "Polished aluminium base"],
    bestFor: ["Executive", "Long hours", "Focused work"],
    specs: {
      backType: "High-back reinforced mesh",
      material: "Reinforced mesh + foam",
      mechanism: "Synchro-tilt with lock",
      armrests: "2D adjustable",
      headrest: "Adjustable",
      lumbar: "Adjustable",
      base: "Polished aluminium",
      gasLift: "Class-4",
      weightCapacity: "125 kg",
      warranty: "3 years",
    },
  },
  {
    slug: "byiza-taskflow",
    name: "TaskFlow",
    category: "Staff / Task",
    short: "Everyday task chair engineered for open workspaces.",
    image: chairStaff,
    features: ["Mesh back", "Height adjust", "PU castors", "Fixed / adjustable arms"],
    bestFor: ["Team desks", "Call centers", "IT floors"],
    specs: {
      backType: "Mid-back mesh",
      material: "Mesh + fabric seat",
      mechanism: "Knee-tilt",
      armrests: "Fixed / optional adjustable",
      headrest: "—",
      lumbar: "Fixed contour",
      base: "Nylon 5-star",
      gasLift: "Class-3",
      weightCapacity: "110 kg",
      warranty: "2 years",
    },
  },
  {
    slug: "byiza-guest-line",
    name: "Guest Line",
    category: "Visitor",
    short: "Sled-base visitor chair with a refined, minimal profile.",
    image: chairVisitor,
    features: ["Chrome sled base", "Stackable", "Mesh back", "Durable frame"],
    bestFor: ["Reception", "Cabin visitor", "Waiting area"],
    specs: {
      backType: "Mid-back mesh",
      material: "Mesh + fabric",
      mechanism: "Fixed",
      armrests: "Fixed",
      headrest: "—",
      lumbar: "Fixed contour",
      base: "Chrome sled",
      gasLift: "—",
      weightCapacity: "110 kg",
      warranty: "2 years",
    },
  },
  {
    slug: "byiza-boardline",
    name: "BoardLine",
    category: "Conference",
    short: "Warm leather conference chair with balanced proportions.",
    image: chairConference,
    features: ["Cushioned seat", "Fixed arms", "Swivel base", "Tilt tension"],
    bestFor: ["Boardroom", "Training room", "Conference"],
    specs: {
      backType: "Mid-back cushioned",
      material: "Leatherette + foam",
      mechanism: "Tilt tension",
      armrests: "Fixed padded",
      headrest: "—",
      lumbar: "Contoured built-in",
      base: "Polished aluminium",
      gasLift: "Class-3",
      weightCapacity: "120 kg",
      warranty: "3 years",
    },
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