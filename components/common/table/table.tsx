import { SORT_DIRECTION } from "@/constants/enum";
import { SortConfig } from "@/types";
import clsx from "clsx";
import React from "react";

export type ColumnType = {
  header: string | React.ReactNode;
  accessor: string;
  cell: (value: any, row: any) => React.ReactNode;
  disableSort?: boolean;
  align?: "left" | "center" | "right";
};

interface TableProps<T> {
  isLoading: boolean;
  columns: ColumnType[];
  rows: T[];
  onSortChange: (key: string) => void;
  sortConfig: SortConfig | null;
  title: string;
  totalRows: number;
}

const ListTable = <T extends Record<string, any>>({
  isLoading,
  columns,
  rows,
  onSortChange,
  sortConfig,
  title,
  totalRows
}: TableProps<T>) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          {title}{" "}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            {totalRows}
          </span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
              <tr>
                {columns.map((column, columnIndex) => (
                  <th
                    key={columnIndex}
                    onClick={() =>
                      !column.disableSort && onSortChange(column.accessor)
                    }
                    className={clsx(
                      "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",
                      {
                        "cursor-pointer": !column.disableSort,
                        "cursor-default": column.disableSort,
                      }
                    )}
                  >
                    <div
                      className={`font-semibold ${`text-${
                        column?.align ?? "center"
                      }`}`}
                    >
                      {column.header}{" "}
                      {sortConfig?.key === column.accessor ? (
                        sortConfig?.direction === SORT_DIRECTION.ASCENDING ? (
                          <>&#8593;</>
                        ) : (
                          <>&#8595;</>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {rows?.length ? (
                rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={clsx(
                          "px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",
                          `text-${column?.align ?? "center"}`
                        )}
                      >
                        <div className="font-medium text-sky-500">
                          {column.cell(row[column.accessor], row)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} align="center" className="py-2">
                    No record found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListTable;
