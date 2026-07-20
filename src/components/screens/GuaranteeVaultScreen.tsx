import GlassCard from "../GlassCard";

const vaultActivity = [
  { label: "Held from Fatima's payout", amount: 5000, date: "2 weeks ago" },
  { label: "Held from Emeka's payout", amount: 5000, date: "6 weeks ago" },
];

export default function GuaranteeVaultScreen() {
  return (
    <>
      <header className="mb-7 md:mb-10">
        <p className="font-display font-semibold text-[19px] md:text-2xl">Guarantee Vault</p>
        <p className="text-[13px] text-text-muted mt-1">Escrow that protects your group from early defaults</p>
      </header>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <GlassCard glow="gold" className="text-center py-10 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0B872" strokeWidth="1.5" className="mx-auto mb-4">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-xs text-text-muted mb-2">Total secured across your groups</p>
            <p className="font-display font-bold text-3xl tabular-nums">&#8358;42,500</p>
          </GlassCard>

          <p className="text-sm font-medium mb-3">How it works</p>
          <GlassCard className="mb-2">
            <p className="text-sm">5&ndash;10% of the earliest payouts in each cycle are held back automatically.</p>
          </GlassCard>
          <GlassCard className="mb-2">
            <p className="text-sm">If a member defaults after collecting their payout, the vault compensates remaining members.</p>
          </GlassCard>
          <GlassCard>
            <p className="text-sm">Vault funds are released back to contributors once a group completes all cycles cleanly.</p>
          </GlassCard>
        </div>

        <div className="md:col-span-1 mt-6 md:mt-0">
          <p className="text-sm font-medium mb-3">Recent vault activity</p>
          <div className="flex flex-col gap-2">
            {vaultActivity.map((a, i) => (
              <GlassCard key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-xs">{a.label}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{a.date}</p>
                </div>
                <p className="text-sm font-display font-semibold tabular-nums text-gold">
                  +&#8358;{a.amount.toLocaleString("en-NG")}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
