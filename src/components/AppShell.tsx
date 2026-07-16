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
    <div className="flex items-center overflow-hidden rounded-lg border border-white/15">
      {(["fr", "en"] as Language[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={l === lang}
          className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest transition-colors ${
            l === lang ? "bg-white/15 text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function AppShell({ activeRoute, children }: AppShellProps) {
  const { lang, setLang } = useLang();
  const [butterflyOp, setButterflyOp] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Fade to 0.06 as the first section scrolls into view
      const first = document.querySelector("main > section:nth-child(2)");
      if (!first) return;
      const t = Math.max(0, Math.min(1, (first as HTMLElement).getBoundingClientRect().top / window.innerHeight));
      setButterflyOp(0.06 + t * 0.94);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <div
      className="relative min-h-screen"
      style={{
        color: "var(--ts-ink)",
        background:
          "radial-gradient(circle at 50% 12%, color-mix(in srgb, var(--ts-violet) 7%, transparent), transparent 32%)," +
          "linear-gradient(180deg, var(--ts-deep-space) 0%, var(--ts-midnight) 50%, var(--ts-deep-space) 100%)",
      }}
    >
      {/* Le wallpaper MANA est retiré : TEMPOSYSTEM a sa propre identité
          (Cognitive Pixel Music). Son fond propre (PixelField) viendra avec les
          illustrations ; l'ambiance étoilée discrète reste en attendant. */}

      {/* Ambient starfield */}
      <div className="os-ambient">
        <div className="os-nebula-one" />
        <div className="os-nebula-two" />
        <div className="os-stars" />
      </div>

      {/* Butterfly fixe bioluminescent — masqué sur l'accueil où le module LULLABY
          (papillon-comète) prend le relais ; gardé en ambiance sur les autres pages. */}
      {activeRoute !== "home" && (
        <img
          src="/assets/temposystem-butterfly-transparent.png"
          className="os-butterfly"
          style={{ opacity: butterflyOp }}
          aria-hidden="true"
          alt=""
        />
      )}

      {/* Header */}
      <header className="os-header">
        <a href="#/" className="os-brand flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src="/assets/temposystem-butterfly-transparent.png"
            alt="TEMPOSYSTEM"
            style={{ width: 28, height: 28, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(129,140,248,0.8))" }}
          />
          TEMPOSYSTEM OS
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
      <footer className="relative z-10 border-t border-white/[0.07] bg-black/20 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="font-['Philosopher',serif] text-base font-bold tracking-wide text-white/80">
              TEMPOSYSTEM OS
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              {lang === "fr"
                ? "Chaque décision importante laisse une trace. Chaque évolution s'appuie sur la mémoire du système et rayonne vers l'ensemble de la coopération."
                : "Every important decision leaves a trace. Every evolution builds on the system's memory and radiates across the whole cooperation."}
            </p>
            <p className="mt-2 text-xs font-mono uppercase text-slate-600">
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
