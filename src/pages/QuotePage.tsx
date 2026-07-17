import { useState, type FormEvent } from "react";
import { tempoOffers } from "../config/offers";
import { useLang } from "../lib/lang";
import "./createTempo.css";

const formulas = ["Découverte", "Éclosion", "Coopération", "Territoire", "Alliance"] as const;

const initialSelection = () => {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const formula = params.get("formule");
  const offer = params.get("offre");
  if (formula) return `Formule ${formula.charAt(0).toUpperCase() + formula.slice(1)}`;
  if (offer) {
    const match = tempoOffers.find((item) => item.slug === offer);
    if (match) return `Configuration ${match.name}`;
  }
  return "";
};

export function QuotePage() {
  const { lang } = useLang();
  const [selection, setSelection] = useState(initialSelection);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "Bonjour,", "",
      "Je souhaite recevoir un devis TEMPOsystem à valider.", "",
      `Formule ou configuration : ${selection}`,
      `Structure : ${data.get("structure") || ""}`,
      `Type de structure : ${data.get("type") || ""}`,
      `Territoire / périmètre : ${data.get("territory") || ""}`,
      `Utilisateurs actifs estimés : ${data.get("capacity") || "À préciser"}`,
      `Premier besoin : ${data.get("need") || ""}`,
      `Échéance envisagée : ${data.get("timeline") || "À préciser"}`, "",
      `Nom et fonction : ${data.get("name") || ""}`,
      `E-mail : ${data.get("email") || ""}`,
      `Téléphone : ${data.get("phone") || "Non renseigné"}`, "",
      `Précisions : ${data.get("details") || "Aucune"}`, "",
      "Cette demande ne vaut ni commande ni engagement. Merci de me transmettre une proposition à valider.",
    ];
    const subject = `Demande de devis TEMPOsystem — ${selection}`;
    window.location.href = `mailto:contact@manahome.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return <main className="create-tempo">
    <div className="create-tempo__shell">
      <header className="create-tempo__heading">
        <p className="editorial-kicker">{lang === "fr" ? "Demande de devis" : "Quote request"}</p>
        <h1>{lang === "fr" ? <>Un périmètre clair. <em>Une proposition à valider.</em></> : <>A clear scope. <em>A proposal to approve.</em></>}</h1>
        <p>{lang === "fr" ? "Aucun paiement n'est demandé. Préparez votre demande, relisez-la dans votre messagerie, puis envoyez-la à MANAhome." : "No payment is requested. Prepare your request, review it in your email app, then send it to MANAhome."}</p>
      </header>

      <form onSubmit={send} className="create-form">
        <fieldset>
          <legend>{lang === "fr" ? "Votre projet TEMPOsystem" : "Your TEMPOsystem project"}</legend>
          <label>{lang === "fr" ? "Formule ou configuration souhaitée" : "Preferred plan or configuration"}
            <select value={selection} onChange={(event) => setSelection(event.target.value)} required>
              <option value="">{lang === "fr" ? "Sélectionner" : "Select"}</option>
              <optgroup label={lang === "fr" ? "Formules" : "Plans"}>
                {formulas.map((formula) => <option key={formula} value={`Formule ${formula}`}>{formula}</option>)}
              </optgroup>
              <optgroup label={lang === "fr" ? "Configurations" : "Configurations"}>
                {tempoOffers.map((offer) => <option key={offer.slug} value={`Configuration ${offer.name}`}>TEMPOsystem {offer.name}</option>)}
              </optgroup>
            </select>
          </label>
          <div className="create-form__two">
            <label>{lang === "fr" ? "Structure" : "Organisation"}<input name="structure" required /></label>
            <label>{lang === "fr" ? "Type de structure" : "Organisation type"}<select name="type" required><option value="">{lang === "fr" ? "Sélectionner" : "Select"}</option><option>{lang === "fr" ? "Collectivité ou institution" : "Local authority or institution"}</option><option>{lang === "fr" ? "Association ou fédération" : "Non-profit or federation"}</option><option>{lang === "fr" ? "Établissement social ou médico-social" : "Social or care institution"}</option><option>{lang === "fr" ? "Fondation ou financeur" : "Foundation or funder"}</option><option>{lang === "fr" ? "Entreprise" : "Company"}</option></select></label>
          </div>
          <div className="create-form__two">
            <label>{lang === "fr" ? "Territoire ou périmètre" : "Territory or scope"}<input name="territory" required placeholder={lang === "fr" ? "Commune, réseau, région…" : "City, network, region…"} /></label>
            <label>{lang === "fr" ? "Utilisateurs actifs estimés" : "Estimated active users"}<input name="capacity" placeholder={lang === "fr" ? "Ex. 80" : "E.g. 80"} /></label>
          </div>
          <label>{lang === "fr" ? "Premier besoin à cadrer" : "First need to scope"}<textarea name="need" required placeholder={lang === "fr" ? "Ex. coordonner plusieurs associations et un CCAS…" : "E.g. coordinate several non-profits and a social service…"} /></label>
          <label>{lang === "fr" ? "Échéance souhaitée" : "Desired timeline"}<select name="timeline"><option>{lang === "fr" ? "À préciser" : "To be discussed"}</option><option>{lang === "fr" ? "Dans les 3 mois" : "Within 3 months"}</option><option>{lang === "fr" ? "Dans les 6 mois" : "Within 6 months"}</option><option>{lang === "fr" ? "Cette année" : "This year"}</option><option>{lang === "fr" ? "Exploration" : "Exploration"}</option></select></label>
        </fieldset>

        <fieldset>
          <legend>{lang === "fr" ? "À qui transmettre la proposition ?" : "Who should receive the proposal?"}</legend>
          <div className="create-form__two">
            <label>{lang === "fr" ? "Nom et fonction" : "Name and role"}<input name="name" autoComplete="name" required /></label>
            <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <label>{lang === "fr" ? "Téléphone (facultatif)" : "Phone (optional)"}<input name="phone" type="tel" autoComplete="tel" /></label>
          <label>{lang === "fr" ? "Précisions (facultatif)" : "Details (optional)"}<textarea name="details" /></label>
          <label className="create-consent"><input type="checkbox" required /><span>{lang === "fr" ? "J'accepte que ces informations soient utilisées uniquement pour répondre à ma demande de devis." : "I agree that this information may be used solely to answer my quote request."}</span></label>
          <p className="create-privacy">{lang === "fr" ? "Cette demande ne constitue ni une commande ni un engagement. Le tarif définitif sera confirmé après validation du périmètre. Aucun paiement Stripe n'est effectué." : "This request is neither an order nor a commitment. Final pricing is confirmed after scope approval. No Stripe payment is made."}</p>
        </fieldset>

        <div className="create-form__actions">
          <a className="civic-button" href="#/tarifs">{lang === "fr" ? "Retour aux tarifs" : "Back to pricing"}</a>
          <button type="submit" className="civic-button civic-button--primary">{lang === "fr" ? "Préparer ma demande de devis" : "Prepare my quote request"} →</button>
        </div>
      </form>
    </div>
  </main>;
}
