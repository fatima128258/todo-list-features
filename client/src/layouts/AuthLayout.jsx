import { Link, Outlet } from "react-router-dom";

const AUTH_BG =
  "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2023/11/black-and-gold-vector.jpg?ssl=1";

/**
 * Full-viewport auth shell: hero image + glass card (no main app chrome).
 */
export default function AuthLayout() {
  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${AUTH_BG}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/55 sm:bg-black/50" aria-hidden />

      <header className="relative z-10 px-4 pt-5 sm:px-6">
        <Link
          to="/"
          className="inline-block text-lg font-bold tracking-tight text-white drop-shadow-md transition hover:text-teal-200 sm:text-xl"
        >
          Task Manager
        </Link>
      </header>

      <div className="relative z-10 flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 pb-10 pt-6 sm:min-h-[calc(100vh-5rem)] sm:px-6 sm:pb-12">
        <Outlet />
      </div>
    </div>
  );
}
