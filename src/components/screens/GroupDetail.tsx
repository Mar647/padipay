import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../GlassCard";

interface Member {
  user_id: string;
  name: string;
  dti_score: number;
  payout_position: number;
  has_paid_this_cycle: boolean;
}

interface GroupResponse {
  group_id: string;
  name: string;
  contribution_amount: number;
  frequency: string;
  max_members: number;
  current_members: number;
  invite_code: string;
  next_payout_date: string;
  total_pooled: number;
  members: Member[];
}

const API_BASE = "https://padipay-w28r.onrender.com";
const GROUP_ID = "de29c12c";

function dtiColor(score: number) {
  if (score >= 80) return "text-emerald";
  if (score >= 60) return "text-gold";
  return "text-violet";
}

export default function GroupDetail() {
  const navigate = useNavigate();
  const [group, setGroup] = useState<GroupResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/groups/${GROUP_ID}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        return res.json() as Promise<GroupResponse>;
      })
      .then((data) => {
        setGroup(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const averageDTI =
    group && group.members.length > 0
      ? Math.round(group.members.reduce((sum, m) => sum + m.dti_score, 0) / group.members.length)
      : null;

  return (
    <>
      <header className="mb-7 md:mb-10">
        <button onClick={() => navigate(-1)} className="mb-4 text-text-muted" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA0A8" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {loading && <p className="text-sm text-text-muted">Loading group&hellip;</p>}
        {error && <p className="text-sm text-violet">Couldn't load this group: {error}</p>}

        {group && !loading && !error && (
          <>
            <p className="font-display font-semibold text-[19px] md:text-2xl">{group.name}</p>
            <p className="text-[13px] text-text-muted mt-1">
              {group.members.length} of {group.max_members} members &middot; &#8358;
              {group.contribution_amount.toLocaleString("en-NG")}/cycle &middot; {group.frequency}
            </p>
          </>
        )}
      </header>

      {group && !loading && !error && (
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2">
            <p className="text-sm font-medium mb-3">Payout order &amp; member standing</p>

            {group.members.length === 0 ? (
              <GlassCard className="text-center py-8">
                <p className="text-sm text-text-muted">
                  No members have joined yet. Share the invite code below to get started.
                </p>
              </GlassCard>
            ) : (
              <div className="flex flex-col gap-2">
                {group.members
                  .slice()
                  .sort((a, b) => a.payout_position - b.payout_position)
                  .map((m) => (
                    <GlassCard key={m.user_id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs tabular-nums shrink-0">
                          {m.payout_position}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{m.name}</p>
                          <p className="text-xs text-text-muted">
                            {m.has_paid_this_cycle ? "Paid this cycle" : "Awaiting payment"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-display font-semibold tabular-nums ${dtiColor(m.dti_score)}`}>
                          {m.dti_score}
                        </p>
                        <p className="text-[11px] text-text-muted">DTI</p>
                      </div>
                    </GlassCard>
                  ))}
              </div>
            )}
          </div>

          <div className="md:col-span-1 mt-6 md:mt-0">
            <GlassCard className="mb-3">
              <p className="text-xs text-text-muted mb-2">Group average DTI</p>
              <p className="font-display font-bold text-2xl tabular-nums text-emerald">
                {averageDTI !== null ? averageDTI : "—"}
              </p>
            </GlassCard>
            <GlassCard className="mb-3">
              <p className="text-xs text-text-muted mb-2">Total pooled so far</p>
              <p className="font-display font-bold text-2xl tabular-nums">
                &#8358;{group.total_pooled.toLocaleString("en-NG")}
              </p>
            </GlassCard>
            <GlassCard>
              <p className="text-xs text-text-muted mb-2">Invite code</p>
              <p className="font-display font-bold text-lg tabular-nums tracking-wider">{group.invite_code}</p>
            </GlassCard>
          </div>
        </div>
      )}
    </>
  );
}