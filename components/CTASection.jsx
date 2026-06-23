import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative bg-prussian border-y-3 border-ink overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C200,180 400,20 600,100 C800,180 1000,20 1200,100 L1200,200 L0,200 Z"
            fill="currentColor"
            className="text-paper"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-paper leading-tight">
            Your Next Great Read Awaits
          </h2>
          <p className="text-paper/70 text-lg">
            Join thousands of readers discovering original stories every day.
            No subscriptions, no algorithms — just great books.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/browse"
              className="btn-primary text-base bg-sun text-ink"
            >
              Browse Library
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/signup"
              className="btn-ghost text-base border-paper/40 text-paper hover:bg-paper/10"
            >
              Join as Writer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
