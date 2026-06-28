interface StatusCardProps {
  signal?: string;
  title: string;
  value: string;
  detail: string;
  supportingDetail?: string;
}

export function StatusCard({
  signal,
  title,
  value,
  detail,
  supportingDetail,
}: StatusCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        {signal ? (
          <span className="shrink-0 text-sm" aria-hidden="true">
            {signal}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-50">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
      {supportingDetail ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {supportingDetail}
        </p>
      ) : null}
    </article>
  );
}
