import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/ToastProvider";
import FormInput from "@/components/ui/FormInput";
import PasswordField from "@/components/ui/PasswordField";
import AppButton from "@/components/ui/AppButton";

export default function Signup() {
  const { user, completeAuth } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      showToast("Name must be at least 2 characters.", "error");
      return;
    }
    if (form.password.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }
    setLoading(true);
    const { ok, data } = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      }),
    });
    setLoading(false);
    if (!ok) {
      showToast(data?.message || "Signup failed.", "error");
      return;
    }
    completeAuth(data);
    showToast("Account created! You're signed in.", "success");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Sign up</h1>
          <p className="text-sm text-slate-300">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormInput
            label="Full name"
            name="name"
            type="text"
            required
            minLength={2}
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="name"
          />
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
            minLength={6}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="new-password"
          />
          <p className="text-xs leading-relaxed text-slate-400">
            We use a{" "}
            <abbr title="JSON Web Token — a signed ticket from the server so you stay logged in" className="cursor-help border-b border-dotted border-slate-500">
              JWT
            </abbr>{" "}
            after sign-up so you do not need to send your password again for each action.
          </p>
          <AppButton type="submit" disabled={loading} fullWidth variant="primary">
            {loading ? "Creating account…" : "Sign up"}
          </AppButton>
        </form>
        <p className="mt-6 text-center text-sm text-slate-200 sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-teal-300 underline decoration-teal-400/50 underline-offset-2 hover:text-teal-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
