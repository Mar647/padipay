import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#10E094" : "#85888E"} strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    to: "/groups",
    label: "Groups",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#10E094" : "#85888E"} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    to: "/vault",
    label: "Vault",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#10E094" : "#85888E"} strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    to: "/passport",
    label: "Passport",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#10E094" : "#85888E"} strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
      </svg>
    ),
  },
];

export default function AppShell({ children, hideNav = false }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-obsidian">
      {!hideNav && (
        <div className="hidden md:flex sticky top-0 z-20 items-center justify-between px-8 py-4 bg-obsidian/80 backdrop-blur-md border-b border-white/[0.06]">
          <span className="font-display font-bold text-lg">
            Padi<span className="text-emerald">Pay</span>
          </span>
          <nav className="flex gap-1 glass rounded-2xl p-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.label}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm transition-colors ${
                    isActive ? "bg-emerald/15 text-emerald" : "text-text-muted hover:text-text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      <div className={`max-w-6xl mx-auto px-5 md:px-8 pt-8 ${hideNav ? "pb-8" : "pb-28 md:pb-12"}`}>
        {children}
      </div>

      {!hideNav && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full px-5 pb-6 pt-3">
          <div className="glass rounded-2xl flex items-center justify-around py-3 max-w-[390px] mx-auto">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} aria-label={item.label} className="p-2 active:scale-90 transition-transform">
                {({ isActive }) => item.icon(isActive)}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}