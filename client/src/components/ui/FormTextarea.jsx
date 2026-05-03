const styles = {
  dark: "min-h-[120px] w-full resize-none rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-base text-white outline-none placeholder:text-slate-400 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/30 sm:text-sm",
  light:
    "min-h-[120px] w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/25 sm:text-sm",
};

const labelStyles = {
  dark: "mb-1.5 block text-sm font-medium text-slate-200",
  light: "mb-1.5 block text-sm font-medium text-slate-800",
};

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  minLength,
  rows = 5,
  variant = "dark",
}) {
  const v = variant === "light" ? "light" : "dark";
  return (
    <div>
      {label && (
        <label htmlFor={name} className={labelStyles[v]}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        rows={rows}
        className={styles[v]}
      />
    </div>
  );
}
