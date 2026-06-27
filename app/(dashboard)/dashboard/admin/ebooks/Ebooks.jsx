"use client";

import { bookParchment, deleteBook } from "@/app/lib/actions/books";
import { showUserDeletedToast } from "@/components/DeleteToast";
import { toast } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";

const BookOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
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

export default function AdminEbooksPage({ ebooks }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenreFilter, setSelectedGenreFilter] = useState("all");

    console.log(ebooks);

    const handleToggleStatus = async (bookId, parchment) => {
        const data = {
            bookId,
            parchment
        }

        console.log(data);

        const res = await bookParchment(data)
    };

    const handleDeleteEbook = async (bookId, bookTitle) => {
        const res = await deleteBook(bookId)
        showUserDeletedToast(bookTitle)

    };

    const filteredEbooks = ebooks.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.writerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenreFilter === "all" || book.genre === selectedGenreFilter;
        return matchesSearch && matchesGenre;
    });

    const ALL_GENRES = ["all", ...new Set(ebooks.map(b => b.genre))];

    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-[1280px] mx-auto space-y-8 select-none">

            {/* Header section with traditional framing */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ochre block mb-1">
                        Imperial Vault Registry
                    </span>
                    <h1 className="section-heading text-3xl font-bold uppercase tracking-wider">
                        Scroll Catalog Index
                    </h1>
                    <p className="text-xs text-ink/70 mt-3 font-display max-w-[65ch]">
                        Moderate community manuscripts, approve public scroll access, or revoke library publications.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-ink rounded-lg bg-paper font-bold text-xs uppercase tracking-wider shadow-ink-sm">
                        <BookOpenIcon />
                        <span>{ebooks.length} Total Scrolls</span>
                    </span>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Published Works
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-3xl font-bold font-display">
                            {ebooks.filter(b => b.parchment.toLowerCase() === "published").length}
                        </h3>
                        <span className="text-[9px] font-bold text-prussian bg-prussian/10 border border-prussian px-2 py-0.5 rounded uppercase">
                            Accessible
                        </span>
                    </div>
                </div>

                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Draft Scrolls
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-3xl font-bold font-display">
                            {ebooks.filter(b => b.parchment.toLowerCase() === "unpublished").length}
                        </h3>
                        <span className="text-[9px] font-bold text-ochre bg-ochre/10 border border-ochre px-2 py-0.5 rounded uppercase">
                            Under Review
                        </span>
                    </div>
                </div>

                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Imperial Revenue Pool
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-2xl font-bold font-display">
                            ¥{ebooks.reduce((acc, b) => acc + (b.price * b.purchaseCount), 0).toFixed(2)}
                        </h3>
                        <span className="text-[9px] font-bold text-sun bg-sun/10 border border-sun px-2 py-0.5 rounded uppercase">
                            Sumi Sales
                        </span>
                    </div>
                </div>
            </section>

            {/* Search & Filter bar */}
            <section className="bg-paper p-5 border-2 border-ink rounded-lg shadow-ink-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 flex items-center">
                    <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search books by title, author, or genre..."
                        className="w-full pl-11 pr-4 py-3 bg-paper text-sm border-2 border-ink rounded-lg focus:outline-none focus:border-sun transition-all font-display"
                    />
                </div>

                {/* Genre Selector Buttons */}
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

            {/* Desktop View Table Layout */}
            <section className="hidden md:block card-ink overflow-hidden bg-paper">
                <div className="w-full overflow-x-auto max-h-175 overflow-y-auto">
                    <table className="w-full min-w-175 border-collapse text-left bg-paper">
                        <thead>
                            <tr className="border-b-3 border-ink">
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Chronicle Detail
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Master Scribe
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Valuation
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
                            {filteredEbooks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-ink/50 font-display text-sm italic bg-paper">
                                        No registered scrolls matched your parameters.
                                    </td>
                                </tr>
                            ) : (
                                filteredEbooks.map((book) => (
                                    <tr key={book._id} className="border-b-2 border-ink/15 hover:bg-ink/5 transition-colors">

                                        {/* Cover & Title Column */}
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

                                        {/* Author Column */}
                                        <td className="px-6 py-4 border-r-2 border-ink/10 bg-transparent">
                                            <div className="space-y-0.5">
                                                <span className="font-display font-bold text-sm text-ink block">
                                                    {book.writerName}
                                                </span>
                                                <span className="text-[10px] text-ink/50 block font-mono">
                                                    {book.writerEmail}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Pricing Column */}
                                        <td className="px-6 py-4 border-r-2 border-ink/10 font-display text-sm font-bold text-ink bg-transparent">
                                            <div className="space-y-0.5">
                                                <span className="block font-mono text-xs">
                                                    {book.price === 0 ? "Free Read" : `¥${book.price.toFixed(2)}`}
                                                </span>
                                                <span className="block text-[10px] text-ink/40 font-normal">
                                                    {book.purchaseCount} Acquisitions
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status Badge Column */}
                                        <td className="px-6 py-4 border-r-2 border-ink/10 bg-transparent">
                                            <span className={`inline-block text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md border-2 ${book.parchment.toLowerCase() === "published"
                                                ? "bg-prussian/10 text-prussian border-prussian"
                                                : "bg-ochre/10 text-ochre border-ochre"
                                                }`}>
                                                {book.parchment}
                                            </span>
                                        </td>

                                        {/* Action Buttons Column */}
                                        <td className="px-6 py-4 bg-transparent">
                                            <div className="flex items-center gap-2">
                                                {/* Publish Toggle Button */}
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

                                                {/* Trash/Delete Button */}
                                                <button
                                                    onClick={() => handleDeleteEbook(book._id, book.title)}
                                                    type="button"
                                                    className="p-1.5 border-2 border-ink rounded-lg bg-paper text-ink hover:bg-sun hover:text-paper hover:shadow-ink-sm transition-all cursor-pointer active:translate-y-px"
                                                    title="Deport Scroll from Platform"
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

            {/* Mobile View Responsive Card Stack Layout */}
            <section className="block md:hidden max-h-175 overflow-y-auto space-y-5">
                {filteredEbooks.length === 0 ? (
                    <div className="card-ink p-8 text-center text-ink/50 font-display text-sm italic bg-paper">
                        No registered scrolls matched your parameters.
                    </div>
                ) : (
                    filteredEbooks.map((book) => (
                        <div key={book._id} className="card-ink p-5 bg-paper flex flex-col gap-4 relative">

                            {/* Card Header: Cover, Title & Genre */}
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
                                            {book.parchment}
                                        </span>
                                    </div>
                                    <span className="inline-block text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border border-wave/40 bg-wave/5 text-wave">
                                        {book.genre}
                                    </span>
                                    <p className="text-[11px] text-ink/60 line-clamp-2 leading-relaxed">
                                        {book.description}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-ink/10" />

                            {/* Details parameters grid */}
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider block font-display">
                                        Master Scribe
                                    </span>
                                    <span className="font-display font-bold text-ink leading-tight block">
                                        {book.writerName}
                                    </span>
                                    <span className="text-[9px] font-mono text-ink/50 block truncate">
                                        {book.writerEmail}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider block font-display">
                                        Treasury Valuation
                                    </span>
                                    <span className="font-mono font-bold text-ink block">
                                        {book.price === 0 ? "Free Access" : `¥${book.price.toFixed(2)}`}
                                    </span>
                                    <span className="text-[9px] font-display text-ink/40 block uppercase font-bold">
                                        {book.purchaseCount} Sales
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-ink/10" />

                            {/* Card Control Actions */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                                <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider font-display block sm:inline">
                                    Publish Clearance:
                                </span>
                                <div className="flex items-center gap-2 justify-between">
                                    <button
                                        onClick={() => handleToggleStatus(book._id, book.parchment === 'published' ? 'unpublished' : 'published')}
                                        type="button"
                                        className={`px-3 py-2 border-2 border-ink rounded-lg font-display text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-ink-sm flex-1 text-center flex items-center justify-center gap-1.5 ${book.parchment.toLowerCase() === "published"
                                            ? "bg-ochre text-paper"
                                            : "bg-sun text-paper"
                                            }`}
                                    >
                                        {book.parchment.toLowerCase() === "published" ? <EyeClosedIcon /> : <EyeOpenIcon />}
                                        <span>{book.parchment.toLowerCase() === "published" ? "Unpublish Scroll" : "Publish Scroll"}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteEbook(book._id, book.title)}
                                        className="p-2.5 border-2 border-ink rounded-lg bg-paper text-ink hover:bg-sun hover:text-paper hover:shadow-ink-sm transition-all cursor-pointer active:translate-y-px shrink-0"
                                        title="Revoke Scroll Passport"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </section>

            {/* Decorative Traditional Footer Stamp */}
            <footer className="text-center pt-8 border-t-2 border-ink/10 flex justify-center items-center gap-2">
                <InkwellIcon />
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Fable Archive Ledger Engine v16.5
                </span>
            </footer>

        </div>
    );
}