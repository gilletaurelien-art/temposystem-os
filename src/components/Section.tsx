import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  wide = false,
}: SectionProps) {
  return (
    <section id={id} className={`py-14 sm:py-18 ${className}`}>
      <div
        className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${
          wide ? "max-w-[96rem]" : "max-w-6xl"
        }`}
      >
        <div className="mb-8 max-w-3xl">
          {eyebrow ? (
            <p className="os-eyebrow">{eyebrow}</p>
          ) : null}
          <h2 className="mt-2 text-2xl font-bold text-white/92 sm:text-3xl" style={{ fontFamily: "'Philosopher', serif" }}>
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-sm leading-7 text-slate-400">{intro}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
