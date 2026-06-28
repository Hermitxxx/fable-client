"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, FieldError, Checkbox, Button } from "@heroui/react";
import { GiWaveCrest, GiOldBricks } from "react-icons/gi";
import { RiGalleryLine, RiCompassDiscoverLine } from "react-icons/ri";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { authClient } from "@/app/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { alertToast } from "@/components/AlertToast";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const router = useRouter()

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    if (session) {
        redirect('/')
    }

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        try {
            const { data: response, error } = await authClient.signIn.email({
                email: data.email, // required
                password: data.password, // required
                rememberMe: true,
            });

            if (response) {
                router.push('/')
                alertToast('Login successful')
            }

            if (error) {
                alertToast(error.message)
            }

            console.log("Verified collector authentication payload:", response);
        } catch (err) {
            alertToast(err?.message || "Something went wrong while signing in.");
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <main className="min-h-[100dvh] flex items-center justify-center p-4 md:p-8 mt-14">
            {/* Container Content Frame */}
            <div className="w-full max-w-[1280px] grid grid-cols-1 md:grid-cols-12 card-ink overflow-hidden min-h-[650px]">

                {/* Left Side: Dramatic Graphic Aesthetic & Value Proposition */}
                <div className="md:col-span-5 bg-wave border-b-3 md:border-b-0 md:border-r-3 border-ink p-8 flex flex-col justify-between relative text-paper overflow-hidden">
                    {/* Faux woodblock print texture background lines via inline CSS */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[linear-gradient(rgba(13,13,21,0.15)_1px,transparent_1px)] bg-size-[100%_4px]" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-sun">
                            <GiWaveCrest className="text-3xl" />
                            <span className="font-display font-bold text-xl tracking-wider text-paper">FABLE</span>
                        </div>

                        <div className="mt-16 space-y-6">
                            <h1 className="font-display font-bold text-3xl xl:text-4xl leading-tight text-paper">
                                ENTER THE <br />
                                <span className="text-sun">CHRONICLES</span> OF THE FLOATING WORLD.
                            </h1>
                            <p className="font-display font-normal text-sm max-w-[34ch] text-paper/80 leading-relaxed">
                                Reconnect with visual collectors, independent book artisans, and beautifully curated parchment folios.
                            </p>
                        </div>
                    </div>

                    {/* Minimalist Aesthetic Metric Pane */}
                    <div className="relative z-10 mt-12 pt-6 border-t-1.5 border-paper/20 flex gap-6">
                        <div className="flex items-center gap-2">
                            <RiGalleryLine className="text-sun text-lg" />
                            <span className="font-display text-xs font-medium tracking-wide">12K+ SCROLLS</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RiCompassDiscoverLine className="text-ochre text-lg" />
                            <span className="font-display text-xs font-medium tracking-wide">VERIFIED SCRIBES</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Structured Form Processing Component */}
                <div className="md:col-span-7 bg-paper p-8 lg:p-12 flex flex-col justify-center">
                    <div className="max-w-[440px] w-full mx-auto space-y-8">
                        <div>
                            <h2 className="section-heading text-2xl font-bold tracking-tight">WELCOME BACK, COLLECTOR</h2>
                            <p className="font-display font-normal text-sm mt-4 text-ink/70">
                                Affix your verification signatures below to access your personal vault of digital texts.
                            </p>
                        </div>

                        {/* Hero UI Wrapper component for form validation */}
                        <Form
                            className="space-y-5"
                            onSubmit={handleLoginSubmit}
                            validationBehavior="native"
                        >
                            {/* Email Address Field */}
                            <TextField
                                isRequired
                                className="w-full flex flex-col gap-2"
                                name="email"
                                type="email"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Label className="font-display text-sm font-medium text-ink">
                                    DIGITAL ACCOUNT ADDRESS
                                </Label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                                        <FiMail className="text-base" />
                                    </span>
                                    <Input
                                        placeholder="scribe@fable-revival.jp"
                                        className="w-full px-10 py-3 bg-paper normal-case font-display text-base border-ink-thin rounded-lg focus:outline-none focus:border-ink focus:ring-2 focus:ring-sun focus:ring-offset-2 transition-all"
                                    />
                                </div>
                                <FieldError />
                            </TextField>

                            {/* Password Field */}
                            <TextField
                                isRequired
                                className="w-full flex flex-col gap-2"
                                name="password"
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }
                                    return null;
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <Label className="font-display text-sm font-medium text-ink">
                                        INK SEAL / PASSWORD
                                    </Label>
                                    <a href="#forgot" className="font-display text-xs font-medium text-ochre hover:underline">
                                        LOST SIGNATURE?
                                    </a>
                                </div>
                                <div className="relative flex items-center">
                                    <span className="absolute left-4 text-ink/40 z-10 pointer-events-none">
                                        <FiLock className="text-base" />
                                    </span>
                                    <Input
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        className="w-full px-10 py-3 bg-paper font-display text-base border-ink-thin rounded-lg focus:outline-none normal-case focus:border-ink focus:ring-2 focus:ring-sun focus:ring-offset-2 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 text-ink/50 hover:text-ink transition-colors cursor-pointer focus:outline-none"
                                    >
                                        {passwordVisible ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
                                    </button>
                                </div>
                                <FieldError />
                            </TextField>

                            {/* Remember Me Toggle */}
                            <div className="flex items-center pt-1">
                                <Checkbox
                                    name="rememberMe"
                                    classNames={{
                                        wrapper: "before:border-ink after:bg-sun rounded-none border-ink-thin",
                                        label: "font-display text-xs font-medium text-ink/80 select-none ml-1"
                                    }}
                                >
                                    KEEP MY VAULT UNLOCKED ON THIS PARCHMENT
                                </Checkbox>
                            </div>

                            {/* Primary Interactive CTA */}
                            <button
                                type="submit"
                                className="btn-primary w-full justify-center mt-4 group shadow-ink-sm"
                            >
                                <span>VERIFY AND ENTRY</span>
                                <FiArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                            </button>
                        </Form>

                        <div className="flex items-center gap-5">
                            <div className="w-full border-t border-sun border-dashed"></div>
                            <span className="text-wave tracking-widest">
                                OR
                            </span>
                            <div className="w-full border-t border-sun border-dashed"></div>
                        </div>
                        <button onClick={handleGoogleSignIn} className="w-full btn-ghost justify-center">
                            <Icon icon="devicon:google" />
                            Sign in with Google
                        </button>

                        {/* Alternating Selection Anchor */}
                        <div className="pt-6 border-t border-ink/10 text-center">
                            <p className="font-display text-sm text-ink/60">
                                NEW TO THE COVENANT?{" "}
                                <Link href="/register" className="text-sun font-bold hover:underline ml-1">
                                    GENERATE WRITER OR READER PASSPORT
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}