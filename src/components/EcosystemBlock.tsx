import type { Language } from "../lib/lang";

const WORLDS = [
  ["TEMPOSYSTEM.eu", "Vision & manifeste", "Vision & manifesto", "https://temposystem.eu"],
  ["MANAtimebank.org", "Infrastructure logicielle", "Software infrastructure", "https://manatimebank.org"],
  ["MANAfrance.org", "Action territoriale", "Territorial action", "https://manafrance.org"],
  ["MANA.bzh", "Laboratoire breton", "Breton laboratory", "https://mana.bzh"],
  ["MANAfamily.org", "Cercles familiaux", "Family circles", "https://manafamily.org"],
  ["AllianceMANA.org", "Gouvernance & principes", "Governance & principles", "https://alliancemana.org"],
] as const;

export default function EcosystemBlock({ lang = "fr" }: { lang?: Language }) {
  return <section className="ecosystem" aria-labelledby="ecosystem-title">
    <div className="ecosystem__wrap">
      <p className="editorial-kicker">{lang === "fr" ? "L'écosystème MANA" : "The MANA ecosystem"}</p>
      <div className="ecosystem__heading">
        <div><h2 id="ecosystem-title">{lang === "fr" ? "Un moteur, une infrastructure, plusieurs terrains d'action." : "One engine, one infrastructure, several fields of action."}</h2><p>{lang === "fr" ? "Chaque composante garde un rôle clair. TEMPOSYSTEM orchestre l'action collective ; l'écosystème lui donne une gouvernance et des applications concrètes." : "Each component keeps a clear role. TEMPOSYSTEM orchestrates collective action; the ecosystem provides governance and concrete applications."}</p></div>
        <a className="ecosystem__home" href="https://manahome.org"><span aria-hidden="true">✦</span><span><strong>MANAHOME.org</strong><small>{lang === "fr" ? "La maison commune" : "The common home"}</small></span></a>
      </div>
      <div className="ecosystem__grid">{WORLDS.map(([name, fr, en, href], index) => <a href={href} key={name}><span className="ecosystem__pixel" aria-hidden="true" style={{ opacity: .45 + index * .08 }} /><strong>{name}</strong><small>{lang === "fr" ? fr : en}</small></a>)}</div>
    </div>
  </section>;
}
