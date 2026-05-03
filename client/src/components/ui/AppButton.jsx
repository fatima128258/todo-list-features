export default function AppButton({
  children,
  type = "button",
  onClick,
  disabled,
  fullWidth,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-55 sm:text-sm";
  const variants = {
    primary:
      "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-900/20 hover:from-teal-400 hover:to-teal-500 focus-visible:outline-teal-300",
    ghost:
      "border border-white/30 bg-white/10 text-white hover:bg-white/15 focus-visible:outline-white/50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
