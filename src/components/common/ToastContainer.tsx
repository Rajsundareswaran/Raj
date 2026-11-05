import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X, XCircle } from 'lucide-react';
import { useCityLens } from '../../context/CityLensContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCityLens();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-16 right-4 z-[90] flex w-full max-w-sm flex-col gap-2 pointer-events-none px-2 sm:px-0"
    >
      {toasts.map((toast) => {
        const icon =
          toast.tone === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : toast.tone === 'warning' ? (
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          ) : toast.tone === 'error' ? (
            <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
          );

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-[#223556] bg-[#0C1526]/95 p-3.5 shadow-2xl backdrop-blur-md"
          >
            {icon}
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-slate-100">{toast.title}</div>
              {toast.description && (
                <div className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                  {toast.description}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
