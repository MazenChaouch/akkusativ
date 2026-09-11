import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Flame, RotateCcw, Volume2, X } from "lucide-react";
import { NOUNS, TOPICS } from "../data/vocab";
import type { NounEntry } from "../data/vocab";
import { Reveal } from "./Atoms";

const ARTICLES = ["der", "die", "das"] as const;
const LS = "akkusativ-genus-v1";

type GenusStats = Record<string, { right: number; wrong: number }>;

const load = (): GenusStats => {
  try { return JSON.parse(localStorage.getItem(LS) ?? "{}") as GenusStats; } catch { return {}; }
};

/** Singular nouns only — plural entries have no der/die/das choice to train. */
const TRAINABLE = NOUNS.filter((n) => n.g !== "pl");

export const GenusTrainer = ({
  onSpeak, audio,
}: { onSpeak: (t: string) => void; audio: boolean }) => {
  const [stats, setStats] = useState<GenusStats>(load);
  const [topic, setTopic] = useState<string>("alle");
  const [answer, setAnswer] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [queue, setQueue] = useState<NounEntry[]>([]);

  const pool = useMemo(
    () => (topic === "alle" ? TRAINABLE : TRAINABLE.filter((n) => n.topic === topic)),
    [topic]
  );

  /* weighted queue: words you got wrong come back more often */
  const buildQueue = useMemo(
    () => () => {
      const weighted: NounEntry[] = [];
      for (const n of pool) {
        const s = stats[n.word] ?? { right: 0, wrong: 0 };
        const weight = 1 + s.wrong * 2 - Math.min(s.right, 2) * 0.3;
        for (let i = 0; i < Math.max(1, Math.round(weight)); i++) weighted.push(n);
      }
      for (let i = weighted.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
      }
      return weighted.slice(0, 40);
    },
    [pool, stats]
  );

  useEffect(() => {
    setQueue(buildQueue());
    setAnswer(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  useEffect(() => {
    try { localStorage.setItem(LS, JSON.stringify(stats)); } catch { /* ignore */ }
  }, [stats]);

  const current = queue[0];

  const choose = (art: string) => {
    if (!current || answer) return;
    setAnswer(art);
    const ok = art === current.art;
    setStats((s) => {
      const prev = s[current.word] ?? { right: 0, wrong: 0 };
      return { ...s, [current.word]: { right: prev.right + (ok ? 1 : 0), wrong: prev.wrong + (ok ? 0 : 1) } };
    });
    if (ok) {
      setStreak((v) => {
        const nv = v + 1;
        setBest((b) => Math.max(b, nv));
        return nv;
      });
      if (audio) onSpeak(`${current.art} ${current.word}`);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    setAnswer(null);
    setQueue((q) => (q.length > 1 ? q.slice(1) : buildQueue()));
  };

  const totals = useMemo(() => {
    let right = 0, wrong = 0;
    for (const k of Object.keys(stats)) { right += stats[k].right; wrong += stats[k].wrong; }
    return { right, wrong, pct: right + wrong ? Math.round((right / (right + wrong)) * 100) : 0 };
  }, [stats]);

  const weak = useMemo(
    () =>
      Object.entries(stats)
        .filter(([, v]) => v.wrong > 0)
        .sort((a, b) => b[1].wrong - a[1].wrong)
        .slice(0, 6)
        .map(([w, v]) => ({ word: w, ...v, art: NOUNS.find((n) => n.word === w)?.art ?? "" })),
    [stats]
  );

  return (
    <div className="space-y-7">
      <Reveal>
        <div className="rounded-2xl border border-line bg-white/55 p-5">
          <p className="text-[15px] leading-relaxed text-ink/80">
            Der Akkusativ funktioniert nur, wenn du das <b>Genus</b> kennst: <i>den</i> statt <i>der</i> gibt es
            ja nur beim Maskulinum. Trainiere hier die Artikel — falsch beantwortete Wörter kommen häufiger zurück.
          </p>
        </div>
      </Reveal>

      {/* topic filter */}
      <Reveal delay={0.06}>
        <div className="flex flex-wrap gap-2">
          {["alle", ...TOPICS].map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-semibold border-2 transition-all cursor-pointer ${
                topic === t ? "bg-ink text-paper border-ink" : "bg-white/60 border-line hover:border-ink/40"
              }`}
            >
              {t === "alle" ? "Alle Themen" : t}
            </button>
          ))}
        </div>
      </Reveal>

      {/* the card */}
      <Reveal delay={0.1}>
        <div className="rounded-3xl border-2 border-ink bg-white/65 p-6 md:p-10 shadow-[8px_8px_0_0_rgba(33,27,18,0.9)]">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              <Flame className={`w-4 h-4 ${streak >= 3 ? "text-accent" : "text-ink/30"}`} strokeWidth={2.4} />
              Serie {streak} · Rekord {best}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              {totals.right + totals.wrong > 0 ? `${totals.pct}% richtig · ${totals.right + totals.wrong} Karten` : "noch keine Karten"}
            </span>
          </div>

          {current && (
            <div className="text-center py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.word + queue.length}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="font-display text-4xl md:text-6xl font-[700] tracking-tight">
                    {answer ? (
                      <span className={answer === current.art ? "text-mint" : "text-accent"}>
                        {current.art}{" "}
                      </span>
                    ) : (
                      <span className="text-ink/25">___ </span>
                    )}
                    {current.word}
                  </div>
                  <div className="mt-2.5 text-ink-soft italic">{current.en}</div>
                </motion.div>
              </AnimatePresence>

              {/* choices */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {ARTICLES.map((a) => {
                  const isRight = answer && a === current.art;
                  const isWrongPick = answer === a && a !== current.art;
                  return (
                    <button
                      key={a}
                      onClick={() => choose(a)}
                      disabled={!!answer}
                      className={`font-display text-2xl font-[700] px-8 py-3.5 rounded-2xl border-2 transition-all ${
                        isRight
                          ? "bg-mint text-white border-mint"
                          : isWrongPick
                            ? "bg-accent text-white border-accent"
                            : answer
                              ? "border-line text-ink/35"
                              : "border-ink bg-white/70 hover:bg-ink hover:text-paper cursor-pointer"
                      }`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>

              {/* feedback */}
              <AnimatePresence>
                {answer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-7"
                  >
                    <div className={`inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] ${answer === current.art ? "text-mint" : "text-accent"}`}>
                      {answer === current.art ? <Check className="w-4 h-4" strokeWidth={3} /> : <X className="w-4 h-4" strokeWidth={3} />}
                      {answer === current.art ? "Richtig!" : `Falsch — es heißt „${current.art} ${current.word}“`}
                    </div>

                    <div className="mt-4 rounded-2xl bg-paper-deep/60 border border-line px-5 py-4 max-w-sm mx-auto text-left">
                      <div className="text-[12.5px] text-ink-soft leading-relaxed">
                        <b className="text-ink">Akkusativ:</b> Ich sehe{" "}
                        <b className="text-ink">
                          {current.g === "m" ? "den" : current.g === "f" ? "die" : "das"} {current.word}
                        </b>
                        {current.g === "m" ? " — maskulin, also der → den!" : " — unverändert."}
                        <br />
                        <b className="text-ink">Plural:</b> {current.plural}
                      </div>
                    </div>

                    <div className="mt-5 flex justify-center gap-2.5">
                      <button
                        onClick={next}
                        className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] hover:bg-accent transition-colors cursor-pointer"
                      >
                        Nächste Karte
                      </button>
                      {audio && (
                        <button
                          onClick={() => onSpeak(`${current.art} ${current.word}`)}
                          className="inline-flex items-center gap-2 rounded-full border-2 border-line px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-ink-soft hover:border-accent hover:text-accent transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" strokeWidth={2.4} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </Reveal>

      {/* weak words */}
      {weak.length > 0 && (
        <Reveal>
          <div className="rounded-2xl border border-line bg-white/55 p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Deine Wackelkandidaten
              </span>
              <button
                onClick={() => { setStats({}); setStreak(0); setQueue(buildQueue()); }}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft hover:text-accent transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} /> Statistik löschen
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {weak.map((w) => (
                <span key={w.word} className="inline-flex items-baseline gap-1.5 rounded-xl border border-accent/40 bg-accent/[0.05] px-3.5 py-2">
                  <b className="font-display text-[15px]">{w.art} {w.word}</b>
                  <span className="text-[11px] text-ink-soft">{w.wrong}× falsch</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
};
