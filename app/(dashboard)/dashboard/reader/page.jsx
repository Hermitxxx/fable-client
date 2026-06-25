"use client";

import React from "react";

/* ---------- Icons (kept local + minimal, matching the line-icon language used on the writer page) ---------- */

const LedgerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5" aria-hidden="true">
        <path d="M4 4h13a2 2 0 0 1 2 2v13.5a1.5 1.5 0 0 1-2.5 1.1L15 19" />
        <path d="M4 4v15a1 1 0 0 0 1 1h10" />
        <line x1="8" y1="9" x2="14" y2="9" />
        <line x1="8" y1="13" x2="14" y2="13" />
    </svg>
);

const ShelfIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="6" height="14" rx="1" />
        <rect x="11" y="6" width="6" height="11" rx="1" />
        <line x1="20" y1="3" x2="20" y2="21" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="13 6 19 12 13 18" />
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

const SealWatermark = () => (
    <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current text-ink" aria-hidden="true">
        <rect x="10" y="10" width="80" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="22" y="22" width="56" height="56" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="34" y1="50" x2="66" y2="50" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="34" x2="50" y2="66" stroke="currentColor" strokeWidth="2" />
    </svg>
);

/* ---------- Status stamp (purchase status, reusing the "stamp" language from the writer page's parchment badge) ---------- */

const STATUS_STYLES = {
    completed: "border-ochre/50 bg-ochre/5 text-ochre",
    pending: "border-wave/50 bg-wave/5 text-wave",
    refunded: "border-ink/20 bg-ink/5 text-ink/50",
};

const StatusStamp = ({ status }) => {
    const key = (status || "").toLowerCase();
    const style = STATUS_STYLES[key] || STATUS_STYLES.pending;
    return (
        <span
            className={`inline-block text-[8px] font-extrabold uppercase tracking-wider px-2 py-1 rounded border font-display whitespace-nowrap ${style}`}
        >
            {status}
        </span>
    );
};

/* ---------- Mock data (swap for real props — shape kept identical) ---------- */

const MOCK_PURCHASES = [
    { id: "p1", title: "Monochrome Alleyways", writer: "Albert Dera", cover: "https://picsum.photos/seed/alley/80/120", price: 11.5, date: "2026-05-12", status: "Completed" },
    { id: "p2", title: "The Quiet Tide Records", writer: "Mina Furukawa", cover: "https://picsum.photos/seed/tide/80/120", price: 8.0, date: "2026-04-29", status: "Completed" },
    { id: "p3", title: "Forty Lanterns at Dusk", writer: "Albert Dera", cover: "https://picsum.photos/seed/lantern/80/120", price: 6.5, date: "2026-04-02", status: "Pending" },
    { id: "p4", title: "Salt Houses of Naoshima", writer: "Reiko Aoki", cover: "https://picsum.photos/seed/salt/80/120", price: 9.25, date: "2026-02-18", status: "Refunded" },
];

const MOCK_LIBRARY = [
    { id: "p1", title: "Monochrome Alleyways", writer: "Albert Dera", cover: "https://picsum.photos/seed/alley/300/450" },
    { id: "p2", title: "The Quiet Tide Records", writer: "Mina Furukawa", cover: "https://picsum.photos/seed/tide/300/450" },
    { id: "p4", title: "Salt Houses of Naoshima", writer: "Reiko Aoki", cover: "https://picsum.photos/seed/salt/300/450" },
];

const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

/* ---------- Page ---------- */

