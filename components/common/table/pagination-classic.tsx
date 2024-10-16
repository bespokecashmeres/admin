interface PaginationProps {
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (number: number) => void;
  currentPage: number;
  rowsPerPage: number;
  totalRows: number;
  rowsPerPageOptions?: number[];
}

export default function PaginationClassic({
  currentPage,
  rowsPerPage,
  totalRows,
  rowsPerPageOptions = [10, 25, 50],
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            {currentPage === 1 ? (
              <span className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">
                &lt;- Previous
              </span>
            ) : (
              <a
                className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500"
                href="#"
                onClick={() => onPageChange(currentPage - 1)}
              >
                &lt;- Previous
              </a>
            )}
          </li>
          <li className="ml-3 first:ml-0">
            {endRow === totalRows ? (
              <span className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600">
                Next -&gt;
              </span>
            ) : (
              <a
                className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500"
                href="#"
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next -&gt;
              </a>
            )}
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {startRow}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {endRow}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {totalRows}
        </span>{" "}
        results
      </div>
    </div>
  );
}
