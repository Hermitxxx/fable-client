"use client";

import { authClient } from "@/app/lib/auth-client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const WaveCrestIcon = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current" aria-hidden="true">
        <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 C95,75 98,70 100,65 L100,90 L0,90 L0,70 C3,75 6,80 10,80 Z" />
        <path d="M5,60 C25,60 30,30 50,30 C70,30 75,65 95,65 C97,65 99,62 100,58 L100,75 C98,78 95,80 90,80 C70,80 65,55 50,55 C35,55 30,85 10,85 C6,85 3,82 0,78 L0,55 C2,58 4,60 5,60 Z" />
        <circle cx="28" cy="35" r="3" />
        <circle cx="48" cy="20" r="2.5" />
        <circle cx="72" cy="40" r="3.5" />
    </svg>
);

const TeahouseIcon = () => (
    <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M15,50 L50,15 L85,50 L80,53 L50,22 L20,53 Z" />
        <path d="M30,50 L70,50 L70,85 L30,85 Z M40,60 L60,60 L60,80 L40,80 Z" />
        <line x1="10" y1="85" x2="90" y2="85" stroke="currentColor" strokeWidth="6" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const ArrowRightIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-5 h-5 ${className}`}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const BookOpenIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const EditIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
);

const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export default function RegisterPage() {
    const [role, setRole] = useState("reader"); // "reader" or "writer"
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const router = useRouter()

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const newErrors = {};
        if (!data.username) {
            newErrors.username = "The name of your identity panel is required.";
        }
        if (!data.email) {
            newErrors.email = "Please specify your digital parchment delivery address.";
        }
        if (!data.password || data.password.length < 8) {
            newErrors.password = "The security ink seal must contain at least 8 characters.";
        }
        if (!data.agreement) {
            newErrors.agreement = "You must bind your signature to the Covenant.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const { data: response, error } = await authClient.signUp.email({
            name: data.username, // required
            email: data.email, // required
            password: data.password,
            role: role // required
        });

        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });

        if (response) {
            setSubmitted(true);
        }

        setErrors({});
        console.log("Account Created successfully:", { role });
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            role: 'reader'
        });
    }

    const handleVault = () => {
        setSubmitted(false)
        router.push('/login')
    }

    return (
        <main className="min-h-[100dvh] flex items-center my-22 justify-center p-4 md:p-8 bg-paper">
            {/* Main Container Frame */}
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 card-ink overflow-hidden min-h-180">

                {/* Left Panel: Graphic & Branding */}
                { }
                <div className="md:col-span-5 bg-wave text-paper border-b-3 md:border-b-0 md:border-r-3 border-ink p-8 flex flex-col justify-between relative overflow-hidden">
                    {/* Woodblock Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[linear-gradient(rgba(13,13,21,0.15)_1px,transparent_1px)] bg-size-[100%_4px]" />

                    <div className="relative z-10 space-y-12">
                        <div className="flex items-center gap-2">
                            <span className="text-sun"><WaveCrestIcon /></span>
                            <span className="font-display font-bold text-xl tracking-wider">FABLE</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="font-display font-bold text-3xl lg:text-4xl leading-tight text-paper">
                                CHOOSE YOUR <br />
                                <span className="text-sun">PARCHMENT</span> PATH.
                            </h1>
                            <p className="font-display font-normal text-sm leading-relaxed text-paper/80 max-w-[34ch]">
                                Every account opens a new chapter in our digital floating world. Align your journey with tradition.
                            </p>
                        </div>

                        {/* Path description based on state */}
                        { }
                        <div className="space-y-4 pt-6 border-t border-paper/20">
                            {role === "reader" ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-ochre"><BookOpenIcon /></span>
                                        <h3 className="font-display font-bold text-base m-0">READER&apos;S COVENANT</h3>
                                    </div>
                                    <p className="font-display font-normal text-xs text-paper/70 leading-relaxed">
                                        Browse original ebooks, assemble historical scrolls, and support visual artists.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sun"><EditIcon /></span>
                                        <h3 className="font-display font-bold text-base m-0">SCRIBE&apos;S MANDATE</h3>
                                    </div>
                                    <p className="font-display font-normal text-xs text-paper/70 leading-relaxed">
                                        Publish original manuscripts to collectors. Requires a one-time 1,000 Yen verification to secure authenticity.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative z-10 pt-6 flex items-center gap-3 border-t-1.5 border-paper/10">
                        <span className="text-ochre"><TeahouseIcon /></span>
                        <span className="font-display text-[10px] tracking-widest text-paper/60 uppercase">
                            Edo Epoch UI V3
                        </span>
                    </div>
                </div>

                {/* Right Panel: Form */}
                { }
                <div className="md:col-span-7 bg-paper p-8 lg:p-12 flex flex-col justify-center">
                    <div className="max-w-[480px] w-full mx-auto space-y-8">

                        {submitted ? (
                            <div className="text-center py-12 space-y-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-3 border-ink bg-sun text-paper shadow-ink-sm mx-auto">
                                    <BookOpenIcon />
                                </div>
                                <h2 className="font-display font-bold text-2xl text-ink">SIGNATURE FILED</h2>
                                <p className="font-display text-sm text-ink/85">Your identity scroll is verified. Prepare your inkwells.</p>
                                <div className="pt-4">
                                    <button onClick={handleVault} className="btn-primary shadow-ink-sm">Proceed to Vault</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h2 className="section-heading text-2xl font-bold text-ink">CREATE PLATFORM ENTRY</h2>
                                    <p className="font-display text-sm mt-4 text-ink/70">Affix your credentials to receive an authentication certificate.</p>
                                </div>

                                {/* STYLED FORM STRUCTURE WITHOUT EXTERNAL HEROUI PACKAGE TO PREVENT COMPILER ERRORS */}
                                { }
                                <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                                    {/* Custom Role Switcher */}
                                    <div className="grid grid-cols-2 gap-3 mb-2 w-full">
                                        <button
                                            type="button"
                                            onClick={() => setRole("reader")}
                                            className={`py-3 px-4 rounded-lg font-display text-xs font-bold transition-all border-ink-thin flex items-center justify-center gap-2 cursor-pointer ${role === "reader" ? "bg-sun text-paper border-ink shadow-ink-sm -translate-y-0.5" : "bg-transparent text-ink"
                                                }`}
                                        >
                                            <BookOpenIcon /> READER
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole("writer")}
                                            className={`py-3 px-4 rounded-lg font-display text-xs font-bold transition-all border-ink-thin flex items-center justify-center gap-2 cursor-pointer ${role === "writer" ? "bg-sun text-paper border-ink shadow-ink-sm -translate-y-0.5" : "bg-transparent text-ink"
                                                }`}
                                        >
                                            <EditIcon /> WRITER
                                        </button>
                                    </div>

                                    {/* Form Inputs Container */}
                                    <div className="space-y-4 w-full">
                                        {/* Username Field */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="font-display text-xs font-bold text-ink">SCRIBE OR COLLECTOR NAME</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                                                    <UserIcon />
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    placeholder="e.g. Master Basho"
                                                    className="w-full pl-10 pr-4 py-2.5 bg-paper font-display text-sm border-ink-thin rounded-lg focus:outline-none focus:border-ink transition-all"
                                                />
                                            </div>
                                            {errors.username && <p className="text-xs text-red-600 font-bold mt-1">{errors.username}</p>}
                                        </div>

                                        {/* Email Field */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="font-display text-xs font-bold text-ink">DIGITAL PARCHMENT (EMAIL)</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                                                    <MailIcon />
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="basho@fable-revival.jp"
                                                    className="w-full pl-10 pr-4 py-2.5 bg-paper font-display text-sm border-ink-thin rounded-lg focus:outline-none focus:border-ink transition-all"
                                                />
                                            </div>
                                            {errors.email && <p className="text-xs text-red-600 font-bold mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Password Field */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="font-display text-xs font-bold text-ink">SECURITY INK SEAL (PASSWORD)</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                                                    <LockIcon />
                                                </span>
                                                <input
                                                    type={passwordVisible ? "text" : "password"}
                                                    name="password"
                                                    placeholder="••••••••••••"
                                                    className="w-full pl-10 pr-10 py-2.5 bg-paper font-display text-sm border-ink-thin rounded-lg focus:outline-none focus:border-ink transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-4 text-ink/50 hover:text-ink transition-colors cursor-pointer focus:outline-none"
                                                >
                                                    {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                                                </button>
                                            </div>
                                            {errors.password && <p className="text-xs text-red-600 font-bold mt-1">{errors.password}</p>}
                                        </div>
                                    </div>

                                    {/* Agreement Checkbox */}
                                    { }
                                    <div className="py-2 w-full flex flex-col gap-1">
                                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                name="agreement"
                                                className="w-4 h-4 border-2 border-ink checked:bg-sun accent-[#E85D35] cursor-pointer"
                                            />
                                            <span className="font-display text-[11px] font-bold text-ink/80 uppercase">
                                                I bind my signature to the terms
                                            </span>
                                        </label>
                                        {errors.agreement && <p className="text-xs text-red-600 font-bold mt-1">{errors.agreement}</p>}
                                    </div>

                                    {/* Context-aware Scribe Mandate Warning */}
                                    {role === "writer" && (
                                        <div className="p-3 bg-[#CC7722]/10 border-l-4 border-[#CC7722] font-display text-[11px] text-ink rounded-r-md">
                                            <strong>MANDATE:</strong> A one-time verification fee of 1,000 Yen is required after registration.
                                        </div>
                                    )}

                                    {/* Submit CTA Button */}
                                    <button type="submit" className="btn-primary w-full justify-center group shadow-ink-sm mt-2">
                                        <span>BIND CREDENTIALS</span>
                                        <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </form>
                                <div className="flex items-center gap-5">
                                    <div className="w-full border-t border-sun border-dashed"></div>
                                    <span className="text-wave tracking-widest">
                                        OR
                                    </span>
                                    <div className="w-full border-t border-sun border-dashed"></div>
                                </div>
                                <button onClick={handleGoogleSignIn} className="w-full btn-ghost justify-center">
                                    <Icon icon="devicon:google" />
                                    Sign up with Google
                                </button>

                                <div className="pt-4 border-t border-ink/10 text-center">
                                    <p className="font-display text-xs text-ink/60">
                                        ALREADY REGISTERED?{" "}
                                        <Link href="/login" className="text-sun font-bold hover:underline ml-1">LOG IN HERE</Link>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}