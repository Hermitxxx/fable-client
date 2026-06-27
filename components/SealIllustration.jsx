/**
 * A document with a blank circle awaiting a personal seal (hanko),
 * beside the inked stamp itself — for the 401 (unauthorized) plate.
 */
export default function SealIllustration() {
    return (
        <svg
            viewBox="0 0 400 320"
            className="h-auto w-full"
            role="img"
            aria-label="A document with a blank circle awaiting a personal seal, beside an inked stamp ready to press"
        >
            {/* document */}
            <rect
                x="48"
                y="46"
                width="206"
                height="228"
                rx="6"
                style={{ fill: "var(--color-paper)" }}
                stroke="var(--color-ink)"
                strokeWidth="4"
            />

            {/* text lines */}
            <g stroke="var(--color-ink)" strokeWidth="2" opacity="0.45">
                <line x1="74" y1="84" x2="228" y2="84" />
                <line x1="74" y1="104" x2="228" y2="104" />
                <line x1="74" y1="124" x2="202" y2="124" />
                <line x1="74" y1="144" x2="222" y2="144" />
                <line x1="74" y1="164" x2="190" y2="164" />
            </g>

            {/* empty seal circle */}
            <circle
                cx="196"
                cy="222"
                r="29"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="3"
                strokeDasharray="6 6"
            />

            {/* hanko stamp, tilted and ready */}
            <g transform="translate(312,206) rotate(18)">
                <rect
                    x="-26"
                    y="-72"
                    width="52"
                    height="72"
                    rx="6"
                    style={{ fill: "var(--color-ochre)" }}
                    stroke="var(--color-ink)"
                    strokeWidth="4"
                />
                <ellipse
                    cx="0"
                    cy="6"
                    rx="31"
                    ry="10"
                    style={{ fill: "var(--color-sun)" }}
                    stroke="var(--color-ink)"
                    strokeWidth="3.5"
                />
            </g>
        </svg>
    );
}