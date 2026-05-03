import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import WebsiteFeatures from "@/components/WebsiteFeatures";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import { useHashScroll } from "@/components/home/useHashScroll";

/** Matches navbar & footer for equal side margins */
const SHELL = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-14";

const BENEFITS = [
  "Add tasks with a title, optional notes, colors, due dates, and status—nothing slips through the cracks.",
  "See everything on one dashboard—edit, complete, or delete in a few clicks.",
  "Your list is private to your account; sign in from any device with a modern, responsive layout.",
];

function HeroTaskPreview() {
  const rows = [
    { color: "bg-sky-400", title: "Review project brief", date: "Today", status: "Pending" },
    { color: "bg-violet-300", title: "Email the team update", date: "Tomorrow", status: "In progress" },
    { color: "bg-emerald-400", title: "Submit weekly report", date: "Fri", status: "Done" },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-teal-400/40 via-cyan-300/30 to-sky-300/40 blur-sm" aria-hidden />
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-teal-900/15">
        <div className="border-b border-slate-100 bg-gradient-to-r from-teal-600 to-teal-700 px-5 py-3">
          {/* <p className="text-sm font-semibold text-white">Your dashboard</p>
          <p className="text-xs text-teal-100">Tasks stay synced when you sign in</p> */}
        </div>
        <div className="space-y-3 p-5">
          {rows.map((row) => (
            <div
              key={row.title}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5"
            >
              <span className={`h-9 w-1.5 shrink-0 rounded-full ${row.color}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{row.title}</p>
                <p className="text-xs text-slate-500">{row.date}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  useHashScroll();

  return (
    <>
      {/* Band 1 — hero (product story + preview) */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50/90 to-white py-12 sm:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(125, 211, 252, 0.45), transparent 55%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(254, 243, 199, 0.35), transparent 50%)",
          }}
          aria-hidden
        />
        <div className={`relative ${SHELL}`}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Plan clearly · Work calmly
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                Everything you need to do—organized in{" "}
                <span className="bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                  one place
                </span>
                .
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                <strong className="font-semibold text-slate-800">Task Manager</strong> helps you capture what
                matters: chores, deadlines, and reminders. Create an account, open your dashboard, and keep your
                personal to-do list where you can always find it—at home or on the go.
              </p>
              <ul className="mt-8 max-w-xl space-y-3 text-slate-700">
                {BENEFITS.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {!user && (
                  <>
                    <Link
                      to="/signup"
                      className="inline-flex justify-center rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition-all duration-200 hover:from-teal-400 hover:to-teal-500 active:scale-[0.98] sm:text-base"
                    >
                      Get started free
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex justify-center rounded-xl border-2 border-slate-300 bg-white px-8 py-3.5 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:border-teal-400 hover:bg-teal-50/50 sm:text-base"
                    >
                      Log in
                    </Link>
                  </>
                )}
                <Link
                  to="/dashboard"
                  className="inline-flex justify-center rounded-xl border-2 border-teal-600 bg-teal-50 px-8 py-3.5 text-center text-sm font-semibold text-teal-900 transition hover:bg-teal-100 sm:text-base"
                >
                  {user ? "Open dashboard" : "View dashboard"}
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                Questions? Jump to{" "}
                <a href="#faq" className="font-medium text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900">
                  FAQ
                </a>{" "}
                or{" "}
                <a href="#contact" className="font-medium text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900">
                  contact us
                </a>
                .
              </p>
            </div>
            <HeroTaskPreview />
          </div>
        </div>
      </section>

      {/* Band 2 — soft gray (features) */}
      <section className="w-full bg-gradient-to-b from-slate-100/98 via-slate-50 to-white py-14 sm:py-16">
        <div className={SHELL}>
          <WebsiteFeatures />
        </div>
      </section>

      {/* Band 3 — cool mint / cyan (FAQ) */}
      <section
        id="faq"
        className="scroll-mt-24 w-full bg-gradient-to-br from-cyan-50 via-teal-50/70 to-sky-100/80 py-14 sm:py-16"
      >
        <div className={SHELL}>
          <FAQSection />
        </div>
      </section>

      {/* Band 4 — warm blush / peach (contact) */}
      <section
        id="contact"
        className="scroll-mt-24 w-full bg-gradient-to-br from-rose-50 via-teal-50/70 to-sky-50 py-14 sm:py-16"
      >
        <div className={SHELL}>
          <ContactSection />
        </div>
      </section>
    </>
  );
}
