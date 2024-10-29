"use client";

import { ROUTES } from "@/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsSidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const accountUrl = `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.settings}/${ROUTES.account}`;
  const changePasswordUrl = `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.settings}/${ROUTES.changePassword}`;

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 min-w-[15rem] md:space-y-3">
      {/* Group 1 */}
      <div>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">
          {t("COMMON.SETTINGS")}
        </div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link
              href={accountUrl}
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes(accountUrl) &&
                "bg-indigo-50 dark:bg-indigo-500/30"
              }`}
            >
              <svg
                className={`w-4 h-4 shrink-0 fill-current mr-2 ${
                  pathname.includes(accountUrl)
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
                viewBox="0 0 16 16"
              >
                <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes(accountUrl)
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {t("COMMON.MY_ACCOUNT")}
              </span>
            </Link>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link
              href={changePasswordUrl}
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes(changePasswordUrl) &&
                "bg-indigo-50 dark:bg-indigo-500/30"
              }`}
            >
              <svg
                className={`w-4 h-4 shrink-0 fill-current mr-2 ${
                  pathname.includes(changePasswordUrl)
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
                viewBox="0 0 16 16"
              >
                <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z" />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes(changePasswordUrl)
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {t("COMMON.CHANGE_PASSWORD")}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
