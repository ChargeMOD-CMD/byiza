import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/byiza-logo.png";
import { BYIZA } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-ivory/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-1">
          <img src={logo} alt="Byiza" className="h-10 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            Premium office seating solutions from Kollam, Kerala. Engineered for
            comfort, quality and modern workspaces.
          </p>
        </div>

        <FooterCol title="Explore" links={[
          ["Home", "/"],
          ["Seating Collection", "/seating"],
          ["Chair Technology", "/chair-technology"],
          ["Manufacturing", "/manufacturing"],
          ["Bulk Orders", "/bulk-orders"],
        ]} />
        <FooterCol title="Company" links={[
          ["About", "/about"],
          ["Chair Parts", "/chair-parts"],
          ["Contact", "/contact"],
        ]} />

        <div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-ivory">Contact</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 text-brand" />{BYIZA.city}</li>
            <li><a href={`tel:${BYIZA.phone}`} className="flex items-start gap-2 hover:text-ivory"><Phone className="mt-0.5 size-4 text-brand" />{BYIZA.phone}</a></li>
            <li><a href={`mailto:${BYIZA.email}`} className="flex items-start gap-2 hover:text-ivory break-all"><Mail className="mt-0.5 size-4 shrink-0 text-brand" />{BYIZA.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:px-6 lg:px-10">
          <div>© {new Date().getFullYear()} {BYIZA.name}. All rights reserved.</div>
          <div className="uppercase tracking-[0.2em]">Kollam · Kerala · India</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-[0.2em] text-ivory">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="text-ivory/70 transition hover:text-ivory">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}