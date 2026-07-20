import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import GlassCard from "../GlassCard";

const account = {
  bankName: "Monnify Microfinance Bank",
  accountNumber: "8123456789",
  accountName: "PadiPay / Marvellous Akinpelu",
};

export default function FundingScreen() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
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
        <p className="font-display font-semibold text-[19px] md:text-2xl">Fund your account</p>
        <p className="text-[13px] text-text-muted mt-1">
          Transfer your contribution to this dedicated account
        </p>
      </header>

      <div className="md:max-w-md">
        <GlassCard glow="emerald" className="py-8 text-center mb-4">
          <p className="text-xs text-text-muted mb-2">Amount due this cycle</p>
          <p className="font-display font-bold text-3xl tabular-nums mb-6">&#8358;50,000</p>

          <div className="text-left glass rounded-xl p-4">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/[0.06]">
              <p className="text-xs text-text-muted">Bank</p>
              <p className="text-sm">{account.bankName}</p>
            </div>
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/[0.06]">
              <p className="text-xs text-text-muted">Account number</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-display font-semibold tabular-nums">{account.accountNumber}</p>
                <button onClick={handleCopy} aria-label="Copy account number">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10E094" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-text-muted">Account name</p>
              <p className="text-sm text-right">{account.accountName}</p>
            </div>
          </div>
          {copied && <p className="text-xs text-emerald mt-3">Account number copied</p>}
        </GlassCard>

        <p className="text-xs text-text-muted leading-relaxed mb-6">
          Your dashboard updates automatically the moment your transfer lands &mdash; no need to confirm manually. Powered by Monnify webhooks.
        </p>

        <Button onClick={() => navigate("/")}>I've sent the transfer</Button>
      </div>
    </>
  );
}
