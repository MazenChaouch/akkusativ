import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MousePointerClick, Sparkles, Users, KeyRound, X } from "lucide-react";
import { chains, focusPairs, labQuestions, playgroundNouns } from "../data/content";
import { Reveal, HL } from "./Atoms";

/* ============ 1) Gender Playground: watch the article change ============ */
export const GenderPlayground = () => {
  const [sel, setSel] = useState(0);
  const noun = playgroundNouns[sel];

  return (
    <Reveal>
      <div className="rounded-3xl border-2 border-ink bg-white/60 p-5 md:p-8 shadow-[8px_8px_0_0_rgba(33,27,18,0.9)]">
        <div className="flex items-center gap-2.5 mb-5">
          <MousePointerClick className="w-4.5 h-4.5 text-accent" strokeWidth={2.4} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
            Probier es aus — wähle ein Nomen
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {playgroundNouns.map((n, i) => (
            <button
              key={i}
              onClick={() => setSel(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 cursor-pointer ${
                sel === i
                  ? "bg-ink text-paper border-ink shadow-[3px_3px_0_0_rgba(226,72,31,0.9)]"
                  : "bg-white/70 border-line hover:border-ink/40"
              }`}
            >
              {n.article} {n.noun}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-line bg-paper p-5 md:p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft mb-3">
              Nominativ · was ist es?
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={sel + "-nom"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="font-display text-2xl md:text-3xl font-[620]"
              >
                {noun.nomSentence}
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-sm text-ink-soft">Kein Objekt — nichts verändert sich.</p>
          </div>

          <div className={`rounded-2xl border-2 p-5 md:p-6 transition-colors duration-300 ${noun.akkChanged ? "border-accent bg-accent/[0.06]" : "border-line bg-paper"}`}>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3 flex items-center justify-between">
              <span>Akkusativ · die Aktion trifft</span>
              <AnimatePresence>
                {noun.akkChanged && (
                  <motion.span
                    key={sel + "-badge"}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-accent text-white font-display font-black text-base"
                  >
                    n
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={sel + "-akk"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="font-display text-2xl md:text-3xl font-[650]"
              >
                {noun.akkSentence}
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-sm text-ink-soft">
              {noun.akkChanged
                ? "Maskulin! Der Artikel bekommt das kleine n: der → den."
                : "Kein Mann, keine Änderung — der Artikel bleibt, wie er ist."}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ============ 2) Pronoun focus pairs with drawing arrows ============ */
const DrawArrow = ({ delay }: { delay: number }) => (
  <svg width="34" height="20" viewBox="0 0 34 20" fill="none" className="shrink-0">
    <motion.path
      d="M2 10 H28 M22 3 L30 10 L22 17"
      stroke="#e2481f"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  </svg>
);

export const PronounPairs = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
    {focusPairs.map((p, i) => (
      <Reveal key={p.nom} delay={i * 0.07}>
        <div className="rounded-2xl border border-line bg-white/65 px-4 py-5 text-center hover:border-accent/60 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-center gap-2.5">
            <span className="font-display text-xl md:text-2xl font-[600] text-ink/70">{p.nom}</span>
            <DrawArrow delay={0.25 + i * 0.1} />
            <span className="font-display text-2xl md:text-[1.7rem] font-[720] text-blau">{p.akk}</span>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);

/* ============ 3) euch / euer Lab ============ */
export const EuchEuerLab = () => {
  const [picked, setPicked] = useState<Record<number, string>>({});

  return (
    <div className="space-y-8">
      {/* the two fighters */}
      <div className="grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="relative h-full rounded-3xl border-2 border-blau bg-blau-soft/70 p-6 md:p-8 overflow-hidden">
            <span aria-hidden className="absolute -right-6 -bottom-8 font-display font-black text-[9rem] leading-none text-blau/10 select-none">
              euch
            </span>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-blau text-white flex items-center justify-center">
                  <Users className="w-5 h-5" strokeWidth={2.2} />
                </span>
                <div>
                  <div className="font-display text-3xl font-[750] text-blau">euch</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blau/70">Personalpronomen</div>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed mb-4">
                <b>euch = you (plural)</b> — es <HL>ersetzt die Personen selbst</HL>. Es ist die Antwort auf „Wen?".
              </p>
              <div className="rounded-xl bg-white/80 border border-blau/25 px-4 py-3">
                <div className="font-display text-xl font-[650]">Ich sehe <span className="text-blau">euch</span>.</div>
                <div className="text-sm text-ink-soft italic mt-0.5">I see you (guys). — Kein Nomen danach!</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative h-full rounded-3xl border-2 border-accent bg-accent/[0.06] p-6 md:p-8 overflow-hidden">
            <span aria-hidden className="absolute -right-6 -bottom-8 font-display font-black text-[9rem] leading-none text-accent/10 select-none">
              euer
            </span>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center">
                  <KeyRound className="w-5 h-5" strokeWidth={2.2} />
                </span>
                <div>
                  <div className="font-display text-3xl font-[750] text-accent">euer</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent/80">Possessivartikel</div>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed mb-4">
                <b>euer = your (plural)</b> — etwas <HL>gehört euch</HL>. Es steht <b>immer vor einem Nomen</b> und lebt wie „ein".
              </p>
              <div className="rounded-xl bg-white/80 border border-accent/30 px-4 py-3">
                <div className="font-display text-xl font-[650]">Ich sehe <span className="text-accent">euer</span> Auto.</div>
                <div className="text-sm text-ink-soft italic mt-0.5">I see your car. — euer klebt am Nomen „Auto".</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* the formula strip */}
      <Reveal>
        <div className="rounded-2xl border border-line bg-white/55 p-5 md:p-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft mb-4">
            euer vor dem Nomen — die drei Fälle
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl border-2 border-accent/50 bg-accent/[0.05] px-4 py-4 text-center">
              <div className="font-display text-xl font-[680]">eure<span className="text-accent font-[800]">n</span> Hund</div>
              <div className="text-xs text-ink-soft mt-1">maskulin → Achtung, das -n!</div>
            </div>
            <div className="rounded-xl border border-line px-4 py-4 text-center">
              <div className="font-display text-xl font-[680]">eure Katze</div>
              <div className="text-xs text-ink-soft mt-1">feminin → keine Änderung</div>
            </div>
            <div className="rounded-xl border border-line px-4 py-4 text-center">
              <div className="font-display text-xl font-[680]">euer Auto</div>
              <div className="text-xs text-ink-soft mt-1">Neutrum → keine Änderung</div>
            </div>
          </div>
          <p className="text-sm text-ink-soft mt-4 leading-relaxed">
            Plural übrigens auch ohne -n: <b>eure Kinder</b>. Es gilt wie immer: nur das Maskulinum ändert sich.
          </p>
        </div>
      </Reveal>

      {/* quick check */}
      <Reveal>
        <div className="rounded-3xl border-2 border-ink bg-white/60 p-5 md:p-7 shadow-[6px_6px_0_0_rgba(33,27,18,0.9)]">
          <div className="flex items-center gap-2.5 mb-5">
            <Sparkles className="w-4.5 h-4.5 text-accent" strokeWidth={2.4} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
              Blitz-Check — tippe die richtige Form an
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {labQuestions.map((q, qi) => {
              const chosen = picked[qi];
              const solved = chosen === q.correct;
              const wrong = chosen && !solved;
              return (
                <div
                  key={qi}
                  className={`rounded-2xl border p-4.5 transition-colors p-5 ${
                    solved ? "border-mint bg-mint/[0.07]" : wrong ? "border-accent bg-accent/[0.05]" : "border-line bg-paper"
                  }`}
                >
                  <div className="font-display text-lg md:text-xl font-[620] mb-3">
                    {q.pre}
                    <span
                      className={`inline-block min-w-[4.5rem] text-center border-b-[3px] px-1 ${
                        solved ? "border-mint text-mint" : wrong ? "border-accent" : "border-ink/40"
                      }`}
                    >
                      {chosen ?? "…"}
                    </span>
                    {q.post}
                  </div>
                  <div className="flex gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setPicked((s) => ({ ...s, [qi]: opt }))}
                        className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all cursor-pointer ${
                          solved && opt === q.correct
                            ? "bg-mint text-white border-mint"
                            : "bg-white/70 border-line hover:border-ink/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                    {solved && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="self-center">
                        <Check className="w-5 h-5 text-mint" strokeWidth={3} />
                      </motion.span>
                    )}
                    {wrong && (
                      <motion.span
                        key={chosen}
                        initial={{ x: 0 }}
                        animate={{ x: [0, -4, 4, -2, 0] }}
                        className="self-center"
                      >
                        <X className="w-5 h-5 text-accent" strokeWidth={3} />
                      </motion.span>
                    )}
                  </div>
                  <AnimatePresence>
                    {solved && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[13px] text-mint leading-relaxed mt-3 overflow-hidden"
                      >
                        {q.why}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

/* ============ 4) Sentence family cycler (ch.7) ============ */
export const ChainCycler = () => {
  const [chainId, setChainId] = useState("m");
  const [step, setStep] = useState(0);
  const chain = chains.find((c) => c.id === chainId)!;

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % chain.steps.length), 3000);
    return () => clearInterval(t);
  }, [chainId, chain.steps.length]);

  const current = chain.steps[step];
  const sentence = { pre: chain.sentencePre, post: chain.sentencePost };

  return (
    <Reveal>
      <div className="rounded-3xl border-2 border-ink bg-white/65 p-6 md:p-10 shadow-[8px_8px_0_0_rgba(33,27,18,0.9)]">
        {/* chain tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {chains.map((c) => (
            <button
              key={c.id}
              onClick={() => { setChainId(c.id); setStep(0); }}
              className={`px-4 py-2 rounded-full text-[13px] font-bold border-2 transition-all cursor-pointer ${
                chainId === c.id
                  ? "bg-ink text-paper border-ink"
                  : "bg-white/70 border-line hover:border-ink/40"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* the sentence stage */}
        <div className="text-center py-4 md:py-6">
          <div className="font-display text-3xl md:text-5xl font-[620] leading-tight flex flex-wrap items-baseline justify-center gap-x-2">
            <span>{sentence.pre}</span>
            <span className="relative inline-flex min-w-[2.6ch] justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={chainId + step}
                  initial={{ opacity: 0, y: 22, rotateX: 60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -22, rotateX: -60 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className={`px-3 rounded-xl border-b-4 ${
                    chainId === "m" ? "bg-accent/[0.08] border-accent" : "bg-paper-deep border-ink/30"
                  }`}
                >
                  {current.slot}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>{sentence.post}</span>
          </div>

          {/* step dots as labels */}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {chain.steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] border transition-all cursor-pointer ${
                  step === i ? "bg-accent text-white border-accent" : "bg-transparent text-ink-soft border-line hover:border-ink/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-5 max-w-md mx-auto min-h-[3rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={chainId + step + "-cap"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[15px] text-ink-soft leading-relaxed"
              >
                {current.caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Reveal>
  );
};
