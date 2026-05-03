import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "How do I start using Task Manager?",
    a: "Click Sign up, enter your name, email, and password, then submit. You will be taken to the Dashboard automatically. If you already have an account, use Log in instead with your email and password.",
  },
  {
    q: "How do I add a new task?",
    a: "Open Dashboard (from the top menu). Enter the task title, optional notes, choose a background color and font style if you like, pick a date, select a status (Pending / not complete yet / Completed), then click Submit. Your task appears in the list on the right (or below on mobile).",
  },
  {
    q: "How do I edit or delete a task?",
    a: "On each task card, use Edit to change it (the form fills with your current values—update and submit). Use Delete to remove one task. Clear All removes every task at once (a short confirmation dialog appears first).",
  },
  {
    q: "How do I sort my tasks?",
    a: "Click Sort by date on the Dashboard. Tasks are ordered from earliest to latest by the date you chose.",
  },
  {
    q: "How do I log out or know I am signed in?",
    a: "When you are logged in, you will see your email (or name) in the top bar and a Log out button. Click Log out to leave your account. The Dashboard is only for signed-in users; if you are not logged in, you will be asked to log in first.",
  },
  {
    q: "How do I contact you?",
    a: "Use the Contact section on this page (link in the menu or scroll down). Enter your name, email, and message and submit—we receive it by email.",
  },
  {
    q: "Can I use this on my phone?",
    a: "Yes. The site is built to work on phones, tablets, and desktops. Open the menu links as usual; on small screens, the task form and list stack vertically.",
  },
  {
    q: "I signed up—will I get an email?",
    a: "Yes—you should get a short welcome email at the address you used to register, usually within a minute. Check your inbox and spam folder. You can use Task Manager even if the email is delayed or missing; signing in works the same.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <div className="rounded-3xl border border-teal-200/70 bg-white/90 p-6 shadow-xl shadow-teal-900/[0.06] sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">FAQ</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tap a question for step-by-step help on how to use this website.
        </p>

        <ul className="mt-6 divide-y divide-teal-100 rounded-xl border border-teal-100/80 bg-teal-50/30">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            return (
              <li key={item.q} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="group flex w-full items-center justify-between gap-3 rounded-lg px-4 py-4 text-left text-sm font-semibold text-slate-900 transition-all duration-200 ease-out hover:bg-teal-50/90 active:scale-[0.995] sm:text-base"
                  aria-expanded={open}
                >
                  <span className="transition-colors duration-200 group-hover:text-teal-900">{item.q}</span>
                  <span
                    className={`shrink-0 text-teal-600 transition-transform duration-300 ease-in-out ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`border-t border-teal-100/80 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-700 transition-[opacity,transform] duration-300 ease-out sm:text-base ${
                        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
