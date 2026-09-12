/* =========================================================================
   Single source of truth for all nouns used by the generator, the
   Genus-Trainer and the glossary. Every entry is hand-checked:
   article, plural form, English meaning and the verbs it naturally
   combines with (so the generator can never build unnatural German).
   ========================================================================= */

export type Gender = "m" | "f" | "n" | "pl";

export type VerbId =
  | "sehen" | "kaufen" | "haben" | "brauchen" | "suchen"
  | "lesen" | "trinken" | "essen" | "besuchen" | "kennen"
  | "nehmen" | "machen" | "mögen" | "lieben" | "kochen" | "hören";

export type Topic =
  | "Menschen" | "Tiere" | "Natur & Tiere" | "Zuhause" | "Wohnen"
  | "Essen & Trinken" | "Technik" | "Unterwegs" | "Reisen & Verkehr"
  | "Schule & Studium" | "Arbeit & Beruf" | "Freizeit"
  | "Gesundheit & Körper" | "Einkaufen" | "Alltag & Zeit";

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
  topic: Topic;
};

export const NOUNS: NounEntry[] = [
  /* ---------------- maskulin ---------------- */
  { word: "Mann", art: "der", g: "m", en: "man", enOwned: "husband", plural: "die Männer", verbs: ["sehen", "kennen"], person: true, topic: "Menschen" },
  { word: "Bruder", art: "der", g: "m", en: "brother", plural: "die Brüder", verbs: ["sehen", "besuchen", "haben", "kennen"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Vater", art: "der", g: "m", en: "father", plural: "die Väter", verbs: ["besuchen", "kennen", "sehen"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Freund", art: "der", g: "m", en: "friend", plural: "die Freunde", verbs: ["besuchen", "kennen", "sehen", "haben"], person: true, topic: "Menschen" },
  { word: "Sohn", art: "der", g: "m", en: "son", plural: "die Söhne", verbs: ["sehen", "besuchen", "haben", "kennen", "lieben"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Opa", art: "der", g: "m", en: "grandpa", plural: "die Opas", verbs: ["sehen", "besuchen", "kennen", "lieben"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Onkel", art: "der", g: "m", en: "uncle", plural: "die Onkel", verbs: ["sehen", "besuchen", "kennen", "haben"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Lehrer", art: "der", g: "m", en: "teacher", plural: "die Lehrer", verbs: ["sehen", "kennen", "besuchen", "haben"], person: true, topic: "Menschen" },
  { word: "Nachbar", art: "der", g: "m", en: "neighbour", plural: "die Nachbarn", verbs: ["sehen", "kennen", "besuchen", "haben"], person: true, topic: "Menschen" },
  { word: "Arzt", art: "der", g: "m", en: "doctor", plural: "die Ärzte", verbs: ["sehen", "kennen", "besuchen", "brauchen"], person: true, topic: "Arbeit & Beruf" },
  { word: "Chef", art: "der", g: "m", en: "boss", plural: "die Chefs", verbs: ["sehen", "kennen", "besuchen", "haben"], person: true, topic: "Arbeit & Beruf" },
  { word: "Kollege", art: "der", g: "m", en: "colleague", plural: "die Kollegen", verbs: ["sehen", "kennen", "besuchen", "haben"], person: true, topic: "Arbeit & Beruf" },
  { word: "Hund", art: "der", g: "m", en: "dog", plural: "die Hunde", verbs: ["sehen", "haben", "suchen", "mögen", "lieben"], topic: "Tiere" },
  { word: "Vogel", art: "der", g: "m", en: "bird", plural: "die Vögel", verbs: ["sehen", "hören", "kennen", "mögen"], topic: "Natur & Tiere" },
  { word: "Baum", art: "der", g: "m", en: "tree", plural: "die Bäume", verbs: ["sehen", "kennen", "suchen"], noPoss: true, topic: "Natur & Tiere" },
  { word: "See", art: "der", g: "m", en: "lake", plural: "die Seen", verbs: ["sehen", "kennen", "suchen", "besuchen"], noPoss: true, topic: "Natur & Tiere" },
  { word: "Schlüssel", art: "der", g: "m", en: "key", plural: "die Schlüssel", verbs: ["haben", "suchen", "brauchen", "nehmen"], topic: "Zuhause" },
  { word: "Tisch", art: "der", g: "m", en: "table", plural: "die Tische", verbs: ["kaufen", "brauchen", "haben", "suchen"], topic: "Zuhause" },
  { word: "Stuhl", art: "der", g: "m", en: "chair", plural: "die Stühle", verbs: ["kaufen", "brauchen", "haben", "suchen"], topic: "Zuhause" },
  { word: "Schrank", art: "der", g: "m", en: "wardrobe, cupboard", plural: "die Schränke", verbs: ["haben", "brauchen", "kaufen", "suchen"], topic: "Wohnen" },
  { word: "Balkon", art: "der", g: "m", en: "balcony", plural: "die Balkone", verbs: ["sehen", "haben", "suchen", "brauchen"], topic: "Wohnen" },
  { word: "Garten", art: "der", g: "m", en: "garden", plural: "die Gärten", verbs: ["sehen", "haben", "suchen", "brauchen"], topic: "Wohnen" },
  { word: "Kaffee", art: "der", g: "m", en: "coffee", plural: "—", verbs: ["trinken", "brauchen", "kaufen", "mögen", "lieben"], topic: "Essen & Trinken" },
  { word: "Apfel", art: "der", g: "m", en: "apple", plural: "die Äpfel", verbs: ["kaufen", "haben", "brauchen", "essen", "mögen"], topic: "Essen & Trinken" },
  { word: "Tee", art: "der", g: "m", en: "tea", plural: "—", verbs: ["trinken", "kaufen", "brauchen", "mögen", "lieben"], topic: "Essen & Trinken" },
  { word: "Saft", art: "der", g: "m", en: "juice", plural: "die Säfte", verbs: ["trinken", "kaufen", "brauchen", "mögen"], topic: "Essen & Trinken" },
  { word: "Käse", art: "der", g: "m", en: "cheese", plural: "die Käse", verbs: ["essen", "kaufen", "brauchen", "mögen", "lieben"], topic: "Essen & Trinken" },
  { word: "Kuchen", art: "der", g: "m", en: "cake", plural: "die Kuchen", verbs: ["essen", "kaufen", "brauchen", "mögen", "lieben", "machen"], topic: "Essen & Trinken" },
  { word: "Reis", art: "der", g: "m", en: "rice", plural: "—", verbs: ["essen", "kochen", "kaufen", "brauchen"], topic: "Essen & Trinken" },
  { word: "Fisch", art: "der", g: "m", en: "fish", plural: "die Fische", verbs: ["essen", "kochen", "kaufen", "sehen"], topic: "Essen & Trinken" },
  { word: "Computer", art: "der", g: "m", en: "computer", plural: "die Computer", verbs: ["kaufen", "brauchen", "haben", "suchen"], topic: "Technik" },
  { word: "Film", art: "der", g: "m", en: "film, movie", plural: "die Filme", verbs: ["sehen", "haben", "kennen", "mögen", "lieben"], topic: "Technik" },
  { word: "Laptop", art: "der", g: "m", en: "laptop", plural: "die Laptops", verbs: ["haben", "brauchen", "kaufen", "suchen", "nehmen"], topic: "Technik" },
  { word: "Fernseher", art: "der", g: "m", en: "TV set", plural: "die Fernseher", verbs: ["sehen", "haben", "kaufen", "brauchen", "suchen"], topic: "Technik" },
  { word: "Bus", art: "der", g: "m", en: "bus", plural: "die Busse", verbs: ["sehen", "suchen", "brauchen", "nehmen"], noPoss: true, topic: "Unterwegs" },
  { word: "Zug", art: "der", g: "m", en: "train", plural: "die Züge", verbs: ["sehen", "suchen", "brauchen", "nehmen", "haben"], topic: "Reisen & Verkehr" },
  { word: "Bahnhof", art: "der", g: "m", en: "train station", plural: "die Bahnhöfe", verbs: ["suchen", "sehen", "kennen", "brauchen"], noPoss: true, topic: "Reisen & Verkehr" },
  { word: "Flughafen", art: "der", g: "m", en: "airport", plural: "die Flughäfen", verbs: ["suchen", "sehen", "kennen", "brauchen"], noPoss: true, topic: "Reisen & Verkehr" },
  { word: "Koffer", art: "der", g: "m", en: "suitcase", plural: "die Koffer", verbs: ["haben", "kaufen", "brauchen", "suchen", "nehmen"], topic: "Reisen & Verkehr" },
  { word: "Supermarkt", art: "der", g: "m", en: "supermarket", plural: "die Supermärkte", verbs: ["suchen", "sehen", "kennen", "brauchen"], noPoss: true, topic: "Einkaufen" },
  { word: "Laden", art: "der", g: "m", en: "shop", plural: "die Läden", verbs: ["suchen", "sehen", "kennen", "brauchen"], noPoss: true, topic: "Einkaufen" },
  { word: "Markt", art: "der", g: "m", en: "market", plural: "die Märkte", verbs: ["suchen", "sehen", "kennen", "brauchen", "besuchen"], noPoss: true, topic: "Einkaufen" },
  { word: "Preis", art: "der", g: "m", en: "price", plural: "die Preise", verbs: ["kennen", "haben", "brauchen", "sehen"], topic: "Einkaufen" },
  { word: "Tag", art: "der", g: "m", en: "day", plural: "die Tage", verbs: ["haben", "brauchen", "mögen", "lieben"], topic: "Alltag & Zeit" },
  { word: "Monat", art: "der", g: "m", en: "month", plural: "die Monate", verbs: ["haben", "brauchen", "mögen", "lieben"], topic: "Alltag & Zeit" },
  { word: "Abend", art: "der", g: "m", en: "evening", plural: "die Abende", verbs: ["haben", "brauchen", "mögen", "lieben"], topic: "Alltag & Zeit" },
  { word: "Beruf", art: "der", g: "m", en: "profession", plural: "die Berufe", verbs: ["haben", "kennen", "suchen", "brauchen"], topic: "Arbeit & Beruf" },
  { word: "Job", art: "der", g: "m", en: "job", plural: "die Jobs", verbs: ["haben", "suchen", "brauchen", "kennen", "mögen"], topic: "Arbeit & Beruf" },
  { word: "Termin", art: "der", g: "m", en: "appointment", plural: "die Termine", verbs: ["haben", "brauchen", "kennen", "machen"], topic: "Arbeit & Beruf" },
  { word: "Ball", art: "der", g: "m", en: "ball", plural: "die Bälle", verbs: ["kaufen", "haben", "brauchen", "suchen", "sehen"], topic: "Freizeit" },
  { word: "Park", art: "der", g: "m", en: "park", plural: "die Parks", verbs: ["sehen", "suchen", "kennen", "besuchen"], noPoss: true, topic: "Freizeit" },
  { word: "Sport", art: "der", g: "m", en: "sport", plural: "—", verbs: ["machen", "kennen", "brauchen", "mögen", "lieben"], topic: "Freizeit" },
  { word: "Kurs", art: "der", g: "m", en: "course", plural: "die Kurse", verbs: ["haben", "suchen", "brauchen", "kennen", "machen"], topic: "Schule & Studium" },
  { word: "Stift", art: "der", g: "m", en: "pen, pencil", plural: "die Stifte", verbs: ["haben", "brauchen", "kaufen", "suchen", "nehmen"], topic: "Schule & Studium" },
  { word: "Rucksack", art: "der", g: "m", en: "backpack", plural: "die Rucksäcke", verbs: ["haben", "kaufen", "brauchen", "suchen", "nehmen"], topic: "Schule & Studium" },
  { word: "Kopf", art: "der", g: "m", en: "head", plural: "die Köpfe", verbs: ["sehen", "haben", "brauchen"], topic: "Gesundheit & Körper" },
  { word: "Zahn", art: "der", g: "m", en: "tooth", plural: "die Zähne", verbs: ["haben", "brauchen", "sehen"], topic: "Gesundheit & Körper" },
  { word: "Arm", art: "der", g: "m", en: "arm", plural: "die Arme", verbs: ["sehen", "haben", "brauchen"], topic: "Gesundheit & Körper" },
  { word: "Urlaub", art: "der", g: "m", en: "holiday, vacation", plural: "die Urlaube", verbs: ["haben", "brauchen", "machen", "mögen", "lieben"], topic: "Reisen & Verkehr" },

  /* ---------------- feminin ---------------- */
  { word: "Frau", art: "die", g: "f", en: "woman", enOwned: "wife", plural: "die Frauen", verbs: ["sehen", "kennen"], person: true, topic: "Menschen" },
  { word: "Mutter", art: "die", g: "f", en: "mother", plural: "die Mütter", verbs: ["besuchen", "kennen", "sehen"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Schwester", art: "die", g: "f", en: "sister", plural: "die Schwestern", verbs: ["besuchen", "kennen", "sehen", "haben"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Lehrerin", art: "die", g: "f", en: "teacher (female)", plural: "die Lehrerinnen", verbs: ["besuchen", "kennen", "sehen"], person: true, topic: "Menschen" },
  { word: "Tochter", art: "die", g: "f", en: "daughter", plural: "die Töchter", verbs: ["sehen", "besuchen", "haben", "kennen", "lieben"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Oma", art: "die", g: "f", en: "grandma", plural: "die Omas", verbs: ["sehen", "besuchen", "kennen", "lieben"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Tante", art: "die", g: "f", en: "aunt", plural: "die Tanten", verbs: ["sehen", "besuchen", "kennen", "haben"], person: true, indefVerbs: ["haben"], topic: "Menschen" },
  { word: "Freundin", art: "die", g: "f", en: "girlfriend, female friend", plural: "die Freundinnen", verbs: ["sehen", "kennen", "besuchen", "lieben", "haben"], person: true, topic: "Menschen" },
  { word: "Ärztin", art: "die", g: "f", en: "doctor (female)", plural: "die Ärztinnen", verbs: ["sehen", "kennen", "besuchen", "brauchen"], person: true, topic: "Arbeit & Beruf" },
  { word: "Katze", art: "die", g: "f", en: "cat", plural: "die Katzen", verbs: ["sehen", "haben", "suchen", "mögen", "lieben"], topic: "Tiere" },
  { word: "Blume", art: "die", g: "f", en: "flower", plural: "die Blumen", verbs: ["sehen", "kaufen", "brauchen", "suchen", "mögen", "lieben"], topic: "Natur & Tiere" },
  { word: "Lampe", art: "die", g: "f", en: "lamp", plural: "die Lampen", verbs: ["kaufen", "brauchen", "haben", "suchen"], topic: "Zuhause" },
  { word: "Tasche", art: "die", g: "f", en: "bag", plural: "die Taschen", verbs: ["kaufen", "brauchen", "suchen", "haben", "nehmen"], topic: "Zuhause" },
  { word: "Wohnung", art: "die", g: "f", en: "flat, apartment", plural: "die Wohnungen", verbs: ["suchen", "haben", "brauchen", "sehen"], topic: "Wohnen" },
  { word: "Küche", art: "die", g: "f", en: "kitchen", plural: "die Küchen", verbs: ["suchen", "haben", "brauchen", "sehen"], topic: "Wohnen" },
  { word: "Tür", art: "die", g: "f", en: "door", plural: "die Türen", verbs: ["sehen", "suchen", "brauchen"], topic: "Wohnen" },
  { word: "Zeitung", art: "die", g: "f", en: "newspaper", plural: "die Zeitungen", verbs: ["lesen", "kaufen", "haben", "suchen", "brauchen"], topic: "Technik" },
  { word: "E-Mail", art: "die", g: "f", en: "e-mail", plural: "die E-Mails", verbs: ["lesen", "haben", "brauchen", "suchen", "machen"], topic: "Technik" },
  { word: "Milch", art: "die", g: "f", en: "milk", plural: "—", verbs: ["trinken", "kaufen", "brauchen", "mögen"], topic: "Essen & Trinken" },
  { word: "Wurst", art: "die", g: "f", en: "sausage", plural: "die Würste", verbs: ["essen", "kaufen", "brauchen", "mögen"], topic: "Essen & Trinken" },
  { word: "Kartoffel", art: "die", g: "f", en: "potato", plural: "die Kartoffeln", verbs: ["essen", "kochen", "kaufen", "brauchen"], topic: "Essen & Trinken" },
  { word: "Suppe", art: "die", g: "f", en: "soup", plural: "die Suppen", verbs: ["essen", "kochen", "brauchen", "machen", "mögen"], topic: "Essen & Trinken" },
  { word: "Pizza", art: "die", g: "f", en: "pizza", plural: "die Pizzen", verbs: ["essen", "kaufen", "brauchen", "mögen", "lieben", "machen"], topic: "Essen & Trinken" },
  { word: "Stadt", art: "die", g: "f", en: "city, town", plural: "die Städte", verbs: ["sehen", "besuchen", "kennen"], noPoss: true, noIndef: true, topic: "Unterwegs" },
  { word: "Straße", art: "die", g: "f", en: "street", plural: "die Straßen", verbs: ["suchen", "sehen", "kennen", "brauchen"], noPoss: true, topic: "Reisen & Verkehr" },
  { word: "Haltestelle", art: "die", g: "f", en: "bus stop", plural: "die Haltestellen", verbs: ["suchen", "sehen", "brauchen", "kennen"], noPoss: true, topic: "Reisen & Verkehr" },
  { word: "Fahrkarte", art: "die", g: "f", en: "ticket", plural: "die Fahrkarten", verbs: ["kaufen", "haben", "brauchen", "suchen", "nehmen"], topic: "Reisen & Verkehr" },
  { word: "Reise", art: "die", g: "f", en: "journey, trip", plural: "die Reisen", verbs: ["machen", "haben", "brauchen", "kennen", "mögen", "lieben"], topic: "Reisen & Verkehr" },
  { word: "Schule", art: "die", g: "f", en: "school", plural: "die Schulen", verbs: ["sehen", "suchen", "kennen", "besuchen"], topic: "Schule & Studium" },
  { word: "Klasse", art: "die", g: "f", en: "class", plural: "die Klassen", verbs: ["haben", "kennen", "suchen", "brauchen"], topic: "Schule & Studium" },
  { word: "Prüfung", art: "die", g: "f", en: "exam", plural: "die Prüfungen", verbs: ["haben", "brauchen", "kennen", "machen"], topic: "Schule & Studium" },
  { word: "Hausaufgabe", art: "die", g: "f", en: "homework", plural: "die Hausaufgaben", verbs: ["haben", "brauchen", "machen", "suchen"], topic: "Schule & Studium" },
  { word: "Arbeit", art: "die", g: "f", en: "work", plural: "die Arbeiten", verbs: ["haben", "suchen", "brauchen", "machen", "kennen"], topic: "Arbeit & Beruf" },
  { word: "Firma", art: "die", g: "f", en: "company", plural: "die Firmen", verbs: ["kennen", "haben", "suchen", "brauchen"], topic: "Arbeit & Beruf" },
  { word: "Gitarre", art: "die", g: "f", en: "guitar", plural: "die Gitarren", verbs: ["haben", "kaufen", "brauchen", "sehen", "hören"], topic: "Freizeit" },
  { word: "Musik", art: "die", g: "f", en: "music", plural: "—", verbs: ["hören", "kennen", "mögen", "lieben", "machen"], topic: "Freizeit" },
  { word: "Hand", art: "die", g: "f", en: "hand", plural: "die Hände", verbs: ["sehen", "haben", "brauchen"], topic: "Gesundheit & Körper" },
  { word: "Nase", art: "die", g: "f", en: "nose", plural: "die Nasen", verbs: ["sehen", "haben", "brauchen"], topic: "Gesundheit & Körper" },
  { word: "Apotheke", art: "die", g: "f", en: "pharmacy", plural: "die Apotheken", verbs: ["suchen", "sehen", "kennen", "brauchen"], noPoss: true, topic: "Gesundheit & Körper" },
  { word: "Woche", art: "die", g: "f", en: "week", plural: "die Wochen", verbs: ["haben", "brauchen", "mögen", "lieben"], topic: "Alltag & Zeit" },
  { word: "Nacht", art: "die", g: "f", en: "night", plural: "die Nächte", verbs: ["haben", "brauchen", "mögen", "lieben"], topic: "Alltag & Zeit" },

  /* ---------------- neutrum ---------------- */
  { word: "Kind", art: "das", g: "n", en: "child", plural: "die Kinder", verbs: ["sehen", "haben", "kennen", "lieben"], person: true, topic: "Menschen" },
  { word: "Baby", art: "das", g: "n", en: "baby", plural: "die Babys", verbs: ["sehen", "haben", "kennen", "lieben"], person: true, topic: "Menschen" },
  { word: "Auto", art: "das", g: "n", en: "car", plural: "die Autos", verbs: ["kaufen", "haben", "brauchen", "sehen", "suchen", "nehmen"], topic: "Unterwegs" },
  { word: "Haus", art: "das", g: "n", en: "house", plural: "die Häuser", verbs: ["kaufen", "sehen", "haben", "suchen", "brauchen"], topic: "Zuhause" },
  { word: "Fenster", art: "das", g: "n", en: "window", plural: "die Fenster", verbs: ["sehen", "haben", "brauchen", "suchen"], topic: "Zuhause" },
  { word: "Zimmer", art: "das", g: "n", en: "room", plural: "die Zimmer", verbs: ["suchen", "haben", "brauchen", "sehen"], topic: "Wohnen" },
  { word: "Bad", art: "das", g: "n", en: "bathroom", plural: "die Bäder", verbs: ["suchen", "haben", "brauchen", "sehen"], topic: "Wohnen" },
  { word: "Bett", art: "das", g: "n", en: "bed", plural: "die Betten", verbs: ["haben", "brauchen", "suchen", "sehen"], topic: "Wohnen" },
  { word: "Wohnzimmer", art: "das", g: "n", en: "living room", plural: "die Wohnzimmer", verbs: ["suchen", "haben", "brauchen", "sehen"], topic: "Wohnen" },
  { word: "Schlafzimmer", art: "das", g: "n", en: "bedroom", plural: "die Schlafzimmer", verbs: ["suchen", "haben", "brauchen", "sehen"], topic: "Wohnen" },
  { word: "Buch", art: "das", g: "n", en: "book", plural: "die Bücher", verbs: ["lesen", "kaufen", "haben", "suchen", "brauchen"], topic: "Technik" },
  { word: "Handy", art: "das", g: "n", en: "mobile phone", plural: "die Handys", verbs: ["haben", "suchen", "kaufen", "brauchen", "nehmen"], topic: "Technik" },
  { word: "Telefon", art: "das", g: "n", en: "telephone", plural: "die Telefone", verbs: ["haben", "brauchen", "kaufen", "suchen", "nehmen"], topic: "Technik" },
  { word: "Radio", art: "das", g: "n", en: "radio", plural: "die Radios", verbs: ["hören", "haben", "kaufen", "brauchen", "suchen"], topic: "Technik" },
  { word: "Brot", art: "das", g: "n", en: "bread", plural: "die Brote", verbs: ["kaufen", "brauchen", "haben", "essen", "mögen"], topic: "Essen & Trinken" },
  { word: "Wasser", art: "das", g: "n", en: "water", plural: "—", verbs: ["trinken", "brauchen", "kaufen", "mögen"], topic: "Essen & Trinken" },
  { word: "Ei", art: "das", g: "n", en: "egg", plural: "die Eier", verbs: ["essen", "kochen", "kaufen", "brauchen"], topic: "Essen & Trinken" },
  { word: "Eis", art: "das", g: "n", en: "ice cream", plural: "—", verbs: ["essen", "kaufen", "brauchen", "mögen", "lieben"], topic: "Essen & Trinken" },
  { word: "Obst", art: "das", g: "n", en: "fruit", plural: "—", verbs: ["essen", "kaufen", "brauchen", "mögen"], topic: "Essen & Trinken" },
  { word: "Frühstück", art: "das", g: "n", en: "breakfast", plural: "die Frühstücke", verbs: ["essen", "brauchen", "machen", "mögen"], topic: "Essen & Trinken" },
  { word: "Fahrrad", art: "das", g: "n", en: "bicycle", plural: "die Fahrräder", verbs: ["kaufen", "brauchen", "haben", "suchen", "nehmen"], topic: "Unterwegs" },
  { word: "Museum", art: "das", g: "n", en: "museum", plural: "die Museen", verbs: ["besuchen", "sehen", "kennen"], noPoss: true, topic: "Unterwegs" },
  { word: "Flugzeug", art: "das", g: "n", en: "aeroplane, plane", plural: "die Flugzeuge", verbs: ["sehen", "suchen", "brauchen", "nehmen"], topic: "Reisen & Verkehr" },
  { word: "Schiff", art: "das", g: "n", en: "ship", plural: "die Schiffe", verbs: ["sehen", "suchen", "brauchen", "nehmen"], topic: "Reisen & Verkehr" },
  { word: "Geschäft", art: "das", g: "n", en: "shop, business", plural: "die Geschäfte", verbs: ["suchen", "sehen", "kennen", "brauchen"], noPoss: true, topic: "Einkaufen" },
  { word: "Geschenk", art: "das", g: "n", en: "present, gift", plural: "die Geschenke", verbs: ["kaufen", "haben", "brauchen", "suchen", "nehmen", "machen"], topic: "Einkaufen" },
  { word: "Hobby", art: "das", g: "n", en: "hobby", plural: "die Hobbys", verbs: ["haben", "kennen", "brauchen", "mögen", "lieben", "machen"], topic: "Freizeit" },
  { word: "Spiel", art: "das", g: "n", en: "game", plural: "die Spiele", verbs: ["kaufen", "haben", "brauchen", "kennen", "mögen"], topic: "Freizeit" },
  { word: "Lied", art: "das", g: "n", en: "song", plural: "die Lieder", verbs: ["kennen", "hören", "mögen", "lieben", "suchen"], topic: "Freizeit" },
  { word: "Foto", art: "das", g: "n", en: "photo", plural: "die Fotos", verbs: ["haben", "suchen", "brauchen", "sehen", "machen"], topic: "Freizeit" },
  { word: "Wochenende", art: "das", g: "n", en: "weekend", plural: "die Wochenenden", verbs: ["haben", "brauchen", "mögen", "lieben", "machen"], topic: "Freizeit" },
  { word: "Kino", art: "das", g: "n", en: "cinema", plural: "die Kinos", verbs: ["sehen", "suchen", "kennen", "besuchen"], noPoss: true, topic: "Freizeit" },
  { word: "Heft", art: "das", g: "n", en: "exercise book", plural: "die Hefte", verbs: ["haben", "brauchen", "kaufen", "suchen", "nehmen"], topic: "Schule & Studium" },
  { word: "Deutsch", art: "das", g: "n", en: "German (language)", plural: "—", verbs: ["kennen", "brauchen", "mögen", "lieben", "hören"], noPoss: true, topic: "Schule & Studium" },
  { word: "Büro", art: "das", g: "n", en: "office", plural: "die Büros", verbs: ["haben", "suchen", "brauchen", "sehen"], topic: "Arbeit & Beruf" },
  { word: "Auge", art: "das", g: "n", en: "eye", plural: "die Augen", verbs: ["sehen", "haben", "brauchen"], topic: "Gesundheit & Körper" },
  { word: "Bein", art: "das", g: "n", en: "leg", plural: "die Beine", verbs: ["sehen", "haben", "brauchen"], topic: "Gesundheit & Körper" },
  { word: "Krankenhaus", art: "das", g: "n", en: "hospital", plural: "die Krankenhäuser", verbs: ["sehen", "suchen", "kennen", "brauchen"], noPoss: true, topic: "Gesundheit & Körper" },
  { word: "Jahr", art: "das", g: "n", en: "year", plural: "die Jahre", verbs: ["haben", "brauchen", "mögen", "lieben"], topic: "Alltag & Zeit" },
  { word: "Tier", art: "das", g: "n", en: "animal", plural: "die Tiere", verbs: ["sehen", "haben", "kennen", "mögen", "lieben"], topic: "Natur & Tiere" },
  { word: "Pferd", art: "das", g: "n", en: "horse", plural: "die Pferde", verbs: ["sehen", "haben", "kennen", "mögen", "lieben"], topic: "Natur & Tiere" },

  /* ---------------- plural ---------------- */
  { word: "Kinder", art: "die", g: "pl", en: "children", plural: "die Kinder", verbs: ["sehen", "haben", "kennen", "lieben"], person: true, topic: "Menschen" },
  { word: "Eltern", art: "die", g: "pl", en: "parents", plural: "die Eltern", verbs: ["besuchen", "kennen", "sehen", "lieben"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Freunde", art: "die", g: "pl", en: "friends", plural: "die Freunde", verbs: ["besuchen", "sehen", "kennen", "haben", "lieben"], person: true, topic: "Menschen" },
  { word: "Leute", art: "die", g: "pl", en: "people", plural: "die Leute", verbs: ["sehen", "kennen", "besuchen", "mögen"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Geschwister", art: "die", g: "pl", en: "siblings", plural: "die Geschwister", verbs: ["sehen", "kennen", "besuchen", "haben", "lieben"], person: true, noIndef: true, topic: "Menschen" },
  { word: "Bücher", art: "die", g: "pl", en: "books", plural: "die Bücher", verbs: ["lesen", "kaufen", "haben", "brauchen", "suchen"], topic: "Technik" },
  { word: "Schuhe", art: "die", g: "pl", en: "shoes", plural: "die Schuhe", verbs: ["kaufen", "brauchen", "haben", "suchen", "nehmen"], topic: "Zuhause" },
  { word: "Nudeln", art: "die", g: "pl", en: "pasta, noodles", plural: "die Nudeln", verbs: ["essen", "kochen", "kaufen", "brauchen", "mögen"], topic: "Essen & Trinken" },
  { word: "Pommes", art: "die", g: "pl", en: "chips, fries", plural: "die Pommes", verbs: ["essen", "kaufen", "brauchen", "mögen", "lieben"], topic: "Essen & Trinken" },
];

/* ---------------- verbs: full A1/A2 present tense ---------------- */
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
  nehmen:   { inf: "nehmen",   en: "to take",      forms: { ich: "nehme", du: "nimmst", er: "nimmt", wir: "nehmen", ihr: "nehmt", sie: "nehmen" } },
  machen:   { inf: "machen",   en: "to make, to do", forms: { ich: "mache", du: "machst", er: "macht", wir: "machen", ihr: "macht", sie: "machen" } },
  mögen:    { inf: "mögen",    en: "to like",      forms: { ich: "mag", du: "magst", er: "mag", wir: "mögen", ihr: "mögt", sie: "mögen" } },
  lieben:   { inf: "lieben",   en: "to love",      forms: { ich: "liebe", du: "liebst", er: "liebt", wir: "lieben", ihr: "liebt", sie: "lieben" } },
  kochen:   { inf: "kochen",   en: "to cook",      forms: { ich: "koche", du: "kochst", er: "kocht", wir: "kochen", ihr: "kocht", sie: "kochen" } },
  hören:   { inf: "hören",   en: "to hear",      forms: { ich: "höre", du: "hörst", er: "hört", wir: "hören", ihr: "hört", sie: "hören" } },
};

/* möchten — the A1 modal, fully correct */
export const MOECHTE: Record<PersonKey, string> = {
  ich: "möchte", du: "möchtest", er: "möchte", wir: "möchten", ihr: "möchtet", sie: "möchten",
};

/** Verbs that sound natural after "möchte": no "möchte brauchen/haben/kennen/mögen/lieben". */
export const MODAL_OK: VerbId[] = ["sehen", "kaufen", "lesen", "trinken", "essen", "besuchen", "suchen", "nehmen", "machen", "kochen", "hören"];

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

export const TOPICS = [
  "Menschen", "Tiere", "Natur & Tiere", "Zuhause", "Wohnen",
  "Essen & Trinken", "Technik", "Unterwegs", "Reisen & Verkehr",
  "Schule & Studium", "Arbeit & Beruf", "Freizeit",
  "Gesundheit & Körper", "Einkaufen", "Alltag & Zeit",
] as const;
