"use client";

import { InputHTMLAttributes, useEffect, useState } from "react";

type DebouncedSearchProps = {
  placeholder?: string;
  value?: string;
  onSearchChange: (value: string, name?: string) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export default function DebouncedSearch({
  placeholder = "Search…",
  value: initialValue = "",
  onSearchChange,
  debounce = 500,
  ...props
}: DebouncedSearchProps) {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounce the value change
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onSearchChange(value, props.name); // Only trigger onSearchChange if the value has changed
      }
    }, debounce);

    return () => clearTimeout(timeout); // Clean up the timeout on unmount or value change
  }, [value, initialValue, onSearchChange, debounce]);

  return (
    <div className="relative">
      <label htmlFor="action-search" className="sr-only">
        Search
      </label>
      <input
        id="action-search"
        className="form-input pl-9 bg-white dark:bg-slate-800"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      <button
        className="absolute inset-0 right-auto group"
        type="submit"
        aria-label="Search"
      >
        <svg
          className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
          <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
        </svg>
      </button>
    </div>
  );
}
