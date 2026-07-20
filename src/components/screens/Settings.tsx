import GlassCard from "../GlassCard";

const settingsItems = [
  { label: "Personal information", icon: "user" },
  { label: "Linked bank account", icon: "bank" },
  { label: "Security &amp; PIN", icon: "lock" },
  { label: "Notification preferences", icon: "bell" },
  { label: "Help &amp; support", icon: "help" },
];

export default function Settings() {
  return (
    <>
      <header className="mb-7 md:mb-10">
        <p className="font-display font-semibold text-[19px] md:text-2xl">Settings</p>
        <p className="text-[13px] text-text-muted mt-1">Manage your account and preferences</p>
      </header>

      <GlassCard className="flex items-center gap-4 mb-6 md:max-w-2xl">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald to-emerald-dim flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-lg text-obsidian">MA</span>
        </div>
        <div>
          <p className="font-medium">Marvellous Akinpelu</p>
          <p className="text-xs text-text-muted mt-0.5">+234 80X XXX XXXX</p>
        </div>
      </GlassCard>

      <div className="md:max-w-2xl flex flex-col gap-2">
        {settingsItems.map((item) => (
          <button key={item.label} className="w-full text-left">
            <GlassCard className="flex items-center justify-between active:scale-[0.99] transition-transform">
              <span className="text-sm">{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#85888E" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </GlassCard>
          </button>
        ))}
      </div>
    </>
  );
}
