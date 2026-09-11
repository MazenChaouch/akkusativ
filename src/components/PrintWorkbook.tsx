import type { ReactNode } from "react";
import { Scissors } from "lucide-react";
import {
  definiteRows, indefiniteRows, meinRows, pronounRows, possessiveArrows,
  possessiveMeanings, introFlows, einPairs, exercises,
} from "../data/content";
import { NOUNS, VERBS } from "../data/vocab";

/* ---------- print helpers ---------- */
const PH = ({ num, kicker, title, lede }: { num: string; kicker: string; title: ReactNode; lede: string }) => (
  <div className="avoid-break" style={{ marginBottom: "5mm" }}>
    <div style={{ fontSize: "8pt", letterSpacing: "0.22em", color: "#e2481f", fontWeight: 800, textTransform: "uppercase", marginBottom: "1.5mm" }}>
      Kapitel {num} · {kicker}
    </div>
    <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "20pt", fontWeight: 700, lineHeight: 1.05, margin: 0 }}>{title}</h2>
    <p style={{ fontSize: "9.5pt", color: "#746a58", margin: "1.5mm 0 0" }}>{lede}</p>
  </div>
);

const PRule = ({ children, label = "Die goldene Regel" }: { children: ReactNode; label?: string }) => (
  <div className="avoid-break" style={{ border: "1.6pt solid #211b12", background: "#fff3c2", borderRadius: "3mm", padding: "4mm 5mm", margin: "4mm 0", position: "relative" }}>
    <span style={{ position: "absolute", top: "-2.6mm", left: "5mm", background: "#e2481f", color: "#fff", fontSize: "6.5pt", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "1mm 2.5mm", borderRadius: "4mm" }}>{label}</span>
    <div style={{ fontFamily: "Fraunces, serif", fontSize: "12pt", fontWeight: 600, lineHeight: 1.4 }}>{children}</div>
  </div>
);

const PNote = ({ children }: { children: ReactNode }) => (
  <div className="avoid-break" style={{ background: "#f1ead9", borderRadius: "2.5mm", padding: "3mm 4mm", margin: "3mm 0", fontSize: "9pt", lineHeight: 1.5 }}>
    {children}
  </div>
);

