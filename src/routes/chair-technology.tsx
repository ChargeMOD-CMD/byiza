import { createFileRoute } from "@tanstack/react-router";
import heroChair from "@/assets/hero-chair.jpg";

export const Route = createFileRoute("/chair-technology")({
  head: () => ({
    meta: [
      { title: "Chair Technology | Byiza Ergonomics" },
      { name: "description", content: "How Byiza office chairs are engineered — mechanisms, lumbar support, adjustability and materials." },
    ],
  }),
  component: Tech,
});

const items = [
  ["Back support", "Contoured back frame with mesh or upholstered options."],
  ["Lumbar support", "Supports the natural lower-back region for extended desk work."],
  ["Seat height", "Class-3 or Class-4 gas lift for smooth, safe height adjustment."],
  ["Arm positioning", "Height, width and (on select models) 3D-adjustable armrests."],
  ["Head & neck support", "Adjustable headrest options on high-back models."],
  ["Movement & flexibility", "Synchro-tilt mechanisms and tension control."],
];

function Tech() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Chair Technology</div>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">Built around the human body.</h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <img src={heroChair} alt="Chair side profile" width={1280} height={1280} className="w-full rounded-3xl object-cover" />
        </div>
        <div className="lg:col-span-5 space-y-4">
          {items.map(([t, d]) => (
            <div key={t} className="border-b border-border pb-4">
              <div className="font-display text-xl">{t}</div>
              <div className="text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}