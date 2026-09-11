import type { ReactNode } from "react";

/* ---------- small helper: the emphasized -n suffix ---------- */
export const N = ({ children }: { children?: ReactNode }) => (
  <em className="not-italic font-[800] text-accent">{children ?? "n"}</em>
);
export const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold">{children}</strong>
);

/* ---------- rule tables ---------- */
export type RuleRow = {
  gender: string;
  genderEn: string;
  nom: ReactNode;
  akk: ReactNode;
  changed?: boolean;
  note?: string;
};

export const definiteRows: RuleRow[] = [
  { gender: "Maskulin", genderEn: "masculine", nom: "der", akk: <>de<N>n</N></>, changed: true, note: "der Mann → den Mann" },
  { gender: "Feminin", genderEn: "feminine", nom: "die", akk: "die", note: "die Frau → die Frau" },
  { gender: "Neutrum", genderEn: "neuter", nom: "das", akk: "das", note: "das Kind → das Kind" },
  { gender: "Plural", genderEn: "plural", nom: "die", akk: "die", note: "die Kinder → die Kinder" },
];

export const indefiniteRows: RuleRow[] = [
  { gender: "Maskulin", genderEn: "masculine", nom: "ein", akk: <>ein<N>en</N></>, changed: true, note: "ein Hund → einen Hund" },
  { gender: "Feminin", genderEn: "feminine", nom: "eine", akk: "eine", note: "eine Katze → eine Katze" },
  { gender: "Neutrum", genderEn: "neuter", nom: "ein", akk: "ein", note: "ein Auto → ein Auto" },
  { gender: "Plural", genderEn: "plural", nom: "—", akk: "—", note: "Ich sehe Hunde. (kein Artikel)" },
];

export const meinRows: RuleRow[] = [
  { gender: "Maskulin", genderEn: "masculine", nom: "mein", akk: <>mein<N>en</N></>, changed: true, note: "mein Vater → meinen Vater" },
  { gender: "Feminin", genderEn: "feminine", nom: "meine", akk: "meine", note: "meine Mutter → meine Mutter" },
  { gender: "Neutrum", genderEn: "neuter", nom: "mein", akk: "mein", note: "mein Haus → mein Haus" },
  { gender: "Plural", genderEn: "plural", nom: "meine", akk: "meine", note: "meine Eltern → meine Eltern" },
];

/* ---------- pronouns ---------- */
export type PronounRow = {
  nom: string;
  akk: string;
  enN: string;
  enA: string;
  focus?: boolean;
  why?: string;
};

export const pronounRows: PronounRow[] = [
  { nom: "ich", akk: "mich", enN: "I", enA: "me", focus: true, why: "-ch stays, vowel flips" },
  { nom: "du", akk: "dich", enN: "you", enA: "you", focus: true, why: "du → dich (rhymes!)" },
  { nom: "er", akk: "ihn", enN: "he", enA: "him", focus: true, why: "the masculine gets its -n" },
  { nom: "sie", akk: "sie", enN: "she", enA: "her", why: "never changes" },
  { nom: "es", akk: "es", enN: "it", enA: "it", why: "never changes" },
  { nom: "wir", akk: "uns", enN: "we", enA: "us", focus: true, why: "special pair — learn with euch" },
  { nom: "ihr", akk: "euch", enN: "you (pl.)", enA: "you (pl.)", focus: true, why: "special pair — learn with uns" },
  { nom: "sie", akk: "sie", enN: "they", enA: "them", why: "never changes" },
  { nom: "Sie", akk: "Sie", enN: "you (formal)", enA: "you (formal)", why: "never changes" },
];

export const focusPairs = [
  { nom: "ich", akk: "mich" },
  { nom: "du", akk: "dich" },
  { nom: "er", akk: "ihn" },
  { nom: "wir", akk: "uns" },
  { nom: "ihr", akk: "euch" },
];

/* ---------- possessives ---------- */
export const possessiveArrows = [
  { nom: "mein", akk: "meinen", en: "my" },
  { nom: "dein", akk: "deinen", en: "your" },
  { nom: "sein", akk: "seinen", en: "his / its" },
  { nom: "ihr", akk: "ihren", en: "her / their" },
  { nom: "unser", akk: "unseren", en: "our" },
  { nom: "euer", akk: "euren", en: "your (pl.)" },
  { nom: "Ihr", akk: "Ihren", en: "your (formal)" },
];

