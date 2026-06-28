import { getAllTrans } from '@/app/lib/api/transactions';
import { getAllUsers } from '@/app/lib/api/users';
import { getAllWriters } from '@/app/lib/api/writers';
import React from 'react';

// ─── helpers ────────────────────────────────────────────────────────────────

const MONTH_ABBR = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Bar chart palette — cycles through design-system colours
const BAR_COLORS = ['#2A4056', '#003153', '#CC7722', '#E85D35', '#2A4056', '#003153', '#CC7722', '#E85D35', '#2A4056', '#003153', '#CC7722', '#E85D35'];

// Donut colours for genres
const GENRE_COLORS = ['#E85D35', '#2A4056', '#CC7722', '#003153', '#E85D35', '#2A4056'];

// ─── data helpers ────────────────────────────────────────────────────────────

function buildMonthlyRevenue(transactions) {
    // date format: "DD/MM/YYYY"
    const map = {}; // key: "YYYY-MM" → { label: 'JAN', total: 0 }

    transactions.forEach(t => {
        const parts = t.date?.split('/');
        if (!parts || parts.length < 3) return;
        const [, month, year] = parts; // DD / MM / YYYY
        const key = `${year}-${month}`;
        if (!map[key]) {
            map[key] = { label: MONTH_ABBR[parseInt(month, 10) - 1], total: 0, sortKey: `${year}${month}` };
        }
        map[key].total += parseFloat(t.price) || 0;
    });

    // Sort chronologically, take last 6 months max
    return Object.values(map)
        .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
        .slice(-6);
}

function buildGenreCounts(transactions) {
    const map = {};
    transactions.forEach(t => {
        const genre = t.genre || 'Other';
        map[genre] = (map[genre] || 0) + 1;
    });
    const total = transactions.length || 1;
    return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .map(([genre, count]) => ({
            genre,
            count,
            pct: Math.round((count / total) * 100),
        }));
}

// ─── SVG bar chart ───────────────────────────────────────────────────────────

