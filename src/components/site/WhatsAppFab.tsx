import { BYIZA } from "@/lib/products";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const text = encodeURIComponent(
    "Hello Byiza Office Seating Solutions, I would like to know more about your office seating products.",
  );
  const href = `https://wa.me/${BYIZA.phoneIntl.replace(/\D/g, "")}?text=${text}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Chat with Byiza on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <MessageCircle className="size-5" />
    </a>
  );
}