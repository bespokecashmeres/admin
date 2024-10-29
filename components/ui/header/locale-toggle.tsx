"use client";

import { setUserLocale } from "@/config/locale";
import { LOCALES } from "@/constants";
import { useLocale } from "next-intl";
import React, { useTransition } from "react";

const LocaleToggle = () => {
  const defaultLocale = useLocale();
  const [_isPending, startTransition] = useTransition();
  const isChecked = defaultLocale === LOCALES[1];

  const handleChange = async () => {
    startTransition(async () => {
      await setUserLocale(LOCALES[isChecked ? 0 : 1]);
      window.location.reload();
    });
  };

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
        htmlFor="light-switch"
      >
        <img src={`/images/icons/${defaultLocale}.svg`} />
      </label>
    </div>
  );
};

export default LocaleToggle;
