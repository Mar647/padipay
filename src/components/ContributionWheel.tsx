interface ContributionWheelProps {
  totalCycles: number;
  currentCycle: number;
  amountRaised: number;
  potTarget: number;
  membersContributed: number;
  totalMembers: number;
}

// Each member gets an equal arc segment around the ring.
// Filled segments (emerald) = paid this cycle. Muted segments = not yet paid.
export default function ContributionWheel({
  currentCycle,
  totalCycles,
  amountRaised,
  potTarget,
  membersContributed,
  totalMembers,
}: ContributionWheelProps) {
  const radius = 98;
  const circumference = 2 * Math.PI * radius;
  const gap = 8; // px gap between segments, in stroke-dasharray units
  const segmentLength = circumference / totalMembers - gap;

  const formattedRaised = new Intl.NumberFormat("en-NG").format(amountRaised);
  const formattedTarget = new Intl.NumberFormat("en-NG").format(potTarget);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[230px] h-[230px]">
        <svg
          width="230"
          height="230"
          viewBox="0 0 230 230"
          className="-rotate-90"
          role="img"
          aria-label={`Contribution progress: ${membersContributed} of ${totalMembers} members have paid`}
        >
          <defs>
            <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10E094" />
              <stop offset="100%" stopColor="#0B7A54" />
            </linearGradient>
          </defs>
          {Array.from({ length: totalMembers }).map((_, i) => {
            const isPaid = i < membersContributed;
            const offset = -(i * (segmentLength + gap));
            return (
              <circle
                key={i}
                cx="115"
                cy="115"
                r={radius}
                fill="none"
                stroke={isPaid ? "url(#wheelGrad)" : "rgba(255,255,255,0.06)"}
                strokeWidth="14"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass shadow-glow-emerald w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center">
            <p className="text-xs text-text-muted">
              Cycle {currentCycle} of {totalCycles}
            </p>
            <p className="font-display font-bold text-[28px] tabular-nums leading-none mt-1">
              &#8358;{formattedRaised}
            </p>
            <p className="text-xs mt-1 text-emerald">of &#8358;{formattedTarget} pot</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-text-muted mt-4">
        {membersContributed} of {totalMembers} members have contributed
      </p>
    </div>
  );
}
