import { motion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Brain,
  PenLine, Scissors, Star, Target, User, Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  B, N, definiteRows, einPairs, indefiniteRows, introFlows, marqueeItems,
  meinRows, possessiveArrows, possessiveMeanings, pronounRows, masterRows,
} from "../data/content";
import {
  Chapter, ChapterHead, ComparePair, GoldenRule, HL, Reveal,
  RuleTable, SentenceFlow, StickyNote, TipNote,
} from "./Atoms";
import { ChainCycler, EuchEuerLab, GenderPlayground, PronounPairs } from "./Widgets";

/* ================= hero ================= */
const Hero = ({ onGoExercises }: { onGoExercises: () => void }) => (
  <header className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
    {/* floating n's */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute top-[8%] right-[6%] font-display font-black text-[16rem] md:text-[24rem] leading-none text-accent/[0.07] select-none">n</span>
      <span className="animate-floaty absolute top-[38%] right-[22%] font-display font-black text-7xl md:text-9xl leading-none text-ink/[0.05] select-none" style={{ ["--rot" as never]: "12deg" }}>n</span>
      <span className="animate-floaty absolute bottom-[10%] left-[42%] font-display font-black text-5xl md:text-7xl leading-none text-blau/[0.07] select-none" style={{ ["--rot" as never]: "-9deg", animationDelay: "1.4s" }}>n</span>
    </div>

    <div className="relative max-w-5xl mx-auto px-5 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-white/60 px-4 py-2 mb-8"
      >
        <BookOpen className="w-4 h-4 text-accent" strokeWidth={2.4} />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/70">
          Dein interaktives A1-Arbeitsbuch · Teil 1: Regeln
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08 }}
        className="font-display font-[680] tracking-tight leading-[0.95] text-[clamp(2.8rem,14vw,6.6rem)]"
      >
        Der Akkusativ<span className="text-accent">.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18 }}
        className="mt-6 text-xl md:text-2xl max-w-2xl leading-relaxed text-ink/85"
      >
        <HL delay={0.6}>Nur der Mann ändert sich.</HL>{" "}
        Ein einziges Muster — <b>das kleine <span className="text-accent font-black">n</span></b> — verbindet Artikel,
        Pronomen und Possessivwörter. Dieses Buch zeigt dir genau dieses Muster.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-3 text-sm md:text-base text-ink-soft max-w-xl"
      >
        Learn the logic once, and five grammar topics click into place: definite &amp; indefinite
        articles, personal pronouns, possessives — and the famous euch/euer confusion.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.38 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href="#k1"
          className="inline-flex items-center gap-2.5 rounded-full bg-ink text-paper px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-accent transition-colors shadow-[5px_5px_0_0_rgba(226,72,31,0.35)]"
        >
          Kapitel 1 starten <ArrowDown className="w-4 h-4" strokeWidth={2.6} />
        </a>
        <button
          onClick={onGoExercises}
          className="inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-white/60 px-7 py-[14px] text-sm font-bold uppercase tracking-[0.14em] hover:border-accent hover:text-accent transition-colors cursor-pointer"
        >
          <PenLine className="w-4 h-4" strokeWidth={2.6} /> Direkt zu den Übungen
        </button>
      </motion.div>

      {/* topic map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="mt-14 flex flex-wrap gap-2"
      >
        {[
          ["der → den", "#k2"], ["ein → einen", "#k3"], ["ich → mich", "#k4"],
          ["mein → meinen", "#k5"], ["euch ≠ euer", "#k6"], ["Große Tabellen", "#k8"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white/50 px-4 py-2 text-[13px] font-semibold text-ink/75 hover:border-accent hover:text-accent transition-colors"
          >
            {label}
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2.5} />
          </a>
        ))}
      </motion.div>
    </div>
  </header>
);

/* ================= marquee ================= */
const Marquee = () => (
  <div className="relative -rotate-[0.6deg] border-y-2 border-ink bg-ink text-paper py-3.5 overflow-hidden">
    <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap pr-8">
      {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="flex items-center gap-8 text-sm font-bold tracking-wide">
          {item} <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
        </span>
      ))}
    </div>
  </div>
);

