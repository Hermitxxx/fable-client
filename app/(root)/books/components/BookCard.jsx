import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function BookCard({ book }) {
  return (
    <article className="card-ink overflow-hidden group cursor-pointer">
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
            <Star className="w-3 h-3 fill-ochre text-ochre" />
            {book.rating}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug">{book.title}</h3>
        <p className="text-sm text-ink/60">by {book.writerName}</p>
        <div className="flex items-center justify-between">
          {book.price != null && (
            <p className="text-sm font-bold text-sun">${book.price.toFixed(2)}</p>
          )}

          <Link href={`/books/${book._id}`} className="btn-primary text-sm py-2 px-4 text-center justify-center">
            See details
          </Link>
        </div>
      </div>
    </article>
  );
}
