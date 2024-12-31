"use client";

import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { DebouncedSearch, DropdownField } from "../inputs";

export default function FilterSidebar({
  genders,
  colours,
  materials,
  patterns,
}: {
  genders: DropDownOptionType[];
  colours: DropDownOptionType[];
  materials: DropDownOptionType[];
  patterns: DropDownOptionType[];
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  // Memoize options to avoid re-renders of DropdownField if props don't change
  const memoizedGenders = useMemo(() => genders, [genders]);
  const memoizedColours = useMemo(() => colours, [colours]);
  const memoizedMaterials = useMemo(() => materials, [materials]);
  const memoizedPatterns = useMemo(() => patterns, [patterns]);

  // Memoize the updateSearchParams function
  const updateSearchParams = useCallback(
    (value: string, key?: string) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      if (value) {
        params.set(key!, value);
      } else {
        params.delete(key!);
      }

      dispatch(setLoadingState(true));
      router.push(`?${params.toString()}`);
    },
    [dispatch, router, searchParams]
  );

  // Effect to set loading state only if searchParams change
  useEffect(() => {
    dispatch(setLoadingState(false));
  }, [searchParams.toString(), dispatch]);

  return (
    <div>
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 min-w-[15rem]">
        <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-3">
          <div className="w-full">
            <label
              htmlFor="search"
              className="flex items-center mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Search Here
            </label>
            <DebouncedSearch
              onSearchChange={updateSearchParams}
              name="search"
              value={searchParams?.get("search") || ""}
              placeholder="Search here"
              className="w-fill-available pl-9 bg-white dark:bg-slate-800"
            />
          </div>
          <DropdownField
            options={memoizedGenders}
            name="gender"
            label="Gender"
            value={searchParams?.get("gender") || ""}
            onChange={updateSearchParams}
          />
          <DropdownField
            options={memoizedColours}
            name="colour"
            label="Colour"
            value={searchParams?.get("colour") || ""}
            onChange={updateSearchParams}
          />
          <DropdownField
            options={memoizedMaterials}
            name="material"
            label="Material"
            value={searchParams?.get("material") || ""}
            onChange={updateSearchParams}
          />
          <DropdownField
            options={memoizedPatterns}
            name="pattern"
            label="Pattern"
            value={searchParams?.get("pattern") || ""}
            onChange={updateSearchParams}
          />
        </div>
      </div>
    </div>
  );
}
