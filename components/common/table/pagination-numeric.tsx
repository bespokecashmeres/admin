"use client";

import { setLoadingState } from "@/framework/redux/reducers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

interface PaginationProps {
  rowsPerPage: number;
  totalRows: number;
}

export default function PaginationNumeric({
  rowsPerPage,
  totalRows,
}: PaginationProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract the current page from search parameters or default to 1
  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  // Calculate the total number of pages
  const totalPages = useMemo(
    () => Math.ceil(totalRows / rowsPerPage),
    [totalRows, rowsPerPage]
  );

  // Generate the page numbers
  const pageNumbers = useMemo(() => {
    const maxDisplayedPages = 5; // Maximum visible page numbers
    const pages: number[] = [];

    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(
          1,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          totalPages
        );
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  // Handle page changes by updating the URL
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", page.toString());
    dispatch(setLoadingState(true));
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    dispatch(setLoadingState(false));
  }, [searchParams.toString(), dispatch]);

  return (
    <div className="flex justify-center">
      <nav className="flex" role="navigation" aria-label="Pagination">
        {/* Previous Button */}
        <div className="mr-2">
          <button
            disabled={currentPage === 1}
            className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 h-full ${
              currentPage === 1
                ? "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                : "bg-white dark:bg-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-500 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
            </svg>
          </button>
        </div>

        {/* Page Numbers */}
        <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
          {pageNumbers.map((page) => (
            <li key={page}>
              {page === currentPage ? (
                <span className="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-500">
                  {page}
                </span>
              ) : page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1 ? (
                <button
                  className="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-500 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ) : (
                <span className="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
                  …
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Next Button */}
        <div className="ml-2">
          <button
            disabled={currentPage === totalPages}
            className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2  h-full ${
              currentPage === totalPages
                ? "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                : "bg-white dark:bg-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-500 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}
