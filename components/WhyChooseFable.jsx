import { Shield, Library, Users, CreditCard } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Verified Writers",
    description:
      "Every writer is verified before publishing. No spam, no AI-generated filler — just authentic stories.",
  },
  {
    icon: Library,
    title: "Curated Collections",
    description:
      "Our editorial team handpicks books for quality. Every recommendation comes from a human reader.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Ratings, reviews, and reading lists from real readers help you discover your next favorite book.",
  },
  {
    icon: CreditCard,
    title: "One-Time Access",
    description:
      "Writers pay a single verification fee. No subscriptions, no hidden costs for readers.",
  },
];

export default function WhyChooseFable() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-heading text-3xl md:text-4xl">
            Why Choose Fable
          </h2>
          <p className="mt-6 text-ink/60 max-w-lg">
            Built for readers who care about quality. Designed for writers who
            want to share real stories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="card-ink p-6 flex gap-5"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-prussian/10 border-2 border-ink flex items-center justify-center">
                <reason.icon
                  className="w-6 h-6 text-prussian"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h3 className="text-base font-bold mb-2">{reason.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
