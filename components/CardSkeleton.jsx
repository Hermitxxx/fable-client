/**
 * CardSkeleton — a shimmering placeholder for a content card while data loads.
 * Matches the bordered, drop-shadow card language already in globals.css
 * (same border weight and shadow offset as .card-ink), without the hover
 * lift, since nothing here is actually interactive yet.
 *
 * Usage:
 *   <CardSkeleton />
 *   <CardSkeleton lines={3} showImage={false} />
 *   <CardSkeleton square />                          — compact 1:1 thumbnail layout
 *   {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} square />)}
 */
const SHIMMER_CSS = `
  .ukiyo-skel {
    position: relative;
    overflow: hidden;
    background-color: rgba(13, 13, 21, 0.08);
  }
  .ukiyo-skel::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      90deg,
      transparent,
      rgba(240, 227, 206, 0.85),
      transparent
    );
    background-size: 200% 100%;
    animation: ukiyoShimmer 1.6s ease-in-out infinite;
  }
  @keyframes ukiyoShimmer {
    0% { background-position: -150% 0; }
    100% { background-position: 150% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ukiyo-skel::after { animation: none; }
  }
`;

function SkeletonBar({ className = "", radius = "rounded-md", style }) {
    return <div className={`ukiyo-skel ${radius} ${className}`} style={style} />;
}

export default function CardSkeleton({
    square = false,
    lines = 2,
    showImage = true,
    showButton = true,
}) {
    if (square) {
        return (
            <div
                className="aspect-square flex flex-col gap-2 rounded-lg border-ink shadow-ink bg-paper p-3"
                role="status"
                aria-label="Loading content"
            >
                <span className="sr-only">Loading content…</span>
                <SkeletonBar className="w-full flex-1" />
                <SkeletonBar className="h-3 w-4/5" />
                <style>{SHIMMER_CSS}</style>
            </div>
        );
    }

    return (
        <div
            className="rounded-lg border-ink shadow-ink bg-paper p-5"
            role="status"
            aria-label="Loading content"
        >
            <span className="sr-only">Loading content…</span>

            {showImage && <SkeletonBar className="mb-4 h-40 w-full" />}

            <SkeletonBar className="mb-3 h-5 w-3/4" />

            <div className="mb-4 space-y-2">
                {Array.from({ length: lines }).map((_, i) => (
                    <SkeletonBar
                        key={i}
                        className="h-3.5"
                        style={{ width: i === lines - 1 ? "60%" : "100%" }}
                    />
                ))}
            </div>

            {showButton && <SkeletonBar className="h-9 w-28" radius="rounded-lg" />}

            <style>{SHIMMER_CSS}</style>
        </div>
    );
}