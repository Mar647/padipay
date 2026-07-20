import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "emerald" | "gold" | "violet" | "none";
}

const glowMap = {
  emerald: "shadow-glow-emerald",
  gold: "shadow-glow-gold",
  violet: "shadow-glow-violet",
  none: "",
};

export default function GlassCard({ children, className = "", glow = "none" }: GlassCardProps) {
  return (
    <div className={`glass rounded-2xl p-4 ${glowMap[glow]} ${className}`}>
      {children}
    </div>
  );
}
