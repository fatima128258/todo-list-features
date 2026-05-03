import { useId, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-white/25 bg-white/10 py-3 pl-4 pr-12 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/30 sm:text-sm";

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

/**
 * Password input with show/hide toggle (auth pages — dark glass style).
 */
export default function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  minLength,
  autoComplete,
}) {
  const [show, setShow] = useState(false);
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className={inputClass}
        />
        <button
          type="button"
          className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          onClick={() => setShow((s) => !s)}
          tabIndex={0}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
        >
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
}
