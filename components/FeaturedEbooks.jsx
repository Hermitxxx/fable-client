import Image from "next/image";
import { Star, StarIcon } from "lucide-react";
import { getFeaturedBooks } from "@/app/lib/api/books";


export default async function FeaturedEbooks() {
  const books = await getFeaturedBooks()
  return (
    <section id="featured" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-heading text-3xl md:text-4xl">
            Featured Ebooks
          </h2>
          <p className="mt-6 text-ink/60 max-w-lg">
            Handpicked stories from our most celebrated writers. Every book
            curated for quality and originality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <article key={book.title} className="card-ink overflow-hidden group cursor-pointer">
              <div className="aspect-[6/7] overflow-hidden">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width={400}
                  height={560}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-sun/15 border border-sun/40 rounded text-xs font-medium text-ink">
                    {book.genre}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-ink/60">
                    <StarIcon className="w-3 h-3 fill-ochre text-ochre" />
                    {book.rating}
                  </span>
                </div>
                <h3 className="text-lg font-bold leading-snug">{book.title}</h3>
                <p className="text-sm text-ink/60">by {book.writerName}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/browse" className="btn-ghost text-sm">
            View All Ebooks
          </a>
        </div>
      </div>
    </section>
  );
}
