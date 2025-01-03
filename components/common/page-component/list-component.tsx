"use client";

import {
  DeleteButtonWithConfirmation,
  EditLinkButton,
  EyeOpenIcon,
  ListTable,
  LocaleTabs,
  PageHeader,
  PaginationClassic,
  StatusFilter,
  TableCell,
  ToggleField,
} from "@/components";
import { ROUTES } from "@/constants";
import useTable from "@/hooks/useTable";
import { listTranslations } from "@/locales/manual-translation";
import { Column, ColumnConfig, Locale } from "@/types/index";
import {
  deleteHandler,
  getAWSImageUrl,
  statusChangeHandler,
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { FC, Fragment, useCallback, useMemo } from "react";

const ListComponent = ({
  fetchUrl,
  statusUrl = "",
  pageRoute = "",
  title,
  searchPlaceholder,
  columnConfigs,
  showReorder = false,
  reorderUrl = "",
  showLanguageFilter = false,
  customFilters = [],
  hideCreateButton = false,
  AboveTableComponent,
  aboveTabComponentProps = {},
  createButtonUrl,
  showStatusFilter = true,
  deleteUrl = "",
}: {
  fetchUrl: string;
  statusUrl?: string;
  pageRoute?: string;
  title?: string;
  searchPlaceholder: string;
  columnConfigs: ColumnConfig[];
  showReorder?: boolean;
  reorderUrl?: string;
  showLanguageFilter?: boolean;
  customFilters?: { component: React.ComponentType<any>; props?: Object }[];
  hideCreateButton?: boolean;
  AboveTableComponent?: FC<any>;
  aboveTabComponentProps?: Object;
  createButtonUrl?: string;
  showStatusFilter?: boolean;
  deleteUrl?: string;
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
    onReorder,
    handleLanguageChange,
    language,
  } = useTable({
    fetchUrl,
    isAdmin,
    reorderUrl,
    showLanguageFilter,
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

  const handleDelete = useCallback(
    async (_id: string) => {
      deleteHandler({
        _id,
        apiUrl: deleteUrl,
        fetchRows,
        t,
        setLoading,
      });
    },
    [fetchRows, setLoading, deleteUrl]
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
                <div className="flex justify-center items-center">
                  {!col.hideEditBtn && (
                    <EditLinkButton
                      href={`/${ROUTES.admin}/${pageRoute}/${value}`}
                    />
                  )}
                  {col.showDeleteBtn && (
                    <DeleteButtonWithConfirmation
                      deleteId={value}
                      handleDelete={handleDelete}
                      height={32}
                    />
                  )}
                </div>
              ),
            };
          case "image":
            return {
              ...commonProps,
              cell: (value: string) => (
                <div className="flex justify-center">
                  <img
                    src={getAWSImageUrl(value)}
                    alt={value}
                    className=" h-12 w-12"
                  />
                </div>
              ),
            };
          case "pdf":
            return {
              ...commonProps,
              cell: (value: string) => (
                <div className="flex justify-center">
                  <a
                    href={getAWSImageUrl(value)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EyeOpenIcon />
                  </a>
                </div>
              ),
            };
          default:
            return {
              ...commonProps,
              cell: (value: string) => (
                <TableCell
                  value={
                    (col.shouldTranslate
                      ? listTranslations[language as Locale][value]
                      : value) || "-"
                  }
                  showCopyButton={!!col.showCopyButton}
                />
              ),
            };
        }
      }),
    [columnConfigs, handleStatusChange, pageRoute, language]
  );

  return (
    <Fragment>
      {/* Page header */}
      <PageHeader
        createButtonLabel={t("COMMON.CREATE")}
        createButtonLink={
          createButtonUrl ?? `/${ROUTES.admin}/${pageRoute}/${ROUTES.add}`
        }
        handleSearchChange={handleSearchChange}
        searchPlaceholder={`${t(searchPlaceholder)}...`}
        searchTerm={searchTerm}
        hideCreateButton={hideCreateButton}
        {...(title ? { title: t(title) } : {})}
      />

      {/* More actions */}
      {showStatusFilter && (
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          <StatusFilter filter={filter} handleFilter={handleFilter} />
        </div>
      )}

      {customFilters.length > 0 && (
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {customFilters.map(
            ({ component: CustomFilter, props = {} }, index) => (
              <CustomFilter
                key={index}
                {...props}
                filter={filter}
                handleFilter={handleFilter}
              />
            )
          )}
        </div>
      )}

      {showLanguageFilter && (
        <div className="sm:flex sm:justify-between sm:items-center mb-1">
          <LocaleTabs
            active={language}
            handleTabChange={handleLanguageChange}
          />
        </div>
      )}

      {AboveTableComponent && (
        <AboveTableComponent {...aboveTabComponentProps} language={language} />
      )}

      <ListTable
        columns={columns}
        isLoading={loading}
        onSortChange={handleSortChange}
        rows={rows}
        sortConfig={sortConfig}
        title={t(title)}
        totalRows={totalRows}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        {...(showReorder ? { onReorder } : {})}
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
