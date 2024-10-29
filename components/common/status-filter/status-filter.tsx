"use client";

import React, { useCallback } from "react";
import { TabButton } from "../buttons";
import { useTranslations } from "next-intl";

interface StatusFilterProps {
  filter: Record<string, any>;
  handleFilter: (filter: Record<string, any>) => void;
}

const StatusFilter = ({ filter, handleFilter }: StatusFilterProps) => {
  const t = useTranslations();
  const filterHasStatus = filter.hasOwnProperty("status");
  const filterStatusValue = !!(filter.status ?? false);

  const handleAllFilter = useCallback(() => handleFilter({}), [handleFilter]);
  const handleActiveFilter = useCallback(
    () => handleFilter({ status: true }),
    [handleFilter]
  );
  const handleInactiveFilter = useCallback(
    () => handleFilter({ status: false }),
    [handleFilter]
  );

  return (
    <div className="mb-4 sm:mb-0">
      <ul className="flex flex-wrap -m-1">
        <li className="m-1">
          <TabButton
            isActive={!filterHasStatus}
            handleClick={handleAllFilter}
            label={t("STATUS_FILTER.ALL_TAB")}
          />
        </li>
        <li className="m-1">
          <TabButton
            isActive={filterHasStatus && filterStatusValue}
            handleClick={handleActiveFilter}
            label={t("STATUS_FILTER.ACTIVE_TAB")}
          />
        </li>
        <li className="m-1">
          <TabButton
            isActive={filterHasStatus && !filterStatusValue}
            handleClick={handleInactiveFilter}
            label={t("STATUS_FILTER.INACTIVE_TAB")}
          />
        </li>
      </ul>
    </div>
  );
};

export default StatusFilter;
