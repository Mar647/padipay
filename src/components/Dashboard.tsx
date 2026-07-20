import ContributionWheel from "./ContributionWheel";
import GlassCard from "./GlassCard";
import DTIBadge from "./DTIBadge";
import VaultCard from "./VaultCard";
import RiskAlert from "./RiskAlert";
import GroupListItem from "./GroupListItem";

const demoData = {
  userName: "Marvellous",
  wheel: {
    currentCycle: 3,
    totalCycles: 5,
    amountRaised: 180000,
    potTarget: 250000,
    membersContributed: 3,
    totalMembers: 5,
  },
  nextPayout: { initials: "AB", name: "Adaeze Bello", daysAway: 4 },
  dti: 92,
  vaultAmount: 42500,
  alert: {
    memberName: "Chidi",
    daysLate: 2,
    newDTI: 61,
    action: "A grace period reminder was sent automatically.",
  },
  groups: [
    { name: "Family Ajo Circle", memberCount: 5, cyclePayment: 50000, progressPercent: 72, accent: "emerald" as const },
    { name: "Market Women Esusu", memberCount: 8, cyclePayment: 20000, progressPercent: 45, accent: "gold" as const },
  ],
  quickStats: {
    totalSaved: 840000,
    activeGroups: 2,
    streak: 8,
  },
};

export default function Dashboard() {
  return (
    <>
      <header className="flex justify-between items-center mb-5 md:mb-8">
        <div>
          <p className="text-[13px] md:text-sm text-text-muted">Good evening</p>
          <p className="font-display font-semibold text-[19px] md:text-2xl">{demoData.userName}</p>
        </div>
        <button
          className="w-11 h-11 rounded-full glass flex items-center justify-center relative active:scale-95 transition-transform"
          aria-label="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E0B872" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald" />
        </button>
      </header>

      <div className="grid grid-cols-3 gap-2 mb-7 md:mb-10 md:max-w-md">
        <div className="glass rounded-xl px-3 py-3 text-center">
          <p className="font-display font-bold text-base tabular-nums text-emerald">
            &#8358;{(demoData.quickStats.totalSaved / 1000).toFixed(0)}k
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">Total saved</p>
        </div>
        <div className="glass rounded-xl px-3 py-3 text-center">
          <p className="font-display font-bold text-base tabular-nums text-gold">
            {demoData.quickStats.activeGroups}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">Active groups</p>
        </div>
        <div className="glass rounded-xl px-3 py-3 text-center">
          <p className="font-display font-bold text-base tabular-nums">
            {demoData.quickStats.streak}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">Cycle streak</p>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <div className="mb-6 md:mb-8 flex justify-center md:justify-start">
            <ContributionWheel {...demoData.wheel} />
          </div>

          <GlassCard className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gold to-gold-dim shrink-0">
                <span className="font-display font-bold text-sm text-[#1A1508]">
                  {demoData.nextPayout.initials}
                </span>
              </div>
              <div>
                <p className="text-[13px] text-text-muted">Next payout</p>
                <p className="text-sm font-medium">
                  {demoData.nextPayout.name} &middot; in {demoData.nextPayout.daysAway} days
                </p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#85888E" strokeWidth="2" className="shrink-0">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </GlassCard>

          <div className="hidden md:block mt-8">
            <p className="font-display font-semibold text-lg mb-3">Your groups</p>
            <div className="grid grid-cols-2 gap-3">
              {demoData.groups.map((group) => (
                <GroupListItem key={group.name} {...group} />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 mb-4">
            <DTIBadge score={demoData.dti} />
            <VaultCard amount={demoData.vaultAmount} />
          </div>
          <RiskAlert {...demoData.alert} />
        </div>
      </div>

      <div className="md:hidden mt-4">
        <p className="font-display font-semibold text-[15px] mb-3">Your groups</p>
        <div className="flex flex-col gap-3">
          {demoData.groups.map((group) => (
            <GroupListItem key={group.name} {...group} />
          ))}
        </div>
      </div>
    </>
  );
}