import { useNavigate } from "react-router-dom";
import GlassCard from "../GlassCard";

const members = [
  { name: "Marvellous Akinpelu", dti: 92, payoutPosition: 3, status: "current" as const },
  { name: "Adaeze Bello", dti: 88, payoutPosition: 4, status: "upcoming" as const },
  { name: "Chidi Okonkwo", dti: 61, payoutPosition: 5, status: "upcoming" as const },
  { name: "Fatima Yusuf", dti: 95, payoutPosition: 1, status: "paid" as const },
  { name: "Emeka Obi", dti: 79, payoutPosition: 2, status: "paid" as const },
];

function dtiColor(score: number) {
  if (score >= 80) return "text-emerald";
  if (score >= 60) return "text-gold";
  return "text-violet";
}

export default function GroupDetail() {
  const navigate = useNavigate();

  return (
    <>
      <header className="mb-7 md:mb-10">
        <button onClick={() => navigate(-1)} className="mb-4 text-text-muted" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#85888E" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="font-display font-semibold text-[19px] md:text-2xl">Family Ajo Circle</p>
        <p className="text-[13px] text-text-muted mt-1">5 members &middot; &#8358;50,000/cycle &middot; monthly</p>
      </header>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <p className="text-sm font-medium mb-3">Payout order &amp; member standing</p>
          <div className="flex flex-col gap-2">
            {members.map((m) => (
              <GlassCard key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs tabular-nums shrink-0">
                    {m.payoutPosition}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-text-muted capitalize">{m.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-display font-semibold tabular-nums ${dtiColor(m.dti)}`}>{m.dti}</p>
                  <p className="text-[11px] text-text-muted">DTI</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="md:col-span-1 mt-6 md:mt-0">
          <GlassCard className="mb-3">
            <p className="text-xs text-text-muted mb-2">Group average DTI</p>
            <p className="font-display font-bold text-2xl tabular-nums text-emerald">83</p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs text-text-muted mb-2">Cycles completed</p>
            <p className="font-display font-bold text-2xl tabular-nums">2 of 5</p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
