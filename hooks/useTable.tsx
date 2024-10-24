import adminAxiosInstance from "@/config/adminAxiosInstance";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { SORT_DIRECTION } from "@/constants/enum";
import { SortConfig } from "@/types";
import { useState, useEffect } from "react";

type FetchResponse<T> = {
  currentPage: number;
  totalCount: number;
  totalPage: number;
  data: T[];
};

/**
 * Custom hook for managing table data and interactions.
 *
 * @template T Type of data in the table rows.
 * @param {string} fetchUrl URL of the endpoint.
 * @param {string} searchField Field name to be used for searching.
 * @param {number} defaultRowsPerPage Default number of rows per page.
 * @returns An object containing:
 *  - `rows`: An array of table data objects of type `T`.
 *  - `searchTerm`: The current search term.
 *  - `sortConfig`: An object representing the current sort configuration with `key` and `direction` properties.
 *  - `currentPage`: The current page number (1-based index).
 *  - `rowsPerPage`: The number of rows displayed per page.
 *  - `totalRows`: The total number of rows available.
 *  - `fetchRows`: A function to fetch table data.
 *  - `handleSortChange`: A function to handle sorting changes.
 *  - `handleSearchChange`: A function to handle search term changes.
 *  - `handlePageChange`: A function to handle page changes.
 *  - `handleRowsPerPageChange`: A function to handle rows per page changes.
 */
const useTable = <T extends Record<string, any>>({
  fetchUrl,
  defaultRowsPerPage = 10,
  isAdmin = true,
}: {
  fetchUrl: string;
  defaultRowsPerPage?: number;
  isAdmin?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<object>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchRows();
  }, [currentPage, rowsPerPage, sortConfig, searchTerm, filter]);

  const fetchRows = async () => {
    setLoading(true);
    const sortBy = sortConfig?.key;
    const sortOrder = sortBy
      ? (sortConfig?.direction ?? SORT_DIRECTION.ASCENDING) ===
        SORT_DIRECTION.ASCENDING
        ? SORT_DIRECTION.ASCENDING
        : SORT_DIRECTION.DESCENDING
      : undefined;

    const requestBody = {
      page: currentPage,
      perPage: rowsPerPage,
      sortBy,
      sortOrder,
      search: searchTerm,
      ...(Object.keys(filter).length > 0 && { filter }),
    };

    try {
      const response = await (isAdmin
        ? adminAxiosInstance
        : wsAxiosInstance
      ).post(fetchUrl, requestBody);
      const result: FetchResponse<T> = response.data?.data ?? {};
      setRows(result?.data ?? []);
      setCurrentPage(result?.currentPage || 1);
      setTotalRows(result?.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch rows:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (key: string) => {
    let direction = SORT_DIRECTION.ASCENDING;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === SORT_DIRECTION.ASCENDING
    ) {
      direction = SORT_DIRECTION.DESCENDING;
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleFilter = (filter: object) => {
    setFilter(filter);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (number: number) => {
    setRowsPerPage(number);
    setCurrentPage(1); // Reset to first page on rows per page change
  };

  return {
    rows,
    searchTerm,
    currentPage,
    rowsPerPage,
    totalRows,
    sortConfig,
    loading,
    filter,
    handleSortChange,
    handleSearchChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleFilter,
    fetchRows,
    setLoading,
  };
};

export default useTable;
