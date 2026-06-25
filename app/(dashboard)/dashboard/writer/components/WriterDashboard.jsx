"use client";

import { bookParchment, deleteBook } from "@/app/lib/actions/books";
import { showUserDeletedToast } from "@/components/DeleteToast";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const BookOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const EyeOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeClosedIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const InkwellIcon = () => (
    <svg viewBox="0 0 64 64" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M10 42c0-8 6-14 14-14h16c8 0 14 6 14 14v10H10V42z" opacity="0.15" />
        <path d="M12 46v6h40v-6c0-6-4.8-11-10.8-11.8C39.4 37.5 36 39 32 39s-7.4-1.5-9.2-4.8C16.8 35 12 40 12 46z" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="22" y="14" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="32" y1="26" x2="32" y2="34" stroke="currentColor" strokeWidth="4" />
        <line x1="6" y1="56" x2="58" y2="56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

export default function WriterDashboard({ books }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenreFilter, setSelectedGenreFilter] = useState("all");

    const handleToggleStatus = async (bookId, parchment) => {
        const data = {
            bookId,
            parchment
        }

        console.log(data);

        const res = await bookParchment(data)
    };

    const handleDeleteEbook = async (bookId, bookTitle) => {
        const res = await deleteBook(bookId);
        showUserDeletedToast(bookTitle);
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenreFilter === "all" || book.genre === selectedGenreFilter;
        return matchesSearch && matchesGenre;
    });

    const ALL_GENRES = ["all", ...new Set(books.map(b => b.genre))];

    const publishedCount = books.filter(b => b.parchment.toLowerCase() === "published").length;
    const unpublishedCount = books.filter(b => b.parchment.toLowerCase() === "unpublished").length;
    const totalRevenue = books.reduce((acc, b) => acc + (b.price * b.purchaseCount), 0);

    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-[1280px] mx-auto space-y-8 select-none">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ochre block mb-1">
                        Scribe&apos;s Personal Vault
                    </span>
                    <h1 className="section-heading text-3xl font-bold uppercase tracking-wider">
                        My Scrolls
                    </h1>
                    <p className="text-xs text-ink/70 mt-3 font-display max-w-[65ch]">
                        Manage your manuscripts, track sales, and publish new works to the collection.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/writer/add-ebook"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-ink rounded-lg bg-sun text-paper font-bold text-xs uppercase tracking-wider shadow-ink-sm hover:shadow-ink hover:-translate-y-0.5 transition-all active:translate-y-px"
                    >
                        <PlusIcon />
                        <span>New Scroll</span>
                    </Link>
                    <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-ink rounded-lg bg-paper font-bold text-xs uppercase tracking-wider shadow-ink-sm">
                        <BookOpenIcon />
                        <span>{books.length} Total Scrolls</span>
                    </span>
                </div>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Published Works
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-3xl font-bold font-display">{publishedCount}</h3>
                        <span className="text-[9px] font-bold text-prussian bg-prussian/10 border border-prussian px-2 py-0.5 rounded uppercase">
                            Live
                        </span>
                    </div>
                </div>

                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Draft Scrolls
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-3xl font-bold font-display">{unpublishedCount}</h3>
                        <span className="text-[9px] font-bold text-ochre bg-ochre/10 border border-ochre px-2 py-0.5 rounded uppercase">
                            Pending
                        </span>
                    </div>
                </div>

                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Total Earnings
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-2xl font-bold font-display">¥{totalRevenue.toFixed(2)}</h3>
                        <span className="text-[9px] font-bold text-sun bg-sun/10 border border-sun px-2 py-0.5 rounded uppercase">
                            Treasury
                        </span>
                    </div>
                </div>
            </section>

            <section className="bg-paper p-5 border-2 border-ink rounded-lg shadow-ink-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-1 flex items-center">
                    <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search your scrolls by title..."
                        className="w-full pl-11 pr-4 py-3 bg-paper text-sm border-2 border-ink rounded-lg focus:outline-none focus:border-sun transition-all font-display"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block md:inline-block mr-2">
                        Genre:
                    </span>
                    {ALL_GENRES.map((genreOption) => (
                        <button
                            key={genreOption}
                            onClick={() => setSelectedGenreFilter(genreOption)}
                            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-2 border-2 rounded-md transition-all cursor-pointer ${selectedGenreFilter === genreOption
                                ? "bg-sun text-paper border-ink shadow-ink-sm -translate-y-0.5"
                                : "bg-transparent text-ink border-ink/30 hover:border-ink hover:bg-ink/5"
                                }`}
                        >
                            {genreOption}
                        </button>
                    ))}
                </div>
            </section>

            <section className="hidden md:block card-ink overflow-hidden bg-paper">
                <div className="w-full overflow-x-auto max-h-175 overflow-y-auto">
                    <table className="w-full min-w-175 border-collapse text-left bg-paper">
                        <thead>
                            <tr className="border-b-3 border-ink">
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Chronicle Detail
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Valuation
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Acquisitions
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Parchment Status
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper py-4 px-6">
                                    Vault Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-ink/50 font-display text-sm italic bg-paper">
                                        No scrolls found. Begin your journey by inscribing a new manuscript.
                                    </td>
                                </tr>
                            ) : (
                                filteredBooks.map((book) => (
                                    <tr key={book._id} className="border-b-2 border-ink/15 hover:bg-ink/5 transition-colors">

                                        <td className="px-6 py-4 border-r-2 border-ink/10 bg-transparent">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 border-2 border-ink rounded bg-paper overflow-hidden shadow-ink-sm shrink-0">
                                                    <Image
                                                        src={book.coverImage}
                                                        alt={book.title}
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=200";
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="font-display font-bold text-sm block text-ink leading-tight">
                                                        {book.title}
                                                    </span>
                                                    <span className="inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border border-wave/40 bg-wave/5 text-wave">
                                                        {book.genre}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 border-r-2 border-ink/10 font-display text-sm font-bold text-ink bg-transparent">
                                            <span className="font-mono text-xs">
                                                {book.price === 0 ? "Free Read" : `¥${book.price.toFixed(2)}`}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 border-r-2 border-ink/10 font-display text-sm font-bold text-ink bg-transparent">
                                            <span className="font-mono text-xs">
                                                {book.purchaseCount}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 border-r-2 border-ink/10 bg-transparent">
                                            <span className={`inline-block text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md border-2 ${book.parchment.toLowerCase() === "published"
                                                ? "bg-prussian/10 text-prussian border-prussian"
                                                : "bg-ochre/10 text-ochre border-ochre"
                                                }`}>
                                                {book.parchment}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 bg-transparent">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleStatus(book._id, book.parchment === 'published' ? 'unpublished' : 'published')}
                                                    type="button"
                                                    className={`px-3 py-1.5 border-2 border-ink rounded-lg font-display text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-ink-sm active:translate-y-px ${book.parchment.toLowerCase() === "published"
                                                        ? "bg-ochre text-paper"
                                                        : "bg-sun text-paper"
                                                        }`}
                                                    title={book.parchment.toLowerCase() === "published" ? "Retract manuscript" : "Expose manuscript"}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        {book.parchment.toLowerCase() === "published" ? <EyeClosedIcon /> : <EyeOpenIcon />}
                                                        <span>{book.parchment.toLowerCase() === "published" ? "Unpublish" : "Publish"}</span>
                                                    </span>
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteEbook(book._id, book.title)}
                                                    type="button"
                                                    className="p-1.5 border-2 border-ink rounded-lg bg-paper text-ink hover:bg-sun hover:text-paper hover:shadow-ink-sm transition-all cursor-pointer active:translate-y-px"
                                                    title="Remove scroll from vault"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="block md:hidden max-h-175 overflow-y-auto space-y-5">
                {filteredBooks.length === 0 ? (
                    <div className="card-ink p-8 text-center text-ink/50 font-display text-sm italic bg-paper">
                        No scrolls found. Begin your journey by inscribing a new manuscript.
                    </div>
                ) : (
                    filteredBooks.map((book) => (
                        <div key={book._id} className="card-ink p-5 bg-paper flex flex-col gap-4 relative">

                            <div className="flex items-start gap-4">
                                <div className="w-16 h-24 border-2 border-ink rounded bg-paper overflow-hidden shadow-ink-sm shrink-0">
                                    <Image
                                        src={book.coverImage}
                                        alt={book.title}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=200";
                                        }}
                                    />
                                </div>
                                <div className="space-y-2 min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <h4 className="font-display font-bold text-base text-ink truncate leading-tight">
                                            {book.title}
                                        </h4>
                                        <span className={`inline-block text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border-2 ${book.parchment.toLowerCase() === "published"
                                            ? "bg-prussian/10 text-prussian border-prussian"
                                            : "bg-ochre/10 text-ochre border-ochre"
                                            }`}>
                                            {book.parchment === 'unpublished' ? 'Pending' : book.parchment}
                                        </span>
                                    </div>
                                    <span className="inline-block text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border border-wave/40 bg-wave/5 text-wave">
                                        {book.genre}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-ink/10" />

                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider block font-display">
                                        Valuation
                                    </span>
                                    <span className="font-mono font-bold text-ink block">
                                        {book.price === 0 ? "Free Access" : `¥${book.price.toFixed(2)}`}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider block font-display">
                                        Acquisitions
                                    </span>
                                    <span className="font-mono font-bold text-ink block">
                                        {book.purchaseCount} Sales
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-ink/10" />

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    onClick={() => handleToggleStatus(book._id, book.parchment === 'published' ? 'unpublished' : 'published')}
                                    type="button"
                                    className={`px-3 py-1.5 border-2 border-ink rounded-lg font-display text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-ink-sm active:translate-y-px ${book.parchment.toLowerCase() === "published"
                                        ? "bg-ochre text-paper"
                                        : "bg-sun text-paper"
                                        }`}
                                    title={book.parchment.toLowerCase() === "published" ? "Retract manuscript" : "Expose manuscript"}
                                >
                                    <span className="flex items-center gap-1">
                                        {book.parchment.toLowerCase() === "published" ? <EyeClosedIcon /> : <EyeOpenIcon />}
                                        <span>{book.parchment.toLowerCase() === "published" ? "Unpublish" : "Publish"}</span>
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteEbook(book._id, book.title)}
                                    className="p-2.5 border-2 border-ink rounded-lg bg-paper text-ink hover:bg-sun hover:text-paper hover:shadow-ink-sm transition-all cursor-pointer active:translate-y-px shrink-0"
                                    title="Remove scroll"
                                >
                                    <TrashIcon />
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </section>

            <footer className="text-center pt-8 border-t-2 border-ink/10 flex justify-center items-center gap-2">
                <InkwellIcon />
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Fable Writer&apos;s Vault v16.5
                </span>
            </footer>

        </div>
    );
}
