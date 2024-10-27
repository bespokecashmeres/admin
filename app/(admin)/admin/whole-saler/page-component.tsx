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
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES, ROUTES } from "@/constants";
import {
  ADMIN_WHOLE_SALER_STATUS_UPDATE_URL,
  ADMIN_WHOLE_SALER_URL,
} from "@/constants/apis";
import useTable from "@/hooks/useTable";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { Fragment, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

const PageComponent = () => {
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
    fetchUrl: ADMIN_WHOLE_SALER_URL,
    isAdmin,
  });

  const handleStatusChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, _id: string) => {
      try {
        setLoading(true);
        const response = await adminAxiosInstance.patch(
          ADMIN_WHOLE_SALER_STATUS_UPDATE_URL,
          { status: event.target.checked, _id }
        );
        if (response.data.success) {
          toast.success(response.data.message || t(MESSAGES.SUCCESS));
          fetchRows();
        } else {
          toast.error(
            response.data.message ||
              t(MESSAGES.SOMETHING_WENT_WRONG)
          );
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      }
    },
    [fetchRows, setLoading]
  );

  const columns = useMemo(
    () => [
      {
        accessor: "first_name",
        header: t("COMMON.FIRST_NAME"),
        cell: (value: string) => <TableCell value={value} />,
      },
      {
        accessor: "middle_name",
        header: t("COMMON.MIDDLE_NAME"),
        cell: (value: string) => <TableCell value={value || "-"} />,
      },
      {
        accessor: "last_name",
        header: t("COMMON.LAST_NAME"),
        cell: (value: string) => <TableCell value={value} />,
      },
      {
        accessor: "email",
        header: t("COMMON.EMAIL_ADDRESS"),
        cell: (value: string) => <TableCell value={value} />,
      },
      {
        accessor: "mobile_number",
        header: t("COMMON.MOBILE_NUMBER"),
        cell: (value: string, row: any) => (
          <TableCell value={`${row.phoneCode} ${value}`} />
        ),
      },
      {
        accessor: "status",
        header: t("COMMON.STATUS"),
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
      },
      {
        accessor: "_id",
        header: t("COMMON.ACTION"),
        cell: (value: string) => {
          return (
            <div className="flex justify-center">
              <EditLinkButton
                href={`/${ROUTES.admin}/${ROUTES.wholeSaler}/${value}`}
              />
            </div>
          );
        },
      },
    ],
    [handleStatusChange]
  );

  return (
    <Fragment>
      {/* Page header */}
      <PageHeader
        createButtonLabel={t("COMMON.CREATE")}
        createButtonLink={`/${ROUTES.admin}/${ROUTES.wholeSaler}/${ROUTES.add}`}
        handleSearchChange={handleSearchChange}
        searchPlaceholder={`${t("COMMON.SEARCH_BY_NAME")}...`}
        searchTerm={searchTerm}
        title={t("WHOLE_SALER.TITLE")}
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
        title={t("WHOLE_SALER.TITLE")}
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

export default PageComponent;
