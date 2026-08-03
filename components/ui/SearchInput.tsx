"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, value, ...props }, ref) => {
    return (
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={ref}
          type="text"
          value={value}
          className="pl-9 pr-8 py-2 rounded-full border text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          {...props}
        />
        {value && onClear && (
          <button
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";
