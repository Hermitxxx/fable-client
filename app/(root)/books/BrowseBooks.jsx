"use client";

import React, { useState, useTransition, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Pagination } from "@heroui/react";
import BookCard from "./components/BookCard";

// ─── icons ───────────────────────────────────────────────────────────────────

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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// How many page buttons to show around the current page
const SIBLING_COUNT = 1;

// ─── pagination range helper ──────────────────────────────────────────────────

function getPaginationRange(current, total) {
  // Always show: first, last, current ± SIBLING_COUNT, with "…" gaps
  const range = new Set([1, total]);
  for (let i = Math.max(2, current - SIBLING_COUNT); i <= Math.min(total - 1, current + SIBLING_COUNT); i++) {
    range.add(i);
  }
  const sorted = [...range].sort((a, b) => a - b);
  // Insert ellipsis markers
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
    result.push(sorted[i]);
  }
  return result;
}

// ─── component ────────────────────────────────────────────────────────────────

export default function BrowseBooksPage({
  writers,
  books = [],
  total = 0,
  totalPages = 1,
  currentPage = 1,
  currentSearch = "",
  currentGenre = "",
  currentWriter = "",
}) {
  const writersName = writers.map(writer => writer.name);
  const ALL_WRITERS = ["All Scribes", ...writersName]

  const genres = books.map(book => book.genre);
  const ALL_GENRES = ["All Genres", ... new Set(genres)]
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Local controlled state for inputs — only pushed to URL on submit/select
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [selectedGenre, setSelectedGenre] = useState(currentGenre || "All Genres");
  const [selectedWriter, setSelectedWriter] = useState(currentWriter || "All Scribes");

  // ── URL push helper ──────────────────────────────────────────────────────
  const pushParams = useCallback((overrides = {}) => {
    const next = {
      search: searchInput,
      genre: selectedGenre === "All Genres" ? "" : selectedGenre,
      writer: selectedWriter === "All Scribes" ? "" : selectedWriter,
      page: "1",           // reset to page 1 whenever filters change
      ...overrides,
    };
    const qs = new URLSearchParams();
    if (next.search) qs.set("search", next.search);
    if (next.genre) qs.set("genre", next.genre);
    if (next.writer) qs.set("writer", next.writer);
    if (next.page && next.page !== "1") qs.set("page", next.page);
    const url = qs.toString() ? `${pathname}?${qs}` : pathname;
    startTransition(() => router.push(url));
  }, [searchInput, selectedGenre, selectedWriter, pathname, router]);

  // ── handlers ─────────────────────────────────────────────────────────────

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    pushParams({ search: searchInput, page: "1" });
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    pushParams({
      genre: genre === "All Genres" ? "" : genre,
      page: "1",
    });
  };

  const handleWriterSelect = (writer) => {
    setSelectedWriter(writer);
    pushParams({
      writer: writer === "All Scribes" ? "" : writer,
      page: "1",
    });
  };

  const handleClearAll = () => {
    setSearchInput("");
    setSelectedGenre("All Genres");
    setSelectedWriter("All Scribes");
    startTransition(() => router.push(pathname));
  };

  const handlePageChange = (page) => {
    pushParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters =
    currentSearch || (currentGenre && currentGenre !== "All Genres") || (currentWriter && currentWriter !== "All Scribes");

  const paginationRange = getPaginationRange(currentPage, totalPages);

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-[100dvh] my-16 bg-paper text-ink font-display py-8 px-4 md:px-8 max-w-[1280px] mx-auto relative">

      {/* Pending overlay — subtle opacity shift while navigating */}
      {isPending && (
        <div className="fixed inset-0 z-[200] pointer-events-none bg-paper/30 transition-opacity" />
      )}

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-screen">

        {/* ── Left: Filter Panel ── */}
        <aside className="lg:col-span-4 card-ink p-6 bg-paper lg:sticky lg:top-0">
          <div className="space-y-6">

            <div className="flex items-center gap-2 border-b-2 border-ink/10 pb-4">
              <FilterIcon />
              <h3 className="font-bold text-sm tracking-widest uppercase">Scribe Control Panel</h3>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block">
                Search Chronicles
              </label>
              <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Query title, scribe…"
                    className="w-full pl-10 pr-8 py-2.5 bg-paper text-sm border-2 border-ink/20 rounded-lg focus:outline-none focus:border-[#E85D35] transition-all font-display"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => { setSearchInput(""); pushParams({ search: "", page: "1" }); }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors cursor-pointer"
                    >
                      <CrossIcon />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-4 text-xs shrink-0"
                  disabled={isPending}
                >
                  GO
                </button>
              </form>
            </div>

            {/* Genre filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block">
                Filter by Genre
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ALL_GENRES.map((genre, i) => {
                  const isActive = selectedGenre === genre;
                  return (
                    <button
                      key={i}
                      onClick={() => handleGenreSelect(genre)}
                      disabled={isPending}
                      className={`text-[10px] px-2 py-2 border-2 rounded-lg transition-all cursor-pointer text-center font-bold tracking-wider leading-tight min-h-10 disabled:opacity-50 ${isActive
                        ? "bg-sun text-paper border-ink shadow-[3px_3px_0px_#2A4056] -translate-y-0.5"
                        : "bg-transparent text-ink border-ink/20 hover:border-ink"
                        }`}
                    >
                      {genre.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Writer filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block">
                Filter by Scribe
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ALL_WRITERS.map((writer) => {
                  const isActive = selectedWriter === writer;
                  return (
                    <button
                      key={writer}
                      onClick={() => handleWriterSelect(writer)}
                      disabled={isPending}
                      className={`text-[10px] px-2 py-2 border-2 rounded-lg transition-all cursor-pointer text-center font-bold tracking-wider leading-tight min-h-[40px] disabled:opacity-50 ${isActive
                        ? "bg-[#2A4056] text-paper border-ink shadow-[3px_3px_0px_#E85D35] -translate-y-0.5"
                        : "bg-transparent text-ink border-ink/20 hover:border-ink"
                        }`}
                    >
                      {writer.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear all */}
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                disabled={isPending}
                className="btn-ghost w-full justify-center text-[10px] uppercase tracking-widest py-2.5 shadow-ink-sm"
              >
                Restore Default Stacks
              </button>
            )}

          </div>
        </aside>

        {/* ── Right: Book Grid + Pagination ── */}
        <div className="lg:col-span-8 space-y-6">

          {/* Header row */}
          <div className="flex flex-wrap justify-between items-center border-b-2 border-ink/10 pb-4 gap-3">
            <h2 className="section-heading text-xl font-extrabold tracking-wider">
              Available Chronicles
            </h2>
            <div className="flex items-center gap-2">
              {isPending && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CC7722] animate-pulse font-display">
                  Consulting scrolls…
                </span>
              )}
              <span className="text-xs font-bold bg-[#2A4056] text-paper px-3 py-1.5 rounded-lg border-2 border-ink font-display">
                {total} {total === 1 ? "SCROLL" : "SCROLLS"} FOUND
              </span>
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {currentSearch && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border-2 border-[#E85D35] bg-sun/10 text-[#E85D35] font-display">
                  &ldquo;{currentSearch}&rdquo;
                  <button onClick={() => { setSearchInput(""); pushParams({ search: "", page: "1" }); }} className="hover:text-ink cursor-pointer"><CrossIcon /></button>
                </span>
              )}
              {currentGenre && currentGenre !== "All Genres" && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border-2 border-[#2A4056] bg-[#2A4056]/10 text-[#2A4056] font-display">
                  {currentGenre}
                  <button onClick={() => handleGenreSelect("All Genres")} className="hover:text-ink cursor-pointer"><CrossIcon /></button>
                </span>
              )}
              {currentWriter && currentWriter !== "All Scribes" && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border-2 border-[#CC7722] bg-[#CC7722]/10 text-[#CC7722] font-display">
                  {currentWriter}
                  <button onClick={() => handleWriterSelect("All Scribes")} className="hover:text-ink cursor-pointer"><CrossIcon /></button>
                </span>
              )}
            </div>
          )}

          {/* Grid or empty state */}
          {books.length === 0 ? (
            <div className="card-ink text-center py-20 px-8 bg-paper flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full border-3 border-ink bg-sun text-paper flex items-center justify-center shadow-ink-sm">
                <BookOpenIcon />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-ink tracking-wider uppercase">No Matching Scrolls</h3>
                <p className="text-xs text-ink/60 max-w-[38ch] mx-auto leading-relaxed font-display">
                  No wooden blocks have been carved with your exact query. Try broadening your criteria.
                </p>
              </div>
              <button onClick={handleClearAll} className="btn-primary text-xs py-2 px-5 shadow-ink-sm">
                Reset Platform Search
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}>
              {books.map((book) => (
                <BookCard book={book} key={book._id} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="pt-4 border-t-2 border-ink/10">
              <Pagination className="justify-center">
                <Pagination.Content className="gap-1.5 flex-wrap justify-center">

                  {/* Previous */}
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={currentPage === 1 || isPending}
                      onPress={() => handlePageChange(currentPage - 1)}
                      className={`
                        inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 font-display font-bold text-[10px] uppercase tracking-widest transition-all
                        ${currentPage === 1 || isPending
                          ? "border-ink/15 text-ink/30 cursor-not-allowed bg-transparent"
                          : "border-ink text-ink bg-[#F0E3CE] hover:bg-[#0D0D15] hover:text-paper shadow-[3px_3px_0px_#2A4056] hover:-translate-y-0.5 cursor-pointer"
                        }
                      `}
                    >
                      <Pagination.PreviousIcon>
                        <ChevronLeftIcon />
                      </Pagination.PreviousIcon>
                      <span>Prev</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {/* Page numbers with ellipsis */}
                  {paginationRange.map((item, idx) =>
                    item === "..." ? (
                      <Pagination.Item key={`ellipsis-${idx}`}>
                        <Pagination.Ellipsis className="w-9 h-9 flex items-center justify-center font-display font-bold text-ink/40 text-xs" />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={item}>
                        <Pagination.Link
                          isActive={item === currentPage}
                          isDisabled={isPending}
                          onPress={() => handlePageChange(item)}
                          className={`
                            w-9 h-9 flex items-center justify-center rounded-lg border-2 font-display font-bold text-xs transition-all cursor-pointer
                            ${item === currentPage
                              ? "bg-sun text-paper border-ink shadow-[3px_3px_0px_#2A4056] -translate-y-0.5"
                              : "bg-[#F0E3CE] text-ink border-ink/20 hover:border-ink hover:shadow-[2px_2px_0px_#2A4056] hover:-translate-y-0.5"
                            }
                            ${isPending ? "opacity-50" : ""}
                          `}
                        >
                          {item}
                        </Pagination.Link>
                      </Pagination.Item>
                    )
                  )}

                  {/* Next */}
                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={currentPage === totalPages || isPending}
                      onPress={() => handlePageChange(currentPage + 1)}
                      className={`
                        inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 font-display font-bold text-[10px] uppercase tracking-widest transition-all
                        ${currentPage === totalPages || isPending
                          ? "border-ink/15 text-ink/30 cursor-not-allowed bg-transparent"
                          : "border-ink text-ink bg-[#F0E3CE] hover:bg-[#0D0D15] hover:text-paper shadow-[3px_3px_0px_#2A4056] hover:-translate-y-0.5 cursor-pointer"
                        }
                      `}
                    >
                      <span>Next</span>
                      <Pagination.NextIcon>
                        <ChevronRightIcon />
                      </Pagination.NextIcon>
                    </Pagination.Next>
                  </Pagination.Item>

                </Pagination.Content>

                {/* Summary */}
                <Pagination.Summary className="font-display text-[10px] font-bold uppercase tracking-widest text-ink/50 text-center mt-3 block">
                  Page {currentPage} of {totalPages} — {total} scrolls total
                </Pagination.Summary>

              </Pagination>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}