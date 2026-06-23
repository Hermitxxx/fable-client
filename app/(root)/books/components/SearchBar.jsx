import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
      <input
        type="text"
        placeholder="Search by title or author..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-transparent border-3 border-ink rounded-lg text-sm font-[family-name:var(--font-display)] placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-sun focus:ring-offset-2 transition-shadow duration-200"
      />
    </div>
  );
}
