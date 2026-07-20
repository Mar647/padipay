import GlassCard from "./GlassCard";

interface VaultCardProps {
  amount: number;
}

export default function VaultCard({ amount }: VaultCardProps) {
  const formatted =
    amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount.toString();

  return (
    <GlassCard className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-text-muted">Guarantee Vault</p>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E0B872" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <p className="font-display font-bold text-[26px] tabular-nums">&#8358;{formatted}</p>
      <p className="text-[11px] mt-0.5 text-text-muted">Secured for group</p>
    </GlassCard>
  );
}
