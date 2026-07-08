import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, RotateCcw, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import chatIcon from "@/assets/chatbot-icon.png";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the **Byiza Assistant**. Ask me about our office chairs, ergonomics, chair parts, bulk orders, or anything on this site.",
};

const SUGGESTIONS = [
  "Show ergonomic chair options",
  "Best chair for long working hours?",
  "Do you take bulk B2B orders?",
  "What warranty do you offer?",
];

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const reset = () => {
    setMessages([WELCOME]);
    setInput("");
    setLoading(false);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const assistantId = crypto.randomUUID();
    setMessages((m) => [...m, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            id: m.id,
            role: m.role,
            parts: [{ type: "text", text: m.content }],
          })),
        }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text().catch(() => "Request failed"));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const evt = JSON.parse(data);
            if (evt.type === "text-delta" && typeof evt.delta === "string") {
              acc += evt.delta;
              setMessages((m) =>
                m.map((msg) => (msg.id === assistantId ? { ...msg, content: acc } : msg)),
              );
            }
          } catch {
            /* ignore */
          }
        }
      }
      if (!acc) {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: "I couldn't generate a response. Please try again." }
              : msg,
          ),
        );
      }
    } catch (err) {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content:
                  "Sorry, something went wrong reaching the assistant. Please try again in a moment.",
              }
            : msg,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Byiza assistant"
        className="fixed bottom-5 left-5 z-40 grid size-14 place-items-center rounded-full bg-white shadow-xl shadow-black/25 ring-1 ring-black/10 transition hover:scale-105 dark:bg-ivory"
      >
        <img src={chatIcon} alt="" className="size-10 object-contain" />
        <span className="absolute -top-1 -right-1 flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
          <span className="relative inline-flex size-3 rounded-full bg-brand" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            className="fixed bottom-24 left-4 z-50 flex h-[min(600px,calc(100dvh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-border bg-ink px-4 py-3 text-ivory">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-white/10 p-1">
                  <img src={chatIcon} alt="" className="size-7 object-contain" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Byiza Assistant</p>
                  <p className="text-[11px] text-ivory/70">Ask about our chairs & services</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  aria-label="Reset conversation"
                  className="grid size-8 place-items-center rounded-full text-ivory/80 transition hover:bg-white/10 hover:text-ivory"
                >
                  <RotateCcw className="size-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid size-8 place-items-center rounded-full text-ivory/80 transition hover:bg-white/10 hover:text-ivory"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4 [scrollbar-width:thin]"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand text-brand-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                        <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.content === "" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2 text-sm text-muted-foreground">
                    <Loader2 className="inline size-3.5 animate-spin" /> Thinking…
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-2">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80 transition hover:bg-muted"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 border-t border-border bg-background p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask about our chairs…"
                className="max-h-32 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-brand"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition hover:brightness-110 disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}