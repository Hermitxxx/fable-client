"use client";

import React, { useState } from "react";

const BrushIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path d="m12 22 1-1c1.4-1.4 2.2-3.2 2.2-5.2V12h-3v1.8c0 2-1.2 3.8-3 4.7L7 20" />
        <path d="M12 12V6.5A2.5 2.5 0 0 0 9.5 4h-.1C8.1 4 7 5.1 7 6.5V12" />
        <path d="M19 15c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3 3-1.3 3-3Z" />
        <path d="M16 12V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2" />
    </svg>
);

const ScrollIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

const EditSealIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
);

const UnsealTrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const LanternIcon = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-[#E85D35]" aria-hidden="true">
        <path d="M35,15 L65,15 L60,30 L40,30 Z" />
        <path d="M25,30 L75,30 L70,80 L30,80 Z" opacity="0.15" />
        <rect x="30" y="30" width="40" height="50" rx="10" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1="5" x2="50" y2="15" stroke="currentColor" strokeWidth="3" />
        <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    </svg>
);

const WRITER_PERSONAL_CHRONICLES = [
    {
        id: "ch-01",
        title: "The Scribe's Hidden Inkwell",
        genre: "Scribe Journal",
        price: 14.50,
        status: "Published",
        readers: 189,
        creationDate: "March 24, 2026",
        coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=200",
        excerpt: "Courtyard secrets and silent romances of the ancient imperial palaces penned down on delicate silk..."
    },
    {
        id: "ch-02",
        title: "Bamboo Forest Whispers",
        genre: "Waka Poetry",
        price: 8.50,
        status: "Published",
        readers: 96,
        creationDate: "February 10, 2026",
        coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=200&auto=format&fit=crop",
        excerpt: "A delicate compilation of quiet forest haikus, brush strokes, and mid-autumn reflections written under bamboo..."
    },
    {
        id: "ch-03",
        title: "Tales of the Ghostly Lantern",
        genre: "Folklore",
        price: 11.00,
        status: "Published",
        readers: 142,
        creationDate: "January 12, 2026",
        coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=200&auto=format&fit=crop",
        excerpt: "Chilling reports of supernatural phenomena, floating spirits, and haunted paper lanterns in ancient quarters..."
    },
    {
        id: "ch-04",
        title: "The Autumn Ink-Well Recipe",
        genre: "Scribe Journal",
        price: 0.00,
        status: "Draft",
        readers: 0,
        creationDate: "June 20, 2026",
        coverImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=200",
        excerpt: "The chemistry of midnight grinding, using soot from mountain pine twigs and cold autumn spring waters..."
    }
];