export const possessiveMeanings = [
  { word: "mein", en: "my", person: "ich" },
  { word: "dein", en: "your", person: "du" },
  { word: "sein", en: "his / its", person: "er / es" },
  { word: "ihr", en: "her / their", person: "sie" },
  { word: "unser", en: "our", person: "wir" },
  { word: "euer", en: "your (plural)", person: "ihr" },
  { word: "Ihr", en: "your (formal)", person: "Sie" },
];

/* ---------- ch.1 examples ---------- */
export type FlowToken = { t: string; tag: string; tone: "nom" | "verb" | "akk" };

export const introFlows: { tokens: FlowToken[]; en: string; qa: { q: string; a: string } }[] = [
  {
    tokens: [
      { t: "Ich", tag: "Subjekt · Nominativ", tone: "nom" },
      { t: "sehe", tag: "Verb", tone: "verb" },
      { t: "den Hund", tag: "Objekt · Akkusativ", tone: "akk" },
    ],
    en: "I see the dog.",
    qa: { q: "Wen sehe ich?", a: "→ den Hund" },
  },
  {
    tokens: [
      { t: "Du", tag: "Subjekt · Nominativ", tone: "nom" },
      { t: "trinkst", tag: "Verb", tone: "verb" },
      { t: "den Kaffee", tag: "Objekt · Akkusativ", tone: "akk" },
    ],
    en: "You drink the coffee.",
    qa: { q: "Was trinkst du?", a: "→ den Kaffee" },
  },
  {
    tokens: [
      { t: "Anna", tag: "Subjekt · Nominativ", tone: "nom" },
      { t: "kauft", tag: "Verb", tone: "verb" },
      { t: "das Brot", tag: "Objekt · Akkusativ", tone: "akk" },
    ],
    en: "Anna buys the bread.",
    qa: { q: "Was kauft Anna?", a: "→ das Brot" },
  },
  {
    tokens: [
      { t: "Wir", tag: "Subjekt · Nominativ", tone: "nom" },
      { t: "besuchen", tag: "Verb", tone: "verb" },
      { t: "die Oma", tag: "Objekt · Akkusativ", tone: "akk" },
    ],
    en: "We visit grandma.",
    qa: { q: "Wen besuchen wir?", a: "→ die Oma" },
  },
];

/* ---------- playground nouns (ch.1 + used again in ch.3) ---------- */
export type Noun = {
  article: string;
  noun: string;
  gender: "m" | "f" | "n" | "pl";
  indefinite: string;
  nomSentence: ReactNode;
  akkSentence: ReactNode;
  akkChanged: boolean;
};

export const playgroundNouns: Noun[] = [
  {
    article: "der", noun: "Hund", gender: "m", indefinite: "ein",
    nomSentence: <>Das ist <B>der Hund</B>.</>,
    akkSentence: <>Ich sehe <B>de<N /> Hund</B>.</>,
    akkChanged: true,
  },
  {
    article: "die", noun: "Katze", gender: "f", indefinite: "eine",
    nomSentence: <>Das ist <B>die Katze</B>.</>,
    akkSentence: <>Ich sehe <B>die Katze</B>.</>,
    akkChanged: false,
  },
  {
    article: "das", noun: "Auto", gender: "n", indefinite: "ein",
    nomSentence: <>Das ist <B>das Auto</B>.</>,
    akkSentence: <>Ich sehe <B>das Auto</B>.</>,
    akkChanged: false,
  },
  {
    article: "die", noun: "Kinder", gender: "pl", indefinite: "—",
    nomSentence: <>Das sind <B>die Kinder</B>.</>,
    akkSentence: <>Ich sehe <B>die Kinder</B>.</>,
    akkChanged: false,
  },
];

