import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-14 sm:py-18 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="mb-8 max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase text-[#d6b46a]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 sm:text-3xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-base leading-7 text-slate-300">{intro}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
