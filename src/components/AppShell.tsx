import type { ReactNode } from "react";
import { publicNavigation } from "../config/publicSite";

interface AppShellProps {
  activeRoute: string;
  children: ReactNode;
}

export function AppShell({ activeRoute, children }: AppShellProps) {
  return (
    <div
      className="relative min-h-screen text-slate-100"
      style={{
        background:
          "radial-gradient(circle at 50% 18%, rgba(124,58,237,0.12), transparent 28%)," +
          "radial-gradient(circle at 20% 35%, rgba(34,211,238,0.07), transparent 28%)," +
          "radial-gradient(circle at 80% 50%, rgba(217,70,239,0.07), transparent 30%)," +
          "linear-gradient(180deg,#020617 0%,#080B1A 46%,#030712 100%)",
      }}
    >
      {/* Ambient starfield */}
      <div className="os-ambient">
        <div className="os-nebula-one" />
        <div className="os-nebula-two" />
        <div className="os-stars" />
      </div>

      {/* Header */}
      <header className="os-header">
        <a href="#/" className="os-brand flex items-center gap-3">
          <img
            src="/assets/temposystem-butterfly.png"
            alt="TEMPOSYSTEM"
            style={{ width: 32, height: 32, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.7))' }}
          />
          TEMPOSYSTEM OS
        </a>
        <nav className="flex flex-wrap gap-1">
          {publicNavigation.map((item) => (
            <a
              key={item.route}
              href={item.href}
              className={`os-nav-link${activeRoute === item.route ? " os-nav-link-active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07] bg-black/20 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="font-['Philosopher',serif] text-base font-bold tracking-wide text-white/80">
              TEMPOSYSTEM OS
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Chaque décision importante laisse une trace. Chaque évolution
              s'appuie sur la mémoire du système et rayonne vers l'ensemble de
              la coopération.
            </p>
            <p className="mt-2 text-xs font-medium font-mono uppercase text-slate-600">
              Launch 000 · Premier déploiement public · 2026
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {publicNavigation.slice(1).map((item) => (
              <a
                key={item.route}
                href={item.href}
                className="text-sm font-mono text-slate-400 transition hover:text-[#d6b46a]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
