import type { ReactNode } from "react";
import { B } from "./content";
import {
  defAkk, defNom, einAkk, einNom, FINDEN, G_NAME, MOECHTE, MODAL_OK, NOUNS,
  POSSESSIVES, possForm, pronAkk, pronOfNoun, VERBS,
} from "./vocab";
import type { Gender, NounEntry, PersonKey, PossStem, VerbId } from "./vocab";

/* ================= deterministic RNG ================= */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(rng: () => number, arr: readonly T[]): T => arr[Math.floor(rng() * arr.length)];
const shuffle = <T,>(rng: () => number, arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ================= subjects ================= */
type Subject = { t: string; f: PersonKey; person: string; en: string; third: boolean };
const SUBJECTS: Subject[] = [
  { t: "Ich", f: "ich", person: "ich", en: "I", third: false },
  { t: "Du", f: "du", person: "du", en: "You", third: false },
  { t: "Er", f: "er", person: "er", en: "He", third: true },
  { t: "Sie", f: "er", person: "sie", en: "She", third: true },
  { t: "Anna", f: "er", person: "sie", en: "Anna", third: true },
  { t: "Tom", f: "er", person: "er", en: "Tom", third: true },
  { t: "Wir", f: "wir", person: "wir", en: "We", third: false },
  { t: "Ihr", f: "ihr", person: "ihr", en: "You (guys)", third: false },
  { t: "Die Kinder", f: "sie", person: "sie.pl", en: "The children", third: false },
];

/* ================= English helpers (verified by hand) ================= */
const V_EN: Record<VerbId, [string, string]> = {
  sehen: ["see", "sees"],
  kaufen: ["buy", "buys"],
  haben: ["have", "has"],
  brauchen: ["need", "needs"],
  suchen: ["look for", "looks for"],
  lesen: ["read", "reads"],
  trinken: ["drink", "drinks"],
  essen: ["eat", "eats"],
  besuchen: ["visit", "visits"],
  kennen: ["know", "knows"],
};
const POSS_EN_SHORT: Record<PossStem, string> = {
  mein: "my", dein: "your", sein: "his", ihr: "her/their", unser: "our", euer: "your",
};
const PRON_EN: Record<string, string> = {
  ich: "me", du: "you", er: "him", sie: "her", wir: "us", ihr: "you (guys)",
};
const startsVowel = (w: string) => /^[aeiou]/i.test(w);
const enVerb = (v: VerbId, s: Subject) => V_EN[v][s.third ? 1 : 0];
const enDef = (n: NounEntry) => `the ${n.en.split(",")[0]}`;
const enIndef = (n: NounEntry) => {
  const w = n.en.split(",")[0];
  return n.g === "pl" ? w : `${startsVowel(w) ? "an" : "a"} ${w}`;
};
const enPoss = (stem: PossStem, n: NounEntry) =>
  `${POSS_EN_SHORT[stem]} ${n.enOwned ?? n.en.split(",")[0]}`;
/** "I" stays capital, names stay capital, pronouns become lower case. */
const enMid = (s: Subject) => (s.en === "I" ? "I" : /^[A-Z][a-z]+$/.test(s.en) && s.third && s.en !== "He" && s.en !== "She" ? s.en : s.en.toLowerCase());

/* ================= exercise type ================= */
export type Segment = { kind: "text"; text: string } | { kind: "blank"; id: string };
export type Category = "def" | "indef" | "poss" | "pron" | "mixed";

export type GenExercise = {
  uid: string;
  n: number;
  segments: Segment[];
  cue: string;
  blanks: { id: string; answers: string[] }[];
  solution: string;
  en: string;
  tip: string;
  why: ReactNode;
  cat: Category;
  gender: Gender | "-";
};

const seg = (text: string) => ({ kind: "text" as const, text });
const blk = (id: string) => ({ kind: "blank" as const, id });
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

type BuilderCtx = {
  rng: () => number;
  drawNoun: (filter?: (n: NounEntry) => boolean) => NounEntry;
  n: number;
};

/** "haben" + a person only works with an indefinite article ("Ich habe einen Bruder"). */
const verbsFor = (n: NounEntry, kind: "def" | "poss" | "indef"): VerbId[] => {
  if (kind === "indef") {
    const allowed = n.indefVerbs ?? n.verbs;
    return allowed.length ? allowed : n.verbs;
  }
  const list = n.person ? n.verbs.filter((v) => v !== "haben") : n.verbs;
  return list.length ? list : n.verbs;
};

/* ================= builders ================= */

/* --- definite article --- */
const tDef = (c: BuilderCtx, force?: Gender): GenExercise => {
  const noun = c.drawNoun((n) => (force ? n.g === force : true));
  const subj = pick(c.rng, SUBJECTS);
  const v = pick(c.rng, verbsFor(noun, "def"));
  const verb = VERBS[v].forms[subj.f];
  const ans = defAkk(noun.g);
  return {
    uid: "", n: c.n, cat: "def", gender: noun.g,
    segments: [seg(`${subj.t} ${verb} `), blk("a"), seg(` ${noun.word}.`)],
    cue: `(${noun.art} ${noun.word})`,
    blanks: [{ id: "a", answers: [ans] }],
    solution: `${subj.t} ${verb} ${ans} ${noun.word}.`,
    en: `${subj.en} ${enVerb(v, subj)} ${enDef(noun)}.`,
    tip: noun.g === "m"
      ? "Frag: Wen oder was? Das Objekt ist maskulin — und nur das Maskulinum bekommt das -n."
      : `Vorsicht, Falle: „${noun.art} ${noun.word}" ist ${G_NAME[noun.g]} — da ändert sich nichts.`,
    why: noun.g === "m"
      ? <>„{noun.art} {noun.word}" ist <B>maskulin</B> und hier das Objekt (Wen/Was?) → <B>der → den</B>.</>
      : <>„{noun.art} {noun.word}" ist <B>{G_NAME[noun.g]}</B> — im Akkusativ unverändert: <B>{noun.art} → {ans}</B>.</>,
  };
};

/* --- indefinite article --- */
const tEin = (c: BuilderCtx, force?: Exclude<Gender, "pl">): GenExercise => {
  const noun = c.drawNoun((n) => !n.noIndef && (force ? n.g === force : n.g !== "pl"));
  const subj = pick(c.rng, SUBJECTS);
  const v = pick(c.rng, verbsFor(noun, "indef"));
  const verb = VERBS[v].forms[subj.f];
  const ans = einAkk(noun.g);
  return {
    uid: "", n: c.n, cat: "indef", gender: noun.g,
    segments: [seg(`${subj.t} ${verb} `), blk("a"), seg(` ${noun.word}.`)],
    cue: "(ein)",
    blanks: [{ id: "a", answers: [ans] }],
    solution: `${subj.t} ${verb} ${ans} ${noun.word}.`,
    en: `${subj.en} ${enVerb(v, subj)} ${enIndef(noun)}.`,
    tip: "ein verhält sich wie der: nur maskulin bekommt eine Endung — hier -en.",
    why: noun.g === "m"
      ? <>„{noun.art} {noun.word}" ist <B>maskulin</B> → ein-Pattern: <B>ein → einen</B>.</>
      : <><B>{G_NAME[noun.g]}</B> ändert sich nicht: <B>{einNom(noun.g)} → {ans}</B>.</>,
  };
};

/* --- possessive --- */
const tPoss = (c: BuilderCtx, gFilter?: (g: Gender) => boolean, stems: readonly PossStem[] = POSSESSIVES): GenExercise => {
  const noun = c.drawNoun((n) => !n.noPoss && (gFilter ? gFilter(n.g) : true));
  const subj = pick(c.rng, SUBJECTS);
  const v = pick(c.rng, verbsFor(noun, "poss"));
  const verb = VERBS[v].forms[subj.f];
  const stem = pick(c.rng, stems);
  const ans = possForm(stem, noun.g, "akk");
  const isEuer = stem === "euer";
  return {
    uid: "", n: c.n, cat: "poss", gender: noun.g,
    segments: [seg(`${subj.t} ${verb} `), blk("a"), seg(` ${noun.word}.`)],
    cue: `(${stem})`,
    blanks: [{ id: "a", answers: [ans] }],
    solution: `${subj.t} ${verb} ${ans} ${noun.word}.`,
    en: `${subj.en} ${enVerb(v, subj)} ${enPoss(stem, noun)}.`,
    tip: `Possessivartikel folgen dem ein-Pattern. „${noun.art} ${noun.word}" ist ${G_NAME[noun.g]}.`,
    why: noun.g === "m"
      ? <><B>Maskulin + Akkusativ</B> → {isEuer ? <>euer verliert das zweite e: <B>euren</B></> : <>{stem} + <B>en</B> = <B>{ans}</B></>} (wie ein → einen).</>
      : <>„{noun.art} {noun.word}" ist <B>{G_NAME[noun.g]}</B> → <B>{ans}</B>{isEuer ? " (euer + e = eure, nicht „euere“)" : ""} — kein -en.</>,
  };
};

/* --- personal pronoun as object --- */
const PERSON_OBJ_VERBS: VerbId[] = ["sehen", "kennen", "besuchen"];
const tPron = (c: BuilderCtx, allowed: string[]): GenExercise => {
  const subj = pick(c.rng, SUBJECTS);
  const options = allowed.filter((p) => {
    if (subj.person === p) return false;                       // no accidental reflexive
    if (subj.person === "sie.pl" && p === "sie") return false; // "Die Kinder sehen sie" = unclear
    if (subj.person === "sie" && p === "sie") return false;
    return true;
  });
  const obj = pick(c.rng, options.length ? options : ["mich"]);
  const v = pick(c.rng, PERSON_OBJ_VERBS);
  const verb = VERBS[v].forms[subj.f];
  const ans = pronAkk[obj];
  return {
    uid: "", n: c.n, cat: "pron", gender: "-",
    segments: [seg(`${subj.t} ${verb} `), blk("a"), seg(".")],
    cue: `(${obj})`,
    blanks: [{ id: "a", answers: [ans] }],
    solution: `${subj.t} ${verb} ${ans}.`,
    en: `${subj.en} ${enVerb(v, subj)} ${PRON_EN[obj]}.`,
    tip: "Das Pronomen ist hier das Objekt — denk an deine Fünferbande.",
    why: <>Als Objekt steht das Pronomen im Akkusativ: <B>{obj} → {ans}</B>.</>,
  };
};

/* --- question (du) --- */
const tQuestion = (c: BuilderCtx): GenExercise => {
  if (c.rng() > 0.42) {
    const noun = c.drawNoun((n) => !n.noPoss && !n.person && (n.verbs.includes("haben") || n.verbs.includes("brauchen") || n.verbs.includes("suchen")));
    const v: VerbId = noun.verbs.includes("haben") ? "haben" : noun.verbs.includes("brauchen") ? "brauchen" : "suchen";
    const verb = VERBS[v].forms.du;
    const stem = pick(c.rng, POSSESSIVES);
    const ans = possForm(stem, noun.g, "akk");
    return {
      uid: "", n: c.n, cat: "poss", gender: noun.g,
      segments: [seg(`${cap(verb)} du `), blk("a"), seg(` ${noun.word}?`)],
      cue: `(${stem})`,
      blanks: [{ id: "a", answers: [ans] }],
      solution: `${cap(verb)} du ${ans} ${noun.word}?`,
      en: `Do you ${V_EN[v][0]} ${enPoss(stem, noun)}?`,
      tip: "Auch in Fragen steht das Objekt im Akkusativ — die Regel ändert sich nie.",
      why: noun.g === "m"
        ? <>„{noun.art} {noun.word}" ist <B>maskulin</B> → <B>{ans}</B>, auch in der Frage.</>
        : <><B>{G_NAME[noun.g]}</B> → <B>{ans}</B>, kein -en nötig.</>,
    };
  }
  const obj = pick(c.rng, ["ich", "er", "sie", "wir"]);
  const ans = pronAkk[obj];
  return {
    uid: "", n: c.n, cat: "pron", gender: "-",
    segments: [seg("Kennst du "), blk("a"), seg("?")],
    cue: `(${obj})`,
    blanks: [{ id: "a", answers: [ans] }],
    solution: `Kennst du ${ans}?`,
    en: `Do you know ${PRON_EN[obj]}?`,
    tip: "Wen kennst du? → Das Pronomen ist das Objekt.",
    why: <>Objekt im Akkusativ: <B>{obj} → {ans}</B>.</>,
  };
};

/* --- modal möchte + infinitive --- */
const tModal = (c: BuilderCtx): GenExercise => {
  const noun = c.drawNoun((n) => n.g !== "pl" && !n.noIndef && n.verbs.some((v) => MODAL_OK.includes(v)));
  const subj = pick(c.rng, SUBJECTS);
  const v = pick(c.rng, noun.verbs.filter((x) => MODAL_OK.includes(x)));
  const moechte = MOECHTE[subj.f];
  const inf = VERBS[v].inf;
  const usePoss = c.rng() > 0.5 && !noun.noPoss;
  const stem = pick(c.rng, POSSESSIVES);
  const ans = usePoss ? possForm(stem, noun.g, "akk") : einAkk(noun.g);
  return {
    uid: "", n: c.n, cat: usePoss ? "poss" : "indef", gender: noun.g,
    segments: [seg(`${subj.t} ${moechte} `), blk("a"), seg(` ${noun.word} ${inf}.`)],
    cue: usePoss ? `(${stem})` : "(ein)",
    blanks: [{ id: "a", answers: [ans] }],
    solution: `${subj.t} ${moechte} ${ans} ${noun.word} ${inf}.`,
    en: `${subj.en} would like to ${V_EN[v][0]} ${usePoss ? enPoss(stem, noun) : enIndef(noun)}.`,
    tip: "möchte + Infinitiv am Satzende — das Nomen bleibt trotzdem Akkusativ-Objekt.",
    why: noun.g === "m"
      ? <><B>Maskulin + Akkusativ</B> → <B>{ans}</B>. Auch bei „{moechte} … {inf}" gilt die Regel.</>
      : <><B>{G_NAME[noun.g]}</B> bleibt unverändert: <B>{ans}</B>.</>,
  };
};

/* --- Nominativ vs Akkusativ, two blanks --- */
const tIstSehe = (c: BuilderCtx): GenExercise => {
  const usePoss = c.rng() > 0.35;
  const noun = c.drawNoun((n) => (usePoss ? !n.noPoss : !n.noIndef && n.g !== "pl"));
  const stem = pick(c.rng, POSSESSIVES);
  const a1 = usePoss ? possForm(stem, noun.g, "nom") : noun.g === "pl" ? defNom(noun.g) : einNom(noun.g);
  const a2 = usePoss ? possForm(stem, noun.g, "akk") : noun.g === "pl" ? defAkk(noun.g) : einAkk(noun.g);
  const be = noun.g === "pl" ? "sind" : "ist";
  const enObj = usePoss ? enPoss(stem, noun) : noun.g === "pl" ? enDef(noun) : enIndef(noun);
  return {
    uid: "", n: c.n, cat: "mixed", gender: noun.g,
    segments: [seg(`Das ${be} `), blk("a"), seg(` ${noun.word}. Ich sehe `), blk("b"), seg(` ${noun.word}.`)],
    cue: usePoss ? `(${stem})` : noun.g === "pl" ? "(die)" : "(ein)",
    blanks: [{ id: "a", answers: [a1] }, { id: "b", answers: [a2] }],
    solution: `Das ${be} ${a1} ${noun.word}. Ich sehe ${a2} ${noun.word}.`,
    en: be === "sind" ? `Those are ${enObj}. I see ${enObj}.` : `That is ${enObj}. I see ${enObj}.`,
    tip: `Nach „Das ist/sind …“ beschreibst du nur → Nominativ. Nach „sehe“ passiert etwas → Akkusativ.`,
    why: a1 === a2
      ? <>„Das {be} …" → <B>Nominativ</B>: {a1}. Und weil das Nomen <B>{G_NAME[noun.g]}</B> ist, bleibt es im Akkusativ gleich: <B>{a2}</B>.</>
      : <>„Das {be} …" → <B>Nominativ</B>: <B>{a1}</B>. „Ich sehe" → <B>Akkusativ, maskulin</B> → <B>{a2}</B>.</>,
  };
};

/* --- possessive + pronoun replacement --- */
const tCombine = (c: BuilderCtx): GenExercise => {
  const noun = c.drawNoun((n) => !n.noPoss && n.verbs.includes("suchen"));
  const subj = pick(c.rng, SUBJECTS.filter((s) => s.person !== "ihr"));
  const stem = pick(c.rng, POSSESSIVES);
  const a1 = possForm(stem, noun.g, "akk");
  const a2 = pronOfNoun(noun.g);
  const p2 = subj.person === "sie.pl" ? "sie" : subj.person === "sie" ? "sie" : subj.person === "er" ? "er" : subj.person;
  const fv = FINDEN[subj.f];
  const enPron = noun.g === "m" ? "it" : noun.g === "pl" ? "them" : "it";
  return {
    uid: "", n: c.n, cat: "mixed", gender: noun.g,
    segments: [
      seg(`${subj.t} ${VERBS.suchen.forms[subj.f]} `), blk("a"),
      seg(` ${noun.word}, aber ${p2} ${fv} `), blk("b"), seg(" nicht."),
    ],
    cue: `(${stem} · ${noun.art} ${noun.word})`,
    blanks: [{ id: "a", answers: [a1] }, { id: "b", answers: [a2] }],
    solution: `${subj.t} ${VERBS.suchen.forms[subj.f]} ${a1} ${noun.word}, aber ${p2} ${fv} ${a2} nicht.`,
    en: `${subj.en} ${enVerb("suchen", subj)} ${enPoss(stem, noun)}, but ${enMid(subj)} ${subj.third ? "doesn't" : "don't"} find ${enPron}.`,
    tip: "Lücke 1: Possessiv + Nomen. Lücke 2: Ersetze das Nomen durch ein Pronomen (ihn/sie/es).",
    why: <>
      Lücke 1: <B>{G_NAME[noun.g]}</B> + Akkusativ → <B>{a1}</B>. Lücke 2:{" "}
      {noun.g === "m" ? <>„der {noun.word}" wird im Akkusativ zu <B>ihn</B></>
        : noun.g === "n" ? <>„das {noun.word}" bleibt <B>es</B></>
        : <>„die {noun.word}" wird zu <B>sie</B></>}.
    </>,
  };
};

/* --- ihr / euch --- */
const tIhrEuch = (c: BuilderCtx): GenExercise => {
  const variants = [
    {
      segs: [blk("a"), seg(" seht mich und ich sehe "), blk("b"), seg(".")],
      a: "ihr", b: "euch",
      sol: "Ihr seht mich und ich sehe euch.",
      en: "You (guys) see me and I see you.",
      why: <>Vor dem Verb steht das Subjekt → <B>Ihr</B> (Nominativ, am Satzanfang groß). Als Objekt: <B>ihr → euch</B> — nicht „euer", das heißt „your".</>,
    },
    {
      segs: [seg("Ich sehe "), blk("a"), seg(" und "), blk("b"), seg(" Hund.")],
      a: "euch", b: "euren",
      sol: "Ich sehe euch und euren Hund.",
      en: "I see you (guys) and your dog.",
      why: <><B>euch</B> = die Personen selbst (Pronomen). <B>euren</B> = „your" vor dem maskulinen Nomen „Hund" im Akkusativ.</>,
    },
    {
      segs: [seg("Wir besuchen "), blk("a"), seg(" und "), blk("b"), seg(" Eltern.")],
      a: "euch", b: "eure",
      sol: "Wir besuchen euch und eure Eltern.",
      en: "We visit you (guys) and your parents.",
      why: <><B>euch</B> = Personalpronomen. <B>eure</B> = euer + Plural („die Eltern") — kein -en, weil kein Maskulinum.</>,
    },
  ];
  const v = pick(c.rng, variants);
  return {
    uid: "", n: c.n, cat: "pron", gender: "-",
    segments: v.segs,
    cue: "(ihr / euer)",
    blanks: [{ id: "a", answers: [v.a] }, { id: "b", answers: [v.b] }],
    solution: v.sol,
    en: v.en,
    tip: "euch = you (die Personen). euer/eure/euren = your (steht vor einem Nomen).",
    why: v.why,
  };
};

/* --- hard possessives: unser / euer / ihr --- */
const tPossHard = (c: BuilderCtx): GenExercise =>
  tPoss(c, undefined, ["unser", "euer", "ihr"] as const);

/* ================= levels & rounds ================= */
export type Level = 1 | 2 | 3;

export const LEVELS: { id: Level; name: string; desc: string; focus: string }[] = [
  { id: 1, name: "Einfach", desc: "Kurze Sätze, eine Lücke — das Muster entdecken.", focus: "der/den · ein/einen" },
  { id: 2, name: "Mittel", desc: "Alle Genera, Fragen, Pronomen und Plural-Fallen.", focus: "Possessive · Pronomen" },
  { id: 3, name: "Profi", desc: "Zwei Lücken, Modalverben, Kombi-Sätze.", focus: "möchte · ihn/sie/es · euch/euer" },
];

export const ROUND_SIZE = 5;

export function generateRound(seed: number, level: Level): GenExercise[] {
  const rng = mulberry32(seed * 7919 + level * 104729);
  const pool = shuffle(rng, NOUNS.map((_, i) => i));
  let pi = 0;
  const drawNoun = (filter?: (n: NounEntry) => boolean): NounEntry => {
    for (let k = 0; k < pool.length * 2; k++) {
      const noun = NOUNS[pool[pi % pool.length]];
      pi++;
      if (!filter || filter(noun)) return noun;
    }
    return NOUNS.find((n) => !filter || filter(n)) ?? NOUNS[0];
  };
  const mk = (n: number): BuilderCtx => ({ rng, drawNoun, n });

  const builders: ((c: BuilderCtx) => GenExercise)[] =
    level === 1
      ? [
          (c) => tDef(c, "m"),
          (c) => tEin(c, "m"),
          (c) => tPoss(c, (g) => g === "m", ["mein", "dein", "sein"] as const),
          (c) => tPron(c, ["ich", "du", "er"]),
          (c) => (rng() > 0.5 ? tDef(c, pick(rng, ["f", "n", "pl"] as const)) : tEin(c)),
        ]
      : level === 2
        ? [
            (c) => tPoss(c, (g) => g !== "m"),
            (c) => tPron(c, ["wir", "ihr", "sie", "ich", "du"]),
            (c) => tQuestion(c),
            (c) => tDef(c, "m"),
            (c) => tPoss(c),
          ]
        : [
            (c) => tModal(c),
            (c) => tIstSehe(c),
            (c) => tCombine(c),
            (c) => tIhrEuch(c),
            (c) => tPossHard(c),
          ];

  return builders.map((b, idx) => {
    const ex = b(mk(idx + 1));
    ex.uid = `s${seed}-l${level}-i${idx}`;
    ex.n = idx + 1;
    return ex;
  });
}

/** Regenerate one specific exercise (used by the mistake-review queue). */
export function regenerate(seed: number, level: Level, idx: number): GenExercise | null {
  const round = generateRound(seed, level);
  return round[idx] ?? null;
}
