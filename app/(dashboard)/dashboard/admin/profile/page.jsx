"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

const PRESET_EMBLEMS = [
    {
        id: "fuji", label: "Mount Fuji", svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M50,15 L90,85 L10,85 Z" />
                <path d="M50,15 L62,36 C57,32 50,38 45,34 C42,38 38,36 38,36 Z" fill="#F0E3CE" />
            </svg>
        )
    },
    {
        id: "wave", label: "Great Wave", svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M10,80 C30,80 35,50 50,50 C65,50 70,75 90,75 L90,90 L10,90 Z" />
                <circle cx="28" cy="35" r="4" />
                <circle cx="48" cy="20" r="3" />
            </svg>
        )
    },
    {
        id: "pine", label: "Pine Tree", svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M47,70 L53,70 L53,85 L47,85 Z" />
                <path d="M50,20 L80,45 L20,45 Z" />
                <path d="M50,38 L75,60 L25,60 Z" />
                <path d="M50,55 L70,75 L30,75 Z" />
            </svg>
        )
    },
    {
        id: "sun", label: "Red Sun", svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <circle cx="50" cy="50" r="35" />
            </svg>
        )
    },
    {
        id: "brush", label: "Sumi Brush", svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M75,15 L85,25 L35,75 L20,80 L25,65 Z" />
                <path d="M20,80 C18,82 15,85 12,88 C10,90 8,88 10,86 C13,83 16,80 18,78 Z" />
            </svg>
        )
    }
];

const BrushStrokeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M7.5 10.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" />
        <path d="M11.5 14.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" />
        <path d="M16 11.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" />
        <path d="M6 16c2 3 6 4 9 1c1.5-1.5 3-4 1-7" />
    </svg>
);

const SecuritySealIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 shrink-0" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const StampIcon = () => (
    <svg viewBox="0 0 64 64" className="w-5 h-5 fill-current" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M22 22 L42 42 M42 22 L22 42" stroke="currentColor" strokeWidth="4" />
    </svg>
);

const UploadCloudIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const CertifiedStampEmblem = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16 text-sun animate-pulse fill-current">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="6 6" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="50" y="48" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="1">FABLE</text>
        <text x="50" y="65" textAnchor="middle" fontSize="10" fontWeight="extrabold" letterSpacing="0.5">SEALED</text>
    </svg>
);

