import { useState, type FormEvent } from "react";
import { tempoOffers } from "../config/offers";
import { useLang } from "../lib/lang";
import "./createTempo.css";

const formulas = ["Découverte", "Éclosion", "Coopération", "Territoire", "Souverain"] as const;

// Clé PUBLIQUE Web3Forms de l'univers Mana (identifiant de formulaire, pas un secret) :
// toutes les soumissions arrivent dans contact@manahome.org, sans ouvrir le client mail.
// Même mécanisme que ContactSection (manatimebank-org). Aucune clé Resend côté frontend.
const WEB3FORMS_KEY = "6b87a2f3-2183-40e6-befe-23fd66944144";

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

type QuoteValues = {
  structure: string;
  type: string;
  territory: string;
  capacity: string;
  need: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  consent: boolean;
  botcheck: string;
};

type Step = "form" | "review";

export function QuotePage() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [selection, setSelection] = useState(initialSelection);
  const [step, setStep] = useState<Step>("form");
  const [values, setValues] = useState<QuoteValues | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Étape 1 → 2 : on capture le formulaire, on affiche le récapitulatif.
  const prepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const str = (k: string) => String(data.get(k) ?? "").trim();
    setValues({
      structure: str("structure"),
      type: str("type"),
      territory: str("territory"),
      capacity: str("capacity"),
      need: str("need"),
      timeline: str("timeline"),
      name: str("name"),
      email: str("email"),
      phone: str("phone"),
      details: str("details"),
      consent: data.get("consent") != null,
      botcheck: str("botcheck"),
    });
    setError(null);
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToForm = () => {
    setError(null);
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lignes du récapitulatif (mêmes libellés que l'e-mail envoyé).
  const dash = fr ? "Non renseigné" : "Not provided";
  const rows: Array<{ label: string; value: string }> = values
    ? [
        { label: fr ? "Formule ou configuration" : "Plan or configuration", value: selection },
        { label: fr ? "Structure" : "Organisation", value: values.structure },
        { label: fr ? "Type de structure" : "Organisation type", value: values.type },
        { label: fr ? "Territoire ou périmètre" : "Territory or scope", value: values.territory },
        { label: fr ? "Utilisateurs actifs estimés" : "Estimated active users", value: values.capacity || dash },
        { label: fr ? "Premier besoin" : "First need", value: values.need },
        { label: fr ? "Échéance" : "Timeline", value: values.timeline || dash },
        { label: fr ? "Nom et fonction" : "Name and role", value: values.name },
        { label: "E-mail", value: values.email },
        { label: fr ? "Téléphone" : "Phone", value: values.phone || dash },
        { label: fr ? "Précisions" : "Details", value: values.details || (fr ? "Aucune" : "None") },
      ]
    : [];

  // Étape 2 → envoi réel via Web3Forms (contact@manahome.org).
  const submit = async () => {
    if (!values || sending) return; // garde anti double-envoi
    // Honeypot : un bot aurait rempli le champ invisible → succès neutre, sans envoi.
    if (values.botcheck) {
      setSent(true);
      return;
    }
    setSending(true);
    setError(null);
    try {
      const payload: Record<string, string> = {
        access_key: WEB3FORMS_KEY,
        subject: `Demande de devis TEMPOsystem — ${selection}`,
        from_name: values.name || "Demande de devis TEMPOsystem",
        replyto: values.email, // réponses adressées directement au demandeur
        botcheck: "",
      };
      for (const { label, value } of rows) payload[label] = value;

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result?.success) {
        setSent(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(
          fr
            ? "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez."
            : "Sending failed. Please check your connection and try again.",
        );
      }
    } catch {
      setError(
        fr
          ? "Impossible d'envoyer la demande pour le moment. Réessayez dans un instant."
          : "Could not send the request right now. Please try again shortly.",
      );
    } finally {
      setSending(false);
    }
  };

  // --- Écran de confirmation (après un envoi réussi) -------------------------
  if (sent) {
    return <main className="create-tempo">
      <div className="create-tempo__shell">
        <header className="create-tempo__heading">
          <p className="editorial-kicker">{fr ? "Demande transmise" : "Request sent"}</p>
          <h1>{fr ? <>Merci. <em>Votre demande est bien partie.</em></> : <>Thank you. <em>Your request is on its way.</em></>}</h1>
          <p>{fr
            ? "Merci pour votre demande. Elle a bien été transmise à l'équipe MANAhome. Nous allons relire votre besoin et vous recontacter afin de valider le périmètre avant de préparer le devis."
            : "Thank you for your request. It has been sent to the MANAhome team. We will review your need and get back to you to confirm the scope before preparing the quote."}</p>
        </header>
        <div className="create-form__actions">
          <a className="civic-button civic-button--primary" href="#/tarifs">{fr ? "Retour aux tarifs" : "Back to pricing"}</a>
        </div>
      </div>
    </main>;
  }

  // --- Étape 2 : récapitulatif à valider -------------------------------------
  if (step === "review" && values) {
    return <main className="create-tempo">
      <div className="create-tempo__shell">
        <header className="create-tempo__heading">
          <p className="editorial-kicker">{fr ? "Récapitulatif" : "Summary"}</p>
          <h1>{fr ? <>Relisez votre demande. <em>Puis envoyez-la.</em></> : <>Review your request. <em>Then send it.</em></>}</h1>
          <p>{fr
            ? "Vérifiez les informations ci-dessous. Vous pouvez encore les modifier avant de transmettre votre demande à MANAhome."
            : "Check the details below. You can still edit them before sending your request to MANAhome."}</p>
        </header>

        <dl className="quote-recap">
          {rows.map((row) => <div key={row.label} className="quote-recap__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>)}
        </dl>

        {error && <p className="quote-error" role="alert">{error}</p>}

        <div className="create-form__actions">
          <button type="button" className="civic-button" onClick={backToForm} disabled={sending}>
            {fr ? "Modifier ma demande" : "Edit my request"}
          </button>
          <button type="button" className="civic-button civic-button--primary" onClick={submit} disabled={sending} aria-busy={sending}>
            {sending
              ? (fr ? "Envoi en cours…" : "Sending…")
              : (fr ? "Envoyer ma demande" : "Send my request") + " →"}
          </button>
        </div>
      </div>
    </main>;
  }

  // --- Étape 1 : formulaire ---------------------------------------------------
  return <main className="create-tempo">
    <div className="create-tempo__shell">
      <header className="create-tempo__heading">
        <p className="editorial-kicker">{fr ? "Demande de devis" : "Quote request"}</p>
        <h1>{fr ? <>Un périmètre clair. <em>Une proposition à valider.</em></> : <>A clear scope. <em>A proposal to approve.</em></>}</h1>
        <p>{fr ? "Aucun paiement n'est demandé. Remplissez votre demande, relisez le récapitulatif, puis envoyez-la directement à l'équipe MANAhome." : "No payment is requested. Fill in your request, review the summary, then send it straight to the MANAhome team."}</p>
      </header>

      <form onSubmit={prepare} className="create-form">
        <fieldset>
          <legend>{fr ? "Votre projet TEMPOsystem" : "Your TEMPOsystem project"}</legend>
          <label>{fr ? "Formule ou configuration souhaitée" : "Preferred plan or configuration"}
            <select value={selection} onChange={(event) => setSelection(event.target.value)} required>
              <option value="">{fr ? "Sélectionner" : "Select"}</option>
              <optgroup label={fr ? "Formules" : "Plans"}>
                {formulas.map((formula) => <option key={formula} value={`Formule ${formula}`}>{formula}</option>)}
              </optgroup>
              <optgroup label={fr ? "Configurations" : "Configurations"}>
                {tempoOffers.map((offer) => <option key={offer.slug} value={`Configuration ${offer.name}`}>TEMPOsystem {offer.name}</option>)}
              </optgroup>
            </select>
          </label>
          <div className="create-form__two">
            <label>{fr ? "Structure" : "Organisation"}<input name="structure" defaultValue={values?.structure} required /></label>
            <label>{fr ? "Type de structure" : "Organisation type"}<select name="type" defaultValue={values?.type ?? ""} required><option value="">{fr ? "Sélectionner" : "Select"}</option><option>{fr ? "Collectivité ou institution" : "Local authority or institution"}</option><option>{fr ? "Association ou fédération" : "Non-profit or federation"}</option><option>{fr ? "Établissement social ou médico-social" : "Social or care institution"}</option><option>{fr ? "Fondation ou financeur" : "Foundation or funder"}</option><option>{fr ? "Entreprise" : "Company"}</option></select></label>
          </div>
          <div className="create-form__two">
            <label>{fr ? "Territoire ou périmètre" : "Territory or scope"}<input name="territory" defaultValue={values?.territory} required placeholder={fr ? "Commune, réseau, région…" : "City, network, region…"} /></label>
            <label>{fr ? "Utilisateurs actifs estimés" : "Estimated active users"}<input name="capacity" defaultValue={values?.capacity} placeholder={fr ? "Ex. 80" : "E.g. 80"} /></label>
          </div>
          <label>{fr ? "Premier besoin à cadrer" : "First need to scope"}<textarea name="need" defaultValue={values?.need} required placeholder={fr ? "Ex. coordonner plusieurs associations et un CCAS…" : "E.g. coordinate several non-profits and a social service…"} /></label>
          <label>{fr ? "Échéance souhaitée" : "Desired timeline"}<select name="timeline" defaultValue={values?.timeline ?? (fr ? "À préciser" : "To be discussed")}><option>{fr ? "À préciser" : "To be discussed"}</option><option>{fr ? "Dans les 3 mois" : "Within 3 months"}</option><option>{fr ? "Dans les 6 mois" : "Within 6 months"}</option><option>{fr ? "Cette année" : "This year"}</option><option>{fr ? "Exploration" : "Exploration"}</option></select></label>
        </fieldset>

        <fieldset>
          <legend>{fr ? "À qui transmettre la proposition ?" : "Who should receive the proposal?"}</legend>
          <div className="create-form__two">
            <label>{fr ? "Nom et fonction" : "Name and role"}<input name="name" defaultValue={values?.name} autoComplete="name" required /></label>
            <label>E-mail<input name="email" type="email" defaultValue={values?.email} autoComplete="email" required /></label>
          </div>
          <label>{fr ? "Téléphone (facultatif)" : "Phone (optional)"}<input name="phone" type="tel" defaultValue={values?.phone} autoComplete="tel" /></label>
          <label>{fr ? "Précisions (facultatif)" : "Details (optional)"}<textarea name="details" defaultValue={values?.details} /></label>
          {/* Honeypot anti-bot : invisible pour l'humain, rempli par les robots. */}
          <input type="text" name="botcheck" defaultValue={values?.botcheck} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
          <label className="create-consent"><input type="checkbox" name="consent" defaultChecked={values?.consent} required /><span>{fr ? "J'accepte que ces informations soient utilisées uniquement pour répondre à ma demande de devis." : "I agree that this information may be used solely to answer my quote request."}</span></label>
          <p className="create-privacy">{fr ? "Cette demande ne constitue ni une commande ni un engagement. Le tarif définitif sera confirmé après validation du périmètre. Aucun paiement Stripe n'est effectué." : "This request is neither an order nor a commitment. Final pricing is confirmed after scope approval. No Stripe payment is made."}</p>
        </fieldset>

        <div className="create-form__actions">
          <a className="civic-button" href="#/tarifs">{fr ? "Retour aux tarifs" : "Back to pricing"}</a>
          <button type="submit" className="civic-button civic-button--primary">{fr ? "Préparer ma demande de devis" : "Prepare my quote request"} →</button>
        </div>
      </form>
    </div>
  </main>;
}
