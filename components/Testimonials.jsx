import Image from "next/image";
import { Quote, QuoteIcon } from "lucide-react";
import yami from '@/public/people/yami.jpg'
import endo from '@/public/people/endo.jpg'
import david from '@/public/people/david.jpg'

const testimonials = [
  {
    quote:
      "Fable introduced me to writers I never would have found elsewhere. The curation is genuinely thoughtful.",
    name: "Yami Sukehiro",
    role: "Avid Reader",
    avatar: yami,
  },
  {
    quote:
      "As a writer, I love that there's no algorithm game. My readers found me because they actually enjoy my genre.",
    name: "David Oyelaran",
    role: "Fantasy Writer",
    avatar: david,
  },
  {
    quote:
      "The one-time verification fee was fair. No recurring costs eating into my earnings. Just writing and sharing.",
    name: "Endo Yamato",
    role: "Sci-Fi Author",
    avatar: endo,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-ink/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-heading text-3xl md:text-4xl">
            What People Say
          </h2>
          <p className="mt-6 text-ink/60 max-w-lg">
            Real words from our readers and writers. No scripts, no edits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="card-ink p-6 flex flex-col"
            >
              <QuoteIcon className="w-8 h-8 text-ochre/40 mb-4" strokeWidth={2} />
              <p className="text-sm leading-relaxed text-ink/80 flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-ink/10">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-ink">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold">{item.name}</div>
                  <div className="text-xs text-ink/50">{item.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
