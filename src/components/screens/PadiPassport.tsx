import GlassCard from "../GlassCard";

const history = [
  { group: "Family Ajo Circle", cycles: "8 of 8 completed", dti: 92 },
  { group: "Uni Hall Savings", cycles: "12 of 12 completed", dti: 96 },
  { group: "Market Women Esusu", cycles: "3 of 5 in progress", dti: 88 },
];

export default function PadiPassport() {
  return (
    <>
      <header className="mb-7 md:mb-10">
        <p className="font-display font-semibold text-[19px] md:text-2xl">Padi Passport</p>
        <p className="text-[13px] text-text-muted mt-1">Your portable savings reputation</p>
      </header>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 mb-4 md:mb-0">
          <GlassCard glow="emerald" className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald to-emerald-dim mx-auto mb-4 flex items-center justify-center">
              <span className="font-display font-bold text-xl text-obsidian">MA</span>
            </div>
            <p className="font-medium mb-1">Marvellous Akinpelu</p>
            <p className="text-xs text-text-muted mb-5">Member since Jan 2026</p>
            <p className="font-display font-bold text-4xl tabular-nums text-emerald">92</p>
            <p className="text-xs text-text-muted mt-1">Overall trust index</p>
          </GlassCard>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium mb-3">Group history</p>
          <div className="flex flex-col gap-2">
            {history.map((h) => (
              <GlassCard key={h.group} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{h.group}</p>
                  <p className="text-xs text-text-muted mt-0.5">{h.cycles}</p>
                </div>
                <p className="text-sm font-display font-semibold tabular-nums text-emerald">{h.dti}</p>
              </GlassCard>
            ))}
          </div>

          <p className="text-xs text-text-muted leading-relaxed mt-6">
            Your Padi Passport can be shared with microfinance partners as an alternative credit signal &mdash; built from real savings behavior, not a bank statement.
          </p>
        </div>
      </div>
    </>
  );
}
