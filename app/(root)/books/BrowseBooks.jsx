"use client";

import React, { useState, useMemo } from "react";
import BookCard from "./components/BookCard";

// Inline Custom SVGs to replace external icons and prevent external asset latency
const WaveCrestIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current" aria-hidden="true">
    <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
    <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" />
    <circle cx="28" cy="35" r="3" />
    <circle cx="48" cy="20" r="2.5" />
    <circle cx="72" cy="40" r="3.5" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const BookOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const BrushIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <path d="M18 11l-6-6-8 8V21h8l6-6z" />
    <path d="M11 6l4 4" />
    <path d="M14 15l4 4" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-4 h-4 text-sun">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GoldInkBoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-ochre">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ALL_GENRES = ["All Genres", "Fiction", "Waka Poetry", "Folklore", "Historical Scroll", "Scribe Journal"];
const ALL_WRITERS = ["All Scribes", "Albert Dera", "Master Basho", "Murasaki Shikibu", "Chiyo-ni", "Hokusai"];

export default function BrowseBooksPage({ books }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedWriter, setSelectedWriter] = useState("All Scribes");
  const [activeBookPreview, setActiveBookPreview] = useState(null);

  const featuredBook = books.find((b) => b.rating > 4.8);


  return (
    <main className="min-h-[100dvh] mt-16 bg-paper text-ink font-display py-8 px-4 md:px-8 max-w-[1280px] mx-auto relative">

      { }
      <section className="grid grid-cols-1 gap-8 items-center">

        {/* Left Side: Filter Control Board */}
        <aside className="lg:col-span-4 bg-paper border-ink p-6 rounded-lg shadow-ink relative">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <FilterIcon />
              <h3 className="font-bold text-lg tracking-wider uppercase">SCRIBE CONTROL PANEL</h3>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider block">Search Chronicles</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-ink/60 z-10">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Query title, scribe..."
                  className="w-full pl-10 pr-4 py-2.5 bg-paper text-sm border-2 border-ink rounded-md focus:outline-none focus:border-sun transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 text-ink/60 hover:text-ink cursor-pointer"
                  >
                    <CrossIcon />
                  </button>
                )}
              </div>
            </div>

            {/* Genre List selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider block">Filter by Genre</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
                {ALL_GENRES.map((genre) => {
                  const isActive = selectedGenre === genre;
                  return (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`text-[10px] sm:text-xs px-2 py-2.5 border-2 rounded transition-all cursor-pointer text-center w-full flex items-center justify-center font-bold tracking-wider leading-tight min-h-11 ${isActive
                        ? "bg-sun text-paper border-ink shadow-ink-sm -translate-y-0.5"
                        : "bg-transparent text-ink border-ink/30 hover:border-ink"
                        }`}
                    >
                      {genre.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scribes Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider block">Filter by Genre</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
                {ALL_WRITERS.map((writer) => {
                  const isActive = selectedWriter === writer;
                  return (
                    <button
                      key={writer}
                      onClick={() => setSelectedWriter(writer)}
                      className={`text-[10px] sm:text-xs px-2 py-2.5 border-2 rounded transition-all cursor-pointer text-center w-full flex items-center justify-center font-bold tracking-wider leading-tight min-h-11 ${isActive
                        ? "bg-sun text-paper border-ink shadow-ink-sm -translate-y-0.5"
                        : "bg-transparent text-ink border-ink/30 hover:border-ink"
                        }`}
                    >
                      {writer.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear filters trigger */}
            {(searchTerm || selectedGenre !== "All Genres" || selectedWriter !== "All Scribes") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenre("All Genres");
                  setSelectedWriter("All Scribes");
                }}
                className="btn-ghost w-full justify-center text-xs py-2 shadow-ink-sm mt-4"
              >
                RESTORE DEFAULT STACKS
              </button>
            )}
          </div>
        </aside>

        { }
        {/* Right Side: Responsive Book Grid */}
        <div className="lg:col-span-8 space-y-8">

          <div className="flex justify-between items-center border-b-2 border-ink/10 pb-4">
            <h2 className="section-heading text-xl font-extrabold tracking-wider">AVAILABLE CHRONICLES</h2>
            <span className="text-xs font-bold bg-wave text-paper px-3 py-1 rounded-md border-2 border-ink">
              {books.filter(book => book.parchment.toLowerCase() === 'published').length} SCROLLS FOUND
            </span>
          </div>

          {books.filter(book => book.parchment.toLowerCase() === 'published') === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-ink/30 rounded-lg p-8 bg-paper/50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-3 border-ink bg-sun text-paper shadow-ink-sm mx-auto mb-4">
                <BookOpenIcon />
              </div>
              <h3 className="font-bold text-lg text-ink tracking-wider uppercase">NO MATCHING SCROLLS</h3>
              <p className="text-sm text-ink/70 max-w-[40ch] mx-auto mt-2 leading-relaxed">
                No wooden blocks have been carved with your exact query. Try broadening your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenre("All Genres");
                  setSelectedWriter("All Scribes");
                }}
                className="btn-primary text-xs py-2 px-4 shadow-ink-sm mt-6"
              >
                RESET PLATFORM SEARCH
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {
                books.filter(book => book.parchment.toLowerCase() === 'published').map((book) => <BookCard book={book} key={book._id}></BookCard>)
              }
            </div>
          )}
        </div>
      </section>

      { }

    </main>
  );
}