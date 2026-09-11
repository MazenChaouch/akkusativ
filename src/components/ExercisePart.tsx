import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Check, ChevronDown, Lightbulb,
  PenLine, RotateCcw, Trophy,
} from "lucide-react";
import type { Exercise } from "../data/content";
import { exercises } from "../data/content";
import { Reveal } from "./Atoms";

type Mark = "idle" | "correct" | "wrong";
type Store = {
  values: Record<string, string>;
  marks: Record<string, Mark>;
  solved: number[];
  firstTry: Record<number, boolean>;
  attempts: Record<number, number>;
};

const LS_KEY = "akkusativ-uebungen-v1";
const key = (n: number, id: string) => `${n}-${id}`;

const loadStore = (): Store => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as Store;
  } catch { /* ignore */ }
  return { values: {}, marks: {}, solved: [], firstTry: {}, attempts: {} };
};

const norm = (s: string) => s.trim().toLowerCase().replace(/[.!?,;]+$/g, "");

/* =========================================================================
   Exercise card — defined at MODULE level so React never remounts it when
   the store state updates on every keystroke (this keeps input focus).
   ========================================================================= */
type CardProps = {
  ex: Exercise;
  values: Record<string, string>;
  marks: Record<string, Mark>;
  solved: boolean;
  firstTry: boolean;
  tipOpen: boolean;
  onValue: (ex: Exercise, id: string, v: string) => void;
  onCheck: (ex: Exercise) => void;
  onNext: (n: number) => void;
  onToggleTip: (n: number) => void;
  registerRef: (n: number, el: HTMLDivElement | null) => void;
};

