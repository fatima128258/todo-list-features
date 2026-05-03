import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const linkClass = ({ isActive }) =>
  `px-2 py-1.5 rounded-md text-sm font-medium transition-colors sm:px-3 ${
    isActive
      ? "bg-slate-900/50 text-teal-100"
      : "text-slate-900 hover:bg-slate-900/20"
  }`;

const inactive = "px-2 py-1.5 rounded-md text-sm font-medium text-slate-900 transition-colors hover:bg-slate-900/20 sm:px-3";
const activeHash = "px-2 py-1.5 rounded-md text-sm font-medium bg-slate-900/50 text-teal-100 sm:px-3";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const homePlain = location.pathname === "/" && !location.hash;
  const faqActive = location.pathname === "/" && location.hash === "#faq";
  const contactActive = location.pathname === "/" && location.hash === "#contact";

  return (
    <header className="sticky top-0 z-50 border-b-2 border-slate-900/30 bg-slate-900/25 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 lg:px-14 py-3 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          Task Manager
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Main">
          <Link to="/" className={homePlain ? activeHash : inactive}>
            Home
          </Link>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <Link to="/#faq" className={faqActive ? activeHash : inactive}>
            FAQ
          </Link>
          <Link to="/#contact" className={contactActive ? activeHash : inactive}>
            Contact
          </Link>
          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md shadow-teal-900/15 transition-all duration-200 hover:bg-teal-500 active:scale-[0.98]"
              >
                Sign up
              </NavLink>
            </>
          )}
          {user && (
            <div className="flex w-full flex-col gap-2 sm:ml-2 sm:w-auto sm:flex-row sm:items-center">
              <span
                className="truncate text-xs text-slate-800 sm:max-w-[12rem] sm:text-sm"
                title={user.email}
              >
                {user.name ? `${user.name}` : user.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border-2 border-slate-900/40 bg-slate-100/80 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-200"
              >
                Log out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