/* ================= ch.2 example row ================= */
const DefEx = ({ nom, akk, why }: { nom: string; akk: ReactNode; why: string }) => (
  <Reveal>
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-2xl border border-line bg-white/55 px-5 py-4">
      <span className="font-display text-lg text-ink/60 w-28 shrink-0">{nom}</span>
      <ArrowRight className="w-4 h-4 text-accent shrink-0 hidden sm:block" strokeWidth={2.6} />
      <span className="font-display text-xl md:text-2xl font-[640]">{akk}</span>
      <span className="sm:ml-auto text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-soft bg-paper-deep/70 rounded-full px-3 py-1.5 self-start sm:self-center">
        {why}
      </span>
    </div>
  </Reveal>
);

/* ================= pronoun master table ================= */
const PronounTable = () => (
  <Reveal>
    <div className="overflow-hidden rounded-2xl border border-ink/15 bg-white/60">
      <div className="grid grid-cols-[1fr_1fr_1fr] bg-blau text-white text-[10.5px] md:text-xs font-bold uppercase tracking-[0.16em]">
        <div className="px-4 md:px-6 py-3.5">Nominativ</div>
        <div className="px-4 md:px-6 py-3.5 border-l border-white/15">Akkusativ</div>
        <div className="px-4 md:px-6 py-3.5 border-l border-white/15">English</div>
      </div>
      {pronounRows.map((r, i) => (
        <div
          key={i}
          className={`grid grid-cols-[1fr_1fr_1fr] items-center ${i < pronounRows.length - 1 ? "border-b border-line" : ""} ${
            r.focus ? "bg-blau-soft/60" : "hover:bg-blau-soft/30"
          } transition-colors`}
        >
          <div className="px-4 md:px-6 py-3.5 font-display font-[600] text-lg flex items-center gap-2">
            {r.focus && <Star className="w-3.5 h-3.5 text-accent fill-accent shrink-0" />}
            {r.nom}
          </div>
          <div className="px-4 md:px-6 py-3.5 border-l border-line/70 font-display font-[720] text-lg md:text-xl text-blau">{r.akk}</div>
          <div className="px-4 md:px-6 py-3.5 border-l border-line/70 text-sm text-ink-soft">
            <div className="font-semibold text-ink/75">{r.enN} → {r.enA}</div>
            {r.why && <div className="text-[11px]">{r.why}</div>}
          </div>
        </div>
      ))}
    </div>
  </Reveal>
);

