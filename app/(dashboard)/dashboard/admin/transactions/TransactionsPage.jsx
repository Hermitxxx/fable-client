"use client";

import React, { useState } from "react";

// ─── icons ───────────────────────────────────────────────────────────────────

const ScrollIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

const CoinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2M9.5 9.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2-2.5 2.5-2.5 2.5S9.5 13.6 9.5 14.5c0 1.1.9 2 2.5 2s2.5-.9 2.5-2" />
    </svg>
);

const FilterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const SealIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

// ─── genre badge colours (design-system palette) ─────────────────────────────

const GENRE_STYLES = {
    Horror: { bg: "bg-[#E85D35]/10", text: "text-[#E85D35]", border: "border-[#E85D35]" },
    Fantasy: { bg: "bg-[#2A4056]/10", text: "text-[#2A4056]", border: "border-[#2A4056]" },
    Romance: { bg: "bg-[#CC7722]/10", text: "text-[#CC7722]", border: "border-[#CC7722]" },
    Mystery: { bg: "bg-[#003153]/10", text: "text-[#003153]", border: "border-[#003153]" },
    Fiction: { bg: "bg-[#2A4056]/10", text: "text-[#2A4056]", border: "border-[#2A4056]" },
    Default: { bg: "bg-[#0D0D15]/10", text: "text-[#0D0D15]", border: "border-[#0D0D15]" },
};

function getGenreStyle(genre) {
    return GENRE_STYLES[genre] || GENRE_STYLES.Default;
}

// shorten transaction id for display
function shortId(id) {
    if (!id) return "—";
    return id.length > 18 ? `${id.slice(0, 9)}…${id.slice(-6)}` : id;
}

// ─── component ───────────────────────────────────────────────────────────────

