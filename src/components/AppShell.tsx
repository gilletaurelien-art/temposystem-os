import type { ReactNode } from "react";
import { publicNavigation } from "../config/publicSite";

interface AppShellProps {
  activeRoute: string;
  children: ReactNode;
}

export function AppShell({ activeRoute, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050914]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <a href="#/" className="w-fit text-base font-semibold text-slate-50">
            TEMPOSYSTEM OS
          </a>
          <div className="flex flex-wrap gap-2">
            {publicNavigation.map((item) => (
              <a
                key={item.route}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  activeRoute === item.route
                    ? "bg-[#d6b46a] text-[#07101d]"
                    : "text-slate-300 hover:bg-white/10 hover:text-slate-50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {children}

      <footer className="border-t border-white/10 bg-[#030711]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p className="text-sm text-slate-400">
            TEMPOSYSTEM OS prépare une mémoire durable de la coopération.
          </p>
          <div className="flex flex-wrap gap-3">
            {publicNavigation.slice(1).map((item) => (
              <a
                key={item.route}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-[#d6b46a]"
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
