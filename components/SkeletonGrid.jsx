import CardSkeleton from "./CardSkeleton";


/**
 * SkeletonGrid — six small square skeleton cards, centered in a
 * full-height section. Drop straight into a route's loading.js, or
 * use it as a reference for your own grid.
 *
 * Note: the design system's anti-pattern list bans `h-screen` in favor
 * of `min-h-[100dvh]` (handles mobile browser chrome correctly), so
 * that's used here in place of `min-h-screen`.
 */
export default function SkeletonGrid() {
    return (
        <main className="min-h-[100dvh] flex items-center justify-center px-6 py-12">
            <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i} square />
                ))}
            </div>
        </main>
    );
}