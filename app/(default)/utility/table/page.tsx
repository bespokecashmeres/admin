"use client";

import PaginationClassic from "@/components/common/table/pagination-classic";
import ListTable from "@/components/common/table/table";
import React, { useMemo } from "react";

const TestListTable = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "title",
        header: "Title",
        cell: (value: string) => value,
      },
      {
        accessor: "description",
        header: "Description",
        cell: (value: string) => value,
      },
      {
        accessor: "_id",
        header: "Action",
        cell: (value: string) => {
          return (
            <div className="space-x-1">
              <button className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
                <span className="sr-only">Edit</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                </svg>
              </button>
              <button className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
                <span className="sr-only">Download</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M16 20c.3 0 .5-.1.7-.3l5.7-5.7-1.4-1.4-4 4V8h-2v8.6l-4-4L9.6 14l5.7 5.7c.2.2.4.3.7.3zM9 22h14v2H9z" />
                </svg>
              </button>
              <button className="text-rose-500 hover:text-rose-600 rounded-full">
                <span className="sr-only">Delete</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                  <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                </svg>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const rows = useMemo(() => {
    return [
      {
        _id: 1,
        title: "title 1",
        description: "description 1",
      },
      {
        _id: 2,
        title: "title 2",
        description: "description 2",
      },
      {
        _id: 3,
        title: "title 3",
        description: "description 3",
      },
    ];
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <ListTable
        columns={columns}
        isLoading={false}
        onSortChange={() => {}}
        rows={rows}
        sortConfig={null}
        title="Invoices"
        totalRows={10}
      />
      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic
          currentPage={1}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          rowsPerPage={10}
          totalRows={44}
        />
      </div>
    </div>
  );
};

export default TestListTable;
