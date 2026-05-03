const inputStyles = {
  dark: "w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/30 sm:text-sm",
  light:
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/25 sm:text-sm",
};

const labelStyles = {
  dark: "mb-1.5 block text-sm font-medium text-slate-200",
  light: "mb-1.5 block text-sm font-medium text-slate-800",
};

/**
 * Reusable labeled input (controlled). Use variant="light" on light cards (e.g. Contact).
 */
export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  minLength,
  autoComplete,
  className = "",
  variant = "dark",
}) {
  const v = variant === "light" ? "light" : "dark";
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className={labelStyles[v]}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className={inputStyles[v]}
      />
    </div>
  );
}
