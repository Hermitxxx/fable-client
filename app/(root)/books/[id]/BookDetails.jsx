"use client";

import { getBooksByWriterId } from "@/app/lib/api/books";
import OtherWorks from "@/components/OtherWorks";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Inline Custom SVGs to replace external icons and maintain Ukiyo-e stylings
const WaveCrestIcon = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current" aria-hidden="true">
        <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
        <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" />
        <circle cx="28" cy="35" r="3" />
        <circle cx="48" cy="20" r="2.5" />
        <circle cx="72" cy="40" r="3.5" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-4 h-4 text-sun">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const OpenBookIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const BookmarkIcon = ({ isActive }) => (
    <svg
        viewBox="0 0 24 24"
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2.5"
        className="w-5 h-5"
    >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
);

const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const TagIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
);

export default function BookDetails({ book }) {
    // Mock session states (feel free to connect these to your global auth/state providers)
    const [userRole, setUserRole] = useState("GUEST"); // Options: "GUEST", "BUYER", "OWNER", "BUYER_PURCHASED"
    const [pageState, setPageState] = useState("LOADED"); // Options: "LOADED", "LOADING", "NOT_FOUND"
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);

    // Sync simulated purchased state with role changes for better UX flow
    useEffect(() => {
        if (userRole === "BUYER_PURCHASED") {
            setIsPurchased(true);
        } else {
            setIsPurchased(false);
        }
    }, [userRole, book.writerId]);


    // Format the raw timestamp to a beautiful classic layout
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    if (pageState === "LOADING") {
        return (
            <div className="min-h-dvh bg-paper text-ink py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
                    {/* Cover Art Skeleton */}
                    <div className="md:col-span-4 flex flex-col items-center">
                        <div className="w-70 h-97.5 border-3 border-ink rounded-lg bg-ink/10 animate-pulse relative shadow-ink" />
                        <div className="w-45 h-10 mt-6 bg-ink/10 animate-pulse border-2 border-ink rounded" />
                    </div>
                    {/* Details Content Skeleton */}
                    <div className="md:col-span-8 space-y-6">
                        <div className="h-4 w-28 bg-ink/15 animate-pulse rounded" />
                        <div className="h-10 w-3/4 bg-ink/20 animate-pulse rounded" />
                        <div className="h-5 w-1/3 bg-ink/15 animate-pulse rounded" />

                        <div className="border-y border-ink/20 py-4 grid grid-cols-2 gap-4">
                            <div className="h-10 bg-ink/10 animate-pulse rounded" />
                            <div className="h-10 bg-ink/10 animate-pulse rounded" />
                        </div>

                        <div className="space-y-3">
                            <div className="h-4 bg-ink/15 animate-pulse rounded w-full" />
                            <div className="h-4 bg-ink/15 animate-pulse rounded w-5/6" />
                            <div className="h-4 bg-ink/15 animate-pulse rounded w-2/3" />
                        </div>

                        <div className="h-12 w-48 bg-ink/20 animate-pulse rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (pageState === "NOT_FOUND") {
        return (
            <div className="min-h-dvh bg-paper text-ink py-8 px-4 md:px-8 max-w-[1280px] mx-auto space-y-8">
                <div className="flex flex-col items-center justify-center py-20 text-center max-w-[600px] mx-auto">
                    <div className="w-24 h-24 rounded-full border-3 border-ink bg-wave text-paper flex items-center justify-center shadow-ink mb-6">
                        <LockIcon />
                    </div>
                    <h2 className="font-display font-bold text-3xl tracking-widest text-ink uppercase">SCROLL NOT FOUND</h2>
                    <div className="h-1.5 w-24 bg-ochre my-4" />
                    <p className="font-display text-sm text-ink/70 leading-relaxed mb-8">
                        The wooden blocks containing this chronicle may have been lost in the great fire, or the writer has retracted the parchment seals. Please verify your collection ID catalog.
                    </p>
                    <button
                        onClick={() => setPageState("LOADED")}
                        className="btn-primary shadow-ink-sm"
                    >
                        RESTORE DEFAULT SCROLL
                    </button>
                </div>
            </div>
        );
    }

    // Evaluate dynamic conditions based on active roles
    const isScribeOwner = userRole === "OWNER";
    const isGuest = userRole === "GUEST";

    return (
        <main className="min-h-dvh bg-paper text-ink py-8 mt-8 mb-10 px-4 md:px-8 max-w-[1280px] mx-auto relative">

            {/* Platform Branding Bar */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-12 gap-4 mt-8">
                <div>
                    <div className="flex items-center gap-3 text-sun mb-2">
                        <WaveCrestIcon />
                        <span className="font-bold text-3xl tracking-widest font-display">FABLE</span>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-ink/60 font-display">
                        Edo Epoch Ebook Emporium • Interactive Vault
                    </p>
                </div>
                <div className="flex gap-3 mb-6">
                    <Link href={`/books`}>
                        <button className="btn-ghost text-xs py-2 px-4 shadow-ink-sm uppercase font-display">
                            Return to stacks
                        </button>
                    </Link>
                </div>
            </header>

            {/* Primary Details Grid Frame */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">

                {/* Left Side Col (4 cols): Massive Immersive Cover Showcase */}
                <div className="lg:col-span-4 flex flex-col items-center">
                    <div className="w-70 md:w-[320px] h-100 md:h-112.5 border-3 border-ink shadow-ink rounded-lg overflow-hidden relative bg-ink/5 flex items-center justify-center group">
                        {/* Screen paper texture backdrop lines */}
                        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-[linear-gradient(rgba(13,13,21,0.15)_1px,transparent_1px)] bg-size-[100%_4px]" />
                        <Image
                            src={book.coverImage}
                            alt={book.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Available/Sold Out Badge overlay */}
                        <div className={`absolute top-4 left-4 ${book.status.toLowerCase() === 'sold' ? 'bg-wave text-paper' : 'bg-sun text-paper'} border-2 border-ink text-[10px] font-bold px-3 py-1 rounded shadow-ink-sm uppercase tracking-widest font-display`}>
                            {book.status}
                        </div>
                    </div>

                    {/* Bookmark Woodblock button */}
                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`w-70 md:w-[320px] mt-6 flex items-center justify-center gap-2 py-3 border-2 rounded-lg font-display text-xs font-bold uppercase transition-all shadow-ink-sm cursor-pointer ${isBookmarked
                            ? "bg-ochre text-paper border-ink"
                            : "bg-transparent text-ink border-ink hover:bg-ink/5"
                            }`}
                    >
                        <BookmarkIcon isActive={isBookmarked} />
                        {isBookmarked ? "BOOKMARKED IN VAULT" : "ADD TO ARCHIVE BOOKMARKS"}
                    </button>
                </div>

                {/* Right Side Col (8 cols): Structured Metadata & Content Gate */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Breadcrumb / Genre Tag */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-sun font-bold uppercase tracking-widest font-display">
                            <TagIcon /> {book.genre}
                        </span>
                        <span className="text-ink/30">•</span>
                        <span className="flex items-center gap-1 text-xs text-ink/70 font-semibold font-display">
                            <StarIcon /> {book.rating} Ratings ({book.purchaseCount} purchases)
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-none text-ink tracking-wider uppercase font-display">
                        {book.title}
                    </h1>

                    {/* Scribe / Creator Name Segment */}
                    <div className="flex flex-wrap items-center gap-4 py-3 border-y border-ink/15">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-ink text-xs font-bold text-paper">
                                <Image src={book.writerImage} width={100} height={100} alt={book.writerName} className="object-cover"></Image>
                            </div>
                            <div>
                                <p className="text-[10px] text-ink/50 uppercase tracking-widest font-display">Master Scribe</p>
                                <a
                                    href={`#scribes/${book.writerId}`}
                                    className="text-sm font-bold text-ochre hover:text-sun transition-colors underline font-display"
                                >
                                    {book.writerName}
                                </a>
                            </div>
                        </div>

                        <div className="h-6 w-px bg-ink/15 hidden md:block" />

                        <div className="flex items-center gap-2">
                            <span className="text-ink/60"><CalendarIcon /></span>
                            <div>
                                <p className="text-[10px] text-ink/50 uppercase tracking-widest font-display">Uploaded</p>
                                <p className="text-xs font-bold text-ink font-display">{formatDate(book.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description Block */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-ink/50 font-display">CHRONICLE BACKGROUND</h4>
                        <p className="text-base leading-relaxed text-ink/90 max-w-[72ch]">
                            {book.description}
                        </p>
                    </div>

                    {/* Purchase Trigger Area */}
                    <div className="bg-wave/5 p-6 rounded-lg border-2 border-ink shadow-ink-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-[10px] text-ink/50 uppercase tracking-widest font-display">ARCHIVE ACCESS FEE</p>
                            <p className="text-2xl font-extrabold text-sun font-display">
                                {book.price === 0 ? "Free Access" : `¥${book.price.toFixed(2)}`}
                            </p>
                        </div>

                        <Button className={`btn-primary text-sm py-2 px-4 text-center justify-center`}>Purchase</Button>
                    </div>

                </div>
            </section>

            {/* Scribe's Alternative Catalog section */}
            <section className="pt-10 mt-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="section-heading text-lg font-bold tracking-wider uppercase font-display">
                        OTHER SCROLLS BY {book.writerName.toUpperCase()}
                    </h3>
                    <a
                        href={`#scribes/${book.writerId}`}
                        className="text-xs font-bold text-sun hover:underline font-display tracking-wide uppercase"
                    >
                        VIEW ALL WORKSETS
                    </a>
                </div>

                <OtherWorks writerId={book.writerId}></OtherWorks>
            </section>

        </main>
    );
}