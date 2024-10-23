"use client";

import { ROUTES } from "@/constants";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SigninTabs = ({ path }: { path: (typeof ROUTES.signin) | (typeof ROUTES.signup) }) => {
  const t = useTranslations();
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  return (
    <ul className="flex justify-center -m-1 mb-4">
      <li className="m-1">
        <Link
          className={clsx(
            "inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border duration-150 ease-in-out",
            {
              "border-transparent shadow-sm bg-indigo-500 text-white": isAdmin,
              "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400":
                !isAdmin,
            }
          )}
          href={`/${ROUTES.admin}/${ROUTES.auth}/${path}`}
        >
          {t("COMMON.ADMIN")}
        </Link>
      </li>
      <li className="m-1">
        <Link
          className={clsx(
            "inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border duration-150 ease-in-out",
            {
              "border-transparent shadow-sm bg-indigo-500 text-white": !isAdmin,
              "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400":
                isAdmin,
            }
          )}
          href={`/${ROUTES.ws}/${ROUTES.auth}/${path}`}
        >
          {t("COMMON.WHOLE_SALER")}
        </Link>
      </li>
    </ul>
  );
};

export default SigninTabs;