function BarChart({ months }) {
    if (!months.length) {
        return (
            <div className="flex items-center justify-center h-[220px] text-ink/40 font-display text-xs uppercase tracking-wider">
                No transaction data yet
            </div>
        );
    }

    const CHART_W = 500;
    const CHART_H = 250;
    const PAD_LEFT = 50;
    const PAD_RIGHT = 20;
    const PAD_TOP = 50;
    const BASELINE = 200;
    const MAX_BAR_H = BASELINE - PAD_TOP; // 150px

    const maxVal = Math.max(...months.map(m => m.total));
    const barAreaW = CHART_W - PAD_LEFT - PAD_RIGHT;
    const barW = Math.min(45, (barAreaW / months.length) * 0.55);
    const gap = barAreaW / months.length;

    return (
        <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-full" preserveAspectRatio="none">
            {/* Gridlines */}
            {[0.25, 0.5, 0.75, 1].map((frac, i) => {
                const y = BASELINE - frac * MAX_BAR_H;
                return (
                    <line key={i} x1={PAD_LEFT} y1={y} x2={CHART_W - PAD_RIGHT} y2={y}
                        stroke="#0d0d15" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
                );
            })}

            {/* Baseline */}
            <line x1={PAD_LEFT - 10} y1={BASELINE} x2={CHART_W - PAD_RIGHT} y2={BASELINE}
                stroke="#0D0D15" strokeWidth="3" />

            {/* Bars */}
            {months.map((m, i) => {
                const barH = maxVal > 0 ? (m.total / maxVal) * MAX_BAR_H : 0;
                const cx = PAD_LEFT + gap * i + gap / 2;
                const x = cx - barW / 2;
                const y = BASELINE - barH;
                const fill = BAR_COLORS[i % BAR_COLORS.length];
                const hoverFill = BAR_COLORS[(i + 2) % BAR_COLORS.length];
                const label = m.total >= 1000
                    ? `$${(m.total / 1000).toFixed(1)}k`
                    : `$${m.total.toFixed(0)}`;

                return (
                    <g key={m.sortKey} className="chart-bar-group">
                        <style>{`
                            .chart-bar-${i}:hover { fill: ${hoverFill}; }
                        `}</style>
                        <rect
                            x={x} y={y} width={barW} height={barH}
                            fill={fill} stroke="#0D0D15" strokeWidth="2"
                            className={`chart-bar-${i}`}
                            style={{ transition: 'fill 200ms ease-out', cursor: 'pointer' }}
                        />
                        <text x={cx} y={y - 8} textAnchor="middle" fill="#0D0D15"
                            style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', fontWeight: 700 }}>
                            {label}
                        </text>
                        <text x={cx} y={BASELINE + 15} textAnchor="middle" fill="#0D0D15"
                            style={{ fontFamily: 'Cinzel, serif', fontSize: '10px', fontWeight: 700 }}>
                            {m.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

// ─── SVG donut chart ─────────────────────────────────────────────────────────

function DonutChart({ genres }) {
    if (!genres.length) {
        return (
            <div className="flex items-center justify-center py-4 text-ink/40 font-display text-xs uppercase tracking-wider">
                No genre data yet
            </div>
        );
    }

    const R = 30;         // ring radius
    const STROKE = 16;    // ring thickness
    const CIRCUMFERENCE = 2 * Math.PI * R; // ≈ 188.5

    let offset = 0;
    const segments = genres.map((g, i) => {
        const dash = (g.pct / 100) * CIRCUMFERENCE;
        const seg = { ...g, dash, offset, color: GENRE_COLORS[i % GENRE_COLORS.length] };
        offset += dash;
        return seg;
    });

    return (
        <>
            <div className="flex justify-center items-center py-2">
                <svg width="150" height="150" viewBox="0 0 100 100" className="w-36 h-36">
                    {/* Outer ring border */}
                    <circle cx="50" cy="50" r={R} fill="transparent" stroke="#0D0D15" strokeWidth="1" />

                    {segments.map((seg, i) => (
                        <circle
                            key={i}
                            cx="50" cy="50" r={R}
                            fill="transparent"
                            stroke={seg.color}
                            strokeWidth={STROKE}
                            strokeDasharray={`${seg.dash} ${CIRCUMFERENCE}`}
                            strokeDashoffset={-seg.offset}
                        />
                    ))}

                    {/* Inner washi core */}
                    <circle cx="50" cy="50" r="22" fill="#F0E3CE" stroke="#0D0D15" strokeWidth="2" />
                </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-wider font-display">
                {segments.map((seg, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 border border-[#0D0D15] rounded-sm flex-shrink-0"
                            style={{ backgroundColor: seg.color }} />
                        <span>{seg.genre} ({seg.pct}%)</span>
                    </div>
                ))}
            </div>
        </>
    );
}

// ─── page ────────────────────────────────────────────────────────────────────

const AdminPage = async () => {
    const users = await getAllUsers();
    const totalUsers = users.length;
    const writers = await getAllWriters();
    const totalWriters = writers.length;

    const transactions = await getAllTrans();

    const totalRevenue = transactions.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);
    const totalEbooksSold = transactions.length;

    const monthlyData = buildMonthlyRevenue(transactions);
    const genreData = buildGenreCounts(transactions);

    return (
        <section className='p-8'>
            <div className="space-y-10">
                <div>
                    <h2 className="section-heading text-2xl font-bold uppercase tracking-wider">
                        Imperial Ledger Overview
                    </h2>
                    <p className="font-display text-xs text-ink/60 mt-3 max-w-[65ch]">
                        Visual records of the Scribe Covenant&apos;s earnings, catalog expansions, and active platform participants.
                    </p>
                </div>

                {/* Analytics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="card-ink p-5 bg-[#F0E3CE]">
                        <p className="text-[10px] uppercase font-bold text-ink/50 tracking-wider font-display">
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
                        <p className="text-[10px] uppercase font-bold text-ink/50 tracking-wider font-display">
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
                        <p className="text-[10px] uppercase font-bold text-ink/50 tracking-wider font-display">
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
                        <p className="text-[10px] uppercase font-bold text-ink/50 tracking-wider font-display">
                            Treasury Balance
                        </p>
                        <div className="flex justify-between items-baseline mt-3">
                            <h3 className="text-2xl font-extrabold font-display">${totalRevenue.toFixed(2)}</h3>
                            <span className="text-xs font-semibold text-[#2A4056] bg-[#2A4056]/10 px-2 py-0.5 rounded border border-[#2A4056]">
                                REVENUE
                            </span>
                        </div>
                    </div>

                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">

                    {/* Bar Chart — Monthly Revenue */}
                    <div className="lg:col-span-8 card-ink p-6 bg-[#F0E3CE] space-y-4">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink/70 border-b border-[#0D0D15]/10 pb-2">
                            Monthly Treasures (Sumi Bar Ledger)
                        </h4>
                        <div className="w-full aspect-[16/9] min-h-[220px] max-h-[300px] relative">
                            <BarChart months={monthlyData} />
                        </div>
                    </div>

                    {/* Donut Chart — Genre Breakdown */}
                    <div className="lg:col-span-4 card-ink p-6 bg-[#F0E3CE] flex flex-col justify-between space-y-4">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink/70 border-b border-[#0D0D15]/10 pb-2">
                            Scrolls by Genre (Hollow Fan)
                        </h4>
                        <DonutChart genres={genreData} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AdminPage;