/* ---------- ein/eine comparison pairs (ch.3) ---------- */
export const einPairs = [
  {
    nom: <>Das ist <B>ein Hund</B>.</>,
    nomEn: "That is a dog. — describing what it is → Nominativ",
    akk: <>Ich sehe <B>ein<N>en</N> Hund</B>.</>,
    akkEn: "I see a dog. — the action hits him → Akkusativ",
    changed: true,
  },
  {
    nom: <>Das ist <B>eine Katze</B>.</>,
    nomEn: "That is a cat. — Nominativ",
    akk: <>Ich sehe <B>eine Katze</B>.</>,
    akkEn: "I see a cat. — feminine stays the same",
    changed: false,
  },
  {
    nom: <>Das ist <B>ein Auto</B>.</>,
    nomEn: "That is a car. — Nominativ",
    akk: <>Ich kaufe <B>ein Auto</B>.</>,
    akkEn: "I buy a car. — neuter stays the same",
    changed: false,
  },
];

/* ---------- sentence families (ch.7 chains) ---------- */
export type ChainStep = { slot: ReactNode; label: string; caption: string };
export type Chain = { id: string; name: string; sentencePre: string; sentencePost: string; steps: ChainStep[] };

export const chains: Chain[] = [
  {
    id: "m",
    name: "Maskulin · der Mann",
    sentencePre: "Ich sehe ",
    sentencePost: " Mann.",
    steps: [
      { slot: <B>de<N /></B>, label: "bestimmt", caption: "der Mann → der kriegt die Aktion ab → den. Nur das Maskulinum ändert sich." },
      { slot: <B>ein<N>en</N></B>, label: "unbestimmt", caption: "Dieselbe Regel wie bei ein: ein + Aktion → einen." },
      { slot: <B>mein<N>en</N></B>, label: "Possessiv", caption: "mein verhält sich genau wie ein → meinen." },
      { slot: <B>ih<N /></B>, label: "Pronomen", caption: "Und sogar das Pronomen trägt das kleine n: er → ihn." },
    ],
  },
  {
    id: "f",
    name: "Feminin · die Frau",
    sentencePre: "Ich sehe ",
    sentencePost: " Frau.",
    steps: [
      { slot: <B>die</B>, label: "bestimmt", caption: "die Frau → die … nichts passiert. Feminin bleibt immer gleich." },
      { slot: <B>eine</B>, label: "unbestimmt", caption: "eine → eine. Kein -n, keine Änderung." },
      { slot: <B>meine</B>, label: "Possessiv", caption: "meine → meine. Wieder: keine Änderung." },
      { slot: <B>sie</B>, label: "Pronomen", caption: "sie → sie. Das einzige Wort, das nie etwas ändert." },
    ],
  },
  {
    id: "n",
    name: "Neutrum · das Kind",
    sentencePre: "Ich sehe ",
    sentencePost: " Kind.",
    steps: [
      { slot: <B>das</B>, label: "bestimmt", caption: "das Kind → das. Neutrum bleibt im Akkusativ gleich." },
      { slot: <B>ein</B>, label: "unbestimmt", caption: "ein → ein. Nichts Neues." },
      { slot: <B>mein</B>, label: "Possessiv", caption: "mein → mein. Kein -en ohne Maskulinum." },
      { slot: <B>es</B>, label: "Pronomen", caption: "es → es. Neutrum ändert sich nie." },
    ],
  },
];

/* ---------- euch/euer lab quiz (ch.6) ---------- */
export type LabQ = { pre: string; post: string; options: string[]; correct: string; why: string };

export const labQuestions: LabQ[] = [
  {
    pre: "Ich sehe ", post: ".",
    options: ["euch", "euer"],
    correct: "euch",
    why: "Kein Nomen danach — „you“ selbst ist gemeint → Personalpronomen: euch.",
  },
  {
    pre: "Ich sehe ", post: " Hund.",
    options: ["euch", "euren"],
    correct: "euren",
    why: "Vor einem Nomen → euer (your) + maskulin Akkusativ → euren.",
  },
  {
    pre: "Ist das ", post: " Katze?",
    options: ["eure", "euch"],
    correct: "eure",
    why: "„Your cat“ — euer + feminin = eure. Nur Maskulin bekommt das -en.",
  },
  {
    pre: "Wo steht ", post: " Auto?",
    options: ["euer", "euren"],
    correct: "euer",
    why: "Neutrum ohne Änderung: euer Auto — kein -en, weil das Auto kein Mann ist.",
  },
];

