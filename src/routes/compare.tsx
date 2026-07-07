import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X } from "lucide-react";
import { products } from "@/lib/products";
import { useCompare } from "@/components/site/CompareProvider";
import { useEnquiry } from "@/components/site/EnquiryProvider";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Chairs | Byiza Office Seating Solutions" },
      {
        name: "description",
        content:
          "Compare Byiza office chairs side by side — mechanism, material, headrest, lumbar, base, gas lift, weight capacity and warranty.",
      },
    ],
  }),
  component: ComparePage,
});

const SPEC_ROWS: { key: keyof (typeof products)[number]["specs"]; label: string }[] = [
  { key: "backType", label: "Back Type" },
  { key: "material", label: "Material" },
  { key: "mechanism", label: "Mechanism" },
  { key: "armrests", label: "Armrests" },
  { key: "headrest", label: "Headrest" },
  { key: "lumbar", label: "Lumbar Support" },
  { key: "base", label: "Base" },
  { key: "gasLift", label: "Gas Lift" },
  { key: "weightCapacity", label: "Weight Capacity" },
  { key: "warranty", label: "Warranty" },
];

function ComparePage() {
  const { slugs, remove, clear } = useCompare();
  const { open } = useEnquiry();
  const items = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <section className="mx-auto max-w-7xl px-4 pb-32 pt-16 sm:px-6 lg:px-10 lg:pt-24">
      <Link
        to="/seating"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to collection
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
            Compare Chairs
          </div>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Side-by-side specifications.
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10 overflow-x-auto rounded-3xl border border-border">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="w-40 p-4 align-bottom text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-56">
                  Chair
                </th>
                {items.map((p) => (
                  <th key={p.slug} className="min-w-[220px] p-4 align-bottom">
                    <div className="relative">
                      <button
                        onClick={() => remove(p.slug)}
                        aria-label={`Remove ${p.name}`}
                        className="absolute right-0 top-0 grid size-8 place-items-center rounded-full border border-border bg-background text-muted-foreground transition hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                      <div className="overflow-hidden rounded-2xl border border-border bg-background">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="aspect-[4/5] w-full object-cover"
                        />
                      </div>
                      <div className="mt-3 text-[10px] uppercase tracking-widest text-brand">
                        {p.category}
                      </div>
                      <Link
                        to="/seating/$slug"
                        params={{ slug: p.slug }}
                        className="mt-1 block font-display text-xl hover:underline"
                      >
                        {p.name}
                      </Link>
                      <p className="mt-1 line-clamp-2 text-xs font-normal text-muted-foreground">
                        {p.short}
                      </p>
                      <button
                        onClick={() => open({ product: p.name })}
                        className="mt-3 inline-flex h-9 items-center rounded-full bg-brand px-4 text-xs font-semibold text-brand-foreground hover:brightness-110"
                      >
                        Enquire
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPEC_ROWS.map((row) => (
                <tr key={row.key} className="border-b border-border last:border-b-0">
                  <td className="bg-muted/20 p-4 align-top text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </td>
                  {items.map((p) => (
                    <td key={p.slug} className="p-4 align-top text-sm text-foreground">
                      {p.specs[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="bg-muted/20 p-4 align-top text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Key Features
                </td>
                {items.map((p) => (
                  <td key={p.slug} className="p-4 align-top">
                    <ul className="space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-border p-12 text-center sm:p-20">
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-2xl">No chairs selected yet.</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Browse the collection and tap "Compare" on any chair to add it here.
          Compare up to four chairs side by side.
        </p>
        <Link
          to="/seating"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-ivory hover:brightness-110"
        >
          Browse the collection
        </Link>
      </div>
    </div>
  );
}