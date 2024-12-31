"use client";

import { setLoadingState } from "@/framework/redux/reducers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface FilterButtonProps {
  options: { label: string; value: string }[];
}

const FilterButtons: React.FC<FilterButtonProps> = ({ options }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Parse current filter from the URL query params
  const currentFilter = searchParams.get("filter") || "";

  // State to manage the selected button
  const [selected, setSelected] = useState<string>(currentFilter);

  useEffect(() => {
    dispatch(setLoadingState(false));
  }, [searchParams.toString(), dispatch]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.value;
      setSelected(value);

      const params = new URLSearchParams(searchParams.toString());
      params.set("filter", value);

      dispatch(setLoadingState(true));
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, router, dispatch]
  );

  const handleClearSelection = useCallback(() => {
    setSelected(""); // Reset the selected filter

    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter"); // Remove the filter parameter from URL

    dispatch(setLoadingState(true));
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, searchParams, router, dispatch]);

  const isSelected = useCallback(
    (value: string) => selected === value,
    [selected]
  );

  return (
    <div className="flex items-center">
      <ul className="flex flex-wrap -m-1">
        {options.map((option) => (
          <li key={option.value} className="m-1">
            <button
              value={option.value}
              onClick={handleClick}
              className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border shadow-sm duration-150 ease-in-out ${
                isSelected(option.value)
                  ? "bg-indigo-500 text-white border-transparent"
                  : "bg-white text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Cross icon button to clear selection */}
      {selected && (
        <button
          onClick={handleClearSelection}
          className="ml-2 p-1 text-sm text-gray-500 hover:text-gray-700"
          title="Clear selection"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FilterButtons;