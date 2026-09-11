/* =========================================================================
   Single source of truth for all nouns used by the generator, the
   Genus-Trainer and the glossary. Every entry is hand-checked:
   article, plural form, English meaning and the verbs it naturally
   combines with (so the generator can never build unnatural German).
   ========================================================================= */

export type Gender = "m" | "f" | "n" | "pl";

export type VerbId =
  | "sehen" | "kaufen" | "haben" | "brauchen" | "suchen"
  | "lesen" | "trinken" | "essen" | "besuchen" | "kennen";

export type NounEntry = {
  word: string;
  art: "der" | "die" | "das";
  g: Gender;
  en: string;
  plural: string;      // full plural incl. article, "—" if not used
  verbs: VerbId[];     // only natural collocations
  person?: boolean;    // is it a person? (for Wen? vs Was?)
  /** Semantic guards so the generator can never build odd German: */
  noPoss?: boolean;      // "dein Museum" — places are not personally owned
  noIndef?: boolean;     // "eine Mutter kennen" — you only have one
  indefVerbs?: VerbId[]; // indefinite only makes sense with these verbs
  enOwned?: string;      // "mein Mann" = my husband (not "my man")
  topic: "Menschen" | "Tiere" | "Zuhause" | "Essen & Trinken" | "Technik" | "Unterwegs";
};