/* ================= memory card (ch.9) ================= */
const CardSection = ({ title, rows, accent = false }: { title: string; rows: [ReactNode, ReactNode][]; accent?: boolean }) => (
  <div>
    <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${accent ? "text-accent" : "text-ink-soft"}`}>{title}</div>
    <div className="space-y-1">
      {rows.map(([a, b], i) => (
        <div key={i} className="flex items-baseline gap-2 font-display text-lg">
          <span className="text-ink/60 w-14">{a}</span>
          <span className="text-accent">→</span>
          <span className="font-[700]">{b}</span>
        </div>
      ))}
    </div>
  </div>
);

export const MemoryCard = () => (
  <div className="relative">
    <div className="border-2 border-dashed border-ink/40 rounded-[2rem] p-3">
      <div className="rounded-[1.6rem] border-2 border-ink bg-white/80 px-6 py-8 md:px-10 md:py-10 shadow-[8px_8px_0_0_rgba(33,27,18,0.9)]">
        <div className="flex items-center justify-between gap-4 mb-7">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent mb-1">Akkusativ · Merkkarte</div>
            <div className="font-display text-2xl md:text-3xl font-[720]">Das kleine <span className="text-accent">n</span> — alles auf einen Blick</div>
          </div>
          <Brain className="w-9 h-9 text-ink/25 shrink-0" strokeWidth={1.8} />
        </div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
          <CardSection title="Bestimmt" rows={[["der", <>de<N /></>], ["die", "die"], ["das", "das"], ["die (Pl.)", "die"]]} accent />
          <CardSection title="Unbestimmt" rows={[["ein", <>ein<N>en</N></>], ["eine", "eine"], ["ein", "ein"]]} />
          <CardSection
            title="Personalpronomen"
            rows={[["ich", "mich"], ["du", "dich"], ["er", <>ih<N /></>], ["wir", "uns"], ["ihr", "euch"]]}
          />
          <CardSection
            title="Possessiv (maskulin!)"
            rows={[["mein", <>mein<N>en</N></>], ["dein", <>dein<N>en</N></>], ["sein", <>sein<N>en</N></>], ["ihr", <>ihr<N>en</N></>], ["unser", <>unser<N>en</N></>], ["euer", <>eur<N>en</N></>], ["Ihr", <>Ihr<N>en</N></>]]}
            accent
          />
        </div>

        <div className="mt-8 rounded-2xl bg-ink text-paper px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-display text-xl md:text-2xl font-[700]">
            <span className="text-blau-soft">euch</span> = you (plural)
          </span>
          <span className="font-display text-xl md:text-2xl font-[700]">
            <span className="text-hl">euer</span> = your (plural)
          </span>
          <span className="text-sm text-white/60">euch antwortet auf „Wen?" — euer steht vor einem Nomen.</span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center gap-2 mt-4 text-ink-soft text-sm">
      <Scissors className="w-4 h-4" strokeWidth={2.2} />
      In der PDF-Version kannst du diese Karte ausschneiden und überall hinhängen.
    </div>
  </div>
);

/* ================= the whole rules part ================= */
export const RulesPart = ({ onGoExercises }: { onGoExercises: () => void }) => (
  <div>
    <Hero onGoExercises={onGoExercises} />
    <Marquee />

    <div className="max-w-5xl mx-auto px-5 md:px-8">
      {/* ------------- K1 ------------- */}
      <Chapter id="k1">
        <ChapterHead
          num="01"
          kicker="Grundlagen"
          title={<>Was ist der <span className="text-accent">Akkusativ</span>?</>}
          lede="The case of the direct object — who or what receives the action."
        />

        <div className="space-y-6">
          <Reveal>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl">
              Fast jeder deutsche Satz hat <B>drei Rollen</B>: Wie im Theater gibt es eine Person, die handelt
              (<span className="term">Subjekt</span> → <B>Nominativ</B>), eine Handlung
              (<span className="term">Verb</span>) und jemanden oder etwas, das die Handlung „abbekommt"
              (<span className="term">Objekt</span> → <B>Akkusativ</B>).
            </p>
          </Reveal>

          <Reveal>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-line bg-white/55 p-5">
                <User className="w-5 h-5 text-ink/60 mb-3" strokeWidth={2.2} />
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-1.5">1 · Subjekt</div>
                <div className="font-display text-lg font-[650] leading-snug">Wer tut etwas?</div>
                <div className="text-sm text-ink-soft mt-1">Der Täter → Nominativ. Frag: <B>Wer?</B></div>
              </div>
              <div className="rounded-2xl border border-line bg-white/55 p-5">
                <Zap className="w-5 h-5 text-ink/60 mb-3" strokeWidth={2.2} />
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft mb-1.5">2 · Verb</div>
                <div className="font-display text-lg font-[650] leading-snug">Was passiert?</div>
                <div className="text-sm text-ink-soft mt-1">Die Aktion: sehen, kaufen, besuchen …</div>
              </div>
              <div className="rounded-2xl border-2 border-accent bg-accent/[0.06] p-5">
                <Target className="w-5 h-5 text-accent mb-3" strokeWidth={2.2} />
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-1.5">3 · Objekt</div>
                <div className="font-display text-lg font-[650] leading-snug">Wen oder was trifft es?</div>
                <div className="text-sm text-ink/70 mt-1">Das Ziel → <B>Akkusativ</B>. Frag: <B>Wen? Was?</B></div>
              </div>
            </div>
          </Reveal>

          <GoldenRule label="So findest du den Akkusativ">
            Frag einfach: <span className="text-accent">Wen?</span> (Personen) oder <span className="text-accent">Was?</span> (Dinge &amp; Tiere) —
            die Antwort ist dein Akkusativ.
          </GoldenRule>

          <div className="grid gap-4 pt-2">
            {introFlows.map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <SentenceFlow tokens={f.tokens} en={f.en} qa={f.qa} />
              </Reveal>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-white/55 p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft mb-2">Nominativ = der Täter</div>
                <p className="text-[15px] leading-relaxed text-ink/80">
                  Das Subjekt <B>macht</B> die Aktion. Alles sieht „normal" aus: der Mann, ein Hund, ich, mein Bruder.
                </p>
                <div className="mt-4 font-display text-xl font-[650]"><B>Der Mann</B> sieht. <span className="text-ink-soft text-sm italic">— Who sees?</span></div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border-2 border-ink bg-white/70 p-6 shadow-[4px_4px_0_0_rgba(33,27,18,0.9)]">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">Akkusativ = das Ziel</div>
                <p className="text-[15px] leading-relaxed text-ink/80">
                  Das Objekt <B>bekommt</B> die Aktion ab. In diesem Moment schlägt dein Muster zu —
                  <HL> aber nur beim Maskulinum</HL>.
                </p>
                <div className="mt-4 font-display text-xl font-[650]">Der Mann sieht <span className="text-accent">de<N /> Hund</span>. <span className="text-ink-soft text-sm italic">— Whom does he see?</span></div>
              </div>
            </Reveal>
          </div>

          <div className="pt-4">
            <GenderPlayground />
          </div>
        </div>
      </Chapter>

      {/* ------------- K2 ------------- */}
      <Chapter id="k2">
        <ChapterHead
          num="02"
          kicker="Bestimmte Artikel"
          title={<>der · die · das</>}
          lede="The definite articles — and the single change that matters."
        />
        <div className="space-y-7">
          <RuleTable rows={definiteRows} />
          <GoldenRule>
            Nur das Maskulinum ändert sich: <span className="text-accent">der → de<N /></span>.
            Feminin, Neutrum und Plural bleiben <u>immer</u> gleich.
          </GoldenRule>
          <div className="space-y-3">
            <DefEx nom="der Mann" akk={<>Ich sehe de<N /> Mann.</>} why="maskulin → -n!" />
            <DefEx nom="die Frau" akk={<>Ich sehe die Frau.</>} why="feminin: gleich" />
            <DefEx nom="das Kind" akk={<>Ich sehe das Kind.</>} why="Neutrum: gleich" />
            <DefEx nom="die Kinder" akk={<>Ich sehe die Kinder.</>} why="Plural: gleich" />
          </div>
          <StickyNote rotate={-1.2}>
            Autsch-Methode: Die Aktion trifft den Mann — <b>er bekommt eine Beule: das -n!</b> der → den.
            Die Frau, das Kind und die Kinder gehen unversehrt weiter.
          </StickyNote>
        </div>
      </Chapter>

      {/* ------------- K3 ------------- */}
      <Chapter id="k3">
        <ChapterHead
          num="03"
          kicker="Unbestimmte Artikel"
          title={<>ein · eine · ein</>}
          lede="“A / an” in German — the same rule wearing a different outfit."
        />
        <div className="space-y-7">
          <RuleTable rows={indefiniteRows} foot={"Kein Artikel im Plural: „Ich sehe Hunde.“ — ein hat keinen Plural."} />
          <GoldenRule>
            Wieder nur das Maskulinum: <span className="text-accent">ein → ein<N>en</N></span>.
            Du lernst also nicht drei neue Formen — sondern <u>dieselbe eine Regel</u>.
          </GoldenRule>

          <TipNote>
            Nach <B>„Das ist …"</B> steht der <B>Nominativ</B> — du beschreibst nur, was etwas ist, es passiert
            keine Aktion auf das Ding. Ein Objekt entsteht erst bei echten Aktionen: sehen, kaufen, haben, besuchen, trinken …
          </TipNote>

          <div className="grid gap-4">
            {einPairs.map((p, i) => (
              <ComparePair
                key={i}
                left={{ title: "Nominativ · nach „ist“", de: p.nom, en: p.nomEn }}
                right={{ title: p.changed ? "Akkusativ · das -n schlägt zu" : "Akkusativ · nichts passiert", de: p.akk, en: p.akkEn }}
              />
            ))}
          </div>

          <StickyNote rotate={1.4}>
            ein und der sind Brüder: <b>der→den, ein→einen.</b> Wenn „der" ein -n bekommen würde,
            bekommt auch „ein" eins. Feminine und Neutrum? Schlafen weiter.
          </StickyNote>
        </div>
      </Chapter>

      {/* ------------- K4 ------------- */}
      <Chapter id="k4">
        <ChapterHead
          num="04"
          kicker="Personalpronomen"
          title={<>ich → mich &amp; Freunde</>}
          lede="When a pronoun becomes the object, some of them transform."
        />
        <div className="space-y-7">
          <PronounTable />
          <div>
            <Reveal>
              <h3 className="font-display text-2xl md:text-3xl font-[650] mb-2">Deine Fünferbande <span className="text-accent"><Star className="inline w-5 h-5 fill-accent -mt-1" /></span></h3>
              <p className="text-ink-soft mb-5">Diese fünf Paare musst du im Schlaf können — der Rest ändert sich nie.</p>
            </Reveal>
            <PronounPairs />
          </div>

          <ComparePair
            left={{
              title: "ihr = Subjekt (Nominativ)",
              de: <><B>Ihr</B> seht mich.</>,
              en: "You (guys) see me. — ihr macht die Aktion.",
            }}
            right={{
              title: "euch = Objekt (Akkusativ)",
              de: <>Ich sehe <span className="text-blau">euch</span>.</>,
              en: "I see you (guys). — Wen sehe ich? euch!",
            }}
          />

          <TipNote>
            <B>euch</B> ist ein Personalpronomen (die Personen selbst!).
            <B> euer</B> ist ein Possessivartikel („your") und steht <B>immer vor einem Nomen</B>: euer Hund, eure Katze.
            Mehr dazu in Kapitel 6 — es bekommt ein eigenes Kapitel, weil alle Welt die beiden verwechselt.
          </TipNote>

          <StickyNote rotate={-1.6}>
            Sing es wie einen Rhythmus: <b>ich–mich, du–dich</b> (reimt sich!), <b>er–ihn</b> (da ist wieder das n!),
            <b> wir–uns, ihr–euch.</b> Und sie, es, Sie? <b>Ändern sich nie.</b>
          </StickyNote>
        </div>
      </Chapter>

      {/* ------------- K5 ------------- */}
      <Chapter id="k5">
        <ChapterHead
          num="05"
          kicker="Possessivartikel"
          title={<>mein, dein, sein …</>}
          lede="“My, your, his…” — they march exactly like ein."
        />
        <div className="space-y-7">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {possessiveMeanings.map((m) => (
                <div key={m.word} className="rounded-xl border border-line bg-white/55 px-4 py-3.5 hover:border-accent/50 transition-colors">
                  <div className="font-display text-xl font-[680]">{m.word}</div>
                  <div className="text-[13px] text-ink-soft">{m.en} <span className="text-ink/40">· {m.person}</span></div>
                </div>
              ))}
              <div className="rounded-xl border-2 border-dashed border-accent/50 bg-accent/[0.04] px-4 py-3.5 flex items-center">
                <p className="text-[13px] text-ink/70 leading-snug">Sie alle verhalten sich exakt wie <B>„ein"</B>.</p>
              </div>
            </div>
          </Reveal>

          <RuleTable rows={meinRows} foot="mein ist das Modell: exakt dieselben Endungen wie ein." />

          <GoldenRule>
            Possessivwörter folgen dem <span className="text-accent">ein-Pattern</span>: Maskulin + Akkusativ →
            Stamm + <span className="text-accent font-black">en</span>. Alles andere bleibt wie im Nominativ.
          </GoldenRule>

          <div>
            <Reveal>
              <h3 className="font-display text-2xl md:text-3xl font-[650] mb-5">Alle sieben, eine Regel</h3>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {possessiveArrows.map((p, i) => (
                <Reveal key={p.nom} delay={i * 0.05}>
                  <div className="rounded-xl border border-line bg-white/60 px-3 py-4 text-center hover:-translate-y-1 hover:border-accent/50 transition-all duration-300">
                    <div className="text-sm text-ink/60">{p.nom}</div>
                    <ArrowDown className="w-3.5 h-3.5 text-accent mx-auto my-1" strokeWidth={2.6} />
                    <div className="font-display text-lg font-[720]">{p.akk.slice(0, -2)}<N>en</N></div>
                    <div className="text-[10.5px] text-ink-soft mt-1 italic">{p.en}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <TipNote>
            <B>unser</B> und <B>euer</B> machen brav mit: unser → unser<N>en</N>, euer → eur<N>en</N> —
            Stamm bleibt, Endung dran. Fertig.
          </TipNote>
        </div>
      </Chapter>

      {/* ------------- K6 ------------- */}
      <Chapter id="k6">
        <ChapterHead
          num="06"
          kicker="Der Klassiker"
          title={<>euch <span className="text-ink/35">oder</span> <span className="text-accent">euer</span>?</>}
          lede="You or your? The most common A1 mix-up — solved with one question."
        />
        <div className="space-y-7">
          <Reveal>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl">
              Stelle dir immer <B>eine Frage</B>: Meine ich <HL>die Personen selbst</HL> — oder <HL>etwas, das ihnen gehört</HL>?
              Danach ist alles klar.
            </p>
          </Reveal>
          <EuchEuerLab />
          <div className="grid md:grid-cols-2 gap-4">
            <Reveal>
              <div className="rounded-2xl border border-line bg-white/55 p-5">
                <div className="font-display text-xl font-[650]">Ich sehe eure Katze.</div>
                <div className="text-sm text-ink-soft italic mt-1">I see your cat. — feminin: euer + e, kein -n.</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-white/55 p-5">
                <div className="font-display text-xl font-[650]">Ich sehe euren Hund.</div>
                <div className="text-sm text-ink-soft italic mt-1">I see your dog. — maskulin: euer + <b className="text-accent">en</b>.</div>
              </div>
            </Reveal>
          </div>
        </div>
      </Chapter>

      {/* ------------- K7 ------------- */}
      <Chapter id="k7">
        <ChapterHead
          num="07"
          kicker="Zusammenhänge"
          title={<>Eine Satzfamilie</>}
          lede="den Mann · einen Mann · meinen Mann · ihn — watch one slot do all the work."
        />
        <div className="space-y-7">
          <Reveal>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl">
              Wechsle unten nur <B>das kleine Wort vor dem Nomen</B> — und beobachte, was passiert.
              Beim Maskulinum trägt <HL>jede Version das -n</HL>. Bei Feminin und Neutrum passiert … nichts.
            </p>
          </Reveal>
          <ChainCycler />
          <GoldenRule label="Dein Lern-Shortcut">
            Akkusativ + maskulin ⇒ <span className="text-accent">-n / -en</span>: der→de<N />, ein→ein<N>en</N>,
            mein→mein<N>en</N>, euer→eur<N>en</N>, er→ih<N />.
            <span className="block mt-2 text-base font-normal text-ink-soft">
              Ehrlichkeit zuerst: Das ist deine Eselsbrücke für Artikel &amp; ein-Wörter — kein universelles
              Gesetz für jedes deutsche Wort. Adjektive &amp; Co. kommen in A2 früh genug.
            </span>
          </GoldenRule>
        </div>
      </Chapter>

      {/* ------------- K8 ------------- */}
      <Chapter id="k8">
        <ChapterHead
          num="08"
          kicker="Referenz"
          title={<>Die großen Tabellen</>}
          lede="Everything you learned, compressed into three reference blocks."
        />
        <div className="space-y-8">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-ink/15 bg-white/60">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] bg-ink text-paper text-[10px] md:text-xs font-bold uppercase tracking-[0.14em]">
                <div className="px-4 py-3.5">Akkusativ</div>
                <div className="px-4 py-3.5 border-l border-white/10 text-accent">Maskulin</div>
                <div className="px-4 py-3.5 border-l border-white/10">Feminin</div>
                <div className="px-4 py-3.5 border-l border-white/10">Neutrum</div>
                <div className="px-4 py-3.5 border-l border-white/10">Plural</div>
              </div>
              {masterRows.map((r, i) => (
                <div key={i} className={`grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] items-center ${i < masterRows.length - 1 ? "border-b border-line" : ""}`}>
                  <div className="px-4 py-4 text-sm font-bold uppercase tracking-[0.1em] text-ink-soft">{r.label}</div>
                  {r.cells.map((c, j) => (
                    <div key={j} className={`px-4 py-4 border-l border-line/70 font-display text-lg md:text-xl ${j === 0 ? "bg-accent/[0.06]" : ""}`}>{c}</div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            <Reveal>
              <div className="rounded-2xl border border-line bg-white/55 p-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blau mb-4">Personalpronomen</div>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2.5 font-display text-lg">
                  {pronounRows.map((r, i) => (
                    <div key={i} className="flex items-baseline gap-1.5">
                      <span className="text-ink/60">{r.nom}</span>
                      <span className="text-blau text-sm">→</span>
                      <span className="font-[710] text-blau">{r.akk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-white/55 p-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Possessiv · maskuliner Akkusativ</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 font-display text-lg">
                  {possessiveArrows.map((r) => (
                    <div key={r.nom} className="flex items-baseline gap-1.5">
                      <span className="text-ink/60">{r.nom}</span>
                      <span className="text-accent text-sm">→</span>
                      <span className="font-[710]">{r.akk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Chapter>

      {/* ------------- K9 ------------- */}
      <Chapter id="k9">
        <ChapterHead
          num="09"
          kicker="Zum Mitnehmen"
          title={<>Die Merkkarte</>}
          lede="Your pocket summary — print it, cut it out, stick it on your fridge."
        />
        <Reveal>
          <MemoryCard />
        </Reveal>
      </Chapter>

      {/* ------------- CTA to exercises ------------- */}
      <Reveal>
        <div className="my-16 md:my-24 rounded-[2.2rem] border-2 border-ink bg-ink text-paper px-7 py-12 md:px-14 md:py-16 text-center relative overflow-hidden">
          <span aria-hidden className="absolute -left-8 -bottom-14 font-display font-black text-[13rem] leading-none text-white/[0.05] select-none">?</span>
          <h3 className="relative font-display text-3xl md:text-5xl font-[680] leading-tight">
            Theorie geschafft.<br />Jetzt <span className="text-hl">beweisen</span>.
          </h3>
          <p className="relative mt-4 text-white/65 max-w-lg mx-auto">
            10 Übungen, wild gemischt — genau wie im echten Deutsch. Jedes Mal eine Mini-Erklärung, warum die Antwort stimmt.
          </p>
          <button
            onClick={onGoExercises}
            className="relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-hl hover:text-ink transition-colors cursor-pointer"
          >
            <PenLine className="w-4 h-4" strokeWidth={2.6} /> Teil 2: Die Übungen
          </button>
        </div>
      </Reveal>
    </div>
  </div>
);
