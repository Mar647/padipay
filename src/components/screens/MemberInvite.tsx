import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import GlassCard from "../GlassCard";

const invitedDemo = [
  { name: "Adaeze Bello", status: "joined" as const },
  { name: "Chidi Okonkwo", status: "joined" as const },
  { name: "Fatima Yusuf", status: "pending" as const },
];

export default function MemberInvite() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const inviteCode = "PADI-7F3K2";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="mb-7 md:mb-10">
        <button onClick={() => navigate(-1)} className="mb-4 text-text-muted" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#85888E" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="font-display font-semibold text-[19px] md:text-2xl">Invite members</p>
        <p className="text-[13px] text-text-muted mt-1">Share this code so others can join your group</p>
      </header>

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
          <p className="text-sm font-medium mb-3">Members</p>
          <div className="flex flex-col gap-2">
            {invitedDemo.map((m) => (
              <GlassCard key={m.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                    <span className="text-xs font-display font-bold text-[#1A1508]">
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <p className="text-sm">{m.name}</p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    m.status === "joined" ? "bg-emerald/15 text-emerald" : "bg-white/[0.06] text-text-muted"
                  }`}
                >
                  {m.status === "joined" ? "Joined" : "Pending"}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 md:max-w-sm">
        <Button onClick={() => navigate("/fund")}>Continue to funding</Button>
      </div>
    </>
  );
}
