import { BookX } from "lucide-react";

export default function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-ink/5 border-2 border-ink/20 flex items-center justify-center mb-4">
        <BookX className="w-8 h-8 text-ink/30" />
      </div>
      <h3 className="text-lg font-bold text-ink/80 mb-2">No books found</h3>
      <p className="text-sm text-ink/50 max-w-sm mb-6">
        Try adjusting your search or filters to find what you&apos;re looking for.
      </p>
      <button onClick={onReset} className="btn-ghost text-sm">
        Clear all filters
      </button>
    </div>
  );
}
