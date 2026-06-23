"use client";

import React, { useState } from "react";

// Woodblock Revival custom vector assets
const WaveCrestLogo = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-[#E85D35]" aria-hidden="true">
        <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
        <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" />
        <circle cx="28" cy="35" r="3" />
        <circle cx="48" cy="20" r="2.5" />
        <circle cx="72" cy="40" r="3.5" />
    </svg>
);

const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const BookIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const TransactionIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const MenuBarsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const EyeOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeClosedIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const INITIAL_USERS = [
    { id: "u1", name: "Albert Dera", email: "albert.dera@fable.com", role: "writer" },
    { id: "u2", name: "Master Basho", email: "basho@fable-revival.jp", role: "writer" },
    { id: "u3", name: "Murasaki Shikibu", email: "shikibu@fable-revival.jp", role: "writer" },
    { id: "u4", name: "Genji Tanaka", email: "genji.tanaka@tokyo.com", role: "user" },
    { id: "u5", name: "Hokusai Katsushika", email: "hokusai@fable-revival.jp", role: "admin" },
    { id: "u6", name: "Tomo Kurosawa", email: "tomo.k@gmail.com", role: "user" },
];

const INITIAL_EBOOKS = [
    { id: "eb1", title: "The Scarlet Hat", writerName: "Albert Dera", price: 14.99, status: "Published" },
    { id: "eb2", title: "Bamboo Forest Whispers", writerName: "Master Basho", price: 8.50, status: "Published" },
    { id: "eb3", title: "Tales of the Ghostly Lantern", writerName: "Hokusai Katsushika", price: 11.00, status: "Unpublished" },
    { id: "eb4", title: "Journey to the Northern Peaks", writerName: "Chiyo-ni", price: 0.00, status: "Published" },
    { id: "eb5", title: "The Scribe's Hidden Inkwell", writerName: "Murasaki Shikibu", price: 14.50, status: "Published" },
];

const INITIAL_TRANSACTIONS = [
    { id: "TX-9081", type: "publishing fee", email: "albert.dera@fable.com", amount: 10.00, date: "2026-06-02" },
    { id: "TX-9082", type: "purchase", email: "genji.tanaka@tokyo.com", amount: 14.99, date: "2026-06-10" },
    { id: "TX-9083", type: "publishing fee", email: "basho@fable-revival.jp", amount: 10.00, date: "2026-06-12" },
    { id: "TX-9084", type: "purchase", email: "tomo.k@gmail.com", amount: 8.50, date: "2026-06-15" },
    { id: "TX-9085", type: "publishing fee", email: "shikibu@fable-revival.jp", amount: 10.00, date: "2026-06-18" },
    { id: "TX-9086", type: "purchase", email: "genji.tanaka@tokyo.com", amount: 14.50, date: "2026-06-20" },
];

