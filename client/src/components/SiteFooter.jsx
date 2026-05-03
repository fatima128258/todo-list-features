import { Link } from "react-router-dom";

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

const social = [
  { label: "Facebook", href: "#", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
  { label: "YouTube", href: "#", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { label: "LinkedIn", href: "#", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Instagram", href: "#", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.67-.072-4.949-.2-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
];

const linkQuiet =
  "text-slate-300/95 transition-colors duration-200 hover:text-teal-200";
const linkContact =
  "font-medium text-teal-200 transition-colors duration-200 hover:text-teal-50 hover:underline hover:underline-offset-4 decoration-teal-300/60";

export default function SiteFooter() {
  return (
    <footer className="mt-auto w-full text-slate-100">
      {/* CTA strip — soft mint / sky */}
      <div className="border-b border-teal-200/40 bg-gradient-to-r from-teal-100 via-emerald-50 to-sky-100 px-4 py-4 sm:px-6 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-3 text-sm text-slate-700 sm:text-base">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-200/90 text-teal-800 shadow-sm">
              <PhoneIcon className="h-6 w-6" />
            </span>
            <p>
              If you have any query, contact us{" "}
              <span className="font-semibold tabular-nums text-teal-900">0301 7277128</span>
            </p>
          </div>
          <Link
            to="/signup"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-teal-900/15 transition hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-900/20"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Main columns — dusty blue-green (soft, not flat gray) */}
      <div className="bg-gradient-to-b from-[#4a6672] to-[#3d565f] px-4 py-12 sm:px-6 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-300/35 text-lg text-teal-100 shadow-inner ring-1 ring-teal-200/20">
                ⚡
              </span>
              <div>
                <p className="text-lg font-bold tracking-wide text-white">TASK MANAGER</p>
                <p className="text-xs text-teal-100/75">Organize your day with clarity</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-teal-50/70">
              A simple place to capture tasks, due dates, and status—so you can focus on what matters and
              finish with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-50/90">Address</h3>
            <ul className="mt-4 space-y-3 text-sm text-teal-50/75">
              <li className="flex gap-2">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <span>128 GB Jaranwala, Faisalabad</span>
              </li>
              <li className="flex gap-2">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <a href="tel:03017277128" className={`${linkQuiet}`}>
                  0301 7277128
                </a>
              </li>
              <li className="flex gap-2">
                <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <a href="mailto:fatimaramzan739@gmail.com" className={`${linkQuiet}`}>
                  fatimaramzan739@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-50/90">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className={linkQuiet}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#faq" className={linkQuiet}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className={linkQuiet}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-50/90">Account</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/signup" className={linkQuiet}>
                  Sign up
                </Link>
              </li>
              <li>
                <Link to="/#contact" className={linkContact}>
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-teal-900/30 bg-[#354950] px-4 py-5 sm:px-6 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-xs text-teal-100/50 sm:text-left">
            © {new Date().getFullYear()} Task Manager. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {social.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-800/40 text-teal-100/90 ring-1 ring-teal-600/30 transition hover:bg-teal-500/50 hover:text-white hover:ring-teal-400/40"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
