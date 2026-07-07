import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { products } from "@/lib/products";
import { CompareToggle } from "@/components/site/CompareProvider";

export const Route = createFileRoute("/seating")({
  head: () => ({
    meta: [
      { title: "Seating Collection | Byiza Office Chairs" },
      { name: "description", content: "Explore Byiza's collection of ergonomic, executive, high-back, task, visitor and conference office chairs." },
    ],
  }),
  component: Seating,
});

function Seating() {
  const [q, setQ] = useState("");
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase()) ||
      p.short.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-10 lg:pt-24">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Seating Collection</div>
      <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">The full Byiza collection.</h1>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chairs, categories…"
            className="h-11 w-full rounded-full border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">
          No chairs match "{q}". Try another search.
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.slug}
              className="group relative overflow-hidden rounded-3xl border border-border transition hover:border-foreground/30 hover:shadow-2xl"
            >
              <Link to="/seating/$slug" params={{ slug: p.slug }} className="block">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="size-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 pb-16">
                  <div className="text-[10px] uppercase tracking-widest text-brand">{p.category}</div>
                  <div className="mt-1 font-display text-xl">{p.name}</div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.short}</p>
                </div>
              </Link>
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <CompareToggle slug={p.slug} />
                <Link
                  to="/seating/$slug"
                  params={{ slug: p.slug }}
                  className="text-xs font-semibold text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}