const TransactionsPage = ({ transactions = [] }) => {
    const [search, setSearch] = useState("");
    const [genreFilter, setGenreFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");

    // derive unique genres & types for filters
    const allGenres = ["All", ...Array.from(new Set(transactions.map(t => t.genre).filter(Boolean)))];
    const allTypes = ["All", ...Array.from(new Set(transactions.map(t => t.type).filter(Boolean)))];

    const filtered = transactions.filter(t => {
        const term = search.toLowerCase();
        const matchSearch =
            !term ||
            t.email?.toLowerCase().includes(term) ||
            t.id?.toLowerCase().includes(term) ||
            t.genre?.toLowerCase().includes(term) ||
            t.stripeSessionId?.toLowerCase().includes(term);
        const matchGenre = genreFilter === "All" || t.genre === genreFilter;
        const matchType = typeFilter === "All" || t.type === typeFilter;
        return matchSearch && matchGenre && matchType;
    });

    const totalRevenue = filtered.reduce((sum, t) => sum + (parseFloat(t.price) || 0), 0);

    return (
        <section className="p-6 md:p-8 space-y-8">

            {/* ── Page Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#CC7722] block mb-1">
                        Imperial Commerce Ledger
                    </span>
                    <h2 className="section-heading text-2xl font-bold uppercase tracking-wider">
                        All Transactions
                    </h2>
                    <p className="font-display text-xs text-[#0D0D15]/60 mt-3 max-w-[60ch]">
                        Every scroll exchanged under the Covenant seal — purchase records, publishing fees, and merchant flow.
                    </p>
                </div>

                {/* Summary pill */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="card-ink px-5 py-3 flex items-center gap-3 bg-[#F0E3CE]">
                        <CoinIcon />
                        <div>
                            <p className="text-[9px] uppercase font-bold tracking-wider text-[#0D0D15]/50 font-display">
                                Filtered Revenue
                            </p>
                            <p className="text-lg font-extrabold font-display leading-tight">
                                ${totalRevenue.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className="card-ink px-5 py-3 flex items-center gap-3 bg-[#F0E3CE]">
                        <ScrollIcon />
                        <div>
                            <p className="text-[9px] uppercase font-bold tracking-wider text-[#0D0D15]/50 font-display">
                                Records
                            </p>
                            <p className="text-lg font-extrabold font-display leading-tight">
                                {filtered.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Filters Bar ── */}
            <div className="card-ink p-4 bg-[#F0E3CE]">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

                    {/* Search */}
                    <div className="relative flex-1 min-w-0">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D0D15]/40 pointer-events-none">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by email, ID, genre…"
                            className="w-full pl-9 pr-4 py-2.5 bg-[#F0E3CE] border-2 border-[#0D0D15]/20 rounded-lg text-xs font-display focus:outline-none focus:border-[#E85D35] transition-all"
                        />
                    </div>

                    {/* Genre filter */}
                    <div className="flex items-center gap-2 shrink-0">
                        <FilterIcon />
                        <select
                            value={genreFilter}
                            onChange={e => setGenreFilter(e.target.value)}
                            className="bg-[#F0E3CE] border-2 border-[#0D0D15]/20 rounded-lg px-3 py-2.5 text-xs font-display font-bold uppercase tracking-wider focus:outline-none focus:border-[#E85D35] cursor-pointer transition-all"
                        >
                            {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>

                    {/* Type filter */}
                    <div className="shrink-0">
                        <select
                            value={typeFilter}
                            onChange={e => setTypeFilter(e.target.value)}
                            className="bg-[#F0E3CE] border-2 border-[#0D0D15]/20 rounded-lg px-3 py-2.5 text-xs font-display font-bold uppercase tracking-wider focus:outline-none focus:border-[#E85D35] cursor-pointer transition-all"
                        >
                            {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    {/* Clear */}
                    {(search || genreFilter !== "All" || typeFilter !== "All") && (
                        <button
                            onClick={() => { setSearch(""); setGenreFilter("All"); setTypeFilter("All"); }}
                            className="btn-ghost py-2 px-4 text-[10px] uppercase tracking-wider shrink-0"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* ── Table ── */}
            {filtered.length === 0 ? (
                <div className="card-ink p-16 bg-[#F0E3CE] flex flex-col items-center justify-center gap-4 text-center">
                    <ScrollIcon />
                    <p className="font-display font-bold text-sm uppercase tracking-wider text-[#0D0D15]/40">
                        No records match your filters
                    </p>
                    <button
                        onClick={() => { setSearch(""); setGenreFilter("All"); setTypeFilter("All"); }}
                        className="btn-ghost py-2 px-5 text-xs uppercase"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="card-ink bg-[#F0E3CE] overflow-y-scroll max-h-screen">
                    {/* Table header */}
                    <div className="hidden md:grid grid-cols-[1fr_1.6fr_1fr_0.8fr_0.8fr_0.9fr] gap-4 px-6 py-3 border-b-2 border-[#0D0D15] bg-[#0D0D15]">
                        {["Transaction ID", "Session", "Email", "Genre", "Type", "Amount"].map(h => (
                            <span key={h} className="text-[9px] font-extrabold uppercase tracking-widest text-[#F0E3CE] font-display">
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* Rows */}
                    <div className="divide-y-2 divide-[#0D0D15]/10">
                        {filtered.map((t, i) => {
                            const gs = getGenreStyle(t.genre);
                            return (
                                <div
                                    key={t._id}
                                    className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr_0.8fr_0.8fr_0.9fr] gap-3 md:gap-4 px-6 py-4 hover:bg-[#0D0D15]/[0.03] transition-colors duration-150 group"
                                >
                                    {/* Transaction ID */}
                                    <div className="flex flex-col gap-0.5">
                                        <span className="md:hidden text-[8px] font-bold uppercase tracking-widest text-[#0D0D15]/40 font-display">
                                            Transaction ID
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <SealIcon />
                                            <span className="font-mono text-[10px] font-bold text-[#003153] group-hover:text-[#E85D35] transition-colors">
                                                {shortId(t.id)}
                                            </span>
                                        </div>
                                        <span className="text-[9px] text-[#0D0D15]/35 font-mono ml-5">
                                            {t.date}
                                        </span>
                                    </div>

                                    {/* Stripe Session */}
                                    <div className="flex flex-col justify-center">
                                        <span className="md:hidden text-[8px] font-bold uppercase tracking-widest text-[#0D0D15]/40 font-display mb-0.5">
                                            Session
                                        </span>
                                        <span className="font-mono text-[10px] text-[#0D0D15]/50 truncate max-w-[220px]" title={t.stripeSessionId}>
                                            {shortId(t.stripeSessionId)}
                                        </span>
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col justify-center">
                                        <span className="md:hidden text-[8px] font-bold uppercase tracking-widest text-[#0D0D15]/40 font-display mb-0.5">
                                            Email
                                        </span>
                                        <span className="font-display text-xs font-semibold text-[#0D0D15] truncate" title={t.email}>
                                            {t.email}
                                        </span>
                                    </div>

                                    {/* Genre badge */}
                                    <div className="flex items-center">
                                        <span className="md:hidden text-[8px] font-bold uppercase tracking-widest text-[#0D0D15]/40 font-display mr-2">
                                            Genre:
                                        </span>
                                        <span className={`inline-flex text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border font-display ${gs.bg} ${gs.text} ${gs.border}`}>
                                            {t.genre || "—"}
                                        </span>
                                    </div>

                                    {/* Type badge */}
                                    <div className="flex items-center">
                                        <span className="md:hidden text-[8px] font-bold uppercase tracking-widest text-[#0D0D15]/40 font-display mr-2">
                                            Type:
                                        </span>
                                        <span className={`inline-flex text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border font-display ${t.type === "purchase"
                                            ? "bg-[#2A4056]/10 text-[#2A4056] border-[#2A4056]"
                                            : "bg-[#CC7722]/10 text-[#CC7722] border-[#CC7722]"
                                            }`}>
                                            {t.type || "—"}
                                        </span>
                                    </div>

                                    {/* Amount */}
                                    <div className="flex items-center">
                                        <span className="md:hidden text-[8px] font-bold uppercase tracking-widest text-[#0D0D15]/40 font-display mr-2">
                                            Amount:
                                        </span>
                                        <span className="font-display font-extrabold text-sm text-[#E85D35]">
                                            ${parseFloat(t.price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer total */}
                    <div className="border-t-2 border-[#0D0D15] px-6 py-4 flex justify-between items-center bg-[#0D0D15]/[0.03]">
                        <span className="font-display text-[10px] uppercase font-bold tracking-wider text-[#0D0D15]/50">
                            {filtered.length} of {transactions.length} records displayed
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="font-display text-[10px] uppercase font-bold tracking-wider text-[#0D0D15]/50">
                                Total:
                            </span>
                            <span className="font-display font-extrabold text-base text-[#E85D35]">
                                ${totalRevenue.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default TransactionsPage;