export default function WriterEbooks() {
    const [filter, setFilter] = useState("all");

    const filteredChronicles = WRITER_PERSONAL_CHRONICLES.filter(book => {
        if (filter === "published") return book.status === "Published";
        if (filter === "draft") return book.status === "Draft";
        return true;
    });

    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-7xl mx-auto space-y-12 select-none relative">

            {/* Dynamic Background Watermark (Floating fan concept) */}
            <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                <LanternIcon />
            </div>

            { }
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b-3 border-ink">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-ochre">
                        <BrushIcon />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] font-display">Personal Chambers</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider font-display">
                        The Scribe&apos;s Shelves
                    </h1>
                    <p className="text-xs text-ink/70 max-w-[60ch] leading-relaxed">
                        Your cabinet of personal chronicles. Mount new publications, alter current stitch bindings, or unseal draft scrolls from public access.
                    </p>
                </div>

                {/* Traditional Woodblock Filter Bar */}
                <div className="inline-flex border-2 border-ink rounded-lg overflow-hidden bg-paper shadow-ink-sm shrink-0">
                    {[
                        { key: "all", label: "All Stacks" },
                        { key: "published", label: "Accessible" },
                        { key: "draft", label: "Draft Seals" }
                    ].map((item) => {
                        const isSelected = filter === item.key;
                        return (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => setFilter(item.key)}
                                className={`px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider border-r border-ink/20 last:border-0 transition-all cursor-pointer ${isSelected
                                    ? "bg-sun text-paper font-black"
                                    : "bg-transparent text-ink hover:bg-ink/5"
                                    }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </header>

            { }
            <div className="space-y-16">

                {filteredChronicles.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-ink/30 rounded-lg bg-ink/5">
                        <ScrollIcon />
                        <h3 className="font-display font-bold text-base uppercase mt-3">Empty Cabinet Section</h3>
                        <p className="text-[11px] text-ink/60 mt-1">No manuscripts fit your active filter category.</p>
                    </div>
                ) : (
                    /* Staggered Row Shelving Systems */
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 items-end">
                        {filteredChronicles.map((book, index) => {
                            // Create staggered tilt angles mimicking naturally stacked scrolls on a shelf
                            const slantClass = index % 3 === 0
                                ? "md:hover:rotate-1"
                                : index % 3 === 1
                                    ? "md:hover:rotate-[-1deg]"
                                    : "md:hover:rotate-1";

                            return (
                                <article
                                    key={book.id}
                                    className={`flex flex-col justify-between bg-paper border-3 border-ink rounded-lg shadow-ink-sm h-[400px] relative overflow-hidden transition-all duration-300 ${slantClass} group`}
                                >
                                    {/* Spine Stitch Bindings (Yotsugi-toji detailing on the left) */}
                                    <div className="absolute left-0 top-0 bottom-0 w-5 bg-[#2A4056]/15 border-r border-ink/20 flex flex-col justify-between py-6 items-center select-none pointer-events-none z-10">
                                        <span className="text-[8px] font-bold text-ink/40">✕</span>
                                        <span className="text-[8px] font-bold text-ink/40">✕</span>
                                        <span className="text-[8px] font-bold text-ink/40">✕</span>
                                        <span className="text-[8px] font-bold text-ink/40">✕</span>
                                    </div>

                                    {/* Book Card Contents */}
                                    <div className="pl-9 pr-5 pt-5 space-y-4 flex-1">

                                        {/* Cover art + stamp overlay */}
                                        <div className="flex gap-4 items-start">
                                            <div className="w-16 h-24 border-2 border-ink rounded overflow-hidden shadow-sm bg-ink/5 shrink-0 relative">
                                                <img
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Status Stamp Seal */}
                                                <div className={`absolute inset-0 flex items-center justify-center bg-ink/40 text-paper text-[8px] font-black uppercase tracking-wider transition-opacity ${book.status === "Draft" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                                    {book.status}
                                                </div>
                                            </div>

                                            <div className="space-y-1 min-w-0">
                                                <span className="inline-block text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-ochre/50 bg-ochre/5 text-ochre font-display">
                                                    {book.genre}
                                                </span>
                                                <h3 className="font-display font-black text-sm text-ink leading-tight line-clamp-2 uppercase">
                                                    {book.title}
                                                </h3>
                                                <p className="font-mono text-[9px] text-ink/40">
                                                    Sealed {book.creationDate}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t border-ink/10" />

                                        {/* Excerpt Details */}
                                        <div className="space-y-1.5">
                                            <span className="text-[8px] font-bold tracking-widest uppercase text-ink/45 block font-display">
                                                Excerpt Preview
                                            </span>
                                            <p className="text-[11px] text-ink/75 italic font-display leading-relaxed line-clamp-3">
                                                "{book.excerpt}"
                                            </p>
                                        </div>

                                        {/* Metadata Grid */}
                                        <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-display">
                                            <div>
                                                <span className="text-[8px] font-bold text-ink/40 uppercase block">Treasury Price</span>
                                                <span className="font-extrabold text-ink font-mono">
                                                    {book.price === 0 ? "Free Access" : `¥${book.price.toFixed(2)}`}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[8px] font-bold text-ink/40 uppercase block">Active Readers</span>
                                                <span className="font-bold text-ochre">{book.readers} Collectors</span>
                                            </div>
                                        </div>

                                    </div>

                                    { }
                                    <div className="pl-9 pr-5 pb-5 pt-3 bg-[#2A4056]/5 border-t border-ink/10 flex gap-2.5">
                                        <button
                                            type="button"
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 border-2 border-ink bg-paper hover:bg-sun/15 text-ink rounded shadow-ink-sm text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer active:translate-y-px active:shadow-none"
                                        >
                                            <EditSealIcon />
                                            <span>Edit Scroll</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="px-2.5 py-2 border-2 border-ink bg-transparent hover:bg-red-50 text-red-700 rounded transition-all cursor-pointer active:translate-y-px"
                                            title="Deport scroll from library shelves"
                                        >
                                            <UnsealTrashIcon />
                                        </button>
                                    </div>

                                    {/* Stately Cedar Wooden Shelf representation underneath each cabinet column */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#4A2F13] z-20 shadow-sm" />
                                </article>
                            );
                        })}
                    </section>
                )}

                {/* Dense Cedar Wood shelf divide boundary underneath the library collection row */}
                <div className="border-b-8 border-[#4A2F13] rounded-full shadow-ink-sm select-none relative" />

            </div>

            { }
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">

                {/* Decorative Scribe Bio Panel */}
                <div className="md:col-span-8 card-ink p-6 bg-[#2A4056]/5 border-2 border-ink rounded-lg flex flex-col sm:flex-row gap-5 items-center">
                    <div className="w-14 h-14 border-2 border-ink rounded-full bg-sun flex items-center justify-center text-paper font-display font-black text-xl shadow-ink-sm shrink-0">
                        B
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left">
                        <h4 className="font-display font-extrabold text-sm uppercase tracking-wider">
                            High-Sealed Scribe Identity
                        </h4>
                        <p className="text-xs text-ink/80 leading-relaxed max-w-[60ch]">
                            You are currently authenticated as <span className="font-bold text-ochre">Master Basho</span>. Every booklet on these shelves has been verified with your traditional signature stamp registry. Payout rates on collected stamps are settled on standard Edo quarters.
                        </p>
                    </div>
                </div>

                {/* Small Catalog Cabinet Box */}
                <div className="md:col-span-4 card-ink p-5 bg-paper border-2 border-ink rounded-lg relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-2">
                        <span className="text-[9px] font-bold text-ochre tracking-widest uppercase font-display block">
                            Cabinet Ledger
                        </span>
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-display font-semibold">Mounted Booklets:</span>
                            <span className="font-mono font-bold">{WRITER_PERSONAL_CHRONICLES.length} Scrolls</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-display font-semibold">Total Public Reader Base:</span>
                            <span className="font-bold text-[#E85D35]">{WRITER_PERSONAL_CHRONICLES.reduce((acc, curr) => acc + curr.readers, 0)} Collectors</span>
                        </div>
                    </div>

                    <div className="border-t border-ink/10 pt-3 mt-4 text-center">
                        <span className="font-display text-[8px] tracking-widest text-ink/40 uppercase block">
                            Fable Catalogue System v4.5
                        </span>
                    </div>
                </div>

            </section>

            {/* Decorative Stamp Footer */}
            <footer className="text-center pt-8 border-t-2 border-ink/10">
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Edo Woodblock Bookshelf System • JP
                </span>
            </footer>

        </div>
    );
}