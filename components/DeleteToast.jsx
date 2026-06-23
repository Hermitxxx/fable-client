"use client";

import React from "react";

// A custom cracked red wax stamp seal representing an unsealed/revoked book scroll
const TrashSealIcon = () => (
    <svg
        viewBox="0 0 40 40"
        className="w-10 h-10 text-[#E85D35] fill-current shrink-0 animate-pulse"
        aria-hidden="true"
    >
        {/* Stamp circle border */}
        <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="32 4 12 4" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
        {/* Fractures slicing through stamp representing deletion/revocation */}
        <path d="M8,20 L32,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20,8 L20,32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Interior kanji/traditional stamp character strokes */}
        <path d="M16,14 L24,26 M24,14 L16,26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

export default function DeleteSuccessToast({ title, onClose }) {
    return (
        <div className="max-w-md w-full sm:w-[420px] bg-paper border-3 border-ink shadow-ink p-5 rounded-lg flex items-start gap-4 transition-all duration-300">

            {/* Dynamic Red Wax Stamp Seal Icon */}
            <TrashSealIcon />

            {/* Toast Content Area */}
            <div className="flex-1 space-y-1">
                <h4 className="text-sun font-display font-black text-sm uppercase tracking-wider leading-none mb-1.5">
                    Manuscript Revoked
                </h4>
                <p className="text-ink/80 text-[11px] font-medium leading-relaxed font-display">
                    The scroll <span className="font-bold">&quot;{title.toUpperCase()}&quot;</span> has been unsealed and removed from the library vault registry.
                </p>
            </div>

            {/* Close/Dismiss Button */}
            <button
                onClick={onClose}
                className="text-ink/40 hover:text-ink font-bold text-xs p-1 cursor-pointer transition-colors"
                aria-label="Dismiss Notification"
            >
                ✕
            </button>
        </div>
    );
}
