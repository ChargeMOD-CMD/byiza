import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useEnquiry } from "./EnquiryProvider";
import logo from "@/assets/byiza-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/seating", label: "Seating Collection" },
  { to: "/compare", label: "Compare" },
  { to: "/chair-technology", label: "Chair Technology" },
  { to: "/chair-parts", label: "Parts" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/bulk-orders", label: "Bulk Orders" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="Byiza home">
          <img src={logo} alt="Byiza Office Seating Solutions" className="h-8 w-auto lg:h-10 dark:brightness-0 dark:invert" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-foreground bg-muted" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => openEnquiry()}
            className="hidden h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-ivory transition hover:brightness-110 sm:inline-flex dark:bg-ivory dark:text-ink"
          >
            Get Quote
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full border border-border xl:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20">
              <img src={logo} alt="Byiza" className="h-8 w-auto dark:brightness-0 dark:invert" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-border"
              >
                <X className="size-4" />
              </button>
            </div>
            <motion.nav
              className="flex flex-col gap-1 px-4 pb-10 pt-6 sm:px-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            >
              {nav.map((n) => (
                <motion.div
                  key={n.to}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-4 font-display text-3xl tracking-tight text-foreground/80 transition hover:text-brand"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openEnquiry();
                }}
                className="mt-6 h-12 rounded-full bg-brand text-sm font-semibold text-brand-foreground"
              >
                Get Quote
              </button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}