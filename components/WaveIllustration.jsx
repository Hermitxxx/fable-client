/**
 * A small boat lost in a cresting wave — for the 404 (page adrift) plate.
 */
export default function WaveIllustration() {
    return (
        <svg
            viewBox="0 0 400 320"
            className="h-auto w-full"
            role="img"
            aria-label="A small boat adrift in a great cresting wave, in the style of a traditional woodblock print"
        >
            {/* distant peak */}
            <path
                d="M40 150 L122 58 L172 150 Z"
                style={{ fill: "var(--color-ink)", opacity: 0.08 }}
            />

            {/* back swell */}
            <path
                d="M-10 195 C55 150 110 215 170 175 C230 135 280 195 340 165 C375 148 400 155 410 150 L410 320 L-10 320 Z"
                style={{ fill: "var(--color-prussian)", opacity: 0.45 }}
            />

            {/* great wave */}
            <path
                d="M-10 235 C40 152 92 130 142 167 C162 118 212 92 252 130 C277 98 322 92 347 124 C367 102 396 108 410 130 L410 320 L-10 320 Z"
                style={{ fill: "var(--color-wave)" }}
                stroke="var(--color-ink)"
                strokeWidth="4"
                strokeLinejoin="round"
            />

            {/* foam claws */}
            <g
                style={{ fill: "var(--color-paper)" }}
                stroke="var(--color-ink)"
                strokeWidth="3"
                strokeLinejoin="round"
            >
                <path d="M132 170 L144 150 L153 171 L165 152 L171 173 L151 184 Z" />
                <path d="M242 132 L254 113 L262 134 L274 115 L280 136 L259 147 Z" />
                <path d="M337 126 L347 110 L354 128 L364 113 L368 132 L349 141 Z" />
            </g>

            {/* boat, tossed */}
            <g transform="translate(150,196) rotate(-9)">
                <path
                    d="M-46 10 Q0 31 46 10 L37 25 L-37 25 Z"
                    style={{ fill: "var(--color-ochre)" }}
                    stroke="var(--color-ink)"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                />
                <line
                    x1="0"
                    y1="10"
                    x2="0"
                    y2="-31"
                    stroke="var(--color-ink)"
                    strokeWidth="3"
                />
                <path
                    d="M2 -29 L35 -10 L2 7 Z"
                    style={{ fill: "var(--color-sun)" }}
                    stroke="var(--color-ink)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}