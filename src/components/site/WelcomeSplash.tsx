import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import mark from "@/assets/chatbot-icon.png";
import wordmark from "@/assets/byiza-splash-logo.png";

const DURATION_MS = 2600;

export function WelcomeSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("byiza-splash-seen")) return;
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("byiza-splash-seen", "1");
      setShow(false);
      document.body.style.overflow = "";
    }, DURATION_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Ambient red glow */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(220,38,38,0.10) 0%, rgba(255,255,255,0) 70%)",
            }}
          />

          <motion.img
            src={mark}
            alt="Byiza chair mark"
            className="relative size-28 object-contain drop-shadow-xl sm:size-32"
            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 180, delay: 0.1 }}
          />

          <motion.img
            src={wordmark}
            alt="Byiza Office Seating Solutions"
            className="relative mt-4 h-16 w-auto object-contain sm:h-20"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          />

          <motion.div
            className="relative mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-neutral-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-[#dc2626]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, delay: 1, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="relative mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Premium Office Seating
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}