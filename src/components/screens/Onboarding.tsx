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
          </>
        )}
      </div>
    </div>
  );
}
