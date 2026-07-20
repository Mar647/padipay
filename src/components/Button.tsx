import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "w-full rounded-2xl py-3.5 text-sm font-medium transition-transform active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-emerald to-emerald-dim text-obsidian"
      : "glass text-text-primary";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
