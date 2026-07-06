import { createFileRoute } from "@tanstack/react-router";
import workspace from "@/assets/workspace-office.jpg";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "From Components to Comfort | Byiza" },
      { name: "description", content: "How Byiza approaches office chair assembly — from seating requirement to workspace-ready chairs." },
    ],
  }),
  component: Mfg,
});

const steps = [
  ["01", "Seating Requirement", "Understanding the role, workspace and hours."],
  ["02", "Component Selection", "Matching mechanisms, back type and upholstery."],
  ["03", "Chair Structure", "Frame and base built for real-world use."],
  ["04", "Assembly", "Careful hand-assembly and alignment checks."],
  ["05", "Quality Inspection", "Each chair tested before it leaves."],
  ["06", "Workspace Ready", "Delivered and set up for daily work."],
];

function Mfg() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Manufacturing</div>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">From components to comfort.</h1>
      <img src={workspace} alt="Workspace" width={1600} height={1000} className="mt-10 w-full rounded-3xl object-cover" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map(([n, t, d]) => (
          <div key={n} className="rounded-2xl border border-border p-6">
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">{n}</div>
            <div className="mt-3 font-display text-2xl">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}