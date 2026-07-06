import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BYIZA } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Byiza Office Seating Solutions" },
      { name: "description", content: "Contact Byiza Office Seating Solutions in Kollam, Kerala. Call, WhatsApp or send an enquiry." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", requirement: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const text = `Contact enquiry\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nLocation: ${form.city}\nRequirement: ${form.requirement}\n\n${form.message}`;
      window.open(`https://wa.me/${BYIZA.phoneIntl.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-brand">Contact</div>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">Let's talk seating.</h1>

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <ContactRow icon={MapPin} label="Location" value={BYIZA.city} />
          <ContactRow icon={Phone} label="Phone" value={BYIZA.phone} href={`tel:${BYIZA.phone}`} />
          <ContactRow icon={Mail} label="Email" value={BYIZA.email} href={`mailto:${BYIZA.email}`} />
          <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat with us" href={`https://wa.me/${BYIZA.phoneIntl.replace(/\D/g, "")}`} />

          <div className="mt-8 aspect-video overflow-hidden rounded-3xl border border-border bg-muted">
            <iframe
              title="Kollam location"
              src="https://www.google.com/maps?q=Kollam,Kerala&output=embed"
              className="size-full"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 sm:p-10 lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Name", "name"], ["Phone", "phone"], ["Email", "email"], ["Location", "city"], ["Requirement", "requirement"],
            ].map(([label, key]) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
                <input required={key === "name" || key === "phone"} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
              </div>
            ))}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm">
              {state === "sent" && <span className="text-brand">Ready — WhatsApp opened with your message.</span>}
              {state === "error" && <span className="text-destructive">Something went wrong. Please try again.</span>}
            </div>
            <button disabled={state === "sending"} className="h-12 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground hover:brightness-110 disabled:opacity-60">
              {state === "sending" ? "Sending…" : "Send Enquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-foreground/30">
      <Icon className="mt-1 size-5 text-brand" />
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-lg">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">{inner}</a> : inner;
}