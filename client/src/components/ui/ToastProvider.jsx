import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ToastContext = createContext(null);

let idCounter = 0;

/**
 * @typedef {{ title?: string, message: string, confirmLabel?: string, cancelLabel?: string, variant?: 'danger' | 'default' }} ConfirmOptions
 */

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [confirmShown, setConfirmShown] = useState(false);
  const confirmRef = useRef(null);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 320);
  }, []);

  const showToast = useCallback(
    (message, type = "info") => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
      window.setTimeout(() => dismissToast(id), 4000);
    },
    [dismissToast]
  );

  /** @param {ConfirmOptions} opts @returns {Promise<boolean>} */
  const confirmAction = useCallback((opts) => {
    return new Promise((resolve) => {
      const payload = {
        title: opts.title ?? "Please confirm",
        message: opts.message,
        confirmLabel: opts.confirmLabel ?? "OK",
        cancelLabel: opts.cancelLabel ?? "Cancel",
        variant: opts.variant ?? "default",
        resolve,
      };
      confirmRef.current = payload;
      setConfirm(payload);
    });
  }, []);

  const finishConfirm = useCallback((result) => {
    const c = confirmRef.current;
    if (!c?.resolve) return;
    setConfirmShown(false);
    window.setTimeout(() => {
      c.resolve(result);
      confirmRef.current = null;
      setConfirm(null);
    }, 280);
  }, []);

  useEffect(() => {
    if (confirm) {
      const id = requestAnimationFrame(() => setConfirmShown(true));
      return () => cancelAnimationFrame(id);
    }
    setConfirmShown(false);
  }, [confirm]);

  useEffect(() => {
    if (!confirm) return;
    function onKeyDown(e) {
      if (e.key === "Escape") finishConfirm(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirm, finishConfirm]);

  const value = useMemo(
    () => ({ showToast, confirmAction }),
    [showToast, confirmAction]
  );

  const confirmDanger = confirm?.variant === "danger";

  return (
    <ToastContext.Provider value={value}>
      {children}

      {confirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            className={`absolute inset-0 bg-stone-800/30 backdrop-blur-[3px] transition-opacity duration-300 ease-out ${
              confirmShown ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Dismiss"
            onClick={() => finishConfirm(false)}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            className={`relative z-10 w-full max-w-md rounded-2xl border border-stone-200/80 bg-gradient-to-b from-white to-stone-50/40 px-5 py-5 shadow-xl shadow-stone-900/10 transition-all duration-300 ease-out sm:px-6 sm:py-6 ${
              confirmShown ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.98] opacity-0"
            }`}
          >
            <h3 id="confirm-dialog-title" className="text-lg font-semibold text-slate-700">
              {confirm.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{confirm.message}</p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => finishConfirm(false)}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-200/60"
              >
                {confirm.cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => finishConfirm(true)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${
                  confirmDanger
                    ? "bg-rose-500/95 hover:bg-rose-600 focus:ring-rose-300"
                    : "bg-emerald-600/95 hover:bg-emerald-600 focus:ring-emerald-300"
                }`}
              >
                {confirm.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="pointer-events-none fixed right-3 top-3 z-[100] flex max-w-[min(100vw-1.5rem,20rem)] flex-col gap-2 sm:right-4 sm:top-4"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto transform rounded-xl border px-4 py-3 text-sm font-medium shadow-md transition-[opacity,transform] duration-300 ease-out sm:text-base ${
              t.exiting
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100 animate-toast-in"
            } ${
              t.type === "error"
                ? "border-rose-200/90 bg-rose-50/95 text-rose-900 shadow-stone-900/10"
                : t.type === "success"
                  ? "border-emerald-200/90 bg-emerald-50/95 text-emerald-900 shadow-stone-900/10"
                  : "border-stone-200/90 bg-white/95 text-slate-700 shadow-stone-900/10"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
