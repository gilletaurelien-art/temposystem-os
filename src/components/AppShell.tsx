import { useEffect, useState, type ReactNode } from "react";
import { publicNavigation } from "../config/publicSite";
import { useLang, type Language } from "../lib/lang";
import { ManaConnect } from "../mana/ManaConnect";
import EcosystemBlock from "./EcosystemBlock";

interface AppShellProps {
  activeRoute: string;
  children: ReactNode;
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
      {/* Le wallpaper MANA est retiré : TEMPOSYSTEM a sa propre identité
          (Cognitive Pixel Music). Son fond propre (PixelField) viendra avec les
          illustrations ; l'ambiance étoilée discrète reste en attendant. */}

      {/* Ambient starfield */}
      {/* Header */}
      <header className="os-header">
        <a href="#/" className="os-brand flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src="/assets/temposystem-butterfly-transparent.png"
            alt="TEMPOSYSTEM"
            className="os-brand-mark"
          />
          TEMPOSYSTEM
        </a>

        {/* Navigation en ligne — grand écran (≥ lg) */}
        <div className="hidden lg:flex items-center gap-3">
          <nav className="flex gap-1">
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
          <ManaConnect lang={lang} />
          <a className="os-create-link" href="https://manatimebank.org/creer">
            {lang === "fr" ? "Créer mon TEMPOSYSTEM" : "Create my TEMPOSYSTEM"}
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
              <ManaConnect lang={lang} />
            </div>
            <a className="os-create-link os-create-link--mobile" href="https://manatimebank.org/creer" onClick={() => setMenuOpen(false)}>
              {lang === "fr" ? "Créer mon TEMPOSYSTEM" : "Create my TEMPOSYSTEM"}
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

      {/* Footer */}
      <footer className="os-footer relative z-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="os-footer-brand">
              TEMPOSYSTEM
            </p>
            <p className="os-footer-copy">
              {lang === "fr"
                ? "Chaque décision importante laisse une trace. Chaque évolution s'appuie sur la mémoire du système et rayonne vers l'ensemble de la coopération."
                : "Every important decision leaves a trace. Every evolution builds on the system's memory and radiates across the whole cooperation."}
            </p>
            <p className="os-footer-meta">
              {lang === "fr"
                ? "Launch 000 · Premier déploiement public · 2026"
                : "Launch 000 · First public deployment · 2026"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {publicNavigation.slice(1).map((item) => (
              <a
                key={item.route}
                href={item.href}
                className="os-footer-link"
              >
                {item.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
