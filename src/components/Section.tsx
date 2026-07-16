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
    <section id={id} className={`civic-page-section ${className}`}>
      <div
        className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${
          wide ? "max-w-[96rem]" : "max-w-6xl"
        }`}
      >
        <div className="civic-page-heading">
          {eyebrow ? (
            <p className="os-eyebrow">{eyebrow}</p>
          ) : null}
          <h1>
            {title}
          </h1>
          {intro ? (
            <p>{intro}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
