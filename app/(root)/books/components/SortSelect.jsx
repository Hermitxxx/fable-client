import { ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "rating", label: "Rating" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
];

export default function SortSelect({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2.5 bg-transparent border-3 border-ink rounded-lg text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-sun focus:ring-offset-2 transition-shadow duration-200"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/50 pointer-events-none" />
    </div>
  );
}
