/**
 * LoadingSpinner — a small inline loading indicator.
 *
 * The design system's checklist explicitly bans plain circular spinners
 * in favor of shimmer/skeleton patterns, so instead of a ring this reuses
 * the "foam claw" wave-crest motif from the 404 illustration: three small
 * crests bobbing in sequence, like a rolling tide. Drop it into a button,
 * a loading.js route file, or anywhere you'd normally reach for a spinner.
 *
 * Usage:
 *   <LoadingSpinner />
 *   <LoadingSpinner label="Saving" size={20} />
 */
const CLAWS = [
    { color: "var(--color-wave)", delay: "0ms" },
    { color: "var(--color-sun)", delay: "120ms" },
    { color: "var(--color-prussian)", delay: "240ms" },
];

export default function LoadingSpinner({ label = "Loading", size = 16 }) {
    return (
        <span role="status" className="inline-flex items-center gap-1">
            <span className="sr-only">{label}…</span>

            {CLAWS.map((claw, i) => (
                <svg
                    key={i}
                    viewBox="0 0 24 24"
                    width={size}
                    height={size}
                    aria-hidden="true"
                    className="ukiyo-tide"
                    style={{ animationDelay: claw.delay }}
                >
                    <path
                        d="M3 19 L8 5 L12 19 L16 5 L21 19 L12 13 Z"
                        style={{ fill: claw.color }}
                        stroke="var(--color-ink)"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}

            <style>{`
        @keyframes ukiyoTide {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-35%); }
        }
        .ukiyo-tide {
          animation: ukiyoTide 900ms ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ukiyo-tide { animation: none; }
        }
      `}</style>
        </span>
    );
}