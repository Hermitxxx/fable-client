import { UserPlus, BookOpen, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in seconds. Readers can start browsing immediately. Writers complete a one-time verification to unlock uploads.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Browse & Read",
    description:
      "Explore our curated library by genre, mood, or writer. Read directly in your browser or save for later.",
  },
  {
    number: "03",
    icon: Users,
    title: "Share & Connect",
    description:
      "Rate books, follow your favorite writers, and join a community of readers who care about great storytelling.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-ink/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-heading text-3xl md:text-4xl">
            How Fable Works
          </h2>
          <p className="mt-6 text-ink/60 max-w-lg">
            Three simple steps to start your reading journey or share your
            stories with the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative card-ink p-8 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-ochre/30">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-lg bg-sun/15 border-2 border-ink flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-sun" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-ink/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
