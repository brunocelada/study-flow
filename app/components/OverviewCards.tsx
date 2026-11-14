export interface OverviewStat {
  label: string;
  value: string;
  helper: string;
}

interface OverviewCardsProps {
  stats: OverviewStat[];
}

export default function OverviewCards({ stats }: OverviewCardsProps) {
  return (
    <section
      aria-label="Study overview"
      className="grid grid-cols-1 gap-6 sm:grid-cols-3"
    >
      {stats.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
        >
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
          <p className="mt-1 text-xs text-slate-500">{card.helper}</p>
        </div>
      ))}
    </section>
  );
}
