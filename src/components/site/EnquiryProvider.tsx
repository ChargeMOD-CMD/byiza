import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { EnquiryModal } from "./EnquiryModal";

interface Ctx {
  open: (opts?: { product?: string; source?: string }) => void;
  close: () => void;
}

const EnquiryCtx = createContext<Ctx | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryCtx);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [product, setProduct] = useState<string | undefined>();

  const open = useCallback((opts?: { product?: string; source?: string }) => {
    setProduct(opts?.product);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Auto-open once per session
  useEffect(() => {
    try {
      const shown = sessionStorage.getItem("byiza-enquiry-shown");
      if (!shown) {
        const t = window.setTimeout(() => {
          setOpen(true);
          sessionStorage.setItem("byiza-enquiry-shown", "1");
        }, 2200);
        return () => window.clearTimeout(t);
      }
    } catch {}
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <EnquiryCtx.Provider value={value}>
      {children}
      <EnquiryModal isOpen={isOpen} onClose={close} product={product} />
    </EnquiryCtx.Provider>
  );
}