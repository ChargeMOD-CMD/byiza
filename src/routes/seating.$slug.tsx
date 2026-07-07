import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { products, BYIZA } from "@/lib/products";
import { useEnquiry } from "@/components/site/EnquiryProvider";
import { CompareToggle } from "@/components/site/CompareProvider";

export const Route = createFileRoute("/seating/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Chair"} | Byiza Seating` },
      { name: "description", content: loaderData?.product.short ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Chair not found</h1>
      <Link to="/seating" className="mt-6 inline-block text-brand underline">Back to collection</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { open } = useEnquiry();
  const waText = encodeURIComponent(`Hello Byiza Office Seating Solutions, I am interested in ${product.name}. Please share more details.`);
  const waHref = `https://wa.me/${BYIZA.phoneIntl.replace(/\D/g, "")}?text=${waText}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <Link to="/seating" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to collection</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          <img src={product.image} alt={product.name} width={800} height={1000} className="w-full object-cover" />
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">{product.category}</div>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-tight">{product.name}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{product.short}</p>

          <div className="mt-8">
            <div className="text-xs font-medium uppercase tracking-widest text-foreground">Key features</div>
            <ul className="mt-3 space-y-2">
              {product.features.map((f: string) => (
                <li key={f} className="flex items-center gap-2 text-sm"><Check className="size-4 text-brand" /> {f}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <div className="text-xs font-medium uppercase tracking-widest text-foreground">Best for</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.bestFor.map((b: string) => (
                <span key={b} className="rounded-full border border-border px-3 py-1 text-xs">{b}</span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => open({ product: product.name })} className="h-12 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground hover:brightness-110">Enquire now</button>
            <a href={waHref} target="_blank" rel="noopener" className="h-12 inline-flex items-center rounded-full border border-border px-6 text-sm font-semibold hover:bg-muted">WhatsApp enquiry</a>
            <CompareToggle slug={product.slug} className="h-12 px-5 text-sm" />
            <button onClick={() => open({ product: product.name })} className="h-12 inline-flex items-center px-4 text-sm font-medium text-muted-foreground hover:text-foreground">Request price</button>
          </div>
        </div>
      </div>
    </section>
  );
}