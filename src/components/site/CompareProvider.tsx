import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompare, X } from "lucide-react";
import { products } from "@/lib/products";

const MAX = 4;
const STORAGE_KEY = "byiza-compare";

interface CompareCtx {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isFull: boolean;
}

const Ctx = createContext<CompareCtx | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {}
  }, [slugs]);

  const value = useMemo<CompareCtx>(
    () => ({
      slugs,
      has: (slug) => slugs.includes(slug),
      toggle: (slug) =>
        setSlugs((prev) =>
          prev.includes(slug)
            ? prev.filter((s) => s !== slug)
            : prev.length >= MAX
              ? prev
              : [...prev, slug],
        ),
      remove: (slug) => setSlugs((prev) => prev.filter((s) => s !== slug)),
      clear: () => setSlugs([]),
      isFull: slugs.length >= MAX,
    }),
    [slugs],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <CompareTray />
    </Ctx.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be inside CompareProvider");
  return ctx;
}

function CompareTray() {
  const { slugs, remove, clear } = useCompare();
  const items = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as typeof products;

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 220 }}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:left-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:gap-4 sm:p-4">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand">
              <GitCompare className="size-4" /> Compare · {items.length}/{MAX}
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {items.map((p) => (
                <div
                  key={p.slug}
                  className="group flex items-center gap-2 rounded-full border border-border bg-muted/50 py-1 pl-1 pr-2 text-xs"
                >
                  <img src={p.image} alt="" className="size-7 rounded-full object-cover" />
                  <span className="max-w-[8rem] truncate font-medium">{p.name}</span>
                  <button
                    onClick={() => remove(p.slug)}
                    aria-label={`Remove ${p.name}`}
                    className="grid size-5 place-items-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clear}
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Clear
              </button>
              <Link
                to="/compare"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand px-4 text-xs font-semibold text-brand-foreground hover:brightness-110"
              >
                Compare {items.length >= 2 ? "now" : `(add ${2 - items.length} more)`}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CompareToggle({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle, isFull } = useCompare();
  const active = has(slug);
  const disabled = !active && isFull;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) toggle(slug);
      }}
      disabled={disabled}
      aria-pressed={active}
      title={
        disabled
          ? `Compare limit reached (${4})`
          : active
            ? "Remove from compare"
            : "Add to compare"
      }
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border bg-background/80 text-foreground hover:border-foreground/40"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      <GitCompare className="size-3.5" />
      {active ? "Added" : "Compare"}
    </button>
  );
}