import { useAuth } from "@/context/AuthContext";

/**
 * Replaces the full site navbar on /dashboard: signed-in label + logout only.
 */
export default function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/70 bg-gradient-to-r from-emerald-50/95 via-white/90 to-teal-50/80 shadow-sm shadow-emerald-900/[0.04] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[min(72rem,calc(100%-2rem))] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10 xl:px-12">
        <p className="text-sm text-stone-600 sm:text-[0.95rem]">
          Signed in as{" "}
          <span className="font-semibold text-emerald-900/85 break-all">{user?.name ? `${user.name} (${user.email})` : user?.email}</span>
        </p>
        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-stone-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/80 hover:text-emerald-900"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
