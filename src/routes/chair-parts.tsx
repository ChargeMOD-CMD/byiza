import { createFileRoute } from "@tanstack/react-router";
import { useEnquiry } from "@/components/site/EnquiryProvider";
import chairParts from "@/assets/chair-parts.jpg";

export const Route = createFileRoute("/chair-parts")({
  head: () => ({
    meta: [
      { title: "Chair Components & Parts | Byiza" },
      { name: "description", content: "Chair mechanisms, gas lifts, bases, castors, armrests, headrests, mesh and upholstery components." },
    ],
  }),
  component: Parts,
});

const parts = [
  "Chair Mechanisms", "Gas Lifts", "Chair Bases", "Castor Wheels",
  "Armrests", "Headrests", "Back Frames", "Mesh Back Components",
  "Seat Cushions", "Upholstery Components", "Hardware & Fittings",
];

function Parts() {
  const { open } = useEnquiry();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Inside Our Seating</div>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">Chair components & parts.</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">A closer look at the components that go into a Byiza chair — and the parts we work with day to day.</p>
      <img src={chairParts} alt="Chair parts" width={1600} height={1000} className="mt-10 w-full rounded-3xl object-cover" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {parts.map((p) => (
          <button key={p} onClick={() => open({ product: p })} className="group flex items-center justify-between rounded-2xl border border-border p-5 text-left transition hover:border-foreground/30">
            <span className="font-display text-lg">{p}</span>
            <span className="text-xs uppercase tracking-widest text-brand opacity-0 transition group-hover:opacity-100">Enquire</span>
          </button>
        ))}
      </div>
    </section>
  );
}