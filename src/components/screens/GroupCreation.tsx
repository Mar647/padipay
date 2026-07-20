import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import TextField from "../TextField";
import GlassCard from "../GlassCard";

export default function GroupCreation() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState(5);
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("monthly");
  const navigate = useNavigate();

  return (
    <>
      <header className="mb-7 md:mb-10">
        <button onClick={() => navigate(-1)} className="mb-4 text-text-muted" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#85888E" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="font-display font-semibold text-[19px] md:text-2xl">Create a group</p>
        <p className="text-[13px] text-text-muted mt-1">Set up a new rotating savings circle</p>
      </header>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <TextField
            id="group-name"
            label="Group name"
            placeholder="e.g. Family Ajo Circle"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="mb-4">
            <label className="block text-[13px] text-text-muted mb-2">Number of members</label>
            <div className="flex items-center gap-4 glass rounded-xl px-4 py-3">
              <button
                onClick={() => setMembers(Math.max(2, members - 1))}
                className="w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Decrease members"
              >
                &minus;
              </button>
              <span className="flex-1 text-center font-display font-semibold text-lg tabular-nums">{members}</span>
              <button
                onClick={() => setMembers(Math.min(20, members + 1))}
                className="w-8 h-8 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Increase members"
              >
                +
              </button>
            </div>
          </div>

          <TextField
            id="amount"
            label="Contribution amount per cycle (₦)"
            type="number"
            placeholder="50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="mb-6">
            <label className="block text-[13px] text-text-muted mb-2">Cycle frequency</label>
            <div className="grid grid-cols-2 gap-3">
              {(["weekly", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`rounded-xl py-3 text-sm capitalize transition-colors ${
                    frequency === f ? "bg-emerald/15 text-emerald border border-emerald/40" : "glass text-text-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <GlassCard glow="emerald" className="mb-4">
            <p className="text-xs text-text-muted mb-3">Pot summary</p>
            <p className="font-display font-bold text-2xl tabular-nums mb-1">
              &#8358;{amount ? (Number(amount) * members).toLocaleString("en-NG") : "0"}
            </p>
            <p className="text-xs text-text-muted">
              {members} members &times; &#8358;{amount ? Number(amount).toLocaleString("en-NG") : "0"} per {frequency === "weekly" ? "week" : "month"}
            </p>
          </GlassCard>
          <p className="text-xs text-text-muted leading-relaxed mb-4">
            5&ndash;10% of the earliest payouts will be held in the Guarantee Vault to protect members against early defaults.
          </p>
        </div>
      </div>

      <div className="mt-4 md:max-w-sm">
        <Button onClick={() => navigate("/invite")} disabled={!name || !amount}>
          Create group and invite members
        </Button>
      </div>
    </>
  );
}
