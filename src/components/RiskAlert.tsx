interface RiskAlertProps {
  memberName: string;
  daysLate: number;
  newDTI: number;
  action: string;
}

// Violet is reserved for risk/intervention moments only — this is the one
// place in the UI where that accent color should appear.
export default function RiskAlert({ memberName, daysLate, newDTI, action }: RiskAlertProps) {
  return (
    <div className="rounded-2xl p-4 flex items-start gap-3 bg-gradient-to-br from-violet/[0.14] to-violet/[0.04] border border-violet/30">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8B6EFF"
        strokeWidth="2"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <div>
        <p className="text-sm font-medium mb-0.5">
          {memberName}'s payment is {daysLate} day{daysLate !== 1 ? "s" : ""} late
        </p>
        <p className="text-xs text-text-muted leading-snug">
          DTI dropped to {newDTI}. {action}
        </p>
      </div>
    </div>
  );
}
