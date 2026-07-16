/**
 * 02 — L'équation (SILENCE).
 * La clé de lecture minimale. Le +1 par seconde est un signal SYMBOLIQUE du
 * passage du temps (charte §15) — jamais un compteur mensonger : il est étiqueté.
 */

import { useEffect, useState } from "react";
import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";
import { DataTag } from "../components/ui/DataTag";

const copy = {
  l1: { fr: "Le temps seul est une durée.", en: "Time alone is a duration." },
  l2: {
    fr: "Le temps partagé devient une contribution reconnue.",
    en: "Shared time becomes a recognized contribution.",
  },
  context: {
    fr: "Une seconde de temps partagé devient une unité de contribution reconnue. Ni devise, ni cryptomonnaie : la trace minimale d'un temps donné.",
    en: "One second of shared time becomes one recognized unit of contribution. Not a currency, not a crypto-asset: the minimal trace of given time.",
  },
} as const;

export function M02Equation() {
  const { lang } = useLang();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionShell id="m02-equation" density="silence" center>
      <p className="t-section" style={{ maxWidth: 720, margin: "0 auto" }}>
        {copy.l1[lang]}
        <br />
        {copy.l2[lang]}
      </p>

      <p
        className="t-data"
        aria-label={lang === "fr" ? "1 seconde égale 1 MANA" : "1 second equals 1 MANA"}
        style={{ fontSize: "clamp(1.5rem, 4vw, 2.6rem)", margin: "56px 0 10px", color: "var(--ts-ink)" }}
      >
        <span style={{ color: "var(--ts-cyan)" }}>1 seconde</span>
        <span style={{ color: "var(--ts-ink-faint)", margin: "0 22px" }}>=</span>
        <span style={{ color: "var(--ts-magenta)" }}>1 MANA</span>
      </p>

      {/* Seconde contributive — symbolique, étiquetée */}
      <p className="t-data" style={{ color: "var(--ts-ink-faint)", fontSize: 13, display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
        <span aria-hidden="true" key={seconds} style={{ color: "var(--ts-magenta)", animation: "ts-slot-pulse 1s var(--ts-ease-pulse)" }}>
          +{seconds || 1}
        </span>
        <DataTag status="symbolique" lang={lang} />
      </p>

      <p className="t-body" style={{ margin: "40px auto 0", textAlign: "center" }}>{copy.context[lang]}</p>
    </SectionShell>
  );
}
