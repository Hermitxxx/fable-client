import { BookOpen, Users, UserCheck } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "2,400+", label: "Original Ebooks" },
  { icon: Users, value: "850+", label: "Verified Writers" },
  { icon: UserCheck, value: "12,000+", label: "Active Readers" },
];

export default function StatsSection() {
  return (
    <section className="bg-prussian border-y-3 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/30">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-center gap-4 py-8 md:py-12 px-6"
            >
              <stat.icon className="w-8 h-8 text-sun flex-shrink-0" strokeWidth={2} />
              <div>
                <div className="text-3xl font-bold text-paper">{stat.value}</div>
                <div className="text-sm text-paper/70">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
