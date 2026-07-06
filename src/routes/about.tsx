import { createFileRoute } from "@tanstack/react-router";
import { BYIZA } from "@/lib/products";
import workspace from "@/assets/workspace-office.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Byiza | Office Seating Solutions, Kollam" },
      { name: "description", content: "About Byiza Office Seating Solutions — premium ergonomic, executive and workstation seating from Kollam, Kerala." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 lg:pt-24">
        <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">About</div>
        <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
          A seating brand focused on how people actually work.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {BYIZA.name} is a premium office seating solutions company based in
          {" "}{BYIZA.city}. We supply ergonomic, executive and workstation
          chairs — with a factory-direct approach and a focus on comfort,
          quality and durability.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <img src={workspace} alt="Office workspace" width={1600} height={1000} className="w-full rounded-3xl object-cover" />
      </section>
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-24 sm:grid-cols-2 sm:px-6">
        {[
          ["Comfort", "Chairs engineered around long working hours and everyday use."],
          ["Quality", "Considered components — mechanisms, gas lifts and upholstery."],
          ["Durability", "Built to hold up on year three and year five, not just week one."],
          ["Ergonomic Design", "Support for the natural posture of the person sitting."],
          ["Smart Workspace Seating", "Chairs that match roles across the office."],
          ["Factory Direct", "Direct sourcing that keeps quality and pricing honest."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-border p-6">
            <div className="font-display text-2xl">{t}</div>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
    </>
  );
}