import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Factory,
  Layers,
  MousePointer2,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import heroChair from "@/assets/hero-chair.jpg";
import workspace from "@/assets/workspace-office.jpg";
import chairParts from "@/assets/chair-parts.jpg";
import { products, BYIZA } from "@/lib/products";
import { useEnquiry } from "@/components/site/EnquiryProvider";

export function Home() {
  const { open } = useEnquiry();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-4 sm:pb-24 lg:pb-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-[80%] bg-gradient-to-b from-muted/60 via-background to-background" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-4 lg:px-10">
          <div className="lg:col-span-6 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Byiza · Office Seating Solutions
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-[86px]"
            >
              Engineered to support
              <br />
              the way <em className="font-normal not-italic text-brand">you work.</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Premium office seating designed for comfort, performance and modern
              workspaces. Ergonomic, executive and workstation chairs — from Kollam,
              made for the way India works.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/seating"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ivory transition hover:brightness-110 dark:bg-ivory dark:text-ink"
              >
                Explore Seating
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={() => open()}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/60 px-6 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-muted"
              >
                Request a Quote
              </button>
            </motion.div>

            <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
              <MousePointer2 className="size-3.5" />
              Hover the chair to explore
            </div>
          </div>

          {/* Chair visual */}
          <div className="relative lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative aspect-[4/5] w-full"
              style={{ perspective: 1200 }}
            >
              <motion.img
                src={heroChair}
                alt="Premium Byiza ergonomic office chair"
                width={1280}
                height={1280}
                fetchPriority="high"
                className="relative z-10 size-full object-contain drop-shadow-[0_60px_60px_rgba(0,0,0,0.25)]"
                whileHover={{ rotateY: 8, rotateX: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
              />
              <div className="absolute inset-x-8 bottom-6 -z-0 h-24 rounded-[100%] bg-black/30 blur-2xl dark:bg-black/60" />

              {/* Floating spec labels */}
              <SpecLabel className="left-2 top-[18%] sm:left-0" delay={0.6}>
                Ergonomic Support
              </SpecLabel>
              <SpecLabel className="right-2 top-[38%] sm:right-0" delay={0.8}>
                Adjustable Comfort
              </SpecLabel>
              <SpecLabel className="left-4 bottom-[18%] sm:left-6" delay={1}>
                Durable Construction
              </SpecLabel>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:px-6 lg:px-10">
          {[
            ["Ergonomic Seating", Sparkles],
            ["Quality Components", ShieldCheck],
            ["Office Solutions", Building2],
            ["Bulk Requirements", Boxes],
            ["Factory Direct", Factory],
          ].map(([label, Icon]) => {
            const I = Icon as typeof Sparkles;
            return (
              <div key={label as string} className="flex items-center gap-2">
                <I className="size-3.5 text-brand" />
                {label as string}
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">About Byiza</div>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Seating is not just furniture. It is part of how people work.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p>
              Byiza Office Seating Solutions is a premium office seating brand from
              Kollam, Kerala — focused on comfort, quality and durability across
              ergonomic, executive and workstation chairs.
            </p>
            <p>
              We work directly with businesses to plan, supply and support office
              seating — from individual cabin requirements to full-floor workspace
              rollouts. Our approach is straightforward: the right chair, for the
              right role, for how long people actually sit in it.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              More about Byiza <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="border-t border-border/60 bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Seating Collection</div>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                Chairs for every role in the office.
              </h2>
            </div>
            <Link
              to="/seating"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to="/seating/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition hover:border-foreground/30 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="size-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-foreground backdrop-blur">
                      {p.category}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-sm font-semibold text-foreground">View Details</span>
                      <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ANATOMY */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Anatomy of Comfort</div>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Every component, engineered for the way you sit.
            </h2>
            <p className="mt-5 text-muted-foreground">
              A great office chair is a system — headrest, backrest, lumbar, seat, mechanism,
              gas lift and base — each doing its job so you can do yours.
            </p>
            <div className="mt-8 space-y-1">
              {ANATOMY.map((a) => (
                <div
                  key={a.name}
                  className="group flex items-start justify-between gap-6 border-t border-border py-4"
                >
                  <div>
                    <div className="font-display text-lg">{a.name}</div>
                    <div className="text-sm text-muted-foreground">{a.desc}</div>
                  </div>
                  <div className="mt-1 shrink-0 text-xs font-medium uppercase tracking-widest text-brand opacity-0 transition group-hover:opacity-100">
                    0{ANATOMY.indexOf(a) + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <div className="sticky top-24 aspect-square overflow-hidden rounded-3xl border border-border bg-muted">
              <img
                src={heroChair}
                alt="Chair anatomy"
                loading="lazy"
                width={1280}
                height={1280}
                className="size-full object-cover"
              />
              {/* Callout dots */}
              {[
                ["Headrest", "top-[10%] left-[52%]"],
                ["Backrest", "top-[30%] left-[42%]"],
                ["Armrest", "top-[48%] left-[68%]"],
                ["Seat", "top-[60%] left-[46%]"],
                ["Base", "top-[88%] left-[50%]"],
              ].map(([label, pos]) => (
                <div key={label} className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2`}>
                  <div className="relative">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
                    <span className="relative block size-3 rounded-full border-2 border-white bg-brand" />
                  </div>
                  <div className="mt-1.5 whitespace-nowrap rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-foreground shadow backdrop-blur">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTS */}
      <section className="border-t border-border/60 bg-ink py-24 text-ivory lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Inside our seating</div>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Components chosen for the long haul.
              </h2>
            </div>
            <p className="text-ivory/70 lg:col-span-5 lg:col-start-8">
              Mechanisms, gas lifts, bases, castors, armrests, mesh, cushions, upholstery
              and hardware — every part contributes to how the chair performs on year five.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand/60"
              >
                <p.icon className="size-6 text-brand" />
                <div className="mt-6 font-display text-lg">{p.name}</div>
                <div className="mt-2 text-sm text-ivory/60">{p.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl">
            <img
              src={chairParts}
              alt="Chair base and castor detail"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>
        </div>
      </section>

      {/* WORKSPACE */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Bulk Office Solutions</div>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              Seating solutions for growing workspaces.
            </h2>
            <p className="mt-5 text-muted-foreground">
              From startups and IT floors to training centres, hospitals and coworking
              spaces — we help you plan the right seating mix, quantity and delivery.
            </p>
            <Link
              to="/bulk-orders"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
            >
              Discuss bulk requirement <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-border">
              <img src={workspace} alt="Modern workspace" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE CTA */}
      <section className="border-t border-border/60 bg-muted/40 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Find the chair that fits your workspace.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Explore the Byiza seating collection, or contact our team for your office
            seating requirement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/seating" className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ivory hover:brightness-110 dark:bg-ivory dark:text-ink">
              View Collection
            </Link>
            <button
              onClick={() => open()}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold hover:bg-muted"
            >
              Request Catalogue
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">FAQ</div>
        <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Common questions</h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {FAQ.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="border-t border-border/60 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-10">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">{BYIZA.city}</div>
            <h3 className="mt-2 font-display text-3xl">Let's plan your workspace seating.</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BYIZA.phone}`} className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold hover:bg-muted">Call {BYIZA.phone}</a>
            <Link to="/contact" className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground hover:brightness-110">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SpecLabel({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute z-20 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-[11px] font-medium backdrop-blur-md ${className ?? ""}`}
    >
      <span className="size-1.5 rounded-full bg-brand" />
      {children}
    </motion.div>
  );
}

const ANATOMY = [
  { name: "Headrest", desc: "Supports the head and neck during reclined focus work." },
  { name: "Backrest & Lumbar", desc: "Contours to the natural curve of the lower back." },
  { name: "Armrests", desc: "Adjustable height and width to reduce shoulder tension." },
  { name: "Seat Cushion", desc: "High-resilience foam and breathable upholstery." },
  { name: "Mechanism & Gas Lift", desc: "Smooth tilt, tension and height adjustment." },
  { name: "Five-Star Base & Castors", desc: "Balanced stability and effortless movement." },
];

const PARTS = [
  { name: "Chair Mechanisms", desc: "Synchro, multi-tilt and knee-tilt options.", icon: Wrench },
  { name: "Gas Lifts", desc: "Class-3 and Class-4 lift cylinders.", icon: Ruler },
  { name: "Bases & Castors", desc: "Nylon, aluminium bases and PU castors.", icon: Layers },
  { name: "Upholstery & Mesh", desc: "Durable mesh and premium leatherette.", icon: Sparkles },
];

const FAQ = [
  { q: "How do I choose the right office chair?", a: "Start with how long people sit in it and the role they perform. Ergonomic chairs suit long working hours, executive chairs suit cabins, and task chairs suit team floors." },
  { q: "What is an ergonomic office chair?", a: "A chair engineered to support natural posture — adjustable lumbar, seat height, arm height and tilt tension, with breathable mesh or cushioned upholstery." },
  { q: "Which chair is suitable for long working hours?", a: "Look for adjustable lumbar support, a synchro-tilt mechanism, breathable mesh back and adjustable armrests." },
  { q: "Do you handle bulk office chair requirements?", a: "Yes — Byiza works with corporates, startups, institutions and coworking spaces on planned bulk seating requirements." },
  { q: "How can I enquire about a chair?", a: "Use the Get Quote button, call us on 7012902232, or send an enquiry via WhatsApp." },
];