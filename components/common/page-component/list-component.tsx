"use client";

import {
  EditLinkButton,
  ListTable,
  PageHeader,
  PaginationClassic,
  StatusFilter,
  TableCell,
  ToggleField,
} from "@/components";
import { ROUTES } from "@/constants";
import {
  ADMIN_USER_STATUS_UPDATE_URL,
  ADMIN_USERS_URL,
} from "@/constants/apis";
import useTable from "@/hooks/useTable";
import { Column, ColumnConfig } from "@/types";
import { statusChangeHandler } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { Fragment, useCallback, useMemo } from "react";

const ListComponent = ({
  fetchUrl,
  statusUrl,
  pageRoute,
  title,
  searchPlaceholder,
  columnConfigs,
}: {
  fetchUrl: string;
  statusUrl: string;
  pageRoute: string;
  title: string;
  searchPlaceholder: string;
  columnConfigs: ColumnConfig[];
}) => {
  const pathname = usePathname();
  const t = useTranslations();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const {
    loading,
    rows,
    rowsPerPage,
    searchTerm,
    sortConfig,
    totalRows,
    currentPage,
    filter,
    fetchRows,
    handlePageChange,
    handleFilter,
    handleRowsPerPageChange,
    handleSearchChange,
    handleSortChange,
    setLoading,
  } = useTable({
    fetchUrl,
    isAdmin,
  });

  const handleStatusChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, _id: string) => {
      statusChangeHandler({
        setLoading,
        _id,
        apiUrl: statusUrl,
        fetchRows,
        status: event.target.checked,
        t,
      });
    },
    [fetchRows, setLoading, statusUrl]
  );

  const columns: Column[] = useMemo(
    () =>
      columnConfigs.map((col): Column => {
        const commonProps = {
          accessor: col.accessor,
          header: t(col.header),
        };

        switch (col.cellType) {
          case "phone":
            return {
              ...commonProps,
              cell: (value: string, row: any) => (
                <TableCell value={`${row.phoneCode} ${value}`} />
              ),
            };
          case "toggle":
            return {
              ...commonProps,
              cell: (value: boolean, row: any) => (
                <TableCell
                  value={
                    <ToggleField
                      checked={value}
                      name={`${row?._id}-switch-status`}
                      onChange={(event) => handleStatusChange(event, row?._id)}
                    />
                  }
                  cursorPointer
                />
              ),
            };
          case "action":
            return {
              ...commonProps,
              cell: (value: string) => (
                <div className="flex justify-center">
                  <EditLinkButton
                    href={`/${ROUTES.admin}/${pageRoute}/${value}`}
                  />
                </div>
              ),
            };
          default:
            return {
              ...commonProps,
              cell: (value: string) => <TableCell value={value || "-"} />,
            };
        }
      }),
    [columnConfigs, handleStatusChange, pageRoute]
  );

  return (
    <Fragment>
      {/* Page header */}
      <PageHeader
        createButtonLabel={t("COMMON.CREATE")}
        createButtonLink={`/${ROUTES.admin}/${pageRoute}/${ROUTES.add}`}
        handleSearchChange={handleSearchChange}
        searchPlaceholder={`${t(searchPlaceholder)}...`}
        searchTerm={searchTerm}
        title={t(title)}
      />

      {/* More actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <StatusFilter filter={filter} handleFilter={handleFilter} />
      </div>

      <ListTable
        columns={columns}
        isLoading={loading}
        onSortChange={handleSortChange}
        rows={rows}
        sortConfig={sortConfig}
        title={t(title)}
        totalRows={totalRows}
      />
      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoading={loading}
        />
      </div>
    </Fragment>
  );
};

export default ListComponent;
