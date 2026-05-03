import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DashboardHeader from "@/components/DashboardHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Main app: top nav + content + footer (used for home, dashboard, static pages).
 * Dashboard uses a minimal header (signed in + logout) instead of the full navbar, and no footer.
 */
export default function MainLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col">
      {isDashboard ? <DashboardHeader /> : <Navbar />}
      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
      {!isDashboard && <SiteFooter />}
    </div>
  );
}
