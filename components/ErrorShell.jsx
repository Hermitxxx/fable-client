import Link from "next/link";

/**
 * Shared shell for the 404 / 403 / 401 pages.
 * Renders an ukiyo-e "print" panel (illustration + title plate) beside
 * a text panel, inside a single bordered card — like a mounted print.
 *
 * Built only from classes already defined in globals.css
 * (border-ink, border-ink-thin, shadow-ink, btn-primary, btn-ghost,
 * section-heading) plus the Tailwind utilities generated from the
 * --color-* tokens in the @theme block (bg-paper, text-ink, text-wave, etc).
 */
export default function ErrorShell({
    code,
    plate,
    title,
    description,
    illustration,
    primary,
    secondary,
}) {
    return (
        <main className="min-h-[100dvh] flex items-center justify-center px-4 py-12 md:px-6">
            <div className="ukiyo-fade-in w-full max-w-4xl rounded-lg border-ink shadow-ink bg-paper">
                <div className="grid gap-6 p-6 md:grid-cols-[1.05fr_1fr] md:gap-8 md:p-10">
                    {/* Illustration — mounted like a print in its own mat/frame */}
                    <div className="relative flex flex-col items-center justify-center gap-4 rounded-md border-ink-thin p-6 md:p-8">
                        <span className="rounded-full border-ink-thin bg-paper px-3 py-1 text-center text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink/70">
                            {plate}
                        </span>
                        <div className="w-full max-w-[280px]">{illustration}</div>
                    </div>

                    {/* Copy + actions */}
                    <div className="flex flex-col justify-center gap-6 py-2 md:py-4">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-wave">
                                Error {code}
                            </p>
                            <h1 className="section-heading mb-4 text-3xl leading-tight md:text-4xl">
                                {title}
                            </h1>
                            <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink/85">
                                {description}
                            </p>
                        </div>

                        {(primary || secondary) && (
                            <div className="flex flex-wrap gap-3">
                                {primary && (
                                    <Link href={primary.href} className="btn-primary">
                                        {primary.label}
                                    </Link>
                                )}
                                {secondary && (
                                    <Link href={secondary.href} className="btn-ghost">
                                        {secondary.label}
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes ukiyoFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ukiyo-fade-in {
          animation: ukiyoFadeUp 420ms ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ukiyo-fade-in { animation: none; }
        }
      `}</style>
        </main>
    );
}