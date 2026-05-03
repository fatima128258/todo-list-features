import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/ToastProvider";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import AppButton from "@/components/ui/AppButton";

function ContactIllustration() {
  return (
    <div
      className="relative flex min-h-[280px] items-center justify-center lg:min-h-[320px]"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-100/80 via-rose-50/90 to-sky-100/75 blur-[1px]" />
      <div className="relative w-full max-w-sm rounded-3xl border border-teal-200/60 bg-white/95 p-6 shadow-lg shadow-teal-900/10 sm:p-8">
        <svg viewBox="0 0 280 240" className="h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="contactEnvelope" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          {/* Soft circles */}
          <circle cx="48" cy="42" r="28" fill="#ccfbf1" opacity="0.9" />
          <circle cx="230" cy="190" r="36" fill="#ffe4e6" opacity="0.85" />
          <circle cx="220" cy="48" r="18" fill="#fef3c7" opacity="0.95" />
          {/* Envelope */}
          <rect x="70" y="72" width="140" height="100" rx="10" fill="url(#contactEnvelope)" />
          <path d="M70 92 L140 135 L210 92" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
          <rect x="70" y="92" width="140" height="8" fill="white" opacity="0.2" />
          {/* @ mail */}
          <text x="140" y="138" textAnchor="middle" fill="white" fontSize="36" fontWeight="700" fontFamily="system-ui,sans-serif">
            @
          </text>
          {/* Chat bubble */}
          <path
            d="M32 168 Q32 148 52 148 L108 148 Q128 148 128 168 L128 198 Q128 208 118 208 L72 208 L52 222 L58 208 L52 208 Q32 208 32 188 Z"
            fill="white"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <line x1="52" y1="168" x2="108" y2="168" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          <line x1="52" y1="182" x2="96" y2="182" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          {/* Small hearts / dots */}
          <circle cx="190" cy="130" r="4" fill="#f43f5e" opacity="0.7" />
          <circle cx="204" cy="138" r="3" fill="#fb923c" opacity="0.8" />
        </svg>
        <p className="mt-2 text-center text-sm font-medium text-slate-600">
          We read every message and reply when we can.
        </p>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      showToast("Name must be at least 2 characters.", "error");
      return;
    }
    if (form.message.trim().length < 10) {
      showToast("Message must be at least 10 characters.", "error");
      return;
    }
    setLoading(true);
    const { ok, data } = await apiFetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    });
    setLoading(false);
    if (!ok) {
      showToast(data?.message || "Could not send message.", "error");
      return;
    }
    showToast("Message sent. Thanks!", "success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <div className="rounded-3xl border border-teal-200/70 bg-white/90 p-6 shadow-xl shadow-teal-900/[0.06] sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Contact us</h2>
            <p className="mt-2 text-sm text-slate-600">
              Fill in your name, email, and message. We will get back to you by email when possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-xl flex-col gap-4">
              <FormInput
                label="Name"
                name="name"
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                variant="light"
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                variant="light"
              />
              <FormTextarea
                label="Message"
                name="message"
                required
                minLength={10}
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                variant="light"
              />
              <AppButton type="submit" disabled={loading} variant="primary" className="w-full max-w-xs sm:w-auto">
                {loading ? "Sending…" : "Send message"}
              </AppButton>
            </form>
          </div>

          <ContactIllustration />
        </div>
      </div>
    </div>
  );
}
