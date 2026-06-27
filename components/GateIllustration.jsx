/**
 * A torii gate bound shut with a shimenawa rope and shide streamers —
 * the traditional Shinto marker for a sacred / off-limits boundary —
 * for the 403 (forbidden) plate.
 */
export default function GateIllustration() {
    return (
        <svg
            viewBox="0 0 400 320"
            className="h-auto w-full"
            role="img"
            aria-label="A torii gate bound shut with a sacred rope and paper streamers, marking a forbidden threshold"
        >
            {/* ground line */}
            <line
                x1="20"
                y1="282"
                x2="380"
                y2="282"
                stroke="var(--color-ink)"
                strokeWidth="4"
                strokeLinecap="round"
            />

            {/* pillars */}
            <rect
                x="90"
                y="70"
                width="22"
                height="212"
                rx="3"
                style={{ fill: "var(--color-sun)" }}
                stroke="var(--color-ink)"
                strokeWidth="4"
            />
            <rect
                x="288"
                y="70"
                width="22"
                height="212"
                rx="3"
                style={{ fill: "var(--color-sun)" }}
                stroke="var(--color-ink)"
                strokeWidth="4"
            />

            {/* tie beam (nuki) */}
            <rect
                x="80"
                y="122"
                width="240"
                height="16"
                rx="2"
                style={{ fill: "var(--color-sun)" }}
                stroke="var(--color-ink)"
                strokeWidth="4"
            />

            {/* curved top beam (kasagi) */}
            <path
                d="M55 76 Q200 36 345 76 L345 96 Q200 59 55 96 Z"
                style={{ fill: "var(--color-sun)" }}
                stroke="var(--color-ink)"
                strokeWidth="4"
                strokeLinejoin="round"
            />
            <rect
                x="68"
                y="99"
                width="264"
                height="14"
                rx="2"
                style={{ fill: "var(--color-ochre)" }}
                stroke="var(--color-ink)"
                strokeWidth="3.5"
            />

            {/* shimenawa rope across the opening */}
            <path
                d="M95 168 Q150 152 200 168 Q250 184 305 162"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="10"
                strokeLinecap="round"
            />
            <path
                d="M95 168 Q150 152 200 168 Q250 184 305 162"
                fill="none"
                style={{ stroke: "var(--color-ochre)" }}
                strokeWidth="4.5"
                strokeLinecap="round"
            />

            {/* shide — zigzag paper streamers */}
            <g
                stroke="var(--color-ink)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                style={{ fill: "var(--color-paper)" }}
            >
                <path d="M150 160 L158 180 L150 194 L158 214 L142 214 L150 194 L142 180 Z" />
                <path d="M255 170 L263 190 L255 204 L263 224 L247 224 L255 204 L247 190 Z" />
            </g>
        </svg>
    );
}