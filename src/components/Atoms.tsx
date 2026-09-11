import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Lightbulb, Quote } from "lucide-react";
import type { RuleRow } from "../data/content";

/* ---------- scroll reveal wrapper ---------- */
export const Reveal = ({
  children,
  delay = 0,
  className = "",
  y = 26,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ---------- animated yellow highlighter ---------- */
export const HL = ({ children, delay = 0.15 }: { children: ReactNode; delay?: number }) => (
  <motion.span
    className="hl"
    initial={{ backgroundSize: "0% 46%" }}
    whileInView={{ backgroundSize: "100% 46%" }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.9, delay, ease: "easeOut" }}
  >
    {children}
  </motion.span>
);

/* ---------- chapter heading ---------- */
export const ChapterHead = ({
  num,
  kicker,
  title,
  lede,
}: {
  num: string;
  kicker: string;
  title: ReactNode;
  lede: string;
}) => (
  <Reveal>
    <div className="relative mb-10 md:mb-14">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-3 md:-left-8 font-display font-black text-[7rem] md:text-[10rem] leading-none text-transparent select-none"
        style={{ WebkitTextStroke: "1.5px rgba(33,27,18,0.14)" }}
      >
        {num}
      </span>
      <div className="relative pt-10 md:pt-14 pl-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-10 bg-accent" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
            Kapitel {num} · {kicker}
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-[650] tracking-tight leading-[1.02]">
          {title}
        </h2>
        <p className="mt-4 text-ink-soft text-base md:text-lg max-w-xl leading-relaxed">{lede}</p>
      </div>
    </div>
  </Reveal>
);

/* ---------- golden rule callout ---------- */
export const GoldenRule = ({ children, label = "Die goldene Regel" }: { children: ReactNode; label?: string }) => (
  <Reveal>
    <div className="relative rounded-2xl border-2 border-ink bg-hl/40 px-6 py-6 md:px-9 md:py-8 shadow-[6px_6px_0_0_#211b12]">
      <span className="absolute -top-3.5 left-6 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
        {label}
      </span>
      <div className="font-display text-xl md:text-2xl font-[600] leading-snug pt-1">{children}</div>
    </div>
  </Reveal>
);

/* ---------- sticky-note memory card ---------- */
export const StickyNote = ({ children, rotate = -1.5 }: { children: ReactNode; rotate?: number }) => (
  <Reveal>
    <div
      className="relative bg-hl/90 rounded-[4px] px-6 pt-7 pb-6 shadow-[0_10px_24px_rgba(33,27,18,0.14)] max-w-md"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-16 bg-paper-deep/90 border border-line shadow-sm rotate-[-2deg]" />
      <div className="hand text-[1.45rem] leading-snug text-ink/90">{children}</div>
    </div>
  </Reveal>
);

/* ---------- tip note ---------- */
export const TipNote = ({ children }: { children: ReactNode }) => (
  <Reveal>
    <div className="flex gap-3.5 items-start rounded-xl bg-paper-deep/70 border border-line px-5 py-4">
      <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={2.2} />
      <div className="text-[15px] leading-relaxed text-ink/80">{children}</div>
    </div>
  </Reveal>
);

/* ---------- sentence flow diagram ---------- */
const toneStyles: Record<string, { line: string; chip: string }> = {
  nom: { line: "border-ink/50", chip: "bg-ink text-paper" },
  verb: { line: "border-ink/25", chip: "bg-paper-deep text-ink-soft border border-line" },
  akk: { line: "border-accent", chip: "bg-accent text-white" },
};

export const SentenceFlow = ({
  tokens,
  en,
  qa,
}: {
  tokens: { t: string; tag: string; tone: "nom" | "verb" | "akk" }[];
  en: string;
  qa?: { q: string; a: string };
}) => (
  <div className="rounded-2xl border border-line bg-white/55 px-5 py-5 md:px-7 md:py-6">
    <div className="flex flex-wrap items-end gap-x-4 gap-y-4">
      {tokens.map((tok, i) => (
        <motion.div
          key={i}
          className="flex flex-col gap-1.5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.45 }}
        >
          <span className={`font-display text-2xl md:text-[1.75rem] font-[650] pb-0.5 border-b-[3px] ${toneStyles[tok.tone].line}`}>
            {tok.t}
          </span>
          <span className={`text-[9.5px] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded-md self-start ${toneStyles[tok.tone].chip}`}>
            {tok.tag}
          </span>
        </motion.div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
      <span className="text-ink-soft italic flex items-center gap-2">
        <Quote className="w-3.5 h-3.5 shrink-0" /> {en}
      </span>
      {qa && (
        <span className="text-ink/70">
          <span className="font-semibold text-accent">Frage: </span>
          {qa.q} <span className="font-semibold">{qa.a}</span>
        </span>
      )}
    </div>
  </div>
);

/* ---------- grammar rule table ---------- */
export const RuleTable = ({
  rows,
  foot,
}: {
  rows: RuleRow[];
  foot?: string;
}) => (
  <Reveal>
    <div className="overflow-hidden rounded-2xl border border-ink/15 bg-white/60 shadow-[0_2px_0_0_rgba(33,27,18,0.06)]">
      <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-ink text-paper text-[10.5px] md:text-xs font-bold uppercase tracking-[0.16em]">
        <div className="px-4 md:px-6 py-3.5">Genus</div>
        <div className="px-4 md:px-6 py-3.5 border-l border-white/10">Nominativ</div>
        <div className="px-4 md:px-6 py-3.5 border-l border-white/10 flex items-center gap-2">
          Akkusativ
          <span className="hidden sm:inline-block normal-case tracking-normal font-medium text-white/50">Wen? Was?</span>
        </div>
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`group grid grid-cols-[1.1fr_1fr_1fr] text-[15px] md:text-lg transition-colors hover:bg-hl/25 ${
            i < rows.length - 1 ? "border-b border-line" : ""
          }`}
        >
          <div className="px-4 md:px-6 py-4 flex flex-col justify-center relative">
            {row.changed && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
            )}
            <span className="font-semibold">{row.gender}</span>
            <span className="text-[11px] text-ink-soft uppercase tracking-wide">{row.genderEn}</span>
          </div>
          <div className="px-4 md:px-6 py-4 font-display font-[600] text-lg md:text-xl border-l border-line/70 flex items-center text-ink/75">
            <span className="w-10 md:w-12">{row.nom}</span>
            <span className="text-ink-soft/60 text-sm hidden md:inline">→</span>
          </div>
          <div
            className={`px-4 md:px-6 py-4 font-display font-[650] text-lg md:text-xl border-l border-line/70 flex items-center ${
              row.changed ? "bg-accent/[0.07]" : ""
            }`}
          >
            {row.akk}
          </div>
        </div>
      ))}
      {foot && (
        <div className="px-4 md:px-6 py-3 bg-paper-deep/60 text-[13px] text-ink-soft border-t border-line">
          {foot}
        </div>
      )}
    </div>
  </Reveal>
);

