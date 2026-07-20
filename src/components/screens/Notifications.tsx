import RiskAlert from "../RiskAlert";
import GlassCard from "../GlassCard";

const notifications = [
  { type: "risk" as const, memberName: "Chidi", daysLate: 2, newDTI: 61, action: "A grace period reminder was sent automatically." },
  { type: "success" as const, text: "Fatima Yusuf's contribution of ₦50,000 was received.", time: "3 hours ago" },
  { type: "success" as const, text: "Payout of ₦250,000 was sent to Emeka Obi.", time: "1 day ago" },
  { type: "info" as const, text: "Cycle 3 has started for Family Ajo Circle.", time: "3 days ago" },
];

export default function Notifications() {
  return (
    <>
      <header className="mb-7 md:mb-10">
        <p className="font-display font-semibold text-[19px] md:text-2xl">Notifications</p>
        <p className="text-[13px] text-text-muted mt-1">Alerts and updates across your groups</p>
      </header>

      <div className="md:max-w-2xl flex flex-col gap-3">
        {notifications.map((n, i) =>
          n.type === "risk" ? (
            <RiskAlert key={i} memberName={n.memberName!} daysLate={n.daysLate!} newDTI={n.newDTI!} action={n.action!} />
          ) : (
            <GlassCard key={i} className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  n.type === "success" ? "bg-emerald" : "bg-gold"
                }`}
              />
              <div>
                <p className="text-sm">{n.text}</p>
                <p className="text-[11px] text-text-muted mt-1">{n.time}</p>
              </div>
            </GlassCard>
          )
        )}
      </div>
    </>
  );
}
