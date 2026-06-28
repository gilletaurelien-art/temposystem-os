interface StatusCardProps {
  title: string;
  value: string;
  detail: string;
}

export function StatusCard({ title, value, detail }: StatusCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-50">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
    </article>
  );
}
