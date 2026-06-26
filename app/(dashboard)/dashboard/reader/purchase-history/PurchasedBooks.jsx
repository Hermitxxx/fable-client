"use client";

import React, { useState } from "react";

const WaveCrestIcon = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-sun" aria-hidden="true">
        <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
        <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" />
        <circle cx="28" cy="35" r="3" />
        <circle cx="48" cy="20" r="2.5" />
        <circle cx="72" cy="40" r="3.5" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0 text-emerald-700" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const BookOpenSealIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const StampCertifiedIcon = () => (
    <svg viewBox="0 0 40 40" className="w-10 h-10 text-sun fill-current" aria-hidden="true">
        <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="20" y="24" textAnchor="middle" fontSize="9" fontWeight="black" fontFamily="sans-serif">SEAL</text>
    </svg>
);

const MapCompassIcon = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 fill-current text-ink" aria-hidden="true">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
        <polygon points="50,20 60,50 50,80 40,50" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="50" r="4" />
    </svg>
);

export default function PurchasedBooks({ books: PURCHASED_MANUSCRIPTS }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPurchases = PURCHASED_MANUSCRIPTS.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.writerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalSpent = PURCHASED_MANUSCRIPTS.reduce((acc, curr) => acc + curr.price, 0);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const determineRank = (count) => {
        if (count >= 10) return "Grand Scribe Archivist";
        if (count >= 5) return "Imperial Bibliophile";
        return "Disciple Book Collector";
    };

    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-[1280px] mx-auto space-y-12 select-none relative overflow-x-hidden">

            {/* Background traditional Compass Watermark */}
            <div className="absolute top-16 right-12 opacity-5 pointer-events-none">
                <MapCompassIcon />
            </div>

            {/* Header section with traditional framing */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-ochre">
                        <WaveCrestIcon />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] font-display">Acquisition Records</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider font-display">
                        The Imperial Ledger
                    </h1>
                    <p className="text-xs text-ink/70 max-w-[60ch] leading-relaxed">
                        Your verified vault of acquired chronicles. Each manuscript is secured with a traditional digital signature stamp proving permanent collection rights.
                    </p>
                </div>

                {/* Search Filter Bar */}
                <div className="w-full md:w-64 shrink-0">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Query ledger works..."
                        className="w-full px-3 py-2 text-xs bg-paper text-ink border-2 border-ink rounded-md focus:outline-none focus:border-sun placeholder-ink/40 font-display font-bold uppercase tracking-wider"
                    />
                </div>
            </header>

            { }
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 bg-paper border-2 border-ink rounded-lg shadow-ink-sm flex flex-col justify-between">
                    <span className="text-[9px] uppercase font-bold text-ink/50 tracking-wider font-display">
                        Collector Ranking
                    </span>
                    <div className="mt-2 space-y-0.5">
                        <h4 className="text-base font-black text-ochre uppercase tracking-wide font-display">
                            {determineRank(PURCHASED_MANUSCRIPTS.length)}
                        </h4>
                        <span className="text-[9px] text-ink/40 font-mono">Rank Tier Level 1</span>
                    </div>
                </div>

                <div className="p-5 bg-paper border-2 border-ink rounded-lg shadow-ink-sm flex flex-col justify-between">
                    <span className="text-[9px] uppercase font-bold text-ink/50 tracking-wider font-display">
                        Vault Holdings
                    </span>
                    <div className="mt-2 flex items-baseline justify-between">
                        <h3 className="text-3xl font-black font-display text-ink">
                            {PURCHASED_MANUSCRIPTS.length} Scrolls
                        </h3>
                        <span className="text-[8px] font-black bg-sun text-paper px-1.5 py-0.5 rounded border border-ink">
                            VERIFIED
                        </span>
                    </div>
                </div>

                <div className="p-5 bg-paper border-2 border-ink rounded-lg shadow-ink-sm flex flex-col justify-between">
                    <span className="text-[9px] uppercase font-bold text-ink/50 tracking-wider font-display">
                        Treasury Invested
                    </span>
                    <div className="mt-2 flex items-baseline justify-between">
                        <h3 className="text-3xl font-black text-ink font-mono">
                            ¥{totalSpent.toFixed(2)}
                        </h3>
                        <span className="text-[8px] font-black bg-wave/15 text-ink px-1.5 py-0.5 rounded border border-ink/20">
                            STAMPS
                        </span>
                    </div>
                </div>
            </section>

            { }
            <main className="space-y-6">
                {filteredPurchases.length === 0 ? (
                    <div className="text-center py-20 border-3 border-dashed border-ink/30 rounded-xl bg-[#0D0D15]/5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto text-ink/40" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        </svg>
                        <h3 className="font-display font-bold text-base uppercase mt-4">No matching records</h3>
                        <p className="text-[11px] text-ink/60 mt-1">No purchased chronicles fit your current query.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredPurchases.map((book) => (
                            <article
                                key={book._id}
                                className="bg-paper border-3 border-ink rounded-xl shadow-ink-sm relative overflow-hidden transition-all duration-200 hover:-translate-y-px hover:shadow-ink border-l-8 border-l-sun flex flex-col lg:flex-row items-stretch"
                            >
                                {/* Visual Cover Art Segment */}
                                <div className="lg:w-44 bg-wave/10 border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-6 flex items-center justify-center relative shrink-0">
                                    <div className="w-20 h-28 border-2 border-ink rounded-md shadow-sm overflow-hidden bg-[#0D0D15]/5 relative">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/180x260/2a4056/f0e3ce?text=Scroll";
                                            }}
                                        />

                                        {/* Hanko Wax stamp overlays the book cover to show verified ownership */}
                                        <div className="absolute -bottom-2 -right-2 bg-sun text-paper rounded-full border border-ink p-1 shadow-sm scale-75 select-none pointer-events-none">
                                            <StampCertifiedIcon />
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Credentials Metadata Info */}
                                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-block text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-[#CC7722]/50 bg-[#CC7722]/5 text-ochre font-display leading-none">
                                                {book.genre}
                                            </span>
                                            <span className="text-[9px] text-emerald-800 bg-emerald-100 border border-emerald-500 font-extrabold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                                                <ShieldCheckIcon /> Stamp Secured
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="font-display font-black text-lg text-ink leading-none uppercase tracking-wide">
                                                {book.title}
                                            </h3>
                                            <p className="font-display font-bold text-xs text-ink/50 leading-none">
                                                By Scribe {book.writerName}
                                            </p>
                                        </div>

                                        <p className="text-[11px] text-ink/75 font-display leading-relaxed line-clamp-2 italic">
                                            &quot;{book.description}&quot;
                                        </p>
                                    </div>

                                    {/* Certificate Footer Row */}
                                    <div className="border-t border-ink/10 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] font-display">
                                        <div>
                                            <span className="text-[8px] font-bold text-ink/40 uppercase block">Acquisition Date</span>
                                            <span className="font-bold text-ink">{formatDate(book.purchaseDate)}</span>
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-bold text-ink/40 uppercase block">Stamp Block Hash</span>
                                            <span className="font-mono font-black text-sun">{book.stampHash}</span>
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-bold text-ink/40 uppercase block">Treasury Paid</span>
                                            <span className="font-mono font-bold text-ink">¥{book.price.toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-bold text-ink/40 uppercase block">Collector Tier</span>
                                            <span className="font-bold text-ochre uppercase tracking-wide">{book.certificationTier}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            {/* Stats ledger and footer certificate */}
            <footer className="text-center pt-8 border-t-2 border-ink/10 flex flex-col justify-center items-center gap-2">
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Edo Woodblock Ledger System • Fable Platform JP
                </span>
                <span className="text-[9px] font-mono text-ink/20">
                    Acquisitions certified in compliance with imperial quarters. Verification period: 2026.
                </span>
            </footer>

        </div>
    );
}