const ExerciseCard = ({
  ex, values, marks, solved, firstTry, tipOpen,
  onValue, onCheck, onNext, onToggleTip, registerRef,
}: CardProps) => {
  const markList = ex.blanks.map((b) => marks[key(ex.n, b.id)] ?? "idle");
  const anyWrong = markList.includes("wrong");
  const allFilled = ex.blanks.every((b) => norm(values[key(ex.n, b.id)] ?? "") !== "");

  return (
    <div
      ref={(el) => registerRef(ex.n, el)}
      className={`relative rounded-3xl border-2 p-5 md:p-7 transition-all duration-300 ${
        solved
          ? "border-mint/70 bg-mint/[0.045]"
          : anyWrong
            ? "border-accent bg-white/70 animate-shake"
            : "border-ink/15 bg-white/60 hover:border-ink/35"
      }`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center font-display text-lg font-[750] transition-colors ${
            solved ? "bg-mint text-white" : "bg-ink text-paper"
          }`}
        >
          {solved ? <Check className="w-5 h-5" strokeWidth={3} /> : ex.n}
        </span>

        <div className="flex-1 min-w-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (solved) onNext(ex.n);
              else if (allFilled) onCheck(ex);
            }}
          >
            {/* sentence with blanks */}
            <div className="font-display text-[1.35rem] md:text-[1.65rem] font-[600] leading-[2.2] md:leading-[2.1] flex flex-wrap items-baseline gap-x-1.5">
              {ex.segments.map((seg, i) => {
                if (seg.kind === "text") return <span key={i}>{seg.text}</span>;
                const b = ex.blanks.find((x) => x.id === seg.id)!;
                const k = key(ex.n, b.id);
                const mark = marks[k] ?? "idle";
                const longest = Math.max(...b.answers.map((a) => a.length), 3);
                return (
                  <input
                    key={k}
                    value={values[k] ?? ""}
                    disabled={solved}
                    onChange={(e) => onValue(ex, b.id, e.target.value)}
                    placeholder="…"
                    aria-label={`Lücke ${ex.n}`}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    style={{ width: `${longest + 2.2}ch` }}
                    className={`mx-0.5 rounded-lg px-1.5 text-center bg-paper-deep/50 outline-none border-b-[3px] transition-colors placeholder:text-ink/25 ${
                      mark === "correct"
                        ? "border-mint text-mint"
                        : mark === "wrong"
                          ? "border-accent text-accent-deep"
                          : "border-ink/35 focus:border-accent focus:bg-white"
                    } ${solved ? "bg-transparent" : ""}`}
                  />
                );
              })}
              <span className="ml-2 align-middle">
                <span className="text-[12px] font-sans font-semibold text-ink-soft bg-paper-deep/80 border border-line rounded-full px-3 py-1 whitespace-nowrap">
                  {ex.cue}
                </span>
              </span>
            </div>

            {/* controls */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {!solved && (
                <button
                  type="submit"
                  disabled={!allFilled}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                    allFilled
                      ? "bg-ink text-paper hover:bg-accent"
                      : "bg-paper-deep text-ink/40 cursor-not-allowed"
                  }`}
                >
                  <Check className="w-4 h-4" strokeWidth={2.8} /> Prüfen
                </button>
              )}
              {solved && (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-mint text-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] hover:bg-ink transition-colors cursor-pointer"
                >
                  Weiter <ArrowRight className="w-4 h-4" strokeWidth={2.8} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onToggleTip(ex.n)}
                className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                  tipOpen ? "border-hl bg-hl/30 text-ink" : "border-line text-ink-soft hover:border-ink/40"
                }`}
              >
                <Lightbulb className="w-4 h-4" strokeWidth={2.4} /> Tipp
              </button>
              {firstTry && solved && (
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-mint">
                  Erster Versuch!
                </span>
              )}
            </div>
          </form>

          <AnimatePresence>
            {tipOpen && !solved && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden text-[14px] text-ink-soft leading-relaxed"
              >
                <span className="block pt-3">{ex.tip}</span>
              </motion.p>
            )}
            {solved && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl bg-mint/[0.09] border border-mint/40 px-4 py-3 text-[14px] leading-relaxed text-ink/85">
                  <span className="font-bold text-mint text-[11px] uppercase tracking-[0.16em] block mb-1">Warum?</span>
                  {ex.why}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ============================ part container ============================ */
export const ExercisePart = ({ onGoRules, onPdf }: { onGoRules: () => void; onPdf: () => void }) => {
  const [store, setStore] = useState<Store>(loadStore);
  const [tips, setTips] = useState<Record<number, boolean>>({});
  const [openKey, setOpenKey] = useState<number | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(store)); } catch { /* ignore */ }
  }, [store]);

  const solvedSet = useMemo(() => new Set(store.solved), [store.solved]);
  const allSolved = store.solved.length === exercises.length;
  const firstTryCount = exercises.filter((e) => store.firstTry[e.n]).length;

  const setValue = (ex: Exercise, id: string, v: string) => {
    const k = key(ex.n, id);
    setStore((s) => ({
      ...s,
      values: { ...s.values, [k]: v },
      marks: { ...s.marks, [k]: "idle" as Mark },
    }));
  };

  const check = (ex: Exercise) => {
    const newMarks: Record<string, Mark> = { ...store.marks };
    let allOk = true;
    for (const b of ex.blanks) {
      const k = key(ex.n, b.id);
      const ok = b.answers.some((a) => norm(a) === norm(store.values[k] ?? ""));
      newMarks[k] = ok ? "correct" : "wrong";
      if (!ok) allOk = false;
    }
    setStore((s) => {
      const attempts = { ...s.attempts, [ex.n]: (s.attempts[ex.n] ?? 0) + 1 };
      const firstTry = { ...s.firstTry };
      let solved = s.solved;
      if (allOk && !solvedSet.has(ex.n)) {
        solved = [...solved, ex.n].sort((a, b) => a - b);
        firstTry[ex.n] = (s.attempts[ex.n] ?? 0) === 0;
      }
      return { ...s, marks: newMarks, attempts, firstTry, solved };
    });
  };

  const goNext = (n: number) => {
    const next = exercises.find((e) => e.n > n && !solvedSet.has(e.n)) ?? exercises.find((e) => !solvedSet.has(e.n));
    if (next) {
      cardRefs.current[next.n]?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      document.getElementById("ergebnis")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const toggleTip = (n: number) => setTips((t) => ({ ...t, [n]: !t[n] }));

  const registerRef = (n: number, el: HTMLDivElement | null) => {
    cardRefs.current[n] = el;
  };

  const reset = () => {
    setStore({ values: {}, marks: {}, solved: [], firstTry: {}, attempts: {} });
    setTips({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-32 md:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        {/* header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-accent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              Teil 2 · Die Übungen
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-[680] tracking-tight leading-[0.98]">
            Zeig, was<br />du <span className="text-accent">kannst</span>.
          </h1>
          <p className="mt-5 text-lg text-ink-soft max-w-xl leading-relaxed">
            Zehn Aufgaben, absichtlich wild gemischt — Artikel, Pronomen, Possessive.
            Du entscheidest jedes Mal selbst, welche Regel gerade verlangt ist.
          </p>
        </Reveal>

        {/* progress */}
        <Reveal delay={0.1}>
          <div className="mt-8 mb-10 flex items-center gap-3 flex-wrap rounded-2xl border border-line bg-white/55 px-5 py-4">
            <div className="flex items-center gap-1.5 mr-2">
              {exercises.map((e) => (
                <button
                  key={e.n}
                  onClick={() => cardRefs.current[e.n]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className={`w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                    solvedSet.has(e.n)
                      ? store.firstTry[e.n]
                        ? "bg-mint text-white"
                        : "bg-mint/35 text-mint"
                      : "bg-paper-deep text-ink/50 hover:bg-ink/10"
                  }`}
                  aria-label={`Aufgabe ${e.n}`}
                >
                  {e.n}
                </button>
              ))}
            </div>
            <span className="text-sm font-semibold text-ink/70">
              {store.solved.length}/10 gelöst
            </span>
            <span className="text-sm text-ink-soft">
              · {firstTryCount} beim ersten Versuch
            </span>
            <button
              onClick={reset}
              className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft hover:text-accent transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} /> Neu starten
            </button>
          </div>
        </Reveal>

        {/* exercise cards */}
        <div className="space-y-5">
          {exercises.map((ex, i) => (
            <Reveal key={ex.n} delay={Math.min(i * 0.04, 0.2)}>
              <ExerciseCard
                ex={ex}
                values={store.values}
                marks={store.marks}
                solved={solvedSet.has(ex.n)}
                firstTry={!!store.firstTry[ex.n]}
                tipOpen={!!tips[ex.n]}
                onValue={setValue}
                onCheck={check}
                onNext={goNext}
                onToggleTip={toggleTip}
                registerRef={registerRef}
              />
            </Reveal>
          ))}
        </div>

        {/* result */}
        <AnimatePresence>
          {allSolved && (
            <motion.div
              id="ergebnis"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-12 rounded-[2rem] border-2 border-ink bg-ink text-paper px-7 py-12 text-center relative overflow-hidden"
            >
              <span aria-hidden className="absolute -right-8 -top-14 font-display font-black text-[13rem] leading-none text-white/[0.05] select-none">10</span>
              <motion.div
                initial={{ rotate: -12, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
                className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-hl text-ink flex items-center justify-center"
              >
                <Trophy className="w-8 h-8" strokeWidth={2.2} />
              </motion.div>
              <div className="font-display text-4xl md:text-6xl font-[700]">
                {firstTryCount}<span className="text-white/40">/10</span>
              </div>
              <div className="mt-1.5 text-[12px] font-bold uppercase tracking-[0.22em] text-hl">beim ersten Versuch</div>
              <p className="mt-5 text-white/70 max-w-md mx-auto leading-relaxed">
                {firstTryCount >= 9
                  ? "Wahnsinn! Du denkst schon wie ein Profi: Subjekt oder Objekt? Wen oder was? Das kleine n hat keine Chance mehr, sich vor dir zu verstecken."
                  : firstTryCount >= 6
                    ? "Sehr stark! Schau dir die Lösungen unten noch einmal genau an — besonders die Fälle, die nicht beim ersten Versuch klappten."
                    : "Guter Anfang! Lies Kapitel 2, 4 und 6 in Teil 1 noch einmal und greif dann wieder an — die Merkkarte hilft."}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={onPdf}
                  className="inline-flex items-center gap-2.5 rounded-full bg-hl text-ink px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] hover:bg-white transition-colors cursor-pointer"
                >
                  <PenLine className="w-4 h-4" strokeWidth={2.6} /> Als PDF sichern
                </button>
                <button
                  onClick={onGoRules}
                  className="inline-flex items-center gap-2.5 rounded-full border-2 border-white/25 px-7 py-3 text-[12px] font-bold uppercase tracking-[0.14em] hover:border-hl hover:text-hl transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" strokeWidth={2.6} /> Regeln wiederholen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* answer key */}
        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Answer Key</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-[660] tracking-tight mb-2">
              Lösungen <span className="text-ink/40">&amp;</span> warum sie stimmen
            </h2>
            <p className="text-ink-soft mb-8">Nicht schummeln — erst probieren, dann nachschlagen.</p>
          </Reveal>

          <div className="space-y-3">
            {exercises.map((ex) => {
              const open = openKey === ex.n;
              return (
                <Reveal key={ex.n}>
                  <div className={`rounded-2xl border transition-colors overflow-hidden ${open ? "border-ink bg-white/70" : "border-line bg-white/45"}`}>
                    <button
                      onClick={() => setOpenKey(open ? null : ex.n)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
                    >
                      <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold ${solvedSet.has(ex.n) ? "bg-mint text-white" : "bg-paper-deep text-ink/60"}`}>
                        {ex.n}
                      </span>
                      <span className="font-display text-lg md:text-xl font-[620] flex-1">{ex.solution}</span>
                      <ChevronDown className={`w-5 h-5 text-ink-soft transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={2.4} />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-5 pb-5 pt-1 pl-[4.25rem] text-[14.5px] leading-relaxed text-ink/80">
                            {ex.why}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
