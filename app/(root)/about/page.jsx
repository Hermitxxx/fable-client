"use client";

import React from "react";

const BrushStrokeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M7.5 10.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" />
        <path d="M11.5 14.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" />
        <path d="M16 11.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" />
        <path d="M6 16c2 3 6 4 9 1c1.5-1.5 3-4 1-7" />
    </svg>
);

const WaveCrestIcon = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 fill-current text-sun shrink-0" aria-hidden="true">
        <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
        <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" fill="#F0E3CE" />
        <circle cx="28" cy="35" r="4" />
        <circle cx="48" cy="20" r="3" />
        <circle cx="72" cy="40" r="3.5" />
    </svg>
);

const BookOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const BambooIcon = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 text-wave/20 fill-current absolute bottom-0 right-0 pointer-events-none" aria-hidden="true">
        <path d="M45,10 L55,10 L55,30 L45,30 Z M46,33 L54,33 L54,60 L46,60 Z M45,63 L55,63 L55,90 L45,90 Z" />
        <path d="M55,25 C65,20 70,15 75,25 C70,25 60,30 55,25 Z M45,45 C35,40 30,35 25,45 C30,45 40,50 45,45 Z" />
    </svg>
);

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-[1280px] mx-auto space-y-12 select-none relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-14 right-10 opacity-5 pointer-events-none animate-pulse">
                <WaveCrestIcon />
            </div>

            { }
            {/* Header Segment */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ochre block mb-1">
                        Fable Manifesto & Chronicles
                    </span>
                    <h1 className="section-heading text-3xl font-bold uppercase tracking-wider">
                        About Our Covenant
                    </h1>
                    <p className="text-xs text-ink/70 mt-3 font-display max-w-[65ch]">
                        Unveiling the digital floating world where authentic storytellers carve original manuscripts and collectors preserve them forever.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="/browse"
                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-ink rounded-lg bg-paper hover:bg-ink/5 font-bold text-xs uppercase tracking-wider shadow-ink-sm transition-all"
                    >
                        <BookOpenIcon />
                        <span>Explore the Vault</span>
                    </a>
                </div>
            </header>

            { }
            {/* Hero Narrative Block */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Left Side (5 Cols): Woodblock Emblem Card */}
                <div className="lg:col-span-5 card-ink p-8 bg-paper flex flex-col justify-between relative overflow-hidden">
                    <BambooIcon />

                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-3">
                            <div className="w-16 h-16 border-3 border-ink rounded-lg bg-paper flex items-center justify-center shadow-ink-sm text-sun shrink-0">
                                <WaveCrestIcon />
                            </div>
                            <div>
                                <h2 className="font-display font-extrabold text-lg text-ink uppercase tracking-wide leading-none">
                                    Fable Revival
                                </h2>
                                <span className="text-[10px] text-ochre font-mono tracking-widest uppercase block mt-1.5 font-bold">
                                    Edo Epoch Ledger
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-ink/80 leading-relaxed font-display">
                            In the historic pleasure quarters of ancient Tokyo, travelers assembled at local print shops to collect Ukiyo-e woodblocks—capturing fleeting moments of beauty, love, and heroism on delicate washi paper.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-ink/10 mt-6">
                        <p className="text-[11px] font-mono text-ink/50 italic">
                            &quot;We have rebuilt the traditional printing press for the creators of our modern century.&quot;
                        </p>
                    </div>
                </div>

                {/* Right Side (7 Cols): Core Story Column */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                    <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-sun block">
                            The Digital Floating World
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-wide uppercase leading-tight font-display">
                            Where Brushstrokes Meet the Blockchain.
                        </h2>
                    </div>

                    <p className="text-sm text-ink/80 leading-relaxed font-display">
                        Fable is a decentralized library designed to empower independent writers. In an era dominated by massive distributors that squeeze independent publishers, we return the power directly to the creators.
                    </p>

                    <p className="text-sm text-ink/85 leading-relaxed font-display">
                        Every manuscript uploaded to Fable receives a verified seal, preserving its authenticity as a collectible artifact. Readers don&apos;t just buy digital content; they purchase a registered stake in an author&apos;s legacy.
                    </p>

                    {/* Core Values Stamp List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="flex gap-2 items-start">
                            <span className="text-sun mt-0.5"><BrushStrokeIcon /></span>
                            <div>
                                <h4 className="font-display font-bold text-xs uppercase text-ink">90% Creator Revenue</h4>
                                <p className="text-[11px] text-ink/65 font-display leading-tight">Writers retain almost all proceeds from verification seals.</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-start">
                            <span className="text-ochre mt-0.5"><BrushStrokeIcon /></span>
                            <div>
                                <h4 className="font-display font-bold text-xs uppercase text-ink">Verifiable Ownership</h4>
                                <p className="text-[11px] text-ink/65 font-display leading-tight">Every purchase is verified as a licensed stamp certificate.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            { }
            {/* Dynamic Paths (Two Columns) */}
            <section className="space-y-6 pt-4">
                <div className="text-center">
                    <h3 className="section-heading text-lg font-bold tracking-wider uppercase font-display">
                        Paths of the Covenant
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

                    {/* Card 1: The Scribe's Mandate */}
                    <div className="card-ink p-6 md:p-8 bg-paper flex flex-col justify-between">
                        <div className="space-y-4">
                            <span className="inline-block text-[10px] font-extrabold text-sun bg-sun/10 border border-sun px-2.5 py-1 rounded uppercase tracking-wider">
                                The Scribe&apos;s Path
                            </span>
                            <h4 className="font-display font-bold text-xl text-ink uppercase tracking-wide">
                                Carve Your Legacy
                            </h4>
                            <p className="text-xs text-ink/75 leading-relaxed font-display">
                                Upload your digital manuscripts, establish customizable treasury valuations (prices), and sell direct to global collectors. With a one-time verification fee of 1,000 Yen, we lock your authorship credentials to guarantee authenticity.
                            </p>
                        </div>
                        <div className="pt-8 flex items-center justify-between border-t border-ink/10 mt-6">
                            <span className="text-[10px] text-ink/40 font-mono">
                                90% direct payout structure
                            </span>
                            <a href="/register" className="btn-primary text-[10px] py-1.5 px-3 uppercase tracking-wider font-display">
                                Begin Writing
                            </a>
                        </div>
                    </div>

                    {/* Card 2: The Collector's Archive */}
                    <div className="card-ink p-6 md:p-8 bg-paper flex flex-col justify-between">
                        <div className="space-y-4">
                            <span className="inline-block text-[10px] font-extrabold text-wave bg-wave/10 border border-wave px-2.5 py-1 rounded uppercase tracking-wider">
                                The Collector&apos;s Path
                            </span>
                            <h4 className="font-display font-bold text-xl text-ink uppercase tracking-wide">
                                Build Your Vault
                            </h4>
                            <p className="text-xs text-ink/75 leading-relaxed font-display">
                                Browse our imperial index of limited scrolls, chronicles, and waka poetry. By purchasing a chronicle, you fund independent scribes directly, receiving a premium passport stamp that unlocks full, unblurred access to their washi manuscripts.
                            </p>
                        </div>
                        <div className="pt-8 flex items-center justify-between border-t border-ink/10 mt-6">
                            <span className="text-[10px] text-ink/40 font-mono">
                                Lifetime catalog access
                            </span>
                            <a href="/browse" className="btn-ghost text-[10px] py-1.5 px-3 uppercase tracking-wider font-display">
                                Browse Scrolls
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            { }
            {/* Featured Scribes Portrait Segment */}
            <section className="space-y-6 pt-4">
                <div className="border-b border-ink/10 pb-4">
                    <h3 className="font-display font-extrabold text-sm uppercase tracking-widest text-[#0D0D15] flex items-center gap-2">
                        <BrushStrokeIcon />
                        <span>Spiritual Guides of the Platform</span>
                    </h3>
                    <p className="text-[11px] text-ink/50 mt-1">
                        Our software and ethos are inspired by the timeless precision of Edo&apos;s greatest poets and painters.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                    {/* Portrait 1 */}
                    <div className="card-ink p-5 bg-paper flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg border-2 border-ink bg-paper flex items-center justify-center font-display font-extrabold text-xl shadow-ink-sm text-sun shrink-0">
                            B
                        </div>
                        <div className="space-y-0.5">
                            <h4 className="font-display font-extrabold text-sm text-ink leading-tight">Master Basho</h4>
                            <p className="text-[10px] text-ochre font-bold uppercase tracking-wider">Waka Haiku Scribe</p>
                            <p className="text-[9px] text-ink/40 font-mono">1644 – 1694</p>
                        </div>
                    </div>

                    {/* Portrait 2 */}
                    <div className="card-ink p-5 bg-paper flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg border-2 border-ink bg-paper flex items-center justify-center font-display font-extrabold text-xl shadow-ink-sm text-sun shrink-0">
                            M
                        </div>
                        <div className="space-y-0.5">
                            <h4 className="font-display font-extrabold text-sm text-ink leading-tight">Murasaki Shikibu</h4>
                            <p className="text-[10px] text-ochre font-bold uppercase tracking-wider">Historical Novelist</p>
                            <p className="text-[9px] text-ink/40 font-mono">973 – 1014</p>
                        </div>
                    </div>

                    {/* Portrait 3 */}
                    <div className="card-ink p-5 bg-paper flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg border-2 border-ink bg-paper flex items-center justify-center font-display font-extrabold text-xl shadow-ink-sm text-sun shrink-0">
                            H
                        </div>
                        <div className="space-y-0.5">
                            <h4 className="font-display font-extrabold text-sm text-ink leading-tight">Hokusai Katsushika</h4>
                            <p className="text-[10px] text-ochre font-bold uppercase tracking-wider">Master Print Maker</p>
                            <p className="text-[9px] text-ink/40 font-mono">1760 – 1849</p>
                        </div>
                    </div>

                </div>
            </section>

            { }
            {/* Decorative Traditional Footer Stamp */}
            <footer className="text-center pt-8 border-t-2 border-ink/10 flex flex-col justify-center items-center gap-2">
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Fable Identity Vault Seal Engine v21.4
                </span>
                <span className="text-[9px] font-mono text-ink/20">
                    Copyright © 2026 Fable Revivals JP. All scrolls registered.
                </span>
            </footer>

        </div>
    );
}