/* ---------- comparison tables (ch.8) ---------- */
export const masterRows = [
  { label: "bestimmt", cells: [<B>de<N /></B>, <B>die</B>, <B>das</B>, <B>die</B>] },
  { label: "unbestimmt", cells: [<B>ein<N>en</N></B>, <B>eine</B>, <B>ein</B>, <span className="text-ink-soft">—</span>] },
  { label: "mein", cells: [<B>mein<N>en</N></B>, <B>meine</B>, <B>mein</B>, <B>meine</B>] },
];

/* ---------- exercises ---------- */
export type Segment =
  | { kind: "text"; text: string }
  | { kind: "blank"; id: string };

export type Exercise = {
  n: number;
  segments: Segment[];
  cue: string;
  blanks: { id: string; answers: string[] }[];
  solution: string;
  tip: string;
  why: ReactNode;
};

export const exercises: Exercise[] = [
  {
    n: 1,
    segments: [
      { kind: "text", text: "Ich sehe " },
      { kind: "blank", id: "a" },
      { kind: "text", text: " Mann." },
    ],
    cue: "(der Mann)",
    blanks: [{ id: "a", answers: ["den"] }],
    solution: "Ich sehe den Mann.",
    tip: "Wen siehst du? — den Mann. Der Mann ist maskulin und bekommt die Aktion ab.",
    why: <>„der Mann“ ist <B>maskulin</B> und steht als Objekt (<B>Wen?</B>) im Akkusativ → <B>der → den</B>.</>,
  },
  {
    n: 2,
    segments: [
      { kind: "text", text: "Kennst du " },
      { kind: "blank", id: "a" },
      { kind: "text", text: "?" },
    ],
    cue: "(ich)",
    blanks: [{ id: "a", answers: ["mich"] }],
    solution: "Kennst du mich?",
    tip: "„ich“ ist hier das Objekt — du fragst: Wen kennst du?",
    why: <>Das Pronomen steht im Akkusativ (Objekt): <B>ich → mich</B>.</>,
  },
  {
    n: 3,
    segments: [
      { kind: "text", text: "Das ist " },
      { kind: "blank", id: "a" },
      { kind: "text", text: " Hund. Ich sehe " },
      { kind: "blank", id: "b" },
      { kind: "text", text: " Hund." },
    ],
    cue: "(mein)",
    blanks: [
      { id: "a", answers: ["mein"] },
      { id: "b", answers: ["meinen"] },
    ],
    solution: "Das ist mein Hund. Ich sehe meinen Hund.",
    tip: "Nach „ist“ beschreibst du nur, was etwas ist (Nominativ). Nach „sehe“ passiert etwas (Akkusativ).",
    why: <>Nach „Das ist …“ steht der <B>Nominativ</B> → <B>mein</B>. „Ich sehe“ braucht den <B>Akkusativ</B>, maskulin → <B>meinen</B>.</>,
  },
  {
    n: 4,
    segments: [
      { kind: "text", text: "Er besucht " },
      { kind: "blank", id: "a" },
      { kind: "text", text: " Lehrerin." },
    ],
    cue: "(die Lehrerin)",
    blanks: [{ id: "a", answers: ["die"] }],
    solution: "Er besucht die Lehrerin.",
    tip: "Nur das Maskulinum ändert sich. Was ist die Lehrerin?",
    why: <>„die Lehrerin“ ist <B>feminin</B> — feminin ändert sich im Akkusativ nicht: <B>die → die</B>.</>,
  },
  {
    n: 5,
    segments: [
      { kind: "text", text: "Ich sehe " },
      { kind: "blank", id: "a" },
      { kind: "text", text: "." },
    ],
    cue: "(ihr = you plural)",
    blanks: [{ id: "a", answers: ["euch"] }],
    solution: "Ich sehe euch.",
    tip: "ihr als Subjekt bedeutet „you“. Als Objekt wird daraus …?",
    why: <>„you (plural)“ als Objekt: <B>ihr → euch</B>. (<B>euer</B> wäre „your“ — das braucht ein Nomen.)</>,
  },
  {
    n: 6,
    segments: [
      { kind: "text", text: "Sie kauft " },
      { kind: "blank", id: "a" },
      { kind: "text", text: " Auto." },
    ],
    cue: "(ein)",
    blanks: [{ id: "a", answers: ["ein"] }],
    solution: "Sie kauft ein Auto.",
    tip: "das Auto = Neutrum. Neutrum ändert sich nie.",
    why: <>„das Auto“ ist <B>Neutrum</B> — im Akkusativ keine Änderung: <B>ein → ein</B>.</>,
  },
  {
    n: 7,
    segments: [
      { kind: "text", text: "Wir besuchen " },
      { kind: "blank", id: "a" },
      { kind: "text", text: " Eltern." },
    ],
    cue: "(unser)",
    blanks: [{ id: "a", answers: ["unsere"] }],
    solution: "Wir besuchen unsere Eltern.",
    tip: "Eltern = Plural. Plural verhält sich wie „die“ — mit -e, aber ohne extra -n.",
    why: <>„die Eltern“ ist <B>Plural</B>. Possessiv + Plural = <B>unser + e → unsere</B> (kein -en, das gibt es nur im Maskulinum).</>,
  },
  {
    n: 8,
    segments: [
      { kind: "text", text: "Hast du " },
      { kind: "blank", id: "a" },
      { kind: "text", text: " Schlüssel?" },
    ],
    cue: "(dein)",
    blanks: [{ id: "a", answers: ["deinen"] }],
    solution: "Hast du deinen Schlüssel?",
    tip: "der Schlüssel ist maskulin — und er bekommt die Frage-Aktion ab.",
    why: <>„der Schlüssel“ ist <B>maskulin</B>, Akkusativ → <B>dein → deinen</B> (ein-Pattern).</>,
  },
  {
    n: 9,
    segments: [
      { kind: "blank", id: "a" },
      { kind: "text", text: " seht mich und ich sehe " },
      { kind: "blank", id: "b" },
      { kind: "text", text: "." },
    ],
    cue: "(ihr)",
    blanks: [
      { id: "a", answers: ["ihr"] },
      { id: "b", answers: ["euch"] },
    ],
    solution: "Ihr seht mich und ich sehe euch.",
    tip: "Wer sieht? → Subjekt. Wen sehe ich? → Objekt.",
    why: <>Vor dem Verb steht das <B>Subjekt</B> (Nominativ) → <B>Ihr</B> (am Satzanfang groß). Als Objekt: <B>ihr → euch</B>.</>,
  },
  {
    n: 10,
    segments: [
      { kind: "text", text: "Ihr sucht " },
      { kind: "blank", id: "a" },
      { kind: "text", text: " Katze." },
    ],
    cue: "(euer)",
    blanks: [{ id: "a", answers: ["eure"] }],
    solution: "Ihr sucht eure Katze.",
    tip: "euer verhält sich wie „ein“. die Katze ist feminin — also kein -en.",
    why: <>Possessiv vor Nomen: <B>euer</B> („your“) + <B>feminin</B> → <B>eure</B>. Nur Maskulin würde <B>euren</B> bekommen.</>,
  },
];

/* ---------- hero marquee ---------- */
export const marqueeItems = [
  "der → den", "ein → einen", "mein → meinen", "euer → euren",
  "ich → mich", "du → dich", "er → ihn", "wir → uns", "ihr → euch",
  "die bleibt die", "das bleibt das",
];

/* ---------- chapters for side rail ---------- */
export const chapters = [
  { id: "k1", num: "01", title: "Was ist der Akkusativ?" },
  { id: "k2", num: "02", title: "Bestimmte Artikel" },
  { id: "k3", num: "03", title: "Unbestimmte Artikel" },
  { id: "k4", num: "04", title: "Personalpronomen" },
  { id: "k5", num: "05", title: "Possessivartikel" },
  { id: "k6", num: "06", title: "euch oder euer?" },
  { id: "k7", num: "07", title: "Alles hängt zusammen" },
  { id: "k8", num: "08", title: "Die großen Tabellen" },
  { id: "k9", num: "09", title: "Die Merkkarte" },
];
