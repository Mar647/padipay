import GlassCard from "./GlassCard";

interface GroupListItemProps {
  name: string;
  memberCount: number;
  cyclePayment: number;
  progressPercent: number;
  accent?: "emerald" | "gold";
}

const accentStyles = {
  emerald: {
    iconBg: "bg-gradient-to-br from-emerald/20 to-emerald/[0.05]",
    iconStroke: "#10E094",
    percentText: "text-emerald",
  },
  gold: {
    iconBg: "bg-gradient-to-br from-gold/20 to-gold/[0.05]",
    iconStroke: "#E0B872",
    percentText: "text-gold",
  },
};

export default function GroupListItem({
  name,
  memberCount,
  cyclePayment,
  progressPercent,
  accent = "emerald",
}: GroupListItemProps) {
  const styles = accentStyles[accent];
  const formattedPayment = new Intl.NumberFormat("en-NG", {
    notation: "compact",
    compactDisplay: "short",
  }).format(cyclePayment);

  return (
    <GlassCard className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${styles.iconBg}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={styles.iconStroke} strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-text-muted">
            {memberCount} members &middot; &#8358;{formattedPayment}/cycle
          </p>
        </div>
      </div>
      <p className={`text-xs tabular-nums ${styles.percentText}`}>{progressPercent}%</p>
    </GlassCard>
  );
}
