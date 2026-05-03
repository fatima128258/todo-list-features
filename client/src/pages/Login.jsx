import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/ToastProvider";
import FormInput from "@/components/ui/FormInput";
import PasswordField from "@/components/ui/PasswordField";
import AppButton from "@/components/ui/AppButton";

export default function Login() {
  const { user, completeAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { showToast } = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { ok, data } = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: form.email.trim(), password: form.password }),
    });
    setLoading(false);
    if (!ok) {
      showToast(data?.message || "Login failed.", "error");
      return;
    }
    completeAuth(data);
    showToast("Welcome back!", "success");
    navigate(from, { replace: true });
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Log in</h1>
          <p className="mt-1 text-sm text-slate-300">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormInput
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
          />
          <PasswordField
            label="Password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <p className="text-xs leading-relaxed text-slate-400">
            After login, the server gives your browser a{" "}
            <abbr title="JSON Web Token — proves you are logged in without sending your password every time" className="cursor-help border-b border-dotted border-slate-500">
              JWT
            </abbr>{" "}
            token. It is stored locally and sent with each request to protect your tasks.
          </p>
          <AppButton type="submit" disabled={loading} fullWidth variant="primary">
            {loading ? "Signing in…" : "Log in"}
          </AppButton>
        </form>
        <p className="mt-6 text-center text-sm text-slate-200 sm:text-base">
          No account?{" "}
          <Link to="/signup" className="font-semibold text-teal-300 underline decoration-teal-400/50 underline-offset-2 hover:text-teal-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
