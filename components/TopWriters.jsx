import Image from "next/image";
import { BookOpen, BookOpenIcon } from "lucide-react";
import { getTopWriters } from "@/app/lib/api/writers";


export default async function TopWriters() {
  const writers = await getTopWriters()

  return (
    <section id="writers" className="py-16 md:py-24 bg-ink/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-heading text-3xl md:text-4xl">
            Top Writers
          </h2>
          <p className="mt-6 text-ink/60 max-w-lg">
            Meet the voices shaping our library. Verified writers bringing
            original stories to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {writers.map((writer) => (
            <article
              key={writer.name}
              className="card-ink p-5 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-ink mb-4">
                <Image
                  src={writer.profileImage}
                  alt={writer.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base font-bold">{writer.name}</h3>
              <p className="text-xs text-ink/60 mt-2 leading-relaxed line-clamp-2">
                {writer.bio}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-ink/70">
                <BookOpenIcon className="w-3.5 h-3.5" />
                {writer.booksCount} ebooks
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/writers" className="btn-ghost text-sm">
            View All Writers
          </a>
        </div>
      </div>
    </section>
  );
}
