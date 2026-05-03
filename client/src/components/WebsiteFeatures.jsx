import { useState } from "react";

const FEATURES = [
  {
    title: "Private, secure account",
    body: "Create an account with your email and a password. Only you can open your list—your tasks are never mixed with anyone else's.",
  },
  {
    title: "Create & customize tasks",
    body: "Give each item a short title, add optional notes for extra detail, pick a color and font style, set a due date, and mark status as pending or done.",
  },
  {
    title: "Edit, sort & clear",
    body: "Change a task anytime, sort everything by date with one tap, remove a single item, or clear the full list when you are sure—no clutter left behind.",
  },
  {
    title: "Your personal dashboard",
    body: "After you sign in, the dashboard brings the form and your list together: side by side on a laptop, stacked nicely on a phone—always the same account.",
  },
  {
    title: "Saved for you online",
    body: "When you are connected, your changes are kept with your account. Sign in from home, work, or your phone and continue with the same list.",
  },
  {
    title: "Help & contact",
    body: "Open the FAQ on this page for quick answers, or use Contact us to send a message. We read feedback and can email you back when possible.",
  },
];

function FeaturesIllustration() {
  return (
    <div className="relative flex min-h-[280px] items-center justify-center sm:min-h-[340px]" aria-hidden>
      <svg viewBox="0 0 400 320" className="h-auto w-full max-w-md drop-shadow-lg">
        <defs>
          <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#134e4a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
          </filter>
        </defs>
        {/* Floating tags */}
        <rect x="28" y="48" width="72" height="28" rx="6" fill="#0d9488" opacity="0.95" />
        <text x="64" y="66" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui,sans-serif">
          Tasks
        </text>
        <rect x="285" y="36" width="88" height="28" rx="6" fill="#0d9488" opacity="0.95" />
        <text x="329" y="54" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui,sans-serif">
          Due date
        </text>
        <rect x="310" y="130" width="72" height="28" rx="6" fill="#0d9488" opacity="0.9" />
        <text x="346" y="148" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui,sans-serif">
          Done
        </text>
        {/* Monitor */}
        <rect x="80" y="72" width="240" height="160" rx="12" fill="url(#monitorGrad)" filter="url(#soft)" />
        <rect x="92" y="84" width="216" height="118" rx="6" fill="#e2e8f0" />
        {/* Mini UI inside screen */}
        <rect x="102" y="94" width="62" height="40" rx="4" fill="#94a3b8" opacity="0.5" />
        <rect x="170" y="94" width="62" height="40" rx="4" fill="#22c55e" opacity="0.35" />
        <rect x="238" y="94" width="62" height="40" rx="4" fill="#7dd3fc" opacity="0.45" />
        <rect x="102" y="142" width="196" height="8" rx="2" fill="#cbd5e1" />
        <rect x="102" y="156" width="140" height="8" rx="2" fill="#cbd5e1" />
        <rect x="102" y="170" width="160" height="8" rx="2" fill="#cbd5e1" />
        <rect x="155" y="232" width="90" height="10" rx="3" fill="#334155" />
        <rect x="125" y="248" width="150" height="6" rx="2" fill="#475569" />
        {/* Decorative icons */}
        <rect x="36" y="200" width="36" height="36" rx="6" fill="#5eead4" opacity="0.85" />
        <text x="54" y="222" textAnchor="middle" fill="#134e4a" fontSize="16">
          ✓
        </text>
        <rect x="338" y="200" width="32" height="32" rx="4" fill="#99f6e4" />
        <rect x="320" y="248" width="48" height="40" rx="6" fill="#2dd4bf" opacity="0.55" />
      </svg>
    </div>
  );
}

export default function WebsiteFeatures() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="rounded-3xl border border-teal-200/70 bg-white/90 p-6 shadow-xl shadow-teal-900/[0.06] backdrop-blur-sm sm:p-8 lg:p-10">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Website Features</h2>
        <p className="text-sm font-medium text-teal-700/90">Everything in one calm workspace</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        {/* Accordion */}
        <div className="space-y-0">
          {FEATURES.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.title} className="border-b border-teal-100 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group flex w-full items-start gap-3 rounded-xl py-4 text-left transition-all duration-200 ease-out hover:bg-teal-50/50 active:scale-[0.995] sm:-mx-2 sm:px-2"
                  aria-expanded={open}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-700 text-sm font-bold tabular-nums text-white shadow-md shadow-teal-900/20 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg active:scale-95 ${
                      open ? "ring-2 ring-teal-300/70 ring-offset-2 ring-offset-white" : ""
                    }`}
                    aria-hidden
                  >
                    <span className="transition-opacity duration-300 ease-out">{open ? "−" : "+"}</span>
                  </span>
                  <span className="pt-0.5 text-base font-bold text-slate-800 transition-colors duration-200 group-hover:text-teal-900">
                    {item.title}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`mb-4 rounded-xl border border-slate-100 bg-gradient-to-br from-white to-teal-50/40 p-4 text-sm leading-relaxed text-slate-600 shadow-md shadow-slate-900/5 transition-[opacity,transform] duration-300 ease-out ${
                        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                      }`}
                    >
                      {item.body}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Illustration */}
        <div className="relative lg:sticky lg:top-24">
          <FeaturesIllustration />
        </div>
      </div>
    </section>
  );
}
