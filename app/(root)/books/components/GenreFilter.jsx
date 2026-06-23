"use client";

export default function GenreFilter({ genres, activeGenre, onGenreChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreChange(genre)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-200 ${
            activeGenre === genre
              ? "bg-sun text-ink border-ink"
              : "bg-transparent text-ink/60 border-ink/20 hover:border-ink/50"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
