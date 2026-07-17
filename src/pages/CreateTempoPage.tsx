import { useMemo, useState, type FormEvent } from "react";
import { tempoOffers } from "../config/offers";
import { useLang } from "../lib/lang";
import "./createTempo.css";

type FormState = {
  organisation: string; offer: string; need: string; territory: string;
  partners: string; timeline: string; name: string; email: string; phone: string;
};

const initialOffer = () => new URLSearchParams(window.location.hash.split("?")[1] || "").get("offre") || "";

export function CreateTempoPage() {
  const { lang } = useLang();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({ organisation: "", offer: initialOffer(), need: "", territory: "", partners: "", timeline: "", name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const selected = useMemo(() => tempoOffers.find((offer) => offer.slug === form.offer), [form.offer]);
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const canContinue = step === 1 ? Boolean(form.organisation && form.offer) : Boolean(form.need && form.territory && form.partners);

  const send = (event: FormEvent) => {
    event.preventDefault();
    if (!consent || !form.name || !form.email) return;
    const subject = `Créer un TEMPOsystem ${selected?.name || ""} — ${form.organisation}`;
    const body = [
      "Bonjour,", "", "Je souhaite étudier la création d’un TEMPOsystem.", "",
      `Offre envisagée : TEMPOsystem ${selected?.name || form.offer}`,
      `Organisation : ${form.organisation}`, `Besoin prioritaire : ${form.need}`,
      `Territoire / périmètre : ${form.territory}`, `Acteurs impliqués : ${form.partners}`,
      `Horizon souhaité : ${form.timeline || "À préciser"}`, "",
      `Nom : ${form.name}`, `E-mail : ${form.email}`, `Téléphone : ${form.phone || "Non renseigné"}`, "",
      "Merci de me recontacter pour cadrer ce premier usage.",
    ].join("\n");
    window.location.href = `mailto:contact@manahome.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return <main className="create-tempo">
    <div className="create-tempo__shell">
      <header className="create-tempo__heading">
        <p className="editorial-kicker">{lang === "fr" ? "Rejoindre TEMPOsystem" : "Join TEMPOsystem"}</p>
        <h1>{lang === "fr" ? <>Partons d'un besoin <em>réel.</em></> : <>Start with one <em>real need.</em></>}</h1>
        <p>{lang === "fr" ? "Trois étapes pour préparer un premier échange utile. Comptez moins de trois minutes." : "Three steps to prepare a useful first conversation. It takes less than three minutes."}</p>
      </header>
      <ol className="create-progress" aria-label={lang === "fr" ? "Progression" : "Progress"}>
        {[1,2,3].map((number) => <li className={step >= number ? "is-active" : ""} key={number}><span>{String(number).padStart(2,"0")}</span>{lang === "fr" ? ["Votre structure","Premier usage","Vos coordonnées"][number-1] : ["Your organisation","First use","Your details"][number-1]}</li>)}
      </ol>

      <form onSubmit={send} className="create-form">
        {step === 1 && <fieldset><legend>{lang === "fr" ? "Quel TEMPOsystem correspond à votre structure ?" : "Which TEMPOsystem fits your organisation?"}</legend>
          <label>{lang === "fr" ? "Type d'organisation" : "Organisation type"}<select value={form.organisation} onChange={(e) => update("organisation", e.target.value)} required><option value="">{lang === "fr" ? "Sélectionner" : "Select"}</option><option>{lang === "fr" ? "Collectivité, CCAS ou CIAS" : "Local authority or social service"}</option><option>{lang === "fr" ? "Association ou fédération" : "Non-profit or federation"}</option><option>{lang === "fr" ? "Établissement social ou médico-social" : "Social or care institution"}</option><option>{lang === "fr" ? "Opérateur ou alliance territoriale" : "Territorial operator or alliance"}</option><option>{lang === "fr" ? "Fondation ou financeur" : "Foundation or funder"}</option><option>{lang === "fr" ? "Entreprise" : "Company"}</option></select></label>
          <div className="create-offers">{tempoOffers.map((offer) => <label className={form.offer === offer.slug ? "is-selected" : ""} key={offer.slug}><input type="radio" name="offer" value={offer.slug} checked={form.offer === offer.slug} onChange={(e) => update("offer", e.target.value)} /><span>TEMPOsystem</span><strong>{offer.name}</strong><small>{offer.audience[lang]}</small></label>)}</div>
        </fieldset>}
        {step === 2 && <fieldset><legend>{lang === "fr" ? "Quel premier usage devons-nous cadrer ?" : "Which first use should we scope?"}</legend>
          <label>{lang === "fr" ? "Besoin prioritaire" : "Priority need"}<textarea value={form.need} onChange={(e) => update("need", e.target.value)} required placeholder={lang === "fr" ? "Ex. coordonner un CCAS et cinq associations autour de l'isolement…" : "E.g. coordinate a social service and five non-profits…"} /></label>
          <div className="create-form__two"><label>{lang === "fr" ? "Territoire ou périmètre" : "Territory or scope"}<input value={form.territory} onChange={(e) => update("territory", e.target.value)} required placeholder={lang === "fr" ? "Commune, département, réseau…" : "City, region, network…"} /></label><label>{lang === "fr" ? "Acteurs impliqués" : "Stakeholders involved"}<input value={form.partners} onChange={(e) => update("partners", e.target.value)} required placeholder={lang === "fr" ? "Équipes, associations, habitants…" : "Teams, non-profits, residents…"} /></label></div>
          <label>{lang === "fr" ? "Horizon souhaité" : "Desired timeline"}<select value={form.timeline} onChange={(e) => update("timeline", e.target.value)}><option value="">{lang === "fr" ? "À préciser" : "To be discussed"}</option><option>{lang === "fr" ? "Dans les 3 mois" : "Within 3 months"}</option><option>{lang === "fr" ? "Dans les 6 mois" : "Within 6 months"}</option><option>{lang === "fr" ? "Cette année" : "This year"}</option><option>{lang === "fr" ? "Exploration" : "Exploration"}</option></select></label>
        </fieldset>}
        {step === 3 && <fieldset><legend>{lang === "fr" ? "À qui répondre ?" : "Who should we reply to?"}</legend>
          <div className="create-summary"><span>TEMPOsystem</span><strong>{selected?.name || "—"}</strong><p>{form.organisation}<br />{form.territory}</p></div>
          <div className="create-form__two"><label>{lang === "fr" ? "Nom et fonction" : "Name and role"}<input value={form.name} onChange={(e) => update("name", e.target.value)} required autoComplete="name" /></label><label>E-mail<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required autoComplete="email" /></label></div>
          <label>{lang === "fr" ? "Téléphone (facultatif)" : "Phone (optional)"}<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" /></label>
          <label className="create-consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required /><span>{lang === "fr" ? "J'accepte que ces informations soient utilisées uniquement pour répondre à ma demande." : "I agree that this information may be used solely to answer my request."}</span></label>
          <p className="create-privacy">{lang === "fr" ? "Aucune donnée n'est enregistrée sur ce site. Le bouton ouvre votre messagerie avec une demande préremplie que vous pouvez relire avant l'envoi." : "No data is stored on this site. The button opens your email app with a pre-filled request you can review before sending."}</p>
        </fieldset>}
        <div className="create-form__actions">{step > 1 && <button type="button" className="civic-button" onClick={() => setStep(step - 1)}>{lang === "fr" ? "Retour" : "Back"}</button>}{step < 3 ? <button type="button" className="civic-button civic-button--primary" disabled={!canContinue} onClick={() => canContinue && setStep(step + 1)}>{lang === "fr" ? "Continuer" : "Continue"} →</button> : <button type="submit" className="civic-button civic-button--primary" disabled={!consent || !form.name || !form.email}>{lang === "fr" ? "Préparer ma demande" : "Prepare my request"} →</button>}</div>
      </form>
    </div>
  </main>;
}
