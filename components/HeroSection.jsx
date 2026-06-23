import { BookOpen, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 border-ink-thin rounded-full px-4 py-1.5 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-sun" />
              Now in Open Beta
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Discover Stories
              <br />
              Worth Keeping
            </h1>

            <p className="text-lg text-ink/70 max-w-lg leading-relaxed">
              A curated library of original ebooks from independent writers.
              Find your next favorite read or share your stories with the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#featured" className="btn-primary text-base">
                Start Reading
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#how-it-works" className="btn-ghost text-base">
                Become a Writer
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-full h-full border-3 border-ink bg-wave/10 rounded-lg" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-3 border-ink bg-sun/10 rounded-lg" />
              <div className="relative border-3 border-ink rounded-lg overflow-hidden bg-prussian p-8 shadow-ink">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-sun/20 border-2 border-ink flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-sun" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-paper">The Last Cartographer</div>
                      <div className="text-xs text-paper/60">by Yuki Tanaka</div>
                    </div>
                  </div>
                  <div className="h-px bg-ink/30" />
                  <div>
                    {/* <div className="h-2 bg-paper/20 rounded w-full" />
                    <div className="h-2 bg-paper/20 rounded w-5/6" />
                    <div className="h-2 bg-paper/20 rounded w-4/6" /> */}
                    <p className="text-xs text-paper/60 max-w-lg leading-relaxed">
                      The ancient Guild of Cartographers is gone, and Arlen Brescer is running out of places to hide. Discover The Last Cartographer—an epic fantasy thriller where the pen doesn&apos;t just rival the sword; it redraws existence itself.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="px-2 py-0.5 bg-sun/20 border border-sun rounded text-xs text-paper">
                      Fantasy
                    </div>
                    <div className="px-2 py-0.5 bg-paper/10 border border-paper/30 rounded text-xs text-paper/70">
                      342 pages
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