export default function UserDashboard({ purchases = MOCK_PURCHASES, library = MOCK_LIBRARY }) {
    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-7xl mx-auto space-y-16 relative">

            <div className="absolute top-8 right-8 opacity-5 pointer-events-none">
                <SealWatermark />
            </div>

            {/* Header */}
            <header className="space-y-2 pb-2">
                <div className="flex items-center gap-2 text-ochre">
                    <ScrollIcon />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] font-display">Reader&apos;s Record</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider font-display">
                    Your Reading Ledger
                </h1>
                <p className="text-xs text-ink/70 max-w-[60ch] leading-relaxed">
                    Every scroll you&apos;ve claimed, and the volumes now resting on your shelf.
                </p>
            </header>

            {/* ---------- Purchase History ---------- */}
            <section className="space-y-5">
                <div className="flex items-center gap-2">
                    <LedgerIcon />
                    <h2 className="section-heading text-lg font-black uppercase tracking-wide font-display">
                        Purchase History
                    </h2>
                </div>

                {purchases.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-ink/30 rounded-lg bg-ink/5">
                        <LedgerIcon />
                        <h3 className="font-display font-bold text-sm uppercase mt-3">No Entries Yet</h3>
                        <p className="text-[11px] text-ink/60 mt-1">Acquired scrolls will be recorded here.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop ledger table */}
                        <div className="hidden md:block border-2 border-ink rounded-lg overflow-hidden shadow-ink-sm bg-paper">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-ink/5 border-b-2 border-ink">
                                        <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-ink/50 font-display">Ebook</th>
                                        <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-ink/50 font-display">Writer</th>
                                        <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-ink/50 font-display">Price</th>
                                        <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-ink/50 font-display">Purchased</th>
                                        <th className="text-left px-4 py-3 text-[9px] font-bold uppercase tracking-widest text-ink/50 font-display">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map((row) => (
                                        <tr key={row.id} className="border-b border-ink/10 last:border-0 hover:bg-wave/5 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-11 border border-ink/30 rounded overflow-hidden shrink-0 bg-ink/5">
                                                        <img src={row.cover} alt={row.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="font-display font-bold text-xs leading-tight max-w-[22ch]">{row.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-ink/70 font-display">{row.writer}</td>
                                            <td className="px-4 py-3 text-xs font-mono font-bold">${row.price.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-xs font-mono text-ink/60">{formatDate(row.date)}</td>
                                            <td className="px-4 py-3"><StatusStamp status={row.status} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile ledger cards — table collapses instead of scrolling horizontally */}
                        <div className="md:hidden space-y-3">
                            {purchases.map((row) => (
                                <div key={row.id} className="border-2 border-ink rounded-lg p-3 shadow-ink-sm bg-paper flex gap-3 items-center">
                                    <div className="w-10 h-14 border border-ink/30 rounded overflow-hidden shrink-0 bg-ink/5">
                                        <img src={row.cover} alt={row.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <p className="font-display font-bold text-xs leading-tight">{row.title}</p>
                                        <p className="text-[10px] text-ink/60 font-display">{row.writer}</p>
                                        <div className="flex items-center justify-between pt-1">
                                            <span className="font-mono text-[10px] text-ink/50">{formatDate(row.date)}</span>
                                            <span className="font-mono text-xs font-bold">${row.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <StatusStamp status={row.status} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* ---------- Purchased Ebooks gallery ---------- */}
            <section className="space-y-5">
                <div className="flex items-center gap-2">
                    <ShelfIcon />
                    <h2 className="section-heading text-lg font-black uppercase tracking-wide font-display">
                        Purchased Ebooks
                    </h2>
                </div>

                {library.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-ink/30 rounded-lg bg-ink/5">
                        <ShelfIcon />
                        <h3 className="font-display font-bold text-sm uppercase mt-3">Shelf Is Empty</h3>
                        <p className="text-[11px] text-ink/60 mt-1">Books you purchase will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {library.map((book, index) => {
                            const tilt = index % 2 === 0 ? "hover:rotate-1" : "hover:rotate-[-1deg]";
                            return (
                                <a
                                    key={book.id}
                                    href={`/books/${book.id}`}
                                    className="group flex flex-col gap-2"
                                >
                                    <div
                                        className={`aspect-[2/3] border-2 border-ink rounded-lg overflow-hidden shadow-ink-sm bg-ink/5 transition-all duration-300 ${tilt} group-hover:-translate-y-1`}
                                    >
                                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-display font-black text-xs uppercase leading-tight line-clamp-2">{book.title}</p>
                                        <p className="text-[10px] text-ink/50 font-display">{book.writer}</p>
                                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-ochre pt-1 group-hover:gap-2 transition-all">
                                            View Details
                                            <ArrowIcon />
                                        </span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </section>

        </div>
    );
}