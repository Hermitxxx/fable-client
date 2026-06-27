"use client";

import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const ChevronDownIcon = ({ isOpen }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const ProfileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-ochre">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-wave">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
    </svg>
);

const LogOutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-sun">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

export default function UserDropDown({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { name, email, role } = user

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleSignOut() {
        await authClient.signOut();
        setIsOpen(false);
        // Hook your authentic log out logic here
        console.log("Unsealing active session credentials...");
    }

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>

            { }
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-2 border-2 border-ink rounded-lg bg-paper hover:bg-ink/5 transition-all shadow-ink-sm active:translate-y-px active:shadow-none cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {/* Red stamp-style circle containing initial */}
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-ink bg-sun flex items-center justify-center font-display font-extrabold text-sm text-paper shadow-sm select-none shrink-0">
                    <Image src={user?.image || 'https://robohash.org/eumquaecum.png?size=250x250&set=set1'} width={100} height={100} alt={user?.name}></Image>
                </div>

                {/* Hidden on small screens, matches the elegant layout spacing */}
                <span className="hidden sm:inline font-display text-xs font-bold uppercase tracking-wider text-ink">
                    {user?.name}
                </span>

                <ChevronDownIcon isOpen={isOpen} />
            </button>

            { }
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg border-3 border-ink bg-paper shadow-ink z-50 animate-fade-in divide-y-2 divide-ink/10 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                >
                    {/* Scribe passport profile card wrapper */}
                    <div className="px-4 py-3 bg-wave/5">
                        <p className="font-display text-[9px] font-bold text-ochre uppercase tracking-widest leading-none mb-1">
                            Active Scribe
                        </p>
                        <p className="font-display text-sm font-bold text-ink truncate">
                            {user.name}
                        </p>
                        <p className="font-mono text-[10px] text-ink/60 truncate mt-0.5">
                            {user.email}
                        </p>
                    </div>

                    { }
                    <div className="py-1">
                        <Link
                            href={`/dashboard/${user.role}/profile`}
                            className="flex items-center gap-3 px-4 py-3 text-xs font-display font-bold uppercase tracking-wider text-ink hover:bg-sun/10 transition-colors cursor-pointer"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            <ProfileIcon />
                            <span>Identity Profile</span>
                        </Link>

                        <Link
                            href={`/dashboard/${user.role}`}
                            className="flex items-center gap-3 px-4 py-3 text-xs font-display font-bold uppercase tracking-wider text-ink hover:bg-wave/10 transition-colors cursor-pointer"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            <DashboardIcon />
                            <span>Imperial Dashboard</span>
                        </Link>
                    </div>

                    { }
                    <div className="py-1">
                        <button
                            type="button"
                            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-display font-bold uppercase tracking-wider text-left text-ink hover:bg-sun/15 transition-colors cursor-pointer"
                            role="menuitem"
                            onClick={handleSignOut}
                        >
                            <LogOutIcon />
                            <span>Unseal Passport</span>
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}