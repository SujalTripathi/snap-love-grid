import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

const SearchInput = ({ value, onChange, resultCount, totalCount }: SearchInputProps) => {
  return (
    <div className="relative max-w-lg w-full">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search by author..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-20 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all shadow-sm text-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent transition-colors"
        >
          <X size={14} className="text-muted-foreground" />
        </button>
      )}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/60 font-mono">
        {resultCount}/{totalCount}
      </span>
    </div>
  );
};

export default SearchInput;