const PTable = ({ headers, rows, accentCol }: { headers: string[]; rows: ReactNode[][]; accentCol?: number }) => (
  <table className="avoid-break" style={{ width: "100%", borderCollapse: "collapse", border: "1.4pt solid #211b12", margin: "3mm 0", fontSize: "10pt" }}>
    <thead>
      <tr>
        {headers.map((h, i) => (
          <th key={i} style={{ background: "#211b12", color: i === accentCol ? "#ffb199" : "#faf6ee", textAlign: "left", padding: "2.2mm 3mm", fontSize: "7.5pt", letterSpacing: "0.14em", textTransform: "uppercase" }}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i}>
          {r.map((c, j) => (
            <td key={j} style={{
              padding: "2mm 3mm",
              borderTop: "0.6pt solid #d9d2c0",
              borderLeft: j > 0 ? "0.6pt solid #d9d2c0" : undefined,
              background: j === accentCol ? "#fdeee8" : undefined,
              fontFamily: j > 0 ? "Fraunces, serif" : undefined,
              fontWeight: j > 0 ? 600 : 500,
              fontSize: j > 0 ? "11pt" : "8.5pt",
              color: j === 0 ? "#746a58" : "#211b12",
            }}>{c}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const PFlow = ({ tokens, en }: { tokens: { t: string; tag: string; tone: "nom" | "verb" | "akk" }[]; en: string }) => (
  <div className="avoid-break" style={{ border: "0.7pt solid #d9d2c0", borderRadius: "2.5mm", padding: "3mm 4mm", margin: "2mm 0", background: "#fff" }}>
    {tokens.map((tok, i) => (
      <span key={i} style={{ marginRight: "4mm", display: "inline-block" }}>
        <span style={{
          fontFamily: "Fraunces, serif", fontSize: "12.5pt", fontWeight: 650,
          borderBottom: `1.6pt solid ${tok.tone === "akk" ? "#e2481f" : tok.tone === "nom" ? "#211b12" : "#c9c0aa"}`,
          paddingBottom: "0.5mm",
        }}>{tok.t}</span>
        <span style={{
          display: "inline-block", marginLeft: "1.5mm", fontSize: "6pt", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#fff", background: tok.tone === "akk" ? "#e2481f" : tok.tone === "nom" ? "#211b12" : "#a89f8c",
          padding: "0.6mm 1.6mm", borderRadius: "1.2mm", verticalAlign: "middle",
        }}>{tok.tag}</span>
      </span>
    ))}
    <span style={{ display: "block", marginTop: "1.5mm", fontSize: "8.5pt", fontStyle: "italic", color: "#746a58" }}>{en}</span>
  </div>
);

const PPair = ({ left, right }: { left: ReactNode; right: ReactNode }) => (
  <div className="avoid-break" style={{ display: "flex", gap: "3mm", margin: "2mm 0" }}>
    <div style={{ flex: 1, border: "0.7pt solid #d9d2c0", borderRadius: "2.5mm", padding: "2.5mm 3.5mm" }}>{left}</div>
    <div style={{ flex: 1, border: "1.3pt solid #211b12", borderRadius: "2.5mm", padding: "2.5mm 3.5mm", background: "#fdeee8" }}>{right}</div>
  </div>
);

const Serif = ({ children, size = 11 }: { children: ReactNode; size?: number }) => (
  <span style={{ fontFamily: "Fraunces, serif", fontWeight: 650, fontSize: `${size}pt` }}>{children}</span>
);

const Blank = () => <span className="print-blank" />;

/* ================= the document ================= */
export const PrintWorkbook = () => (
  <div className="print-doc">
    {/* ============ COVER ============ */}
    <div style={{ textAlign: "center", paddingTop: "26mm", paddingBottom: "10mm" }}>
      <div style={{ fontSize: "8.5pt", letterSpacing: "0.3em", fontWeight: 800, color: "#e2481f", textTransform: "uppercase" }}>
        Dein A1-Arbeitsbuch · Deutsch
      </div>
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "46pt", fontWeight: 750, margin: "6mm 0 3mm", lineHeight: 0.95 }}>
        Der Akkusativ<span style={{ color: "#e2481f" }}>.</span>
      </h1>
      <p style={{ fontFamily: "Fraunces, serif", fontSize: "16pt", color: "#211b12", margin: "2mm 0" }}>
        Nur der Mann ändert sich.
      </p>
      <p style={{ fontSize: "9.5pt", color: "#746a58", maxWidth: "130mm", margin: "2mm auto 0", lineHeight: 1.6 }}>
        Bestimmte &amp; unbestimmte Artikel, Personalpronomen, Possessivartikel — und der berühmte
        euch/euer-Trick. Ein Muster, fünf Themen: das kleine <b style={{ color: "#e2481f" }}>n</b>.
      </p>
    </div>

    <div className="avoid-break" style={{ maxWidth: "120mm", margin: "0 auto", border: "1.4pt solid #211b12", borderRadius: "3mm", padding: "5mm 6mm", background: "#fff3c2" }}>
      <div style={{ fontSize: "7.5pt", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e2481f", marginBottom: "2mm" }}>So arbeitest du mit diesem Buch</div>
      <ol style={{ margin: 0, paddingLeft: "5mm", fontSize: "9.5pt", lineHeight: 1.7 }}>
        <li><b>Teil 1:</b> Lies die Kapitel 1–9 der Reihe nach. Jedes Kapitel baut auf dem vorherigen auf.</li>
        <li><b>Teil 2:</b> Löse die 10 gemischten Übungen — schreibe direkt in die Lücken.</li>
        <li><b>Answer Key</b> am Ende: Jede Lösung hat eine Mini-Erklärung zum Warum.</li>
        <li>Schneide die <b>Merkkarte</b> aus und hänge sie an den Kühlschrank.</li>
      </ol>
    </div>

    <div className="avoid-break" style={{ maxWidth: "120mm", margin: "6mm auto 0", fontSize: "9pt", color: "#746a58", lineHeight: 1.8 }}>
      <b style={{ color: "#211b12" }}>Inhalt:</b>{" "}
      01 Was ist der Akkusativ? · 02 Bestimmte Artikel · 03 Unbestimmte Artikel · 04 Personalpronomen ·
      05 Possessivartikel · 06 euch oder euer? · 07 Eine Satzfamilie · 08 Große Tabellen · 09 Merkkarte · Teil 2: Übungen · Answer Key
    </div>

    {/* ============ TEIL 1 ============ */}
    <div className="page-break">
      <div style={{ fontSize: "26pt", fontFamily: "Fraunces, serif", fontWeight: 750, borderBottom: "2.4pt solid #211b12", paddingBottom: "3mm", marginBottom: "6mm" }}>
        Teil 1 · Die Regeln
      </div>

      {/* K1 */}
      <PH num="01" kicker="Grundlagen" title={<>Was ist der Akkusativ?</>} lede="Das direkte Objekt — wen oder was die Aktion trifft." />
      <p style={{ fontSize: "10pt", lineHeight: 1.6, margin: "0 0 3mm" }}>
        Fast jeder deutsche Satz hat <b>drei Rollen</b>: Wer tut etwas? (<b>Subjekt → Nominativ</b>) ·
        Was passiert? (<b>Verb</b>) · Wen oder was trifft die Aktion? (<b>Objekt → Akkusativ</b>).
        Deutsch markiert dieses Objekt — und meistens siehst du es an einem einzigen Buchstaben.
      </p>
      <PRule label="So findest du den Akkusativ">
        Frag: <b style={{ color: "#e2481f" }}>Wen?</b> (Personen) oder <b style={{ color: "#e2481f" }}>Was?</b> (Dinge &amp; Tiere) — die Antwort ist das Akkusativ-Objekt.
      </PRule>
      {introFlows.map((f, i) => <PFlow key={i} tokens={f.tokens} en={f.en} />)}
      <div style={{ display: "flex", gap: "3mm", margin: "3mm 0" }}>
        <div style={{ flex: 1, border: "0.7pt solid #d9d2c0", borderRadius: "2.5mm", padding: "3mm 4mm" }}>
          <div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#746a58" }}>Nominativ = der Täter</div>
          <p style={{ fontSize: "9pt", lineHeight: 1.55, margin: "1.5mm 0 0" }}>Das Subjekt <b>macht</b> die Aktion. Alles sieht normal aus: <Serif size={10}>Der Mann sieht.</Serif></p>
        </div>
        <div style={{ flex: 1, border: "1.3pt solid #211b12", borderRadius: "2.5mm", padding: "3mm 4mm", background: "#fdeee8" }}>
          <div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#e2481f" }}>Akkusativ = das Ziel</div>
          <p style={{ fontSize: "9pt", lineHeight: 1.55, margin: "1.5mm 0 0" }}>Das Objekt <b>bekommt</b> die Aktion ab: <Serif size={10}>Der Mann sieht den Hund.</Serif> — aber nur das Maskulinum zeigt es sichtbar.</p>
        </div>
      </div>

      {/* K2 */}
      <div style={{ marginTop: "7mm" }}>
        <PH num="02" kicker="Bestimmte Artikel" title={<>der · die · das</>} lede="Die bestimmten Artikel — und die eine Änderung, die zählt." />
        <PTable headers={["Genus", "Nominativ", "Akkusativ", "Beispiel"]} accentCol={2}
          rows={definiteRows.map((r) => [r.gender, r.nom, r.akk, r.note])} />
        <PRule>Nur das Maskulinum ändert sich: <b style={{ color: "#e2481f" }}>der → den</b>. Feminin, Neutrum und Plural bleiben immer gleich.</PRule>
        <div style={{ fontSize: "10pt", lineHeight: 2 }}>
          <div><Serif>der Mann → Ich sehe <b>den</b> Mann.</Serif> <span style={{ color: "#746a58", fontSize: "8.5pt" }}>(maskulin → -n!)</span></div>
          <div><Serif>die Frau → Ich sehe <b>die</b> Frau.</Serif> <span style={{ color: "#746a58", fontSize: "8.5pt" }}>(feminin: gleich)</span></div>
          <div><Serif>das Kind → Ich sehe <b>das</b> Kind.</Serif> <span style={{ color: "#746a58", fontSize: "8.5pt" }}>(Neutrum: gleich)</span></div>
          <div><Serif>die Kinder → Ich sehe <b>die</b> Kinder.</Serif> <span style={{ color: "#746a58", fontSize: "8.5pt" }}>(Plural: gleich)</span></div>
        </div>
        <PNote><b>Merksatz (Autsch-Methode):</b> Die Aktion trifft den Mann — er bekommt eine Beule: das <b>-n</b>! der → den. Frau, Kind und Kinder gehen unversehrt weiter.</PNote>
      </div>

      {/* K3 */}
      <div style={{ marginTop: "7mm" }}>
        <PH num="03" kicker="Unbestimmte Artikel" title={<>ein · eine · ein</>} lede="Dieselbe Regel — anders angezogen." />
        <PTable headers={["Genus", "Nominativ", "Akkusativ", "Beispiel"]} accentCol={2}
          rows={indefiniteRows.map((r) => [r.gender, r.nom, r.akk, r.note])} />
        <PRule>Wieder nur das Maskulinum: <b style={{ color: "#e2481f" }}>ein → einen</b>. Eine Regel, zwei Artikel-Systeme.</PRule>
        <PNote>Nach <b>„Das ist …"</b> steht der <b>Nominativ</b> — du beschreibst nur, was etwas ist. Ein Objekt entsteht erst bei echten Aktionen: sehen, kaufen, haben, besuchen.</PNote>
        {einPairs.map((p, i) => (
          <PPair key={i}
            left={<><div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.14em", color: "#746a58", textTransform: "uppercase" }}>Nominativ</div><div style={{ fontFamily: "Fraunces, serif", fontSize: "11pt", fontWeight: 650, marginTop: "1mm" }}>{p.nom}</div><div style={{ fontSize: "8pt", fontStyle: "italic", color: "#746a58", marginTop: "1mm" }}>{p.nomEn}</div></>}
            right={<><div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.14em", color: "#e2481f", textTransform: "uppercase" }}>Akkusativ</div><div style={{ fontFamily: "Fraunces, serif", fontSize: "11pt", fontWeight: 650, marginTop: "1mm" }}>{p.akk}</div><div style={{ fontSize: "8pt", fontStyle: "italic", color: "#746a58", marginTop: "1mm" }}>{p.akkEn}</div></>}
          />
        ))}
      </div>
    </div>

    {/* K4 */}
    <div className="page-break">
      <PH num="04" kicker="Personalpronomen" title={<>ich → mich &amp; Freunde</>} lede="Wenn ein Pronomen zum Objekt wird." />
      <PTable headers={["Nominativ", "Akkusativ", "English", "Merkhilfe"]} accentCol={1}
        rows={pronounRows.map((r) => [
          <span key={`${r.nom}-${r.enN}`}>{r.focus ? "★ " : ""}{r.nom}</span>,
          r.akk,
          r.enN + " → " + r.enA,
          r.why ?? "",
        ])} />
      <PRule>Deine Fünferbande: <b>ich-mich, du-dich</b> (reimt sich!), <b>er-ihn</b> (das n!), <b>wir-uns, ihr-euch</b>. sie · es · Sie ändern sich nie.</PRule>
      <PPair
        left={<><div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.14em", color: "#746a58", textTransform: "uppercase" }}>ihr = Subjekt (Nominativ)</div><div style={{ fontFamily: "Fraunces, serif", fontSize: "11.5pt", fontWeight: 650, marginTop: "1mm" }}><b>Ihr</b> seht mich.</div><div style={{ fontSize: "8pt", fontStyle: "italic", color: "#746a58", marginTop: "1mm" }}>You (guys) see me. — ihr macht die Aktion.</div></>}
        right={<><div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.14em", color: "#2f5bd7", textTransform: "uppercase" }}>euch = Objekt (Akkusativ)</div><div style={{ fontFamily: "Fraunces, serif", fontSize: "11.5pt", fontWeight: 650, marginTop: "1mm" }}>Ich sehe <b style={{ color: "#2f5bd7" }}>euch</b>.</div><div style={{ fontSize: "8pt", fontStyle: "italic", color: "#746a58", marginTop: "1mm" }}>I see you (guys). — Wen sehe ich? euch!</div></>}
      />
      <PNote><b>Achtung:</b> euch = Personalpronomen (die Personen selbst). <b>euer</b> = Possessivartikel („your") und steht immer vor einem Nomen: euer Hund, eure Katze. → Kapitel 6.</PNote>

      {/* K5 */}
      <div style={{ marginTop: "7mm" }}>
      <PH num="05" kicker="Possessivartikel" title={<>mein, dein, sein …</>} lede={"Sie marschieren exakt wie „ein“."} />
        <p style={{ fontSize: "9.5pt", lineHeight: 1.7, margin: "0 0 2mm" }}>
          {possessiveMeanings.map((m, i) => (
            <span key={m.word} style={{ display: "inline-block", border: "0.7pt solid #d9d2c0", borderRadius: "1.8mm", padding: "0.8mm 2.4mm", margin: "0 1.5mm 1.5mm 0" }}>
              <b style={{ fontFamily: "Fraunces, serif" }}>{m.word}</b> = {m.en} <span style={{ color: "#a89f8c" }}>({m.person})</span>{i === possessiveMeanings.length - 1 ? "" : ""}
            </span>
          ))}
        </p>
        <PTable headers={["Genus", "Nominativ", "Akkusativ", "Beispiel"]} accentCol={2}
          rows={meinRows.map((r) => [r.gender, r.nom, r.akk, r.note])} />
        <PRule>Possessivwörter folgen dem <b style={{ color: "#e2481f" }}>ein-Pattern</b>: Maskulin + Akkusativ → Stamm + <b style={{ color: "#e2481f" }}>en</b>. Alles andere bleibt wie im Nominativ.</PRule>
        <div className="avoid-break" style={{ display: "flex", flexWrap: "wrap", gap: "2mm", margin: "3mm 0" }}>
          {possessiveArrows.map((p) => (
            <span key={p.nom} style={{ border: "0.9pt solid #211b12", borderRadius: "2mm", padding: "1.5mm 3mm", fontFamily: "Fraunces, serif", fontSize: "10.5pt" }}>
              {p.nom} → <b>{p.akk}</b> <span style={{ color: "#a89f8c", fontSize: "7.5pt", fontFamily: "Inter, sans-serif", fontStyle: "italic" }}>{p.en}</span>
            </span>
          ))}
        </div>
        <PNote><b>unser</b> und <b>euer</b> machen brav mit: unser → <b>unseren</b>, euer → <b>euren</b>. Stamm bleibt, Endung dran. Fertig.</PNote>
      </div>
    </div>

    {/* K6 */}
    <div className="page-break">
      <PH num="06" kicker="Der Klassiker" title={<>euch oder euer?</>} lede="Eine Frage klärt alles: die Personen — oder etwas, das ihnen gehört?" />
      <div style={{ display: "flex", gap: "4mm" }}>
        <div className="avoid-break" style={{ flex: 1, border: "1.6pt solid #2f5bd7", background: "#eef3ff", borderRadius: "3mm", padding: "4.5mm 5mm" }}>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: "20pt", fontWeight: 800, color: "#2f5bd7" }}>euch</div>
          <div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2f5bd7" }}>Personalpronomen</div>
          <p style={{ fontSize: "9.5pt", lineHeight: 1.55, margin: "2mm 0" }}><b>euch = you (plural)</b> — es ersetzt die Personen selbst. Antwort auf „Wen?".</p>
          <div style={{ background: "#fff", borderRadius: "2mm", padding: "2.5mm 3.5mm" }}>
            <Serif size={12}>Ich sehe <b style={{ color: "#2f5bd7" }}>euch</b>.</Serif>
            <div style={{ fontSize: "8pt", fontStyle: "italic", color: "#746a58" }}>I see you (guys). — kein Nomen danach!</div>
          </div>
        </div>
        <div className="avoid-break" style={{ flex: 1, border: "1.6pt solid #e2481f", background: "#fdeee8", borderRadius: "3mm", padding: "4.5mm 5mm" }}>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: "20pt", fontWeight: 800, color: "#e2481f" }}>euer</div>
          <div style={{ fontSize: "7pt", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#e2481f" }}>Possessivartikel</div>
          <p style={{ fontSize: "9.5pt", lineHeight: 1.55, margin: "2mm 0" }}><b>euer = your (plural)</b> — etwas gehört euch. Es steht <b>immer vor einem Nomen</b> und lebt wie „ein".</p>
          <div style={{ background: "#fff", borderRadius: "2mm", padding: "2.5mm 3.5mm" }}>
            <Serif size={12}>Ich sehe <b style={{ color: "#e2481f" }}>euer</b> Auto.</Serif>
            <div style={{ fontSize: "8pt", fontStyle: "italic", color: "#746a58" }}>I see your car. — euer klebt am Nomen.</div>
          </div>
        </div>
      </div>
      <div className="avoid-break" style={{ border: "0.9pt solid #211b12", borderRadius: "2.5mm", padding: "3.5mm 4.5mm", marginTop: "4mm" }}>
        <div style={{ fontSize: "7.5pt", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#746a58", marginBottom: "2mm" }}>euer vor dem Nomen — die drei Fälle</div>
        <div style={{ fontSize: "10.5pt", lineHeight: 2 }}>
          <div><Serif>Ich sehe <b>euren</b> Hund.</Serif> <span style={{ color: "#746a58", fontSize: "8.5pt" }}>— maskulin: euer + <b style={{ color: "#e2481f" }}>en</b></span></div>
          <div><Serif>Ich sehe <b>eure</b> Katze.</Serif> <span style={{ color: "#746a58", fontSize: "8.5pt" }}>— feminin: eure, kein -n (auch Plural: eure Kinder)</span></div>
          <div><Serif>Ich sehe <b>euer</b> Auto.</Serif> <span style={{ color: "#746a58", fontSize: "8.5pt" }}>— Neutrum: euer, kein -n</span></div>
        </div>
      </div>

      {/* K7 */}
      <div style={{ marginTop: "7mm" }}>
        <PH num="07" kicker="Zusammenhänge" title={<>Eine Satzfamilie</>} lede="Ein Wort-Slot, vier Varianten — beim Maskulinum tragen alle das -n." />
        <PTable headers={["Variante", "Maskulin", "Feminin", "Neutrum"]} accentCol={1}
          rows={[
            ["bestimmt", <span>Ich sehe <b>den</b> Mann.</span>, <span>Ich sehe <b>die</b> Frau.</span>, <span>Ich sehe <b>das</b> Kind.</span>],
            ["unbestimmt", <span>Ich sehe <b>einen</b> Mann.</span>, <span>Ich sehe <b>eine</b> Frau.</span>, <span>Ich sehe <b>ein</b> Kind.</span>],
            ["Possessiv", <span>Ich sehe <b>meinen</b> Mann.</span>, <span>Ich sehe <b>meine</b> Frau.</span>, <span>Ich sehe <b>mein</b> Kind.</span>],
            ["Pronomen", <span>Ich sehe <b>ihn</b>.</span>, <span>Ich sehe <b>sie</b>.</span>, <span>Ich sehe <b>es</b>.</span>],
          ]} />
        <PRule label="Dein Lern-Shortcut">
          Akkusativ + maskulin ⇒ <b style={{ color: "#e2481f" }}>-n / -en</b>: der→den, ein→einen, mein→meinen, euer→euren, er→ihn.
          <span style={{ display: "block", fontSize: "8.5pt", fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#746a58", marginTop: "1mm" }}>
            Das ist deine Eselsbrücke für Artikel- und ein-Wörter — kein universelles Gesetz für jedes deutsche Wort. (Adjektive &amp; Co. lernst du später.)
          </span>
        </PRule>
      </div>

      {/* K8 */}
      <div style={{ marginTop: "7mm" }}>
        <PH num="08" kicker="Referenz" title={<>Die großen Tabellen</>} lede="Alles auf einen Blick." />
        <PTable headers={["Akkusativ", "Maskulin", "Feminin", "Neutrum", "Plural"]} accentCol={1}
          rows={[
            ["bestimmt", <b>den</b>, "die", "das", "die"],
            ["unbestimmt", <b>einen</b>, "eine", "ein", "—"],
            ["mein", <b>meinen</b>, "meine", "mein", "meine"],
          ]} />
        <div style={{ display: "flex", gap: "4mm" }}>
          <div className="avoid-break" style={{ flex: 1.2, border: "0.9pt solid #d9d2c0", borderRadius: "2.5mm", padding: "3.5mm 4.5mm" }}>
            <div style={{ fontSize: "7.5pt", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#2f5bd7", marginBottom: "1.5mm" }}>Personalpronomen</div>
            <div style={{ fontSize: "10pt", lineHeight: 1.9 }}>
              {pronounRows.map((r, i) => <span key={i} style={{ marginRight: "4mm", whiteSpace: "nowrap" }}>{r.nom} <span style={{ color: "#2f5bd7" }}>→</span> <b style={{ color: "#2f5bd7" }}>{r.akk}</b>{" "}</span>)}
            </div>
          </div>
          <div className="avoid-break" style={{ flex: 1, border: "0.9pt solid #d9d2c0", borderRadius: "2.5mm", padding: "3.5mm 4.5mm" }}>
            <div style={{ fontSize: "7.5pt", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#e2481f", marginBottom: "1.5mm" }}>Possessiv · maskulin</div>
            <div style={{ fontSize: "10pt", lineHeight: 1.9 }}>
              {possessiveArrows.map((r) => <span key={r.nom} style={{ marginRight: "4mm", whiteSpace: "nowrap" }}>{r.nom} <span style={{ color: "#e2481f" }}>→</span> <b>{r.akk}</b>{" "}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ============ MERKKARTE ============ */}
    <div className="page-break">
      <PH num="09" kicker="Zum Mitnehmen" title={<>Die Merkkarte</>} lede="Ausschneiden, aufhängen, nie wieder vergessen." />
      <div className="avoid-break" style={{ border: "1.4pt dashed #211b12", borderRadius: "4mm", padding: "3.5mm" }}>
        <div style={{ border: "1.8pt solid #211b12", borderRadius: "3mm", padding: "6mm 7mm", background: "#fff" }}>
          <div style={{ fontSize: "7.5pt", fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "#e2481f" }}>Akkusativ · Merkkarte</div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: "16pt", fontWeight: 750, margin: "1.5mm 0 4mm" }}>Das kleine n — alles auf einen Blick</div>
          <div style={{ display: "flex", gap: "8mm" }}>
            <div style={{ flex: 1 }}>
              <PTable headers={["Bestimmt", "Akk."]} accentCol={1} rows={[["der", <b>den</b>], ["die", "die"], ["das", "das"], ["die (Pl.)", "die"]]} />
              <PTable headers={["Unbestimmt", "Akk."]} accentCol={1} rows={[["ein", <b>einen</b>], ["eine", "eine"], ["ein", "ein"]]} />
              <PTable headers={["Pronomen", "Akk."]} accentCol={1} rows={[["ich", <b>mich</b>], ["du", <b>dich</b>], ["er", <b>ihn</b>], ["wir", <b>uns</b>], ["ihr", <b>euch</b>]]} />
            </div>
            <div style={{ flex: 1 }}>
              <PTable headers={["Possessiv", "maskulin"]} accentCol={1} rows={possessiveArrows.map((p) => [p.nom, <b>{p.akk}</b>])} />
              <div style={{ background: "#211b12", color: "#faf6ee", borderRadius: "2.5mm", padding: "4mm 5mm", marginTop: "3mm" }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: "13pt", fontWeight: 700 }}><span style={{ color: "#c3d4ff" }}>euch</span> = you (plural)</div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: "13pt", fontWeight: 700 }}><span style={{ color: "#ffd84d" }}>euer</span> = your (plural)</div>
                <div style={{ fontSize: "8pt", color: "#c9c0aa", marginTop: "1.5mm" }}>euch antwortet auf „Wen?" — euer steht vor einem Nomen.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "2.5mm", fontSize: "8.5pt", color: "#746a58" }}>
        <Scissors className="w-3 h-3 inline-block -mt-0.5" strokeWidth={2.4} /> hier ausschneiden
      </div>
    </div>

    {/* ============ TEIL 2: ÜBUNGEN ============ */}
    <div className="page-break">
      <div style={{ fontSize: "26pt", fontFamily: "Fraunces, serif", fontWeight: 750, borderBottom: "2.4pt solid #211b12", paddingBottom: "3mm", marginBottom: "4mm" }}>
        Teil 2 · Die Übungen
      </div>
      <p style={{ fontSize: "10pt", color: "#746a58", margin: "0 0 5mm" }}>
        Zehn Aufgaben, wild gemischt. Für jede Lücke gilt: <b>Was wird hier gebraucht?</b> Artikel, Pronomen oder Possessiv?
        Das Wort in Klammern hilft dir. Schreibe die richtige Form in die Lücken — die Lösungen mit Mini-Erklärungen findest du im Answer Key.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4mm" }}>
        {exercises.map((ex) => (
          <div key={ex.n} className="avoid-break" style={{ flex: "1 1 45%", minWidth: "74mm", border: "1pt solid #211b12", borderRadius: "3mm", padding: "4mm 5mm", background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "3mm" }}>
              <span style={{ display: "inline-block", textAlign: "center", width: "7mm", height: "7mm", lineHeight: "7mm", background: "#211b12", color: "#faf6ee", borderRadius: "1.8mm", fontFamily: "Fraunces, serif", fontWeight: 750, fontSize: "11pt" }}>{ex.n}</span>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: "13pt", fontWeight: 620, lineHeight: 2 }}>
                {ex.segments.map((seg, i) =>
                  seg.kind === "text" ? <span key={i}>{seg.text}</span> : <Blank key={i} />
                )}
              </div>
            </div>
            <div style={{ marginTop: "2mm", fontSize: "8.5pt", color: "#746a58", fontStyle: "italic" }}>{ex.cue}</div>
          </div>
        ))}
      </div>
      <div className="avoid-break" style={{ marginTop: "6mm", border: "1.2pt dashed #211b12", borderRadius: "2.5mm", padding: "3.5mm 4.5mm", fontSize: "9pt", color: "#746a58" }}>
        <b style={{ color: "#211b12" }}>Merkhilfe beim Üben:</b> Erst Subjekt oder Objekt? (Frag: Wen?/Was?) — Dann: welches Genus hat das Nomen?
        Und merke: <b style={{ color: "#e2481f" }}>nur beim Maskulinum wandert ein -n an den Artikel</b>.
      </div>
    </div>

    {/* ============ WORTSCHATZ ============ */}
    <div className="page-break">
      <div style={{ fontSize: "22pt", fontFamily: "Fraunces, serif", fontWeight: 750, borderBottom: "2.4pt solid #211b12", paddingBottom: "3mm", marginBottom: "4mm" }}>
        Wortschatz · Nomen mit Artikel
      </div>
      <p style={{ fontSize: "9pt", color: "#746a58", margin: "0 0 4mm" }}>
        Der Akkusativ funktioniert nur, wenn du das Genus kennst. <b style={{ color: "#e2481f" }}>Maskuline Nomen sind rot markiert</b> —
        genau sie ändern sich im Akkusativ (der → den).
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8.6pt" }}>
        <thead>
          <tr>
            {["Nominativ", "Akkusativ", "Plural", "English"].map((h) => (
              <th key={h} style={{ background: "#211b12", color: "#faf6ee", textAlign: "left", padding: "1.8mm 2.5mm", fontSize: "7pt", letterSpacing: "0.12em", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {NOUNS.map((nn) => (
            <tr key={nn.word} className="avoid-break">
              <td style={{ padding: "1.4mm 2.5mm", borderTop: "0.5pt solid #e3dccb", fontFamily: "Fraunces, serif", fontSize: "9.5pt", fontWeight: 650, color: nn.g === "m" ? "#b8370f" : "#211b12" }}>
                {nn.art} {nn.word}
              </td>
              <td style={{ padding: "1.4mm 2.5mm", borderTop: "0.5pt solid #e3dccb", borderLeft: "0.5pt solid #e3dccb", fontFamily: "Fraunces, serif", fontSize: "9.5pt", background: nn.g === "m" ? "#fdeee8" : undefined }}>
                {nn.g === "m" ? <b>den {nn.word}</b> : `${nn.g === "n" ? "das" : "die"} ${nn.word}`}
              </td>
              <td style={{ padding: "1.4mm 2.5mm", borderTop: "0.5pt solid #e3dccb", borderLeft: "0.5pt solid #e3dccb", color: "#55503f" }}>{nn.plural}</td>
              <td style={{ padding: "1.4mm 2.5mm", borderTop: "0.5pt solid #e3dccb", borderLeft: "0.5pt solid #e3dccb", color: "#746a58", fontStyle: "italic" }}>{nn.en}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="avoid-break" style={{ marginTop: "5mm", border: "0.9pt solid #211b12", borderRadius: "2.5mm", padding: "3.5mm 4.5mm" }}>
        <div style={{ fontSize: "7.5pt", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#e2481f", marginBottom: "2mm" }}>
          Verben mit Akkusativ (transitive Verben)
        </div>
        <div style={{ fontSize: "9.5pt", lineHeight: 1.9 }}>
          {(Object.keys(VERBS) as (keyof typeof VERBS & string)[]).map((v) => (
            <span key={v} style={{ marginRight: "5mm", whiteSpace: "nowrap" }}>
              <b style={{ fontFamily: "Fraunces, serif" }}>{VERBS[v].inf}</b>{" "}
              <span style={{ color: "#746a58", fontStyle: "italic", fontSize: "8pt" }}>{VERBS[v].en}</span>
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* ============ ANSWER KEY ============ */}
    <div className="page-break">
      <div style={{ fontSize: "22pt", fontFamily: "Fraunces, serif", fontWeight: 750, borderBottom: "2.4pt solid #211b12", paddingBottom: "3mm", marginBottom: "5mm" }}>
        Answer Key · Lösungen &amp; warum sie stimmen
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3mm" }}>
        {exercises.map((ex) => (
          <div key={ex.n} className="avoid-break" style={{ border: "0.8pt solid #d9d2c0", borderLeft: "2.6pt solid #3e7a4e", borderRadius: "2mm", padding: "3mm 4mm", background: "#fff" }}>
            <div style={{ display: "flex", gap: "3mm", alignItems: "baseline" }}>
              <span style={{ fontFamily: "Fraunces, serif", fontWeight: 750, color: "#3e7a4e", fontSize: "11pt" }}>{ex.n}.</span>
              <div>
                <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "12pt" }}>{ex.solution}</div>
                <div style={{ fontSize: "8.8pt", color: "#55503f", marginTop: "1mm", lineHeight: 1.5 }}>{ex.why}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "8mm", textAlign: "center", fontSize: "9pt", color: "#746a58" }}>
        — Ende · Viel Erfolg beim Weiterlernen! —<br />
        <span style={{ fontSize: "8pt" }}>Der Akkusativ · Dein A1-Arbeitsbuch</span>
      </div>
    </div>
  </div>
);
