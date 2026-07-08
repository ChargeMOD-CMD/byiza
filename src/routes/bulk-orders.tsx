import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BYIZA } from "@/lib/products";

export const Route = createFileRoute("/bulk-orders")({
  head: () => ({
    meta: [
      { title: "Bulk Office Seating | Byiza" },
      { name: "description", content: "Bulk office chair requirements for corporates, startups, institutions and coworking spaces." },
    ],
  }),
  component: Bulk,
});

function Bulk() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", city: "", qty: "", category: "", date: "", notes: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bulk enquiry — Byiza Office Seating\n\nName: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nLocation: ${form.city}\nQuantity: ${form.qty}\nCategory: ${form.category}\nExpected: ${form.date}\n\n${form.notes}`;
    window.open(`https://wa.me/${BYIZA.phoneIntl.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Bulk Orders</div>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">Seating solutions for growing workspaces.</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">Corporate offices, startups, IT floors, institutions, hospitals, training centres and coworking spaces — tell us about your requirement.</p>

      <form onSubmit={submit} className="mt-12 grid gap-4 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 sm:p-10">
        {[
          ["Name", "name"], ["Company", "company"], ["Phone", "phone"], ["Email", "email"],
          ["Location", "city"], ["Approx. Chair Quantity", "qty"], ["Seating Category", "category"], ["Expected Requirement Date", "date"],
        ].map(([label, key]) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
            <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
          </div>
        ))}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Project Notes</label>
          <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
        </div>
        <div className="sm:col-span-2 flex items-center justify-between">
          {sent && <div className="text-sm text-brand">Enquiry ready — WhatsApp opened.</div>}
          <button className="ml-auto h-12 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground hover:brightness-110">Discuss bulk requirement</button>
        </div>
      </form>
    </section>
  );
}