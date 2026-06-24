"use client";

import { uploadBook } from "@/app/lib/actions/books";
import { authClient } from "@/app/lib/auth-client";
import React, { useState, useRef } from "react";

const InkwellIcon = () => (
    <svg viewBox="0 0 64 64" className="w-6 h-6 fill-current text-[#E85D35]" aria-hidden="true">
        <path d="M10 42c0-8 6-14 14-14h16c8 0 14 6 14 14v10H10V42z" opacity="0.15" />
        <path d="M12 46v6h40v-6c0-6-4.8-11-10.8-11.8C39.4 37.5 36 39 32 39s-7.4-1.5-9.2-4.8C16.8 35 12 40 12 46z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="22" y="14" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="32" y1="26" x2="32" y2="34" stroke="currentColor" strokeWidth="3" />
        <line x1="6" y1="56" x2="58" y2="56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const ScrollIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

const UploadCloudIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-[#CC7722]" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const StampCertifiedIcon = () => (
    <svg viewBox="0 0 40 40" className="w-12 h-12 text-[#E85D35] fill-current animate-pulse" aria-hidden="true">
        <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="black" fontFamily="sans-serif" letterSpacing="0.5">SEAL</text>
    </svg>
);

const GENRE_PRESETS = [
    { key: "Fiction", label: "Fiction" },
    { key: "Sci-fi", label: "Sci-fi" },
    { key: "Horror", label: "Horror" },
    { key: "Fantasy", label: "Fantasy" },
    { key: "Mystery", label: "Mystery" },
    { key: "Romance", label: "Romance" }
];

export default function AddEbookForm() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const fileInputRef = useRef(null);

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    const user = session?.user

    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setUploadError("Parchment must be an image file.");
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            const formData = new FormData();
            formData.append("image", file);

            const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                setTimeout(() => {
                    const fakeURL = URL.createObjectURL(file);
                    setCoverImage(fakeURL);
                    setIsUploading(false);
                }, 1500);
                return;
            }

            const result = await response.json();
            if (result.success && result.data && result.data.url) {
                setCoverImage(result.data.url);
            } else {
                throw new Error("Invalid payload return from imgBB registry.");
            }
        } catch (err) {
            const fakeURL = URL.createObjectURL(file);
            setCoverImage(fakeURL);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const bookDetails = {
            title,
            genre,
            price: parseFloat(price) || 0,
            coverImage,
            status: 'Available',
            parchment: 'pending',
            description,
            writerName: user?.name,
            writerId: user?.id,
            writerEmail: user?.email,
            purchaseCount: 0
        };

        console.log("Sealed Scribe Form Data:", bookDetails);

        const res = await uploadBook(bookDetails)

        console.log(res);

        setIsSubmitting(false);
        setSubmitSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-[#F0E3CE] text-[#0D0D15] p-4 md:p-8 max-w-[1280px] mx-auto space-y-8 select-none">

            { }
            {submitSuccess && (
                <div className="p-6 bg-[#003153]/5 border-3 border-[#0D0D15] rounded-lg flex flex-col sm:flex-row items-center gap-4 animate-fade-in shadow-ink-sm">
                    <StampCertifiedIcon />
                    <div className="space-y-1 text-center sm:text-left flex-1">
                        <h4 className="font-display font-black text-base uppercase text-[#E85D35] tracking-wider">
                            MANUSCRIPT REGISTRATION SEALED
                        </h4>
                        <p className="font-display text-xs text-[#0D0D15]/80 leading-relaxed max-w-[70ch]">
                            Your chronicle has been securely cataloged onto the local library registry. The parchment files and valuations are permanently stored for reader validation.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="px-3 py-1.5 border-2 border-[#0D0D15] text-[10px] uppercase tracking-wider font-extrabold font-display rounded-md hover:bg-[#0D0D15]/5 cursor-pointer"
                    >
                        Dismiss Certification
                    </button>
                </div>
            )}

            { }
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b-3 border-[#0D0D15]">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#CC7722] block mb-1">
                        Imperial Scribe Quarters
                    </span>
                    <h1 className="section-heading text-3xl font-bold uppercase tracking-wider">
                        Register Original Scroll
                    </h1>
                    <p className="text-xs text-[#0D0D15]/70 mt-3 font-display max-w-[65ch]">
                        Prepare your inkwells, state your valuation (price), categorize your scroll, and publish direct to the library vault.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#0D0D15] rounded-lg bg-[#F0E3CE] font-bold text-xs uppercase tracking-wider shadow-ink-sm">
                        <ScrollIcon />
                        <span>Scribe Clearance Active</span>
                    </span>
                </div>
            </header>

            { }
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: HERO STYLE CUSTOM FORM */}
                <section className="lg:col-span-7">
                    <div className="card-ink p-6 md:p-8 bg-[#F0E3CE] border-3 border-[#0D0D15] rounded-lg shadow-ink-sm">

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div className="border-b border-[#0D0D15]/10 pb-4">
                                <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-[#0D0D15] flex items-center gap-2">
                                    <InkwellIcon />
                                    <span>Chronicle Details</span>
                                </h4>
                            </div>

                            {/* Title Input Field */}
                            <div className="flex flex-col gap-2 w-full">
                                <label className="font-display text-xs font-bold text-[#0D0D15] uppercase tracking-wider">
                                    Chronicle Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Journey to the Eastern Springs"
                                    className="w-full px-4 py-3 bg-[#F0E3CE] text-sm text-[#0D0D15] border-2 border-[#0D0D15] rounded-lg hover:border-[#E85D35] focus:border-[#E85D35] focus:outline-none transition-all h-12"
                                />
                            </div>

                            {/* Dynamic properties container */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-end">
                                {/* Custom Native Selection Dropdown */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="font-display text-xs font-bold text-[#0D0D15] uppercase tracking-wider">
                                        Genre Stack
                                    </label>
                                    <select
                                        required
                                        name="genre"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#F0E3CE] text-sm text-[#0D0D15] border-2 border-[#0D0D15] rounded-lg hover:border-[#E85D35] focus:border-[#E85D35] focus:outline-none transition-all h-12 cursor-pointer font-display font-bold uppercase"
                                    >
                                        <option value="" disabled>Select genre branch</option>
                                        {GENRE_PRESETS.map((preset) => (
                                            <option key={preset.key} value={preset.key}>
                                                {preset.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Field */}
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="font-display text-xs font-bold text-[#0D0D15] uppercase tracking-wider">
                                        Treasury Price (Yen ¥)
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter 0 for free access"
                                        className="w-full px-4 py-3 bg-[#F0E3CE] text-sm text-[#0D0D15] border-2 border-[#0D0D15] rounded-lg hover:border-[#E85D35] focus:border-[#E85D35] focus:outline-none transition-all h-12 font-mono"
                                    />
                                </div>
                            </div>

                            {/* Cover Upload Area */}
                            <div className="flex flex-col gap-2 w-full">
                                <label className="font-display text-xs font-bold text-[#0D0D15] uppercase tracking-wider">
                                    Cover Illustration Sketch
                                </label>

                                <div className="border-2 border-dashed border-[#0D0D15]/40 rounded-lg p-5 flex flex-col items-center justify-center text-center gap-3 bg-[#0D0D15]/5 hover:bg-[#0D0D15]/10 hover:border-[#0D0D15] transition-all">
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 border-3 border-[#E85D35] border-t-transparent rounded-full animate-spin" />
                                            <span className="font-display text-[10px] font-bold text-[#CC7722] tracking-wider uppercase">Carving block...</span>
                                        </div>
                                    ) : coverImage ? (
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-20 border-2 border-[#0D0D15] rounded overflow-hidden shadow-ink-sm bg-white shrink-0">
                                                <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="text-left space-y-1">
                                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-500 px-2 py-0.5 rounded uppercase">Image Loaded</span>
                                                <p className="text-[10px] text-[#0D0D15]/50 font-mono truncate max-w-[200px]">{coverImage}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => setCoverImage("")}
                                                    className="text-[9px] font-black uppercase text-[#E85D35] hover:underline cursor-pointer"
                                                >
                                                    Scrape Block Clean
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <UploadCloudIcon />
                                            <div className="space-y-1">
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-xs font-black uppercase tracking-wider text-[#E85D35] hover:underline cursor-pointer"
                                                >
                                                    Select Woodblock Image
                                                </button>
                                                <p className="text-[10px] text-[#0D0D15]/60">Supports PNG, JPG, or WEBP sketches up to 5MB</p>
                                            </div>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleCoverUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                {uploadError && (
                                    <p className="text-[10px] text-red-600 font-bold font-display uppercase tracking-wider mt-1">
                                        ⚠️ {uploadError}
                                    </p>
                                )}
                            </div>

                            {/* Description Content */}
                            <div className="flex flex-col gap-2 w-full">
                                <label className="font-display text-xs font-bold text-[#0D0D15] uppercase tracking-wider">
                                    Full Manuscript Content (Sumi Ink Writing)
                                </label>
                                <textarea
                                    required
                                    name="description"
                                    rows={6}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Carve your tales, poetries, or secrets here..."
                                    className="w-full px-4 py-3 bg-[#F0E3CE] text-sm text-[#0D0D15] border-2 border-[#0D0D15] rounded-lg hover:border-[#E85D35] focus:border-[#E85D35] focus:outline-none transition-all font-display italic leading-relaxed"
                                />
                            </div>

                            {/* Form Action Buttons */}
                            <div className="border-t border-[#0D0D15]/10 pt-6 flex items-center justify-end gap-3.5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTitle("");
                                        setGenre("");
                                        setPrice("");
                                        setDescription("");
                                        setCoverImage("");
                                    }}
                                    className="px-6 py-3 border-2 border-[#0D0D15] rounded-lg bg-transparent text-[#0D0D15] hover:bg-[#0D0D15]/5 text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer h-auto"
                                >
                                    Reset Form
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 border-2 border-[#0D0D15] rounded-lg bg-[#E85D35] text-[#F0E3CE] hover:bg-[#2A4056] text-xs font-bold uppercase tracking-wider font-display transition-all shadow-ink-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed h-auto"
                                >
                                    {isSubmitting ? "Sealing Manuscript..." : "Seal Scroll"}
                                </button>
                            </div>

                        </form>
                    </div>
                </section>

                {/* RIGHT COLUMN: WOODBLOCK SCROLL IMMERSIVE PREVIEW */}
                <section className="lg:col-span-5 space-y-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0D0D15]/40 block text-center font-display">
                        Live Manuscript Preview
                    </span>

                    <div className="card-ink p-6 bg-[#F0E3CE] border-3 border-[#0D0D15] rounded-lg shadow-ink-sm flex flex-col gap-5 relative overflow-hidden min-h-[480px]">
                        {/* Traditional diagonal stamp watermark */}
                        <div className="absolute top-4 right-4 pointer-events-none opacity-20">
                            <StampCertifiedIcon />
                        </div>

                        {/* Simulated Woodblock Mounting Frame */}
                        <div className="aspect-[3/4] max-w-[240px] w-full mx-auto border-3 border-[#0D0D15] bg-[#F0E3CE] rounded-lg overflow-hidden relative shadow-ink-sm flex items-center justify-center">
                            {isUploading ? (
                                <div className="absolute inset-0 bg-[#0D0D15]/10 flex flex-col items-center justify-center gap-2">
                                    <div className="w-8 h-8 border-3 border-[#E85D35] border-t-transparent rounded-full animate-spin" />
                                    <span className="text-[10px] font-bold uppercase text-[#0D0D15]/75 font-display">Carving cover...</span>
                                </div>
                            ) : coverImage ? (
                                <img src={coverImage} alt="Realtime Woodblock Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-6 space-y-3">
                                    <InkwellIcon />
                                    <p className="font-display text-[10px] font-bold uppercase text-[#CC7722]">Unpainted Block Canvas</p>
                                    <p className="font-display text-[9px] text-[#0D0D15]/50 leading-relaxed">Your cover sketch will anchor onto this structure once uploaded.</p>
                                </div>
                            )}

                            {/* Price Badge Overlay */}
                            <div className="absolute bottom-3 right-3 bg-[#E85D35] text-[#F0E3CE] border-2 border-[#0D0D15] text-[10px] font-bold px-2 py-1 rounded shadow-sm font-mono">
                                {price ? (parseFloat(price) === 0 ? "FREE" : `¥${parseFloat(price).toFixed(2)}`) : "¥0.00"}
                            </div>
                        </div>

                        <div className="border-b border-[#0D0D15]/10 pb-2" />

                        {/* Live Text Field Feeds */}
                        <div className="space-y-3 flex-1">
                            <div className="space-y-1">
                                <span className="inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border border-[#CC7722]/40 bg-[#CC7722]/5 text-[#CC7722] font-display leading-none">
                                    {genre || "NO GENRE SET"}
                                </span>
                                <h3 className="font-display font-black text-xl text-[#0D0D15] leading-tight truncate uppercase">
                                    {title || "Untitled Manuscript"}
                                </h3>
                            </div>

                            <div className="bg-[#E85D35]/5 p-4 rounded-md border-l-4 border-[#E85D35] min-h-[120px]">
                                <h4 className="text-[9px] font-extrabold tracking-widest text-[#E85D35] uppercase font-display mb-1.5">
                                    Manuscript Excerpt
                                </h4>
                                <p className="text-xs font-display text-[#0D0D15]/80 italic leading-relaxed line-clamp-4">
                                    {description ? `"${description}"` : "Begin sketching or writing inside the sumi-ink container to view the live layout."}
                                </p>
                            </div>
                        </div>

                        {/* Scroll Foot Note stamp */}
                        <div className="border-t border-[#0D0D15]/10 pt-3 text-center">
                            <p className="text-[8px] font-mono tracking-widest text-[#0D0D15]/40 uppercase">
                                Fable Authenticator Registry Section 16 • JP
                            </p>
                        </div>

                    </div>
                </section>

            </div>

            {/* FOOTER COVENANT */}
            <footer className="text-center pt-8 border-t-2 border-[#0D0D15]/10">
                <span className="font-display text-[9px] tracking-[0.25em] text-[#0D0D15]/30 uppercase font-extrabold block">
                    Fable Scribe Ledger Portal v4.5
                </span>
            </footer>

        </div>
    );
}