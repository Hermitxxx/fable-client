import { getAllTrans, getPurchasedBooks } from '@/app/lib/api/transactions';
import { getAllUsers } from '@/app/lib/api/users';
import { getAllWriters } from '@/app/lib/api/writers';
import React from 'react';

const AdminPage = async () => {
    const users = await getAllUsers()
    const totalUsers = users.length;
    const writers = await getAllWriters()
    const totalWriters = writers.length;

    const transactions = await getAllTrans()

    const totalRevenue = transactions.reduce((acc, curr) => Number(acc) + Number(curr.price), 0)
    const totalEbooksSold = transactions.length;
    return (
        <section className='p-8'>
            <div className="space-y-10">
                <div>
                    <h2 className="section-heading text-2xl font-bold uppercase tracking-wider">
                        Imperial Ledger Overview
                    </h2>
                    <p className="font-display text-xs text-[#0D0D15]/60 mt-3 max-w-[65ch]">
                        Visual records of the Scribe Covenant’s earnings, catalog expansions, and active platform participants.
                    </p>
                </div>

                {/* Analytics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="card-ink p-5 bg-[#F0E3CE]">
                        <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider font-display">
                            Total Scrolls Read
                        </p>
                        <div className="flex justify-between items-baseline mt-3">
                            <h3 className="text-3xl font-extrabold font-display">{totalUsers}</h3>
                            <span className="text-xs font-semibold text-[#CC7722] bg-[#CC7722]/10 px-2 py-0.5 rounded border border-[#CC7722]">
                                MEMBERS
                            </span>
                        </div>
                    </div>

                    <div className="card-ink p-5 bg-[#F0E3CE]">
                        <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider font-display">
                            Master Scribes
                        </p>
                        <div className="flex justify-between items-baseline mt-3">
                            <h3 className="text-3xl font-extrabold font-display">{totalWriters}</h3>
                            <span className="text-xs font-semibold text-[#E85D35] bg-[#E85D35]/10 px-2 py-0.5 rounded border border-[#E85D35]">
                                VERIFIED
                            </span>
                        </div>
                    </div>

                    <div className="card-ink p-5 bg-[#F0E3CE]">
                        <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider font-display">
                            Chronicles Acquired
                        </p>
                        <div className="flex justify-between items-baseline mt-3">
                            <h3 className="text-3xl font-extrabold font-display">{totalEbooksSold}</h3>
                            <span className="text-xs font-semibold text-[#003153] bg-[#003153]/10 px-2 py-0.5 rounded border border-[#003153]">
                                SALES
                            </span>
                        </div>
                    </div>

                    <div className="card-ink p-5 bg-[#F0E3CE]">
                        <p className="text-[10px] uppercase font-bold text-[#0D0D15]/50 tracking-wider font-display">
                            Treasury Balance
                        </p>
                        <div className="flex justify-between items-baseline mt-3">
                            <h3 className="text-2xl font-extrabold font-display">¥{totalRevenue.toFixed(2)}</h3>
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
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#0D0D15]/70 border-b border-[#0D0D15]/10 pb-2">
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
                                {/* January bar */}
                                <g className="group cursor-pointer">
                                    <rect x="80" y="140" width="45" height="60" fill="#2A4056" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#CC7722]" />
                                    <text x="102" y="130" textAnchor="middle" fill="#0D0D15" className="font-display text-[9px] font-bold">¥600</text>
                                    <text x="102" y="215" textAnchor="middle" fill="#0D0D15" className="font-display text-[10px] font-bold">JAN</text>
                                </g>
                                {/* February bar */}
                                <g className="group cursor-pointer">
                                    <rect x="160" y="110" width="45" height="90" fill="#003153" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#CC7722]" />
                                    <text x="182" y="100" textAnchor="middle" fill="#0D0D15" className="font-display text-[9px] font-bold">¥1,200</text>
                                    <text x="182" y="215" textAnchor="middle" fill="#0D0D15" className="font-display text-[10px] font-bold">FEB</text>
                                </g>
                                {/* March bar */}
                                <g className="group cursor-pointer">
                                    <rect x="240" y="90" width="45" height="110" fill="#CC7722" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#E85D35]" />
                                    <text x="262" y="80" textAnchor="middle" fill="#0D0D15" className="font-display text-[9px] font-bold">¥1,800</text>
                                    <text x="262" y="215" textAnchor="middle" fill="#0D0D15" className="font-display text-[10px] font-bold">MAR</text>
                                </g>
                                {/* April bar */}
                                <g className="group cursor-pointer">
                                    <rect x="320" y="60" width="45" height="140" fill="#E85D35" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#003153]" />
                                    <text x="342" y="50" textAnchor="middle" fill="#0D0D15" className="font-display text-[9px] font-bold">¥2,400</text>
                                    <text x="342" y="215" textAnchor="middle" fill="#0D0D15" className="font-display text-[10px] font-bold">APR</text>
                                </g>
                                {/* May/Current bar */}
                                <g className="group cursor-pointer">
                                    <rect x="400" y="75" width="45" height="125" fill="#2A4056" stroke="#0D0D15" strokeWidth="2" className="transition-all hover:fill-[#CC7722]" />
                                    <text x="422" y="65" textAnchor="middle" fill="#0D0D15" className="font-display text-[9px] font-bold">¥2,024</text>
                                    <text x="422" y="215" textAnchor="middle" fill="#0D0D15" className="font-display text-[10px] font-bold">MAY</text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Right Chart Panel (4/12 wide): Genre pie/donut segment */}
                    <div className="lg:col-span-4 card-ink p-6 bg-[#F0E3CE] flex flex-col justify-between space-y-4">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#0D0D15]/70 border-b border-[#0D0D15]/10 pb-2">
                            Scrolls by Genre (Hollow Fan)
                        </h4>

                        {/* Donut Chart representation built directly in SVG */}
                        <div className="flex justify-center items-center py-2">
                            <svg width="150" height="150" viewBox="0 0 100 100" className="w-36 h-36">
                                {/* Background Circle */}
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
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-wider font-display">
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
        </section>
    );
};

export default AdminPage;