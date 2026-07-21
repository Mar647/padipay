import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../Button";
import GlassCard from "../GlassCard";

interface Member {
  user_id: string;
  name: string;
  has_paid_this_cycle: boolean;
}

interface GroupResponse {
  group_id: string;
  invite_code: string;
  current_members: number;
  max_members: number;
  members: Member[];
}

const API_BASE = "https://padipay-w28r.onrender.com";
const FALLBACK_GROUP_ID = "de29c12c";

export default function MemberInvite() {
  const [copied, setCopied] = useState(false);
  const [group, setGroup] = useState<GroupResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { groupId?: string; inviteCode?: string } | null;
  const groupId = state?.groupId ?? FALLBACK_GROUP_ID;

  useEffect(() => {
    fetch(`${API_BASE}/groups/${groupId}`)
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
  }, [groupId]);

  const inviteCode = group?.invite_code ?? state?.inviteCode ?? "";

  const handleCopy = () => {
    if (!inviteCode) return;
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="mb-7 md:mb-10">
        <button onClick={() => navigate(-1)} className="mb-4 text-text-muted" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA0A8" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="font-display font-semibold text-[19px] md:text-2xl">Invite members</p>
        <p className="text-[13px] text-text-muted mt-1">Share this code so others can join your group</p>
      </header>

      {loading && <p className="text-sm text-text-muted">Loading&hellip;</p>}
      {error && <p className="text-sm text-violet">Couldn't load this group: {error}</p>}

      {!loading && !error && (
        <div className="md:grid md:grid-cols-3 md:gap-6 md:max-w-4xl">
          <div className="md:col-span-1 mb-4">
            <GlassCard glow="gold" className="text-center py-8">
              <p className="text-xs text-text-muted mb-3">Invite code</p>
              <p className="font-display font-bold text-2xl tabular-nums tracking-wider mb-4">{inviteCode}</p>
              <button
                onClick={handleCopy}
                className="text-xs text-emerald border border-emerald/30 rounded-full px-4 py-2 active:scale-95 transition-transform"
              >
                {copied ? "Copied" : "Copy code"}
              </button>
            </GlassCard>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium mb-3">
              Members {group ? `(${group.members.length} of ${group.max_members})` : ""}
            </p>

            {group && group.members.length === 0 ? (
              <GlassCard className="text-center py-8">
                <p className="text-sm text-text-muted">
                  No one has joined yet. Share the invite code above to get started.
                </p>
              </GlassCard>
            ) : (
              <div className="flex flex-col gap-2">
                {group?.members.map((m) => (
                  <GlassCard key={m.user_id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                        <span className="text-xs font-display font-bold text-[#1A1508]">
                          {m.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <p className="text-sm">{m.name}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald/15 text-emerald">
                      Joined
                    </span>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 md:max-w-sm">
        <Button onClick={() => navigate("/fund", { state: { groupId } })}>Continue to funding</Button>
      </div>
    </>
  );
}