import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { requirementTypes, BYIZA } from "@/lib/products";
import heroChair from "@/assets/hero-chair.jpg";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: string;
}

export function EnquiryModal({ isOpen, onClose, product }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    type: product ? "Custom Requirement" : requirementTypes[0],
    message: product ? `I'm interested in ${product}.` : "",
  });

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (product) {
      setForm((f) => ({ ...f, type: "Custom Requirement", message: `I'm interested in ${product}.` }));
    }
  }, [product]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: hand off to WhatsApp with pre-filled message.
    const text =
      `New enquiry — Byiza Office Seating\n\n` +
      `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nRequirement: ${form.type}\n\n${form.message}`;
    const url = `https://wa.me/${BYIZA.phoneIntl.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
        >
          <motion.div
            className="relative flex max-h-[95dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:flex-row sm:rounded-2xl"
            initial={{ y: 40, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left visual */}
            <div className="relative hidden w-2/5 flex-col justify-between overflow-hidden bg-ink p-8 text-ivory sm:flex">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-ivory/60">Byiza</div>
                <div className="mt-1 text-sm font-medium text-ivory/80">Office Seating Solutions</div>
              </div>
              <img
                src={heroChair}
                alt=""
                className="absolute inset-0 -z-0 size-full object-cover opacity-40 mix-blend-luminosity"
              />
              <div className="relative z-10">
                <h2 id="enquiry-title" className="font-display text-3xl leading-tight tracking-tight">
                  Transform your workspace with better seating.
                </h2>
                <p className="mt-3 text-sm text-ivory/70">
                  Share your requirement — our team will get in touch with a fitting recommendation.
                </p>
              </div>
            </div>

            {/* Right form */}
            <div className="relative flex w-full flex-col overflow-y-auto p-6 sm:w-3/5 sm:p-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close enquiry form"
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-foreground/70 transition hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>

              {!submitted ? (
                <>
                  <div className="sm:hidden">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-brand">Byiza</div>
                    <h2 className="mt-1 font-display text-2xl leading-tight">
                      Get a seating consultation
                    </h2>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-brand">Enquiry</div>
                    <h3 className="mt-1 font-display text-2xl">Tell us about your workspace</h3>
                  </div>

                  <form onSubmit={submit} className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                    <Field label="Company / Organisation" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Field label="Phone Number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
                    <Field label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                    <Field label="City / Location" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Requirement Type
                      </label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                      >
                        {requirementTypes.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Tell us about your seating requirement
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                        placeholder="Quantity, workspace type, timeline, colour preferences…"
                      />
                    </div>
                    <div className="sm:col-span-2 mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        Explore collection
                      </button>
                      <button
                        type="submit"
                        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
                      >
                        Get a seating consultation
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-1 flex-col items-center justify-center py-16 text-center"
                >
                  <div className="grid size-14 place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="size-7" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">Enquiry ready to send</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    We opened WhatsApp with your enquiry pre-filled. Send it to us and our team will respond shortly.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}