'use client';

import React from "react";
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// import { authClient } from '@/lib/auth-client';
import {
    House, Briefcase, Bell, User, Settings,
    Search, Bookmark, FileText, CreditCard,
    LogOut, Menu, Building, Users, ArrowLeft,
    LayoutGrid,
    User2Icon,
    BookmarkIcon,
    HistoryIcon,
    BookOpen
} from 'lucide-react';
import { Button, Drawer, Avatar } from "@heroui/react";
import Link from "next/link";
import toast from 'react-hot-toast';
import { PiBooks } from "react-icons/pi";
import { MdPublish } from "react-icons/md";
import { authClient } from "@/app/lib/auth-client";

const CustomLogOutIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0"
        aria-hidden="true"
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const WaveCrestLogo = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-[#E85D35]" aria-hidden="true">
        <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
        <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" />
        <circle cx="28" cy="35" r="3" />
        <circle cx="48" cy="20" r="2.5" />
        <circle cx="72" cy="40" r="3.5" />
    </svg>
);

const readerNavLinks = [
    { icon: House, href: "/dashboard/reader", label: "Dashboard" },
    { icon: BookmarkIcon, href: "/dashboard/reader/bookmarks", label: "Bookmarks" },
    { icon: HistoryIcon, href: "/dashboard/reader/purchase-history", label: "Purchased Scribes" },
    { icon: User2Icon, href: "/dashboard/reader/profile", label: "Profile" },
];

const writerNavlinks = [
    { icon: LayoutGrid, href: "/dashboard/writer", label: "Dashboard" },
    { icon: MdPublish, href: "/dashboard/writer/add-ebook", label: "Publish Scribe" },
    { icon: PiBooks, href: "/dashboard/writer/ebooks", label: "E-books" },
    { icon: BookmarkIcon, href: "/dashboard/writer/bookmarks", label: "Bookmarks" },
    { icon: User2Icon, href: "/dashboard/writer/profile", label: "Profile" },
];

const adminNavLinks = [
    { icon: LayoutGrid, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: PiBooks, href: "/dashboard/admin/ebooks", label: "E-books" },
    { icon: Briefcase, href: "/dashboard/admin/transactions", label: "Transactions" },
    { icon: User2Icon, href: "/dashboard/admin/profile", label: "Profile" },
]

const publicLinks = [
    { icon: House, href: "/", label: "Home" },
    { icon: Search, href: "/books", label: "Browse Scribes" },
    { icon: CreditCard, href: "/about", label: "About Fable" },
];

const navLinksMap = {
    seeker: readerNavLinks,
    writer: writerNavlinks,
    admin: adminNavLinks,
};

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter()

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    const role = session?.user?.role;
    const navItems = navLinksMap[role] || readerNavLinks;

    async function handleSignOut() {
        setMobileOpen(false);
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); // redirect to login page
                },
            },
        });
        // Hook your authentic log out logic here
        console.log("Unsealing active session credentials...");
    }

    const isActive = (href) => {
        if (href === '/dashboard/reader' || href === '/dashboard/writer' || href === '/dashboard/admin') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const navContent = (
        <nav className="flex flex-col gap-1 px-3" aria-label="Dashboard navigation">
            {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active
                            ? 'bg-sun text-paper shadow-sm shadow-brand/5'
                            : 'text-zinc-400 hover:bg-sun/50 hover:text-zinc-200'
                            }`}
                        aria-current={active ? 'page' : undefined}
                    >
                        <item.icon className={`size-5 shrink-0 ${active ? 'text-brand' : 'text-zinc-500'}`} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    const publicNav = (
        <div className="px-3">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
                Public
            </p>
            <nav className="flex flex-col gap-1" aria-label="Public pages">
                {publicLinks.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-zinc-400 hover:bg-sun/50 hover:text-zinc-200`}
                    >
                        <item.icon className="size-5 shrink-0 text-zinc-600" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );

    // const userInfo = user ? (
    //     <div className="border-b border-white/10 px-4 py-5">
    //         <div className="flex items-center gap-3">
    //             <Avatar
    //                 src={user?.image || user?.avatar || ''}
    //                 alt={user?.name || 'User'}
    //                 size="sm"
    //                 fallback={user?.name?.charAt(0)?.toUpperCase() || 'U'}
    //                 className="shrink-0"
    //             />
    //             <div className="min-w-0 flex-1">
    //                 <p className="truncate text-sm font-semibold text-zinc-100">
    //                     {user?.name || 'User'}
    //                 </p>
    //                 <p className="truncate text-xs text-zinc-500">
    //                     {user?.email || ''}
    //                 </p>
    //             </div>
    //             <span className="shrink-0 rounded-md border border-brand/20 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
    //                 {role}
    //             </span>
    //         </div>
    //     </div>
    // ) : null;

    const branding = (
        <div className="flex items-center gap-3 pb-5">
            <WaveCrestLogo />
            <div>
                <span className="font-display font-extrabold text-2xl tracking-widest block text-ink">FABLE</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-ink/60 block font-display">
                    Imperial Vault
                </span>
            </div>
        </div>
    );

    const desktopSidebar = (
        <aside
            className="hidden bg-paper min-w-72 shrink-0 flex-col border-r-ink min-h-screen top-0 p-6 lg:flex"
            aria-label="Fable Dashboard Sidebar"
        >
            {/* Branding Segment */}
            <div className=" border-ink/20">
                {branding}
            </div>

            <div className="flex-1">
                {/* Main Navigation Segment */}
                <div className="overflow-y-auto py-6 space-y-2 select-none">
                    {navContent}
                </div>

                {/* Public / Auxiliary Navigation Segment */}
                <div className="py-4 border-t-2 border-dashed border-ink/15">
                    {publicNav}
                </div>
            </div>

            {/* Footer & Action Panel */}
            <div>
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn-ghost text-sm py-2 px-4 text-center"
                >
                    <CustomLogOutIcon />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );

    return (
        <>
            {desktopSidebar}

            {/* Mobile trigger + Drawer — trigger is now a child of Drawer, same pattern as your working Modal usage */}
            <Drawer isOpen={mobileOpen} onOpenChange={setMobileOpen}>
                <div className="border-b-2 flex border-ink p-4 lg:hidden mb-4 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <BookOpen className="w-7 h-7 text-sun" strokeWidth={2.5} />
                        <span className="text-2xl font-bold tracking-tight">Fable</span>
                    </Link>

                    <Button
                        className="sticky left-3 top-3 z-50 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-sun backdrop-blur-xl lg:hidden"
                        variant="flat"
                        isIconOnly
                        aria-label="Open navigation menu"
                    >
                        <Menu className="size-5 text-paper" />
                    </Button>
                </div>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left" className="bg-zinc-950">
                        <Drawer.Dialog className="bg-paper">
                            <Drawer.CloseTrigger slot='close' className="bg-sun text-paper" />
                            <Drawer.Header>
                                <Drawer.Heading>
                                    <span className="text-lg font-bold text-sun">
                                        Fable
                                    </span>
                                </Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body className="bg-paper">
                                {/* {userInfo} */}
                                <div className="mt-4">{navContent}</div>
                                <div className="mt-6">{publicNav}</div>
                                <div className="mt-4 border-t border-white/10 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="btn-ghost text-sm py-2 px-4 text-center"
                                    >
                                        <CustomLogOutIcon />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}
