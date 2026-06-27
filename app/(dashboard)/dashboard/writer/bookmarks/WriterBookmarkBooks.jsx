"use client";

import { removeBookmark } from "@/app/lib/actions/bookmark";
import { showSuccessToast } from "@/components/SuccessToast";
import React, { useState } from "react";

const WaveCrestIcon = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-[#E85D35]" aria-hidden="true">
        <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
        <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" />
        <circle cx="28" cy="35" r="3" />
        <circle cx="48" cy="20" r="2.5" />
        <circle cx="72" cy="40" r="3.5" />
    </svg>
);

const TrashSealIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const BookOpenSealIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-3.5 h-3.5 text-[#E85D35]" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export default function WriterBookmarkBooks({ bookmarkBooks: bookmarks }) {
    const handleRemoveBookmark = async (bookId, title) => {
        const res = await removeBookmark(bookId)
        console.log(res);
        showSuccessToast(title, { head: `Scroll Removed`, parchment: `is unfurled.` })
    };

    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-7xl mx-auto space-y-12 select-none relative overflow-x-hidden">

            {/* Wave Crest Watermark */}
            <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                <WaveCrestIcon />
            </div>

            {/* Header section with traditional framing */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-ochre">
                        <WaveCrestIcon />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] font-display">Reader&apos;s Vault</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider font-display">
                        Bookmarked Scrolls
                    </h1>
                    <p className="text-xs text-ink/70 max-w-[60ch] leading-relaxed">
                        Your personal digital cabinet of treasured manuscripts. Unfurl selected chronicles for reading, or release them back to the public domain library stacks.
                    </p>
                </div>

                {/* Small Stat Tracker Box */}
                <div className="inline-flex border-2 border-ink rounded-lg overflow-hidden bg-paper shadow-ink-sm shrink-0">
                    <span className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider border-r border-ink/20 bg-wave/15 text-ink">
                        Collection Count
                    </span>
                    <span className="px-3 py-2 text-[10px] font-black uppercase tracking-wider bg-sun text-paper font-mono">
                        {bookmarks.length} Manuscripts
                    </span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="space-y-12">
                {bookmarks.length === 0 ? (
                    <div className="text-center py-24 border-3 border-dashed border-ink/30 rounded-xl bg-ink/5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto text-ink/40" aria-hidden="true">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                        <h3 className="font-display font-bold text-base uppercase mt-4 tracking-wider">Plaque Registry Empty</h3>
                        <p className="text-[11px] text-ink/60 mt-1 max-w-[40ch] mx-auto">
                            You currently have no manuscripts hung on your dashboard board. Visit the imperial archives to secure some.
                        </p>
                    </div>
                ) : (
                    /* Staggered Wooden Plaque Wall Grid */
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-8 items-start pt-6">
                        {bookmarks.map((book, index) => {
                            // Apply alternative subtle rotations to recreate naturally hung shrine tablets
                            const slantClass = index % 2 === 0
                                ? "md:hover:rotate-1"
                                : "md:hover:rotate-[-1deg]";

                            return (
                                <article
                                    key={book._id}
                                    className={`flex flex-col justify-between bg-paper border-3 border-ink rounded-xl shadow-ink-sm min-h-[440px] relative transition-all duration-300 ${slantClass} group`}
                                >

                                    {/* Decorative Hanging Red/Ochre Tassel Assembly */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-10">
                                        <div className="w-2.5 h-2.5 rounded-full bg-ink border-2 border-[#F0E3CE] shadow-sm" />
                                        <div className="w-[3px] h-4 bg-[#CC7722]" />
                                    </div>

                                    {/* Tactile Board Accent Binding Header */}
                                    <div className="w-full h-1.5 bg-[#CC7722] rounded-t-lg" />

                                    {/* Book Card Contents */}
                                    <div className="p-6 space-y-4 flex-1">

                                        {/* Cover art + stamp overlay */}
                                        <div className="flex gap-4 items-start">
                                            <div className="w-20 h-28 border-2 border-ink rounded-lg overflow-hidden shadow-sm bg-ink/5 shrink-0 relative">
                                                <img
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://placehold.co/180x260/2a4056/f0e3ce?text=Scroll";
                                                    }}
                                                />
                                                {/* Status tag */}
                                                <div className="absolute bottom-1 right-1 bg-sun text-paper text-[7px] font-black uppercase px-1 py-0.5 rounded border border-ink">
                                                    {book.status}
                                                </div>
                                            </div>

                                            <div className="space-y-1 min-w-0">
                                                <span className="inline-block text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-[#CC7722]/50 bg-[#CC7722]/5 text-ochre font-display">
                                                    {book.genre}
                                                </span>
                                                <h3 className="font-display font-black text-sm text-ink leading-tight line-clamp-2 uppercase tracking-wide">
                                                    {book.title}
                                                </h3>
                                                <p className="font-mono text-[9px] text-ink/40 leading-none pt-0.5">
                                                    By {book.writerName}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t border-ink/10" />

                                        {/* Excerpt Details */}
                                        <div className="space-y-1.5">
                                            <span className="text-[8px] font-bold tracking-widest uppercase text-ink/45 block font-display">
                                                Description Preview
                                            </span>
                                            <p className="text-[11px] text-ink/75 italic font-display leading-relaxed line-clamp-4">
                                                &quot;{book.description}&quot;
                                            </p>
                                        </div>

                                        <div className="border-t border-ink/10" />

                                        {/* Metadata block (Ratings, acquisitions, price) */}
                                        <div className="flex items-center justify-between text-[10px] font-display">
                                            <div className="flex items-center gap-1">
                                                <StarIcon />
                                                <span className="font-bold text-ink">{book.rating.toFixed(1)} / 5.0</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[8px] font-bold text-ink/40 uppercase block">Treasury Value</span>
                                                <span className="font-extrabold text-ink font-mono text-xs">
                                                    {book.price === 0 ? "Free Access" : `$${book.price.toFixed(2)}`}
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Actions area */}
                                    <div className="px-6 pb-6 pt-3 bg-wave/5 border-t border-ink/10 rounded-b-xl">
                                        <button
                                            type="button"
                                            onClick={() => { handleRemoveBookmark(book._id, book.title) }}
                                            className="flex-1 w-full inline-flex items-center justify-center gap-1.5 py-2.5 border-2 border-ink bg-sun text-paper hover:bg-wave rounded-lg shadow-ink-sm text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer active:translate-y-px active:shadow-none"
                                        >
                                            <BookOpenSealIcon />
                                            <span>Unfurl Scroll</span>
                                        </button>
                                    </div>

                                </article>
                            );
                        })}
                    </section>
                )}
            </main>

            { }

            {/* Stats ledger and footer certificate */}
            <footer className="text-center pt-12 border-t-2 border-ink/10 flex flex-col justify-center items-center gap-2">
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Ema Shrine Bookmark Registry • Fable Platform JP
                </span>
                <span className="text-[9px] font-mono text-ink/20">
                    Current Ledger Verification Period: 2026. All stamps authenticated.
                </span>
            </footer>

        </div>
    );
}