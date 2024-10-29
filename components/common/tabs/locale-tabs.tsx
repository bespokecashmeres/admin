"use client";

import { LOCALES } from "@/constants";
import { Locale } from "@/types";
import clsx from "clsx";
import React from "react";

const LocaleTabs = ({
  active,
  handleTabChange,
}: {
  active: Locale;
  handleTabChange: (lang: Locale) => void;
}) => {
  return (
    <ul className="flex flex-wrap -m-1 mb-4">
      {LOCALES.map((locale) => (
        <li className="m-1" key={locale}>
          <button
            type="button"
            onClick={() => handleTabChange(locale)}
            className={clsx(
              "inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border duration-150 ease-in-out",
              {
                "border-transparent shadow-sm bg-indigo-500 text-white":
                  active === locale,
                "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400":
                  active !== locale,
              }
            )}
          >
            {locale.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LocaleTabs;
