"use client";

import { deleteUser, updateUserRole } from "@/app/lib/actions/users";
import { showUserDeletedToast } from "@/components/DeleteToast";
import React, { useState } from "react";

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const UserGroupIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-sun" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export default function AllUsers({ allUsers: users }) {
    // const [users, setUsers] = useState(allUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");

    const handleRoleChange = async (userId, newRole) => {
        const data = {
            userId,
            newRole
        }

        console.log(data);

        const res = await updateUserRole(data)
    };

    const handleDeleteUser = async (userId, userName) => {
        const res = await deleteUser(userId)
        showUserDeletedToast(userName)
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRoleFilter === "all" || user.role === selectedRoleFilter;
        return matchesSearch && matchesRole;
    });

    const totalUsersCount = users.length;
    const totalWritersCount = users.filter((u) => u.role.toLowerCase() === "writer").length;
    const totalAdminsCount = users.filter((u) => u.role.toLowerCase() === "admin").length;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-[1280px] mx-auto space-y-8 select-none">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ochre block mb-1">
                        Imperial Register Panel
                    </span>
                    <h1 className="section-heading text-3xl font-bold uppercase tracking-wider">
                        Covenant Citizenry
                    </h1>
                    <p className="text-xs text-ink/70 mt-3 font-display max-w-[65ch]">
                        Manage credentials, update roles, or revoke archival access for users and scribes.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-ink rounded-lg bg-paper font-bold text-xs uppercase tracking-wider shadow-ink-sm">
                        <UserGroupIcon />
                        <span>{totalUsersCount} Total Citizens</span>
                    </span>
                </div>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Archival Readers
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-3xl font-bold font-display">
                            {users.filter((u) => u.role.toLowerCase() === "reader").length}
                        </h3>
                        <span className="text-[9px] font-bold text-wave bg-wave/10 border border-wave px-2 py-0.5 rounded uppercase">
                            Standard
                        </span>
                    </div>
                </div>

                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        Master Scribes
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-3xl font-bold font-display">{totalWritersCount}</h3>
                        <span className="text-[9px] font-bold text-sun bg-sun/10 border border-sun px-2 py-0.5 rounded uppercase">
                            Writers
                        </span>
                    </div>
                </div>

                <div className="card-ink p-5 bg-paper">
                    <span className="text-[10px] uppercase font-bold text-ink/50 tracking-widest block font-display">
                        High Magistracy
                    </span>
                    <div className="flex justify-between items-baseline mt-2">
                        <h3 className="text-3xl font-bold font-display">{totalAdminsCount}</h3>
                        <span className="text-[9px] font-bold text-prussian bg-prussian/10 border border-prussian px-2 py-0.5 rounded uppercase">
                            Admins
                        </span>
                    </div>
                </div>
            </section>

            <section className="bg-paper p-5 border-2 border-ink rounded-lg shadow-ink-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Field */}
                <div className="relative flex-1 flex items-center">
                    <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search citizens by name or email address..."
                        className="w-full pl-11 pr-4 py-3 bg-paper text-sm border-2 border-ink rounded-lg focus:outline-none focus:border-sun transition-all font-display"
                    />
                </div>

                {/* Role Filters Selection */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block md:inline-block mr-2">
                        Filter:
                    </span>
                    {["all", "reader", "writer", "admin"].map((roleOption) => (
                        <button
                            key={roleOption}
                            onClick={() => setSelectedRoleFilter(roleOption)}
                            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-2 border-2 rounded-md transition-all cursor-pointer ${selectedRoleFilter === roleOption
                                ? "bg-sun text-paper border-ink shadow-ink-sm -translate-y-0.5"
                                : "bg-transparent text-ink border-ink/30 hover:border-ink hover:bg-ink/5"
                                }`}
                        >
                            {roleOption}
                        </button>
                    ))}
                </div>
            </section>

            {/* Desktop View Table: Remains visible from medium breakpoints and above */}
            <section className="hidden md:block card-ink overflow-hidden bg-paper">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse text-left bg-paper">
                        <thead>
                            <tr className="border-b-3 border-ink">
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Citizen Identification
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Seal Status (Email)
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Covenant Entry
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper border-r-2 border-ink/10 py-4 px-6">
                                    Authority Role
                                </th>
                                <th className="font-display font-bold text-xs uppercase tracking-widest bg-wave text-paper py-4 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-ink/50 font-display text-sm italic bg-paper">
                                        No registry traces matched your selected filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b-2 border-ink/15 hover:bg-ink/5 transition-colors">
                                        <td className="px-6 py-4 border-r-2 border-ink/10 bg-transparent">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 border-2 border-ink rounded-lg bg-paper flex items-center justify-center font-display font-bold text-lg shadow-ink-sm text-ink shrink-0">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="font-display font-bold text-sm block text-ink">
                                                        {user.name}
                                                    </span>
                                                    <span className="font-mono text-[10px] text-ink/45 block">
                                                        OID: {user._id.substring(0, 10)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 border-r-2 border-ink/10 bg-transparent">
                                            <div className="space-y-1">
                                                <span className="text-xs font-semibold text-ink/80 block">
                                                    {user.email}
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    {user.emailVerified ? (
                                                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase text-ochre">
                                                            <ShieldCheckIcon /> Verified Seal
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase text-ink/40 bg-ink/5 border border-ink/20 px-1.5 py-0.5 rounded">
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 border-r-2 border-ink/10 font-display text-xs font-bold text-ink/75 bg-transparent">
                                            {formatDate(user.createdAt)}
                                        </td>

                                        <td className="px-6 py-4 border-r-2 border-ink/10 bg-transparent">
                                            <span className={`inline-block text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md border-2 ${user.role === "admin"
                                                ? "bg-sun/10 text-sun border-sun"
                                                : user.role === "writer"
                                                    ? "bg-ochre/10 text-ochre border-ochre"
                                                    : "bg-wave/10 text-wave border-wave"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 bg-transparent">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="inline-flex border-2 border-ink rounded-lg overflow-hidden bg-paper shadow-ink-sm">
                                                    {["reader", "writer", "admin"].map((roleKey) => {
                                                        const isCurrentRole = user.role === roleKey;
                                                        return (
                                                            <button
                                                                key={roleKey}
                                                                onClick={() => handleRoleChange(user._id, roleKey)}
                                                                className={`text-[8px] font-extrabold uppercase px-2 py-1.5 border-r border-ink/20 last:border-0 transition-colors cursor-pointer ${isCurrentRole
                                                                    ? "bg-sun text-paper font-black"
                                                                    : "bg-transparent text-ink/60 hover:text-ink hover:bg-ink/5"
                                                                    }`}
                                                                title={`Switch role to ${roleKey}`}
                                                            >
                                                                {roleKey === "writer" ? "Scribe" : roleKey}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteUser(user._id, user.name)}
                                                    className="p-1.5 border-2 border-ink rounded-lg bg-paper text-ink hover:bg-sun hover:text-paper hover:shadow-ink-sm transition-all cursor-pointer active:translate-y-px"
                                                    title="Revoke Covenant Passport"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Mobile View Responsive Card Stack Layout: Triggers automatically below 768px (md) */}
            <section className="block md:hidden space-y-5">
                {users.length === 0 ? (
                    <div className="card-ink p-8 text-center text-ink/50 font-display text-sm italic bg-paper">
                        No registry traces matched your selected filters.
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <div key={user._id} className="card-ink p-5 bg-paper flex flex-col gap-4 relative">

                            {/* Card Header Stamp Box & Core Identity info */}
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 border-2 border-ink rounded-lg bg-paper flex items-center justify-center font-display font-bold text-xl shadow-ink-sm text-ink shrink-0">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <h4 className="font-display font-bold text-base text-ink truncate leading-tight">
                                            {user.name}
                                        </h4>
                                        <span className={`inline-block text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border-2 ${user.role === "admin"
                                            ? "bg-sun/10 text-sun border-sun"
                                            : user.role === "writer"
                                                ? "bg-ochre/10 text-ochre border-ochre"
                                                : "bg-wave/10 text-wave border-wave"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px] text-ink/45 block tracking-tight">
                                        OID: {user._id}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-ink/10" />

                            {/* Citizen parameters grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider block font-display">
                                        Parchment Address (Email)
                                    </span>
                                    <span className="font-semibold text-ink/80 block break-all leading-tight">
                                        {user.email}
                                    </span>
                                    <div className="pt-0.5">
                                        {user.emailVerified ? (
                                            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase text-ochre">
                                                <ShieldCheckIcon /> Verified Seal
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase text-ink/40 bg-ink/5 border border-ink/20 px-1.5 py-0.5 rounded">
                                                Unverified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider block font-display">
                                        Covenant Entry
                                    </span>
                                    <span className="font-display font-bold text-ink/75 block">
                                        {formatDate(user.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-ink/10" />

                            {/* Card Control Actions */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                                <span className="text-[10px] uppercase font-bold text-ink/40 tracking-wider font-display block sm:inline">
                                    Adjust Rank Authority:
                                </span>
                                <div className="flex items-center gap-2 justify-between">
                                    <div className="inline-flex border-2 border-ink rounded-lg overflow-hidden bg-paper shadow-ink-sm flex-1 sm:flex-initial">
                                        {["reader", "writer", "admin"].map((roleKey) => {
                                            const isCurrentRole = user.role === roleKey;
                                            return (
                                                <button
                                                    key={roleKey}
                                                    type="button"
                                                    onClick={() => handleRoleChange(user._id, roleKey)}
                                                    className={`text-[9px] font-extrabold uppercase px-3 py-2 border-r border-ink/20 last:border-0 transition-colors cursor-pointer flex-1 text-center ${isCurrentRole
                                                        ? "bg-sun text-paper font-black"
                                                        : "bg-transparent text-ink/60 hover:text-ink hover:bg-ink/5"
                                                        }`}
                                                >
                                                    {roleKey === "writer" ? "Scribe" : roleKey}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteUser(user._id, user.name)}
                                        className="p-2.5 border-2 border-ink rounded-lg bg-paper text-ink hover:bg-sun hover:text-paper hover:shadow-ink-sm transition-all cursor-pointer active:translate-y-px shrink-0"
                                        title="Revoke Covenant Passport"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </section>

            {/* Decorative Traditional Footer Stamp */}
            <footer className="text-center pt-8 border-t-2 border-ink/10">
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Edo Woodblock Record Engine v16.2
                </span>
            </footer>

        </div>
    );
}