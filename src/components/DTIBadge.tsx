import GlassCard from "./GlassCard";

interface DTIBadgeProps {
  score: number; // 0-100
}

function getStanding(score: number): { label: string; colorClass: string; dotClass: string } {
  if (score >= 80) return { label: "Excellent standing", colorClass: "text-emerald", dotClass: "bg-emerald" };
  if (score >= 60) return { label: "Good standing", colorClass: "text-gold", dotClass: "bg-gold" };
  return { label: "Needs attention", colorClass: "text-violet", dotClass: "bg-violet" };
}

export default function DTIBadge({ score }: DTIBadgeProps) {
  const standing = getStanding(score);

  return (
    <GlassCard className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-text-muted">Your DTI</p>
        <div className={`w-2 h-2 rounded-full ${standing.dotClass}`} />
      </div>
      <p className="font-display font-bold text-[26px] tabular-nums">{score}</p>
      <p className={`text-[11px] mt-0.5 ${standing.colorClass}`}>{standing.label}</p>
    </GlassCard>
  );
}
