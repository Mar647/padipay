import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import TextField from "../TextField";

export default function Onboarding() {
  const [step, setStep] = useState<"phone" | "bvn">("phone");
  const [phone, setPhone] = useState("");
  const [bvn, setBvn] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-obsidian flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald to-emerald-dim mx-auto mb-5 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#08090B" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-2xl mb-1">Welcome to PadiPay</h1>
          <p className="text-sm text-text-muted">
            {step === "phone" ? "Enter your phone number to get started" : "Verify your identity with your BVN"}
          </p>
        </div>

        {step === "phone" ? (
          <>
            <TextField
              id="phone"
              label="Phone number"
              type="tel"
              placeholder="080X XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button onClick={() => setStep("bvn")} disabled={phone.length < 10}>
              Continue
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4 glass rounded-xl px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10E094" strokeWidth="2" className="shrink-0">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-xs text-text-muted">Your BVN is encrypted end-to-end and never stored on our servers</p>
            </div>

            <TextField
              id="bvn"
              label="Bank Verification Number (BVN)"
              type="text"
              placeholder="11-digit BVN"
              maxLength={11}
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
            />
            <p className="text-xs text-text-muted mb-4 leading-relaxed">
              Your BVN is used to verify your identity via Monnify and is never stored or shared.
            </p>
            <Button onClick={() => navigate("/")} disabled={bvn.length < 11}>
              Verify and continue
            </Button>
            <button
              onClick={() => setStep("phone")}
              className="w-full text-center text-xs text-text-muted mt-4"
            >
              Back
            </button>

            <div className="flex items-center justify-center gap-2 mt-8 opacity-70">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA0A8" strokeWidth="2">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-[11px] text-text-muted tracking-wide">Secured via Monnify &amp; NIBSS</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}