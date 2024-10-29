"use client";

import { ROUTES } from "@/constants";
import { CommonSliceTypes } from "@/types/redux";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const BannerContent = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const isAdmin = pathname.includes(`${ROUTES.admin}`);
  const userData = useSelector(
    (state: CommonSliceTypes) => state.common[isAdmin ? "adminUser" : "wsUser"]
  );

  const name = userData?._id
    ? `${userData.first_name} ${userData.last_name}`
    : undefined;

  return (
    <div className="relative">
      <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
        {t("DASHBOARD.HELLO")},{" "}
        {name ?? t(isAdmin ? "COMMON.ADMIN" : "COMMON.WHOLE_SALER")} 👋
      </h1>
    </div>
  );
};

export default BannerContent;