export default function AdminDashboard() {
    // const [activeTab, setActiveTab] = useState("home");
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // // Dynamic simulation states
    // const [users, setUsers] = useState(INITIAL_USERS);
    // const [ebooks, setEbooks] = useState(INITIAL_EBOOKS);
    // const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

    // Table action handlers
    // const changeUserRole = (id, newRole) => {
    //     setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    // };

    // const deleteUser = (id) => {
    //     setUsers(users.filter(u => u.id !== id));
    // };

    // const toggleEbookStatus = (id) => {
    //     setEbooks(ebooks.map(eb => {
    //         if (eb.id === id) {
    //             return { ...eb, status: eb.status === "Published" ? "Unpublished" : "Published" };
    //         }
    //         return eb;
    //     }));
    // };

    // const deleteEbook = (id) => {
    //     setEbooks(ebooks.filter(eb => eb.id !== id));
    // };

    // Nav mapping list
    // const navItems = [
    //     { id: "home", label: "Dashboard Home", icon: HomeIcon },
    //     { id: "users", label: "Manage Users", icon: UsersIcon },
    //     { id: "ebooks", label: "Manage Ebooks", icon: BookIcon },
    //     { id: "transactions", label: "Transactions", icon: TransactionIcon },
    // ];

    // const totalUsers = users.length;
    // const totalWriters = users.filter(u => u.role === "writer").length;
    // const totalEbooksSold = ebooks.length;
    // const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="min-h-[100dvh] bg-[#F0E3CE] text-[#0D0D15] flex flex-col md:flex-row max-w-[1440px] mx-auto relative font-display">

            { }
            <aside className="hidden md:flex w-72 bg-[#F0E3CE] border-r-3 border-[#0D0D15] flex-col justify-between p-6 shrink-0 h-[100dvh] sticky top-0">
                <div className="space-y-10">
                    <div className="flex items-center gap-3 border-b-2 border-[#0D0D15] pb-5">
                        <WaveCrestLogo />
                        <div>
                            <span className="font-extrabold text-2xl tracking-widest block text-[#0D0D15]">FABLE</span>
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#0D0D15]/60 block">
                                Imperial Vault Admin
                            </span>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-3">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    type="button"
                                    className={`flex items-center gap-4 w-full px-4 py-3 border-2 rounded-lg text-xs font-bold uppercase transition-all tracking-wider cursor-pointer ${isActive
                                        ? "bg-[#E85D35] text-[#F0E3CE] border-[#0D0D15] shadow-ink-sm translate-y-[-2px]"
                                        : "bg-transparent text-[#0D0D15] border-[#0D0D15]/10 hover:border-[#0D0D15]/40 hover:bg-[#0D0D15]/5"
                                        }`}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-[#0D0D15]/10 pt-5 text-center">
                    <span className="text-[9px] tracking-widest font-bold text-[#0D0D15]/40 uppercase">
                        Edo Woodblock Engine v4.0
                    </span>
                </div>
            </aside>

            { }
            <header className="md:hidden flex justify-between items-center bg-[#F0E3CE] border-b-3 border-[#0D0D15] p-4 sticky top-0 z-[100] w-full">
                <div className="flex items-center gap-2">
                    <WaveCrestLogo />
                    <span className="font-extrabold text-xl tracking-wider text-[#0D0D15]">FABLE</span>
                </div>

                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="border-2 border-[#0D0D15] rounded-md bg-[#F0E3CE] text-[#0D0D15] shadow-ink-sm flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase cursor-pointer"
                >
                    <MenuBarsIcon />
                    <span>Menu</span>
                </button>

                {/* Compile-safe Mobile Drawer Overlay */}
                {isDrawerOpen && (
                    <div className="fixed inset-0 z-[350] flex">
                        {/* Backdrop */}
                        <div
                            onClick={() => setIsDrawerOpen(false)}
                            className="fixed inset-0 bg-[#0d0d15]/50 backdrop-blur-xs transition-opacity duration-300"
                        />
                        {/* Slide-out Panel */}
                        <div className="relative w-full max-w-[280px] bg-[#F0E3CE] border-r-3 border-[#0D0D15] h-full flex flex-col p-5 shadow-2xl z-10 animate-fade-in">
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="absolute top-4 right-4 text-[#0D0D15] hover:text-[#E85D35] transition-colors p-1"
                                aria-label="Close menu"
                            >
                                <CloseIcon />
                            </button>

                            <div className="flex items-center gap-2 border-b border-[#0D0D15]/20 pb-4 mt-6">
                                <WaveCrestLogo />
                                <span className="font-extrabold text-lg tracking-wider">VAULT MENU</span>
                            </div>

                            <nav className="flex flex-col gap-3 mt-8">
                                {navItems.map((item) => {
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setIsDrawerOpen(false);
                                            }}
                                            type="button"
                                            className={`flex items-center gap-3 w-full px-4 py-3 border-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${isActive
                                                ? "bg-[#E85D35] text-[#F0E3CE] border-[#0D0D15] shadow-ink-sm"
                                                : "bg-transparent text-[#0D0D15] border-[#0D0D15]/10"
                                                }`}
                                        >
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            { }
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden min-h-[calc(100dvh-60px)] md:min-h-screen">

                {/* Tab 1: Dashboard Home Analytics & Woodblock Charts */}
                {activeTab === "home" && (
                    <div className="space-y-10 animate-fade-in">
                        <div>
                            <h2 className="section-heading text-2xl font-bold uppercase tracking-wider">
                                Imperial Ledger Overview
                            </h2>
                            <p className="text-xs text-[#0D0D15]/60 mt-3 max-w-[65ch]">
                                Visual records of the Scribe Covenant’s earnings, catalog expansions, and active platform participants.
                            </p>
                        </div>

                        {/* Analytics Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                            <div className="card-ink p-5 bg-[#F0E3CE]">
                                <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider">
                                    Total Users
                                </p>
                                <div className="flex justify-between items-baseline mt-3">
                                    <h3 className="text-3xl font-extrabold">{totalUsers}</h3>
                                    <span className="text-xs font-semibold text-[#CC7722] bg-[#CC7722]/10 px-2 py-0.5 rounded border border-[#CC7722]">
                                        MEMBERS
                                    </span>
                                </div>
                            </div>

                            <div className="card-ink p-5 bg-[#F0E3CE]">
                                <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider">
                                    Total Writers
                                </p>
                                <div className="flex justify-between items-baseline mt-3">
                                    <h3 className="text-3xl font-extrabold">{totalWriters}</h3>
                                    <span className="text-xs font-semibold text-[#E85D35] bg-[#E85D35]/10 px-2 py-0.5 rounded border border-[#E85D35]">
                                        VERIFIED
                                    </span>
                                </div>
                            </div>

                            <div className="card-ink p-5 bg-[#F0E3CE]">
                                <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider">
                                    Total Ebooks Sold
                                </p>
                                <div className="flex justify-between items-baseline mt-3">
                                    <h3 className="text-3xl font-extrabold">{totalEbooksSold}</h3>
                                    <span className="text-xs font-semibold text-[#003153] bg-[#003153]/10 px-2 py-0.5 rounded border border-[#003153]">
                                        SALES
                                    </span>
                                </div>
                            </div>

                            <div className="card-ink p-5 bg-[#F0E3CE]">
                                <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider">
                                    Total Revenue
                                </p>
                                <div className="flex justify-between items-baseline mt-3">
                                    <h3 className="text-2xl font-extrabold">¥{totalRevenue.toFixed(2)}</h3>
                                    <span className="text-xs font-semibold text-[#2A4056] bg-[#2A4056]/10 px-2 py-0.5 rounded border border-[#2A4056]">
                                        REVENUE
                                    </span>
                                </div>
                            </div>

                        </div>

                        { }
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">

                            {/* Left Chart Panel (8/12 wide): Monthly Sales bar visualization */}
                            <div className="lg:col-span-8 card-ink p-6 bg-[#F0E3CE] space-y-4">
                                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0D0D15]/70 border-b border-[#0D0D15]/10 pb-2">
                                    Monthly Treasures (Sumi Bar Ledger)
                                </h4>

                                {/* Responsive SVG Bar Graph */}
                                <div className="w-full aspect-[16/9] min-h-[220px] max-h-[300px] relative">
                                    <svg viewBox="0 0 500 250" className="w-full h-full" preserveAspectRatio="none">
                                        {/* Gridlines */}
                                        <line x1="50" y1="50" x2="480" y2="50" stroke="#0d0d15" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
                                        <line x1="50" y1="125" x2="480" y2="125" stroke="#0d0d15" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
                                        <line x1="50" y1="200" x2="480" y2="200" stroke="#0d0d15" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />

                                        {/* Solid Base Baseline */}
                                        <line x1="40" y1="200" x2="480" y2="200" stroke="#0D0D15" strokeWidth="3" />

                                        {/* Bars - representing wood pillars decorated with colors */}
                                        <g className="group cursor-pointer">
                                            <rect x="80" y="140" width="45" height="60" fill="#2A4056" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#CC7722]" />
                                            <text x="102" y="130" textAnchor="middle" fill="#0D0D15" className="text-[9px] font-bold">¥60.00</text>
                                            <text x="102" y="215" textAnchor="middle" fill="#0D0D15" className="text-[10px] font-bold">JAN</text>
                                        </g>
                                        <g className="group cursor-pointer">
                                            <rect x="160" y="110" width="45" height="90" fill="#003153" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#CC7722]" />
                                            <text x="182" y="100" textAnchor="middle" fill="#0D0D15" className="text-[9px] font-bold">¥120.00</text>
                                            <text x="182" y="215" textAnchor="middle" fill="#0D0D15" className="text-[10px] font-bold">FEB</text>
                                        </g>
                                        <g className="group cursor-pointer">
                                            <rect x="240" y="90" width="45" height="110" fill="#CC7722" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#E85D35]" />
                                            <text x="262" y="80" textAnchor="middle" fill="#0D0D15" className="text-[9px] font-bold">¥180.00</text>
                                            <text x="262" y="215" textAnchor="middle" fill="#0D0D15" className="text-[10px] font-bold">MAR</text>
                                        </g>
                                        <g className="group cursor-pointer">
                                            <rect x="320" y="60" width="45" height="140" fill="#E85D35" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#003153]" />
                                            <text x="342" y="50" textAnchor="middle" fill="#0D0D15" className="text-[9px] font-bold">¥240.00</text>
                                            <text x="342" y="215" textAnchor="middle" fill="#0D0D15" className="text-[10px] font-bold">APR</text>
                                        </g>
                                        <g className="group cursor-pointer">
                                            <rect x="400" y="75" width="45" height="125" fill="#2A4056" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#CC7722]" />
                                            <text x="422" y="65" textAnchor="middle" fill="#0D0D15" className="text-[9px] font-bold">¥202.40</text>
                                            <text x="422" y="215" textAnchor="middle" fill="#0D0D15" className="text-[10px] font-bold">MAY</text>
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            {/* Right Chart Panel (4/12 wide): Genre pie/donut segment */}
                            <div className="lg:col-span-4 card-ink p-6 bg-[#F0E3CE] flex flex-col justify-between space-y-4">
                                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0D0D15]/70 border-b border-[#0D0D15]/10 pb-2">
                                    Scrolls by Genre (Hollow Fan)
                                </h4>

                                {/* Donut Chart representation built directly in SVG */}
                                <div className="flex justify-center items-center py-2">
                                    <svg width="150" height="150" viewBox="0 0 100 100" className="w-36 h-36">
                                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0D0D15" strokeWidth="1" />
                                        {/* Fiction segment (40%) */}
                                        <circle cx="50" cy="50" r="30" fill="transparent" stroke="#E85D35" strokeWidth="16" strokeDasharray="75.4 188.5" strokeDashoffset="0" />
                                        {/* Poetry segment (30%) */}
                                        <circle cx="50" cy="50" r="30" fill="transparent" stroke="#2A4056" strokeWidth="16" strokeDasharray="56.5 188.5" strokeDashoffset="-75.4" />
                                        {/* Historical (20%) */}
                                        <circle cx="50" cy="50" r="30" fill="transparent" stroke="#CC7722" strokeWidth="16" strokeDasharray="37.7 188.5" strokeDashoffset="-131.9" />
                                        {/* Scribe Diaries (10%) */}
                                        <circle cx="50" cy="50" r="30" fill="transparent" stroke="#003153" strokeWidth="16" strokeDasharray="18.9 188.5" strokeDashoffset="-169.6" />
                                        {/* Inner Washi Core masking hole */}
                                        <circle cx="50" cy="50" r="22" fill="#F0E3CE" stroke="#0D0D15" strokeWidth="2" />
                                    </svg>
                                </div>

                                {/* Donut Legend Indicators */}
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 bg-[#E85D35] border border-[#0D0D15] rounded-sm" />
                                        <span>Fiction (40%)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 bg-[#2A4056] border border-[#0D0D15] rounded-sm" />
                                        <span>Poetry (30%)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 bg-[#CC7722] border border-[#0D0D15] rounded-sm" />
                                        <span>History (20%)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 bg-[#003153] border border-[#0D0D15] rounded-sm" />
                                        <span>Diary (10%)</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Tab 2: Manage Users Panel */}
                {activeTab === "users" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0D0D15]/10 pb-4">
                            <div>
                                <h2 className="section-heading text-xl font-bold uppercase tracking-wider">
                                    Covenant Citizens List
                                </h2>
                                <p className="text-xs text-[#0D0D15]/60 mt-3">
                                    A comprehensive registry of active users, authors, and staff.
                                </p>
                            </div>
                            <span className="text-xs font-bold bg-[#003153] text-[#F0E3CE] px-3 py-1.5 rounded-md border-2 border-[#0D0D15]">
                                {users.length} Citizens
                            </span>
                        </div>

                        {/* Custom Responsive Table conforming to Hero UI Visual Guidelines */}
                        <div className="w-full overflow-x-auto border-ink rounded-lg shadow-ink">
                            <table className="w-full text-left border-collapse bg-[#F0E3CE]">
                                <thead>
                                    <tr className="border-b-3 border-[#0D0D15] bg-[#2A4056] text-[#F0E3CE]">
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Role Tag</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-[#0D0D15]/15 hover:bg-[#0D0D15]/5 transition-colors">
                                            <td className="px-4 py-3 text-sm font-bold text-[#0D0D15] whitespace-nowrap">{user.name}</td>
                                            <td className="px-4 py-3 text-xs font-medium text-[#0D0D15]/80 whitespace-nowrap">{user.email}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${user.role === "admin"
                                                    ? "bg-[#E85D35]/15 text-[#E85D35] border-[#E85D35]"
                                                    : user.role === "writer"
                                                        ? "bg-[#CC7722]/15 text-[#CC7722] border-[#CC7722]"
                                                        : "bg-[#2A4056]/15 text-[#2A4056] border-[#2A4056]"
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => changeUserRole(user.id, e.target.value)}
                                                        className="text-[10px] font-bold uppercase tracking-wider bg-[#F0E3CE] border-2 border-[#0D0D15] rounded px-2 py-1 focus:outline-none cursor-pointer"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="writer">Writer</option>
                                                        <option value="admin">Admin</option>
                                                    </select>

                                                    <button
                                                        onClick={() => deleteUser(user.id)}
                                                        type="button"
                                                        className="p-1.5 border-2 border-[#0D0D15] rounded hover:bg-[#E85D35]/10 text-red-700 transition-colors cursor-pointer"
                                                        aria-label="Delete User"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tab 3: Manage Ebooks Panel */}
                {activeTab === "ebooks" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0D0D15]/10 pb-4">
                            <div>
                                <h2 className="section-heading text-xl font-bold uppercase tracking-wider">
                                    Scroll Catalog Index
                                </h2>
                                <p className="text-xs text-[#0D0D15]/60 mt-3">
                                    Approve, publish, retract, or clean files within the centralized public ledger.
                                </p>
                            </div>
                            <span className="text-xs font-bold bg-[#CC7722] text-[#F0E3CE] px-3 py-1.5 rounded-md border-2 border-[#0D0D15]">
                                {ebooks.length} Scrolls
                            </span>
                        </div>

                        {/* Custom Interactive Table showing titles, scribe values and publication status */}
                        <div className="w-full overflow-x-auto border-ink rounded-lg shadow-ink">
                            <table className="w-full text-left border-collapse bg-[#F0E3CE]">
                                <thead>
                                    <tr className="border-b-3 border-[#0D0D15] bg-[#2A4056] text-[#F0E3CE]">
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Title</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Master Scribe</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Price</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ebooks.map((ebook) => (
                                        <tr key={ebook.id} className="border-b border-[#0D0D15]/15 hover:bg-[#0D0D15]/5 transition-colors">
                                            <td className="px-4 py-3 text-sm font-bold text-[#0D0D15] whitespace-nowrap">{ebook.title}</td>
                                            <td className="px-4 py-3 text-xs font-semibold text-[#0D0D15]/80 whitespace-nowrap">{ebook.writerName}</td>
                                            <td className="px-4 py-3 text-xs font-extrabold whitespace-nowrap">
                                                {ebook.price === 0 ? "Free" : `¥${ebook.price.toFixed(2)}`}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${ebook.status === "Published"
                                                    ? "bg-emerald-100 text-emerald-800 border-emerald-500"
                                                    : "bg-amber-100 text-amber-800 border-amber-500"
                                                    }`}>
                                                    {ebook.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => toggleEbookStatus(ebook.id)}
                                                        type="button"
                                                        className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold uppercase border-2 rounded transition-all shadow-ink-sm cursor-pointer ${ebook.status === "Published"
                                                            ? "bg-transparent text-[#0D0D15] border-[#0D0D15] hover:bg-[#0D0D15]/5"
                                                            : "bg-[#E85D35] text-[#F0E3CE] border-[#0D0D15]"
                                                            }`}
                                                    >
                                                        {ebook.status === "Published" ? (
                                                            <>
                                                                <EyeClosedIcon />
                                                                <span>Retract</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <EyeOpenIcon />
                                                                <span>Publish</span>
                                                            </>
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => deleteEbook(ebook.id)}
                                                        type="button"
                                                        className="p-1.5 border-2 border-[#0D0D15] rounded hover:bg-[#E85D35]/10 text-red-700 transition-colors cursor-pointer"
                                                        aria-label="Delete Ebook"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tab 4: View Transactions Panel */}
                {activeTab === "transactions" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0D0D15]/10 pb-4">
                            <div>
                                <h2 className="section-heading text-xl font-bold uppercase tracking-wider">
                                    Imperial Treasure Transactions
                                </h2>
                                <p className="text-xs text-[#0D0D15]/60 mt-3">
                                    Historical financial records of publishing fee seals and purchases.
                                </p>
                            </div>
                            <span className="text-xs font-bold bg-[#2A4056] text-[#F0E3CE] px-3 py-1.5 rounded-md border-2 border-[#0D0D15]">
                                {transactions.length} Records
                            </span>
                        </div>

                        {/* Custom Interactive Table documenting active transaction ledger states */}
                        <div className="w-full overflow-x-auto border-ink rounded-lg shadow-ink">
                            <table className="w-full text-left border-collapse bg-[#F0E3CE]">
                                <thead>
                                    <tr className="border-b-3 border-[#0D0D15] bg-[#2A4056] text-[#F0E3CE]">
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Transaction ID</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Type</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Parchment Email</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Amount</th>
                                        <th className="px-4 py-3 text-xs uppercase font-extrabold tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="border-b border-[#0D0D15]/15 hover:bg-[#0D0D15]/5 transition-colors">
                                            <td className="px-4 py-3 text-xs font-mono font-extrabold text-[#0D0D15] whitespace-nowrap">{tx.id}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${tx.type === "publishing fee"
                                                    ? "bg-[#CC7722]/15 text-[#CC7722] border-[#CC7722]"
                                                    : "bg-[#003153]/15 text-[#003153] border-[#003153]"
                                                    }`}>
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-xs font-medium text-[#0D0D15]/80 whitespace-nowrap">{tx.email}</td>
                                            <td className="px-4 py-3 text-xs font-extrabold text-[#0D0D15] whitespace-nowrap">
                                                ¥{tx.amount.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 text-xs font-semibold text-[#0D0D15]/60 whitespace-nowrap">{tx.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main>

        </div>
    );
}