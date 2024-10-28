"use client";

import { SORT_DIRECTION } from "@/constants/enum";
import { SortConfig } from "@/types";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropButton } from "../buttons";

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
  onReorder?: (
    reorderedRows: T[],
    currentPage: number,
    rowsPerPage: number
  ) => void;
  currentPage?: number;
  rowsPerPage?: number;
}

const ListTable = <T extends Record<string, any>>({
  isLoading,
  columns,
  rows,
  onSortChange,
  sortConfig,
  title,
  totalRows,
  onReorder,
  currentPage,
  rowsPerPage,
}: TableProps<T>) => {
  const t = useTranslations();
  const showReorder = !!onReorder;

  // Handler for Drag and Drop reorder
  const handleOnDragEnd = (result: { source: any; destination: any }) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) {
      return;
    }

    const reorderedRows = Array.from(rows);
    const [removed] = reorderedRows.splice(source.index, 1);
    reorderedRows.splice(destination.index, 0, removed);

    if (currentPage && rowsPerPage) {
      onReorder?.(reorderedRows, currentPage, rowsPerPage);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          {title}{" "}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            ({totalRows})
          </span>
        </h2>
      </header>
      <div className="relative">
        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900 dark:bg-slate-300 bg-opacity-75 dark:bg-opacity-50">
            <div className="w-12 h-12 border-8 border-gray-200 border-t-8 border-t-[#6366F1] rounded-full animate-spin"></div>
          </div>
        )}
        {/* Table */}
        <div className="overflow-x-auto">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <table className="table-auto w-full dark:text-slate-300">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                <tr>
                  {showReorder && (
                    <th
                      className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-default text-center"
                      key="cursor-grab-column"
                    />
                  )}
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

              {rows?.length ? (
                <Droppable droppableId="tableRows">
                  {(provided) => (
                    <tbody
                      className="text-sm divide-y divide-slate-200 dark:divide-slate-700"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {rows.map((row, rowIndex) => (
                        <Draggable
                          key={row._id}
                          draggableId={row._id}
                          index={rowIndex}
                          isDragDisabled={!showReorder} // Disable dragging if showReorder is false
                        >
                          {(provided, snapshot) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                // backgroundColor: snapshot.isDragging
                                //   ? "#f0f0f0"
                                //   : "default",
                              }}
                              className={clsx({
                                "bg-slate-300 dark:bg-slate-500":
                                  snapshot.isDragging,
                              })}
                            >
                              {showReorder && (
                                <td
                                  key="cursor-grab"
                                  className={
                                    "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap text-center"
                                  }
                                >
                                  <DragDropButton />
                                </td>
                              )}
                              {columns.map((column) => (
                                <td
                                  key={column.accessor}
                                  className={clsx(
                                    "px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap",
                                    `text-${column?.align ?? "center"}`
                                  )}
                                >
                                  <div className="font-medium text-sky-500">
                                    {column.cell(row[column.accessor], row)}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan={columns.length}
                      align="center"
                      className="py-2"
                    >
                      {t(`COMMON.${isLoading ? "LOADING" : "NO_RECORD_FOUND"}`)}
                      ...
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ListTable;