export default function ProfilePage() {
    const [userName, setUserName] = useState("Master Basho");
    const [userEmail] = useState("basho@fable-revival.jp");
    const [userRole] = useState("Scribe Creator");
    const [userJoined] = useState("June 19, 2026");

    // Avatar Management: preset selection or uploaded image preview
    const [activeAvatarType, setActiveAvatarType] = useState("preset"); // 'preset' or 'uploaded'
    const [selectedPresetId, setSelectedPresetId] = useState("fuji");
    const [uploadedImageSrc, setUploadedImageSrc] = useState(null);

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const fileInputRef = useRef(null);

    const handleImageUploadChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate that the uploaded file is indeed an image
        if (!file.type.startsWith("image/")) {
            setUploadError("Selected parchment must be an image file.");
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            const formData = new FormData();
            formData.append("image", file);

            // Falls back to a local placeholder if NEXT_PUBLIC_IMGBB_API_KEY is undefined
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY";

            if (apiKey === "YOUR_IMGBB_API_KEY") {
                console.warn("Fable Warning: Please define NEXT_PUBLIC_IMGBB_API_KEY in your environment variables.");
            }

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("The imperial archive failed to receive your seal parchment.");
            }

            const result = await response.json();

            if (result.success && result.data && result.data.url) {
                // imgBB direct image hosting URL returned
                setUploadedImageSrc(result.data.url);
                setActiveAvatarType("uploaded");
            } else {
                throw new Error(result.error?.message || "Invalid response format from seal carver.");
            }
        } catch (error) {
            console.error("imgBB Upload Error:", error);
            setUploadError(error.message || "Failed to carve your custom seal. Try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handlePresetSelect = (presetId) => {
        setSelectedPresetId(presetId);
        setActiveAvatarType("preset");
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate high-fidelity sealing process matching classical theme
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccessToast(true);

            // Auto dismiss success toast after 4 seconds
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 4000);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-paper text-ink p-4 md:p-8 max-w-[1280px] mx-auto space-y-8 select-none relative">

            {/* Dynamic Success Stamp Toast Notification */}
            {showSuccessToast && (
                <div className="fixed bottom-6 right-6 z-[300] max-w-sm card-ink bg-paper p-5 border-3 border-ink shadow-ink flex items-center gap-4 animate-bounce">
                    <CertifiedStampEmblem />
                    <div className="space-y-1">
                        <h4 className="font-display font-extrabold text-sm text-sun uppercase tracking-wider">Identity Sealed!</h4>
                        <p className="font-display text-[11px] text-ink/75 leading-tight">
                            The imperial register has been updated. Your brushwork credentials are locked.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowSuccessToast(false)}
                        className="absolute top-2 right-2 text-ink/40 hover:text-ink font-bold text-xs"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Profile Header Segment */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-ochre block mb-1">
                        Scribe Register Office
                    </span>
                    <h1 className="section-heading text-3xl font-bold uppercase tracking-wider">
                        Identity Registry
                    </h1>
                    <p className="text-xs text-ink/70 mt-3 font-display max-w-[65ch]">
                        Affix your signature, adjust your display moniker, and carve your digital Hanko verification seal.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-ink rounded-lg bg-paper font-bold text-xs uppercase tracking-wider shadow-ink-sm">
                        <BrushStrokeIcon />
                        <span>ID Registration Gated</span>
                    </span>
                </div>
            </header>

            {/* Main Two-Column Frame Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                { }
                {/* Left Column (4 Cols): The Hanko Seal Showcase Card */}
                <section className="lg:col-span-5 flex flex-col gap-6">
                    <div className="card-ink p-6 bg-paper flex flex-col items-center justify-center text-center relative overflow-hidden">

                        <div className="absolute top-3 left-3">
                            <span className="text-[9px] font-extrabold text-wave bg-wave/10 border border-wave px-2 py-0.5 rounded uppercase font-display">
                                PASSPORT
                            </span>
                        </div>

                        {/* Simulated Hanko Seal Circular Frame */}
                        <div className="w-40 h-40 rounded-full border-4 border-ink p-1 flex items-center justify-center bg-paper shadow-ink-sm relative group mt-4">
                            { }
                            <div className="w-full h-full rounded-full border-2 border-dashed border-ink/40 overflow-hidden flex items-center justify-center bg-paper relative">

                                {isUploading ? (
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="w-8 h-8 border-3 border-sun border-t-transparent rounded-full animate-spin" />
                                        <span className="font-display text-[9px] font-bold text-ochre tracking-wider uppercase">Carving...</span>
                                    </div>
                                ) : activeAvatarType === "preset" ? (
                                    <div className="w-24 h-24 text-sun flex items-center justify-center">
                                        {PRESET_EMBLEMS.find(p => p.id === selectedPresetId)?.svg}
                                    </div>
                                ) : (
                                    uploadedImageSrc ? (
                                        <Image
                                            width={100}
                                            height={100}
                                            src={uploadedImageSrc}
                                            alt="User custom upload seal"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 text-sun flex items-center justify-center">
                                            {PRESET_EMBLEMS.find(p => p.id === "fuji")?.svg}
                                        </div>
                                    )
                                )}

                                {/* Cover Overlay Trigger */}
                                <button
                                    onClick={triggerFileUpload}
                                    disabled={isUploading}
                                    className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-all text-paper cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <UploadCloudIcon />
                                    <span className="font-display text-[9px] tracking-widest font-bold uppercase">
                                        {isUploading ? "UPLOADING..." : "UPLOAD STAMP"}
                                    </span>
                                </button>
                            </div>

                            {/* Hanko stamp corner decoration */}
                            <div className="absolute -bottom-1 -right-1 bg-sun text-paper border-2 border-ink rounded-md p-1 scale-90 shadow-ink-sm">
                                <StampIcon />
                            </div>
                        </div>

                        {/* Scribe Title Block */}
                        <div className="mt-6 space-y-1">
                            <h3 className="font-display font-extrabold text-xl text-ink tracking-wide">
                                {userName.toUpperCase()}
                            </h3>
                            <p className="text-xs text-ochre font-bold uppercase tracking-wider">
                                {userRole}
                            </p>
                            <p className="text-[10px] text-ink/40 font-mono">
                                Covenant Member Since {userJoined}
                            </p>
                        </div>

                        {/* Hidden Input File Element */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUploadChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="border-t border-ink/10 w-full my-5" />

                        { }
                        {/* Upload action Buttons */}
                        <div className="flex flex-col gap-2 w-full items-center">
                            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                                <button
                                    type="button"
                                    onClick={triggerFileUpload}
                                    disabled={isUploading}
                                    className="btn-ghost py-2 px-4 justify-center text-xs uppercase shadow-ink-sm font-display flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                                >
                                    {isUploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                                            <span>Carving Seal...</span>
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloudIcon />
                                            <span>Upload Custom Seal</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            {uploadError && (
                                <p className="text-[10px] text-red-600 font-bold font-display uppercase tracking-wider text-center mt-1">
                                    ⚠️ {uploadError}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Preset Stamps Selector Card */}
                    <div className="card-ink p-5 bg-paper space-y-4">
                        <div className="border-b border-ink/10 pb-2 flex items-center gap-2 text-ink">
                            <StampIcon />
                            <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">
                                Traditional Emblems
                            </h4>
                        </div>
                        <p className="text-[11px] text-ink/60 leading-tight">
                            Select an authentic woodblock crest signature to display if no personal passport painting has been carved.
                        </p>
                        <div className="grid grid-cols-5 gap-3.5 pt-1">
                            {PRESET_EMBLEMS.map((emblem) => {
                                const isSelected = activeAvatarType === "preset" && selectedPresetId === emblem.id;
                                return (
                                    <button
                                        key={emblem.id}
                                        type="button"
                                        onClick={() => handlePresetSelect(emblem.id)}
                                        className={`aspect-square border-2 rounded-lg p-2 flex items-center justify-center transition-all cursor-pointer relative group ${isSelected
                                            ? "bg-sun text-paper border-ink shadow-ink-sm -translate-y-0.5"
                                            : "bg-paper text-ink border-ink/20 hover:border-ink hover:bg-ink/5"
                                            }`}
                                        title={emblem.label}
                                    >
                                        <div className="w-full h-full flex items-center justify-center">
                                            {emblem.svg}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                { }
                {/* Right Column (8 Cols): Information Adjustment Form Card */}
                <section className="lg:col-span-7">
                    <div className="card-ink p-6 md:p-8 bg-paper">

                        <form onSubmit={handleSaveProfile} className="space-y-6">

                            <div className="border-b border-ink/10 pb-4">
                                <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-ink flex items-center gap-2">
                                    <BrushStrokeIcon />
                                    <span>Register Details</span>
                                </h4>
                                <p className="text-[11px] text-ink/50 mt-1">
                                    Adjust standard registration values. Updates take immediate platform security clearance.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Moniker Input Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-display text-xs font-bold text-ink uppercase tracking-wider">
                                        Scribe Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                        placeholder="e.g. Master Basho"
                                        className="w-full px-4 py-3 bg-paper text-sm border-2 border-ink rounded-lg focus:outline-none focus:border-sun transition-all font-display"
                                    />
                                </div>

                                {/* Role Block Display - Disabled */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-display text-xs font-bold text-ink/50 uppercase tracking-wider">
                                        Current Platform Status
                                    </label>
                                    <div className="w-full px-4 py-3 bg-ink/5 text-sm border-2 border-ink/20 rounded-lg text-ink/55 font-display flex items-center justify-between cursor-not-allowed">
                                        <span>{userRole}</span>
                                        <span className="text-[9px] font-mono tracking-tight bg-ochre/10 text-ochre px-1.5 py-0.5 rounded border border-ochre/25 uppercase">
                                            Sealed
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Email Address Display - Disabled */}
                            <div className="flex flex-col gap-2">
                                <label className="font-display text-xs font-bold text-ink/50 uppercase tracking-wider">
                                    Digitized Registry Mail Box (ReadOnly)
                                </label>
                                <div className="w-full px-4 py-3 bg-ink/5 text-sm border-2 border-ink/20 rounded-lg text-ink/55 font-mono cursor-not-allowed">
                                    {userEmail}
                                </div>
                                <span className="text-[10px] text-ink/40 leading-none">
                                    Changing verification address requires platform high-magistracy audit clearance.
                                </span>
                            </div>

                            <div className="border-t border-ink/10 pt-4" />

                            {/* Password / Security Update Section (Simulated) */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-ink">
                                    <SecuritySealIcon />
                                    <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">
                                        Security Stamp Seal
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-display text-xs font-bold text-ink uppercase tracking-wider">
                                            New Passcode
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            disabled
                                            className="w-full px-4 py-3 bg-ink/5 text-sm border-2 border-ink/15 rounded-lg text-ink/40 font-mono cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-display text-xs font-bold text-ink uppercase tracking-wider">
                                            Confirm Passcode
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            disabled
                                            className="w-full px-4 py-3 bg-ink/5 text-sm border-2 border-ink/15 rounded-lg text-ink/40 font-mono cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <p className="text-[10px] text-ochre font-semibold uppercase leading-tight tracking-wider">
                                    ⚠ PASSWORD RE-KEYING IS TEMPORARILY LOCKED PENDING COVENANT VERIFICATION.
                                </p>
                            </div>

                            <div className="border-t border-ink/10 pt-6" />

                            {/* Form Action Controls */}
                            <div className="flex items-center justify-end gap-3.5">
                                <button
                                    type="button"
                                    className="btn-ghost py-3 px-6 text-xs uppercase shadow-ink-sm font-display cursor-pointer"
                                    onClick={() => setUserName("Master Basho")}
                                >
                                    Reset Moniker
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="btn-primary py-3 px-6 text-xs uppercase shadow-ink-sm font-display flex items-center gap-2 cursor-pointer"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                                            <span>Sealing Profile...</span>
                                        </>
                                    ) : (
                                        <>
                                            <StampIcon />
                                            <span>Seal Identity Scroll</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>

                    </div>
                </section>

            </div>

            {/* Decorative Traditional Footer Stamp */}
            <footer className="text-center pt-8 border-t-2 border-ink/10 flex justify-center items-center gap-2">
                <span className="font-display text-[9px] tracking-[0.25em] text-ink/30 uppercase font-extrabold block">
                    Fable Identity Vault Seal Engine v21.4
                </span>
            </footer>

        </div>
    );
}