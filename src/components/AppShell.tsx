import { useEffect, useState, type ReactNode } from "react";
import { publicNavigation } from "../config/publicSite";
import { useLang, type Language } from "../lib/lang";
import { FutureResources } from "../pages/FuturePage";
import EcosystemBlock from "./EcosystemBlock";
import { SkyBackground } from "./SkyBackground";
import "./skyBackground.css";

interface AppShellProps {
  activeRoute: string;
  children: ReactNode;
}

/** Machine à écrire — tape le texte, marque une pause, l'efface, recommence (boucle).
 *  Respecte prefers-reduced-motion (affiche le texte complet, sans animation). */
function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    let i = 0;
    let dir = 1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setShown(text.slice(0, i));
      if (dir === 1) {
        if (i < text.length) { i += 1; timer = setTimeout(tick, 55); }
        else { dir = -1; timer = setTimeout(tick, 2200); } // pause, texte complet
      } else {
        if (i > 0) { i -= 1; timer = setTimeout(tick, 26); }
        else { dir = 1; timer = setTimeout(tick, 700); }   // pause, avant de retaper
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, [text]);
  return (
    <span aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      <span className="island-caret" aria-hidden="true" />
    </span>
  );
}

/** Wordmark « TEMPOsystem » qui se tape UNE FOIS au chargement (machine à écrire).
 *  TEMPO en gras, system plus léger ; caret doré qui s'efface une fois fini.
 *  Un logo ne boucle pas : il se tape puis reste. Respecte prefers-reduced-motion. */
function BrandTypewriter() {
  const full = "TEMPOsystem";
  const split = 5; // « TEMPO » | « system »
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(full.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < full.length) timer = setTimeout(tick, 90);
    };
    timer = setTimeout(tick, 280); // petit délai avant de commencer
    return () => clearTimeout(timer);
  }, []);
  const shown = full.slice(0, n);
  const done = n >= full.length;
  return (
    <span aria-label={full}>
      <span aria-hidden="true">{shown.slice(0, split)}</span>
      <span className="os-brand-sys" aria-hidden="true">{shown.slice(split)}</span>
      <span className={`os-brand-caret${done ? " is-done" : ""}`} aria-hidden="true" />
    </span>
  );
}

/** Toggle langue FR / EN — réutilisé dans le header desktop et le menu mobile. */
function LangToggle({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) {
  return (
    <div className="os-lang-toggle">
      {(["fr", "en"] as Language[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={l === lang}
          className={l === lang ? "is-active" : ""}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function AppShell({ activeRoute, children }: AppShellProps) {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  // Menu mobile : fermeture à Échap + verrou du défilement du corps.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <div className="os-shell os-shell--day min-h-screen">
      {/* Le décor fondateur (charte §3) : ciel pixel fixe, soleil, trois nuages.
          Le contenu défile, le ciel reste. */}
      <SkyBackground />

      {/* Header */}
      <header className="os-header">
        <a href="#/" className="os-brand" aria-label="TEMPOsystem" onClick={() => setMenuOpen(false)}>
          <BrandTypewriter />
        </a>

        {/* Navigation en ligne — grand écran (≥ lg) */}
        <div className="os-header-tools hidden lg:flex items-center">
          <nav className="os-nav">
            {publicNavigation.map((item) => (
              <a
                key={item.route}
                href={item.href}
                className={`os-nav-link${activeRoute === item.route ? " os-nav-link-active" : ""}`}
              >
                {item.label[lang]}
              </a>
            ))}
          </nav>
          <LangToggle lang={lang} setLang={setLang} />
          <a className="os-create-link" href="#/creer">
            {lang === "fr" ? "Rejoindre TEMPOsystem" : "Join TEMPOsystem"}
          </a>
        </div>

        {/* Bouton hamburger — mobile / PWA / tablette (< lg) */}
        <button
          type="button"
          className="os-burger lg:hidden"
          aria-label={menuOpen ? (lang === "fr" ? "Fermer le menu" : "Close menu") : (lang === "fr" ? "Ouvrir le menu" : "Open menu")}
          aria-expanded={menuOpen}
          aria-controls="os-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`os-burger-box${menuOpen ? " is-open" : ""}`}>
            <span className="os-burger-bar" />
            <span className="os-burger-bar" />
            <span className="os-burger-bar" />
          </span>
        </button>
      </header>

      {/* Overlay menu mobile / PWA */}
      {menuOpen && (
        <div
          id="os-mobile-menu"
          className="os-menu-overlay lg:hidden"
          role="dialog"
          aria-modal="true"
          onClick={() => setMenuOpen(false)}
        >
          <nav className="os-menu-panel" onClick={(e) => e.stopPropagation()}>
            {publicNavigation.map((item) => (
              <a
                key={item.route}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activeRoute === item.route ? "page" : undefined}
                className={`os-menu-link${activeRoute === item.route ? " os-menu-link-active" : ""}`}
              >
                {item.label[lang]}
              </a>
            ))}
            <div className="os-menu-sep" />
            <div className="flex items-center justify-between gap-3">
              <LangToggle lang={lang} setLang={setLang} />
            </div>
            <a className="os-create-link os-create-link--mobile" href="#/creer" onClick={() => setMenuOpen(false)}>
              {lang === "fr" ? "Rejoindre TEMPOsystem" : "Join TEMPOsystem"}
            </a>
          </nav>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bloc écosystème — MANAHOME + les 6 mondes */}
      <EcosystemBlock lang={lang} />

      {/* Ressources — sous l'écosystème, uniquement sur la page 2042 */}
      {activeRoute === "future" && <FutureResources />}

      {/* L'île quitte le hero et devient une conclusion visuelle. */}
      <section className="island-footer" aria-label={lang === "fr" ? "L'infrastructure d'orchestration de l'action collective" : "The orchestration infrastructure for collective action"}>
        <div className="island-footer__frames" aria-hidden="true">
          <img className="island-footer__frame island-footer__frame--1" src="/islands/island-01-coordination-1400.jpg" alt="" loading="lazy" />
          <img className="island-footer__frame island-footer__frame--2" src="/islands/island-02-decision-1400.jpg" alt="" loading="lazy" />
          <img className="island-footer__frame island-footer__frame--3" src="/islands/island-03-memoire-1400.jpg" alt="" loading="lazy" />
        </div>
        <div className="island-footer__veil" />
        <div className="island-footer__copy">
          <span className="island-footer__eyebrow">TEMPOsystem · {lang === "fr" ? "LE TEMPS VIVANT" : "LIVING TIME"}</span>
          <strong className="island-footer__type">
            <Typewriter text={lang === "fr" ? "L'infrastructure d'orchestration de l'action collective." : "The orchestration infrastructure for collective action."} />
          </strong>
        </div>
        <p className="island-footer__legal">
          © 2026 TEMPO<span>system</span> — {lang === "fr" ? "tous droits réservés" : "all rights reserved"}
        </p>
      </section>
    </div>
  );
}
