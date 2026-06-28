"use client";

import toast from "react-hot-toast";
import { AlertCircleIcon, Check, Trash2, X } from "lucide-react";

/**
 * Fire this from your delete handler:
 *
 *   await deleteUser(user.id);
 *   showUserDeletedToast(user.name);
 *
 * Requires <Toaster position="top-right" /> mounted once in your layout.
 */
export function alertToast(msg, { duration = 4000 } = {},) {
    toast.custom(
        (t) => (
            <div
                className={`flex w-[360px] items-start gap-3 rounded-lg border-ink bg-paper p-4 shadow-ink ${t.visible ? "toast-in" : "toast-out"
                    }`}
                style={{ fontFamily: "var(--font-display)" }}
                role="status"
            >
                {/* Hanko-style ink stamp, slightly canted like a hand-pressed seal */}
                <div className="flex h-10 w-10 shrink-0 -rotate-6 items-center justify-center rounded-full border-ink-thin bg-sun">
                    <AlertCircleIcon size={18} className="text-ink" strokeWidth={2.5} />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[0.95rem] font-semibold leading-tight text-ink">
                        {msg}
                    </p>
                </div>

                <button
                    onClick={() => toast.dismiss(t.id)}
                    aria-label="Dismiss"
                    className="shrink-0 text-ink/50 transition-colors hover:text-ink"
                >
                    <X size={16} />
                </button>

                <style jsx>{`
          .toast-in {
            animation: toast-enter 320ms cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .toast-out {
            animation: toast-exit 180ms ease-in both;
          }
          @keyframes toast-enter {
            from {
              opacity: 0;
              transform: translateY(-14px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes toast-exit {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateY(-8px) scale(0.96);
            }
          }
        `}</style>
            </div>
        ),
        { duration }
    );
}