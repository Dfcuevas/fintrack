"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, value, ...props }, ref) => {

    console.log(value)

    return (
      <div className="relative flex ">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={ref}
          type="text"
          value={value}
          className="py-2 pl-10 bg-white rounded-lg border-accent border text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary"
          {...props}
        />
        {value && onClear && (
          <button
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";