/* ---------- example comparison block ---------- */
export const ComparePair = ({
  left,
  right,
}: {
  left: { title: string; de: ReactNode; en: string; tone?: "neutral" };
  right: { title: string; de: ReactNode; en: string };
}) => (
  <div className="grid md:grid-cols-2 gap-4">
    <Reveal>
      <div className="h-full rounded-2xl border border-line bg-white/55 p-5 md:p-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft mb-3">{left.title}</div>
        <div className="font-display text-xl md:text-2xl font-[620] leading-snug">{left.de}</div>
        <div className="mt-2.5 text-sm text-ink-soft italic">{left.en}</div>
      </div>
    </Reveal>
    <Reveal delay={0.12}>
      <div className="h-full rounded-2xl border-2 border-ink bg-white/70 p-5 md:p-6 shadow-[4px_4px_0_0_rgba(33,27,18,0.9)]">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">{right.title}</div>
        <div className="font-display text-xl md:text-2xl font-[650] leading-snug">{right.de}</div>
        <div className="mt-2.5 text-sm text-ink-soft italic">{right.en}</div>
      </div>
    </Reveal>
  </div>
);

/* ---------- simple wrapper per chapter ---------- */
export const Chapter = ({ id, children }: { id: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-28 py-14 md:py-20">
    {children}
  </section>
);