export const NOUNS: NounEntry[] = [
  /* ---------------- maskulin ---------------- */
  { word: "Mann", art: "der", g: "m", en: "man", enOwned: "husband", plural: "die Männer", verbs: ["sehen", "kennen"], person: true, topic: "Menschen" },
  { word: "Bruder", art: "der", g: "m", en: "brother", plural: "die Brüder", verbs: ["sehen", "besuchen", "haben", "kennen"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Vater", art: "der", g: "m", en: "father", plural: "die Väter", verbs: ["besuchen", "kennen", "sehen"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Freund", art: "der", g: "m", en: "friend", plural: "die Freunde", verbs: ["besuchen", "kennen", "sehen", "haben"], person: true, topic: "Menschen" },
  { word: "Hund", art: "der", g: "m", en: "dog", plural: "die Hunde", verbs: ["sehen", "haben", "suchen"], topic: "Tiere" },
  { word: "Schlüssel", art: "der", g: "m", en: "key", plural: "die Schlüssel", verbs: ["haben", "suchen", "brauchen"], topic: "Zuhause" },
  { word: "Tisch", art: "der", g: "m", en: "table", plural: "die Tische", verbs: ["kaufen", "brauchen", "haben"], topic: "Zuhause" },
  { word: "Stuhl", art: "der", g: "m", en: "chair", plural: "die Stühle", verbs: ["kaufen", "brauchen", "haben"], topic: "Zuhause" },
  { word: "Kaffee", art: "der", g: "m", en: "coffee", plural: "—", verbs: ["trinken", "brauchen", "kaufen"], topic: "Essen & Trinken" },
  { word: "Apfel", art: "der", g: "m", en: "apple", plural: "die Äpfel", verbs: ["kaufen", "haben", "brauchen", "essen"], topic: "Essen & Trinken" },
  { word: "Computer", art: "der", g: "m", en: "computer", plural: "die Computer", verbs: ["kaufen", "brauchen", "haben"], topic: "Technik" },
  { word: "Film", art: "der", g: "m", en: "film, movie", plural: "die Filme", verbs: ["sehen", "haben"], topic: "Technik" },
  { word: "Bus", art: "der", g: "m", en: "bus", plural: "die Busse", verbs: ["sehen", "suchen", "brauchen"], noPoss: true, topic: "Unterwegs" },

  /* ---------------- feminin ---------------- */
  { word: "Frau", art: "die", g: "f", en: "woman", enOwned: "wife", plural: "die Frauen", verbs: ["sehen", "kennen"], person: true, topic: "Menschen" },
  { word: "Mutter", art: "die", g: "f", en: "mother", plural: "die Mütter", verbs: ["besuchen", "kennen", "sehen"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Schwester", art: "die", g: "f", en: "sister", plural: "die Schwestern", verbs: ["besuchen", "kennen", "sehen", "haben"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Lehrerin", art: "die", g: "f", en: "teacher (female)", plural: "die Lehrerinnen", verbs: ["besuchen", "kennen", "sehen"], person: true, topic: "Menschen" },
  { word: "Katze", art: "die", g: "f", en: "cat", plural: "die Katzen", verbs: ["sehen", "haben", "suchen"], topic: "Tiere" },
  { word: "Lampe", art: "die", g: "f", en: "lamp", plural: "die Lampen", verbs: ["kaufen", "brauchen", "haben"], topic: "Zuhause" },
  { word: "Tasche", art: "die", g: "f", en: "bag", plural: "die Taschen", verbs: ["kaufen", "brauchen", "suchen", "haben"], topic: "Zuhause" },
  { word: "Zeitung", art: "die", g: "f", en: "newspaper", plural: "die Zeitungen", verbs: ["lesen", "kaufen", "haben", "suchen"], topic: "Technik" },
  { word: "Milch", art: "die", g: "f", en: "milk", plural: "—", verbs: ["trinken", "kaufen", "brauchen"], topic: "Essen & Trinken" },
  { word: "Stadt", art: "die", g: "f", en: "city, town", plural: "die Städte", verbs: ["sehen", "besuchen", "kennen"], noPoss: true, noIndef: true, topic: "Unterwegs" },

  /* ---------------- neutrum ---------------- */
  { word: "Kind", art: "das", g: "n", en: "child", plural: "die Kinder", verbs: ["sehen", "haben", "kennen"], person: true, topic: "Menschen" },
  { word: "Auto", art: "das", g: "n", en: "car", plural: "die Autos", verbs: ["kaufen", "haben", "brauchen", "sehen", "suchen"], topic: "Unterwegs" },
  { word: "Haus", art: "das", g: "n", en: "house", plural: "die Häuser", verbs: ["kaufen", "sehen", "haben"], topic: "Zuhause" },
  { word: "Fenster", art: "das", g: "n", en: "window", plural: "die Fenster", verbs: ["sehen", "haben"], topic: "Zuhause" },
  { word: "Buch", art: "das", g: "n", en: "book", plural: "die Bücher", verbs: ["lesen", "kaufen", "haben", "suchen", "brauchen"], topic: "Technik" },
  { word: "Handy", art: "das", g: "n", en: "mobile phone", plural: "die Handys", verbs: ["haben", "suchen", "kaufen", "brauchen"], topic: "Technik" },
  { word: "Brot", art: "das", g: "n", en: "bread", plural: "die Brote", verbs: ["kaufen", "brauchen", "haben", "essen"], topic: "Essen & Trinken" },
  { word: "Fahrrad", art: "das", g: "n", en: "bicycle", plural: "die Fahrräder", verbs: ["kaufen", "brauchen", "haben", "suchen"], topic: "Unterwegs" },
  { word: "Museum", art: "das", g: "n", en: "museum", plural: "die Museen", verbs: ["besuchen", "sehen"], noPoss: true, topic: "Unterwegs" },

  /* ---------------- plural ---------------- */
  { word: "Kinder", art: "die", g: "pl", en: "children", plural: "die Kinder", verbs: ["sehen", "haben", "kennen"], person: true, topic: "Menschen" },
  { word: "Eltern", art: "die", g: "pl", en: "parents", plural: "die Eltern", verbs: ["besuchen", "kennen", "sehen"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Freunde", art: "die", g: "pl", en: "friends", plural: "die Freunde", verbs: ["besuchen", "sehen", "kennen", "haben"], person: true, topic: "Menschen" },
  { word: "Bücher", art: "die", g: "pl", en: "books", plural: "die Bücher", verbs: ["lesen", "kaufen", "haben", "brauchen"], topic: "Technik" },
  { word: "Schuhe", art: "die", g: "pl", en: "shoes", plural: "die Schuhe", verbs: ["kaufen", "brauchen", "haben", "suchen"], topic: "Zuhause" },
];

/* ---------------- verbs: full A1 present tense ---------------- */
export type PersonKey = "ich" | "du" | "er" | "wir" | "ihr" | "sie";

export const VERBS: Record<VerbId, { inf: string; en: string; forms: Record<PersonKey, string> }> = {
  sehen:    { inf: "sehen",    en: "to see",       forms: { ich: "sehe", du: "siehst", er: "sieht", wir: "sehen", ihr: "seht", sie: "sehen" } },
  kaufen:   { inf: "kaufen",   en: "to buy",       forms: { ich: "kaufe", du: "kaufst", er: "kauft", wir: "kaufen", ihr: "kauft", sie: "kaufen" } },
  haben:    { inf: "haben",    en: "to have",      forms: { ich: "habe", du: "hast", er: "hat", wir: "haben", ihr: "habt", sie: "haben" } },
  brauchen: { inf: "brauchen", en: "to need",      forms: { ich: "brauche", du: "brauchst", er: "braucht", wir: "brauchen", ihr: "braucht", sie: "brauchen" } },
  suchen:   { inf: "suchen",   en: "to look for",  forms: { ich: "suche", du: "suchst", er: "sucht", wir: "suchen", ihr: "sucht", sie: "suchen" } },
  lesen:    { inf: "lesen",    en: "to read",      forms: { ich: "lese", du: "liest", er: "liest", wir: "lesen", ihr: "lest", sie: "lesen" } },
  trinken:  { inf: "trinken",  en: "to drink",     forms: { ich: "trinke", du: "trinkst", er: "trinkt", wir: "trinken", ihr: "trinkt", sie: "trinken" } },
  essen:    { inf: "essen",    en: "to eat",       forms: { ich: "esse", du: "isst", er: "isst", wir: "essen", ihr: "esst", sie: "essen" } },
  besuchen: { inf: "besuchen", en: "to visit",     forms: { ich: "besuche", du: "besuchst", er: "besucht", wir: "besuchen", ihr: "besucht", sie: "besuchen" } },
  kennen:   { inf: "kennen",   en: "to know",      forms: { ich: "kenne", du: "kennst", er: "kennt", wir: "kennen", ihr: "kennt", sie: "kennen" } },
};

/* möchten — the A1 modal, fully correct */
export const MOECHTE: Record<PersonKey, string> = {
  ich: "möchte", du: "möchtest", er: "möchte", wir: "möchten", ihr: "möchtet", sie: "möchten",
};

/** Verbs that sound natural after "möchte": no "möchte brauchen/haben/kennen". */
export const MODAL_OK: VerbId[] = ["sehen", "kaufen", "lesen", "trinken", "essen", "besuchen", "suchen"];

/* finden — used in the level-3 combination sentences */
export const FINDEN: Record<PersonKey, string> = {
  ich: "finde", du: "findest", er: "findet", wir: "finden", ihr: "findet", sie: "finden",
};

/* ---------------- form helpers (the actual grammar) ---------------- */
export const defNom = (g: Gender) => ({ m: "der", f: "die", n: "das", pl: "die" })[g];
export const defAkk = (g: Gender) => ({ m: "den", f: "die", n: "das", pl: "die" })[g];
export const einNom = (g: Gender) => ({ m: "ein", f: "eine", n: "ein", pl: "" })[g];
export const einAkk = (g: Gender) => ({ m: "einen", f: "eine", n: "ein", pl: "" })[g];

export const POSSESSIVES = ["mein", "dein", "sein", "ihr", "unser", "euer"] as const;
export type PossStem = (typeof POSSESSIVES)[number];

export const POSS_EN: Record<PossStem | "Ihr", string> = {
  mein: "my", dein: "your", sein: "his", ihr: "her / their",
  unser: "our", euer: "your (pl.)", Ihr: "your (formal)",
};

/**
 * Possessive article forms.
 * Note the two real spelling rules of German:
 *   euer  + e   → eure   (the second "e" of the stem drops)
 *   euer  + en  → euren
 *   unser + e   → unsere (stem keeps its "e")
 */
export const possForm = (stem: PossStem, g: Gender, kase: "nom" | "akk"): string => {
  const needsEn = kase === "akk" && g === "m";
  const needsE = g === "f" || g === "pl";
  if (stem === "euer") {
    if (needsEn) return "euren";
    if (needsE) return "eure";
    return "euer";
  }
  if (needsEn) return stem + "en";
  if (needsE) return stem + "e";
  return stem;
};

export const pronAkk: Record<string, string> = {
  ich: "mich", du: "dich", er: "ihn", sie: "sie", es: "es", wir: "uns", ihr: "euch", Sie: "Sie",
};

/** A noun turns into this pronoun when replaced in the accusative. */
export const pronOfNoun = (g: Gender) => ({ m: "ihn", f: "sie", n: "es", pl: "sie" })[g];

export const G_NAME: Record<Gender, string> = { m: "maskulin", f: "feminin", n: "Neutrum", pl: "Plural" };
export const G_EN: Record<Gender, string> = { m: "masculine", f: "feminine", n: "neuter", pl: "plural" };

export const TOPICS = ["Menschen", "Tiere", "Zuhause", "Essen & Trinken", "Technik", "Unterwegs"] as const;
