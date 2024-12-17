"use client";

import { useAppProvider } from "@/app/app-provider";
import CONFIG from "@/config";
import { FULL_PATH_ROUTES, ROUTES } from "@/constants";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getBreakpoint } from "../utils/utils";
import Logo from "./logo";
import SidebarLink from "./sidebar-link";
import SidebarLinkGroup from "./sidebar-link-group";

export default function Sidebar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const pathname = usePathname();
  let newPathName = pathname;
  if (newPathName.endsWith("/")) {
    newPathName = newPathName.slice(0, -1);
  }
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint()
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [breakpoint]);

  const links = [
    {
      title: "Pages",
      children: [
        {
          title: t("COMMON.DASHBOARD"),
          route: `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.dashboard}`,
          conditionRoute: `${ROUTES.dashboard}`,
          icon: (
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current ${
                  newPathName.includes(`/${ROUTES.dashboard}`)
                    ? "text-indigo-500"
                    : "text-slate-400"
                }`}
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
              />
              <path
                className={`fill-current ${
                  newPathName.includes(`/${ROUTES.dashboard}`)
                    ? "text-indigo-600"
                    : "text-slate-600"
                }`}
                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
              />
              <path
                className={`fill-current ${
                  newPathName.includes(`/${ROUTES.dashboard}`)
                    ? "text-indigo-200"
                    : "text-slate-400"
                }`}
                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
              />
            </svg>
          ),
        },
        ...(isAdmin
          ? [
              {
                title: t("PRODUCT.TITLE"),
                route: "#",
                conditionRoute: ROUTES.product,
                icon: (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 114.5"
                    className="shrink-0 h-6 w-6"
                  >
                    <g>
                      <path
                        className={`fill-current ${
                          newPathName.includes(ROUTES.product)
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M118.66,9.63c0.67-0.13,1.37,0,1.95,0.35c0.99,0.41,1.69,1.38,1.69,2.52l0.57,79.58c0.05,0.98-0.43,1.95-1.33,2.48 l-32.5,19.39c-0.46,0.35-1.03,0.55-1.65,0.55c-0.15,0-0.3-0.01-0.44-0.04l-84.34-9.38C1.16,105.02,0,103.82,0,102.35V21.42h0 c-0.03-1.08,0.58-2.13,1.64-2.59l42.31-18.6l0,0c0.44-0.2,0.94-0.28,1.46-0.21L118.66,9.63L118.66,9.63z M90.14,33.86v73.06 l27.26-16.26l-0.53-73.65L90.14,33.86L90.14,33.86z M84.65,108.69V34.63l-35.97-4.59L47.5,64.41l-12.63-8.6l-12.63,7.14L24.85,27 L5.49,24.53v75.37L84.65,108.69L84.65,108.69z M78.96,9.94L52.43,25l34.51,4.4l24.19-15.24L78.96,9.94L78.96,9.94z M28.23,21.91 L53.95,6.66l-8.48-1.11L12.74,19.94L28.23,21.91L28.23,21.91z"
                      />
                    </g>
                  </svg>
                ),
                children: [
                  {
                    title: t("PRODUCT.TITLE"),
                    route: FULL_PATH_ROUTES.adminProductProducts,
                  },
                  {
                    title: t("YARN.TITLE"),
                    route: FULL_PATH_ROUTES.adminProductYarn,
                  },
                  ...(!CONFIG.hideProductType
                    ? [
                        {
                          title: t("PRODUCT_TYPE.SIDEBAR_TITLE"),
                          route: FULL_PATH_ROUTES.adminProductProductType,
                        },
                      ]
                    : []),
                  {
                    title: t("SIZE.TITLE"),
                    route: FULL_PATH_ROUTES.adminProductSize,
                  },
                  {
                    title: t("COLOR.TITLE"),
                    route: FULL_PATH_ROUTES.adminProductColor,
                  },
                ],
              },
              {
                title: t("GENDER.TITLE"),
                route: FULL_PATH_ROUTES.adminGender,
                conditionRoute: ROUTES.gender,
                icon: (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 95.49"
                    className="shrink-0 h-6 w-6"
                  >
                    <g>
                      <path
                        className={`fill-current ${
                          newPathName.includes(ROUTES.gender)
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M0,95.49L0,80.6c7.12-3.17,34.98-10.16,36.74-19.06c0.79-4.01-1.02-5.94-3-9.1l-6.37-10.15 c-1.49-2.39-2.61-3.24-2.58-6.18c0.02-1.66,0.05-3.29,0.29-4.88c0.3-2.03,0.55-2.1,1.62-3.73c0.72-1.1,0.63-1.43,0.63-3.96v-6.3 c0-7.28,2.68-11.84,7.2-14.42c6.62-3.78,20.04-3.78,26.62,0.08c4.44,2.6,7.06,7.14,7.06,14.34v6.3c0,2.83-0.1,2.91,0.93,4.39 c0.78,1.13,0.95,1.26,1.22,2.64c0.34,1.81,0.37,3.65,0.39,5.54c0.04,2.94-1.08,3.79-2.57,6.18l4.62,2.89l0.77-1.12 c1.54-2.24,2.6-3.79,2.64-7.44c0.02-0.18,0.02-0.37,0.02-0.56l-0.02,0c-0.01-1.1-0.03-2.18-0.08-3.04 c-0.07-1.16-0.18-2.32-0.4-3.47c-0.41-2.14-0.71-2.71-1.61-4.02c-0.08-0.14-0.17-0.27-0.26-0.41l0,0l-0.12-0.17l-0.08-0.12l0,0 l-0.01-0.02l-0.01,0c0-0.03,0.04-0.07,0.04-0.58l0-0.69l0.02,0v-6.3c0-2.11-0.2-4.06-0.57-5.87c12.78-8.69,30.43-0.1,34.06,25.8 c3.49,24.94,18.45,24.05-4.9,24.05l-9.32,0c-0.03,6.35-1.03,9.6,5.56,13.16c6.58,3.56,24.35,5.39,24.35,14.41v5.78 c0,0.46-0.38,0.84-0.85,0.84l-23.37,0V78.73c0-5.75-7.97-6.83-12.17-8.13c-3.84-1.18-8.37-2.58-12.33-4.06 c0.09-1.56-0.04-3.3-0.05-5.32h-9.59c-0.16-0.25-0.27-0.49-0.31-0.73c-0.23-1.17,0.35-2.2,1.16-3.46c0.09-0.12,0.19-0.25,0.27-0.39 l-0.17-0.11v0l0.17,0.1l0.62-0.97l0.22-0.32l-0.01-0.01l6.13-9.78l0.25-0.36l-4.64-2.91l-6.37,10.15c-1.98,3.16-3.79,5.1-3,9.1 c1.75,8.9,27.24,13.91,34.36,17.08v16.86L0,95.49L0,95.49L0,95.49z"
                      />
                    </g>
                  </svg>
                ),
              },
              {
                title: t("COMMON.YARNS"),
                route: "#",
                conditionRoute: ROUTES.yarnModule,
                icon: (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 100.16"
                    className="shrink-0 h-6 w-6"
                  >
                    <g>
                      <path
                        className={`fill-current ${
                          newPathName.includes(ROUTES.yarnModule)
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M98.74,78.39h6.32V62.24c0-0.31-0.13-0.6-0.34-0.81c-0.21-0.21-0.5-0.34-0.81-0.34l-38.58,0v17.3h6.31 c2,0,3.63,1.63,3.63,3.63v14.52c0,2-1.63,3.63-3.63,3.63l-20.51,0c-2,0-3.63-1.63-3.63-3.63V82.02c0-2,1.63-3.63,3.63-3.63l6.31,0 v-17.3H18.87c-0.31,0-0.6,0.13-0.81,0.34c-0.21,0.21-0.34,0.5-0.34,0.81v16.15h6.42c2,0,3.63,1.63,3.63,3.63v14.52 c0,2-1.63,3.63-3.63,3.63l-20.51,0c-2,0-3.63-1.63-3.63-3.63V82.02c0-2,1.63-3.63,3.63-3.63l6.23,0V62.24 c0-2.48,1.01-4.74,2.64-6.37c1.63-1.63,3.88-2.64,6.37-2.64h38.58V21.78h-6.31c-2,0-3.63-1.63-3.63-3.63V3.63 c0-2,1.63-3.63,3.63-3.63l20.51,0c2,0,3.63,1.63,3.63,3.63v14.52c0,2-1.63,3.63-3.63,3.63l-6.31,0v31.45h38.58 c2.48,0,4.74,1.01,6.37,2.64c1.63,1.63,2.64,3.89,2.64,6.37v16.15h6.33c2,0,3.63,1.63,3.63,3.63v14.52c0,2-1.63,3.63-3.63,3.63 l-20.51,0c-2,0-3.63-1.63-3.63-3.63V82.02C95.11,80.02,96.75,78.39,98.74,78.39L98.74,78.39L98.74,78.39z"
                      />
                    </g>
                  </svg>
                ),
                children: [
                  {
                    title: t("COLOUR.TITLE"),
                    route: FULL_PATH_ROUTES.adminYarnModuleColour,
                  },
                  {
                    title: t("MATERIAL.TITLE"),
                    route: FULL_PATH_ROUTES.adminYarnModuleMaterial,
                  },
                  {
                    title: t("PATTERN.TITLE"),
                    route: FULL_PATH_ROUTES.adminYarnModulePattern,
                  },
                  {
                    title: t("SEASONALITY.TITLE"),
                    route: FULL_PATH_ROUTES.adminYarnModuleSeasonality,
                  },
                  {
                    title: t("PERCEIVED_WEIGHT.TITLE"),
                    route: FULL_PATH_ROUTES.adminYarnModulePerceivedWeight,
                  },
                  {
                    title: t("OCCASSION.TITLE"),
                    route: FULL_PATH_ROUTES.adminYarnModuleOccassion,
                  },
                  {
                    title: t("FITTING.TITLE"),
                    route: FULL_PATH_ROUTES.adminYarnModuleFitting,
                  },
                  // {
                  //   title: t("PRICE_RANGE.TITLE"),
                  //   route: FULL_PATH_ROUTES.adminYarnModulePriceRanges,
                  // },
                ],
              },
              {
                title: t("COMMON.STEPS"),
                route: FULL_PATH_ROUTES.adminSteps,
                conditionRoute: ROUTES.steps,
                icon: (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 82.64"
                    className="shrink-0 h-6 w-6"
                  >
                    <g>
                      <path
                        className={`fill-current ${
                          newPathName.includes(ROUTES.steps)
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M94.83,0h26.1c1.07,0,1.95,0.88,1.95,1.95v79.25c0,0.05,0,0.09,0,0.13v1.3H0V65.86 c-0.02-2.16,1.13-3.31,3.34-3.54l27.03,0.04V42.99c-0.02-0.99,0.41-1.51,1.3-1.52H60.8V22.85c0.07-1.3,0.81-1.87,1.96-2.01h29.53 V2.88C92.24,2.01,92.87,0,94.83,0L94.83,0z"
                      />
                    </g>
                  </svg>
                ),
              },
              {
                title: t("COMMON.CATEGORIES"),
                route: "#",
                conditionRoute: ROUTES.categories,
                icon: (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 100.16"
                    className="shrink-0 h-6 w-6"
                  >
                    <g>
                      <path
                        className={`fill-current ${
                          newPathName.includes(ROUTES.categories)
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="M98.74,78.39h6.32V62.24c0-0.31-0.13-0.6-0.34-0.81c-0.21-0.21-0.5-0.34-0.81-0.34l-38.58,0v17.3h6.31 c2,0,3.63,1.63,3.63,3.63v14.52c0,2-1.63,3.63-3.63,3.63l-20.51,0c-2,0-3.63-1.63-3.63-3.63V82.02c0-2,1.63-3.63,3.63-3.63l6.31,0 v-17.3H18.87c-0.31,0-0.6,0.13-0.81,0.34c-0.21,0.21-0.34,0.5-0.34,0.81v16.15h6.42c2,0,3.63,1.63,3.63,3.63v14.52 c0,2-1.63,3.63-3.63,3.63l-20.51,0c-2,0-3.63-1.63-3.63-3.63V82.02c0-2,1.63-3.63,3.63-3.63l6.23,0V62.24 c0-2.48,1.01-4.74,2.64-6.37c1.63-1.63,3.88-2.64,6.37-2.64h38.58V21.78h-6.31c-2,0-3.63-1.63-3.63-3.63V3.63 c0-2,1.63-3.63,3.63-3.63l20.51,0c2,0,3.63,1.63,3.63,3.63v14.52c0,2-1.63,3.63-3.63,3.63l-6.31,0v31.45h38.58 c2.48,0,4.74,1.01,6.37,2.64c1.63,1.63,2.64,3.89,2.64,6.37v16.15h6.33c2,0,3.63,1.63,3.63,3.63v14.52c0,2-1.63,3.63-3.63,3.63 l-20.51,0c-2,0-3.63-1.63-3.63-3.63V82.02C95.11,80.02,96.75,78.39,98.74,78.39L98.74,78.39L98.74,78.39z"
                      />
                    </g>
                  </svg>
                ),
                children: [
                  {
                    title: t("MAIN_CATEGORY.TITLE"),
                    route: FULL_PATH_ROUTES.adminCategoriesMainCategory,
                  },
                  {
                    title: t("SUB_CATEGORY.TITLE"),
                    route: FULL_PATH_ROUTES.adminCategoriesSubCategory,
                  },
                  {
                    title: t("CHILD_CATEGORY.TITLE"),
                    route: FULL_PATH_ROUTES.adminCategoriesChildCategory,
                  },
                  {
                    title: t("SUB_CHILD_CATEGORY.TITLE"),
                    route: FULL_PATH_ROUTES.adminCategoriesSubChildCategory,
                  },
                ],
              },
              {
                title: t("USERS.TITLE"),
                route: "#",
                conditionRoute: ROUTES.users,
                icon: (
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      className={`fill-current ${
                        newPathName.includes(ROUTES.users)
                          ? "text-indigo-500"
                          : "text-slate-600"
                      }`}
                      d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                    />
                    <path
                      className={`fill-current ${
                        newPathName.includes(ROUTES.users)
                          ? "text-indigo-300"
                          : "text-slate-400"
                      }`}
                      d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                    />
                  </svg>
                ),
                children: [
                  {
                    title: t("USERS.TITLE"),
                    route: FULL_PATH_ROUTES.adminUsers,
                  },
                  {
                    title: t("COMMON.MEASUREMENT_TYPES"),
                    route: FULL_PATH_ROUTES.adminUsersMeasurementType,
                  },
                ],
              },
              {
                title: t("COMMON.WHOLE_SALERS"),
                route: FULL_PATH_ROUTES.adminWholeSaler,
                conditionRoute: ROUTES.wholeSaler,
                icon: (
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      className={`fill-current ${
                        newPathName.includes(ROUTES.wholeSaler)
                          ? "text-indigo-500"
                          : "text-slate-600"
                      }`}
                      d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                    />
                    <path
                      className={`fill-current ${
                        newPathName.includes(ROUTES.wholeSaler)
                          ? "text-indigo-300"
                          : "text-slate-400"
                      }`}
                      d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                    />
                  </svg>
                ),
              },
              {
                title: t("COMMON.LOOKBOOK"),
                route: FULL_PATH_ROUTES.adminLookbook,
                conditionRoute: ROUTES.lookbook,
                icon: (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 101.37"
                    className={`fill-current shrink-0 h-6 w-6 ${
                      newPathName.includes(ROUTES.lookbook)
                        ? "text-indigo-500"
                        : "text-slate-600"
                    }`}
                  >
                    <g>
                      <path d="M12.64,77.27l0.31-54.92h-6.2v69.88c8.52-2.2,17.07-3.6,25.68-3.66c7.95-0.05,15.9,1.06,23.87,3.76 c-4.95-4.01-10.47-6.96-16.36-8.88c-7.42-2.42-15.44-3.22-23.66-2.52c-1.86,0.15-3.48-1.23-3.64-3.08 C12.62,77.65,12.62,77.46,12.64,77.27L12.64,77.27z M103.62,19.48c-0.02-0.16-0.04-0.33-0.04-0.51c0-0.17,0.01-0.34,0.04-0.51V7.34 c-7.8-0.74-15.84,0.12-22.86,2.78c-6.56,2.49-12.22,6.58-15.9,12.44V85.9c5.72-3.82,11.57-6.96,17.58-9.1 c6.85-2.44,13.89-3.6,21.18-3.02V19.48L103.62,19.48z M110.37,15.6h9.14c1.86,0,3.37,1.51,3.37,3.37v77.66 c0,1.86-1.51,3.37-3.37,3.37c-0.38,0-0.75-0.06-1.09-0.18c-9.4-2.69-18.74-4.48-27.99-4.54c-9.02-0.06-18.03,1.53-27.08,5.52 c-0.56,0.37-1.23,0.57-1.92,0.56c-0.68,0.01-1.35-0.19-1.92-0.56c-9.04-4-18.06-5.58-27.08-5.52c-9.25,0.06-18.58,1.85-27.99,4.54 c-0.34,0.12-0.71,0.18-1.09,0.18C1.51,100.01,0,98.5,0,96.64V18.97c0-1.86,1.51-3.37,3.37-3.37h9.61l0.06-11.26 c0.01-1.62,1.15-2.96,2.68-3.28l0,0c8.87-1.85,19.65-1.39,29.1,2.23c6.53,2.5,12.46,6.49,16.79,12.25 c4.37-5.37,10.21-9.23,16.78-11.72c8.98-3.41,19.34-4.23,29.09-2.8c1.68,0.24,2.88,1.69,2.88,3.33h0V15.6L110.37,15.6z M68.13,91.82c7.45-2.34,14.89-3.3,22.33-3.26c8.61,0.05,17.16,1.46,25.68,3.66V22.35h-5.77v55.22c0,1.86-1.51,3.37-3.37,3.37 c-0.27,0-0.53-0.03-0.78-0.09c-7.38-1.16-14.53-0.2-21.51,2.29C79.09,85.15,73.57,88.15,68.13,91.82L68.13,91.82z M58.12,85.25 V22.46c-3.53-6.23-9.24-10.4-15.69-12.87c-7.31-2.8-15.52-3.43-22.68-2.41l-0.38,66.81c7.81-0.28,15.45,0.71,22.64,3.06 C47.73,78.91,53.15,81.64,58.12,85.25L58.12,85.25z" />
                    </g>
                  </svg>
                ),
              },
              {
                title: t("CONTACT_US.TITLE"),
                route: FULL_PATH_ROUTES.adminContactUs,
                conditionRoute: ROUTES.contactUs,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    className={`fill-current shrink-0 h-6 w-6 ${
                      newPathName.includes(ROUTES.contactUs)
                        ? "text-indigo-500"
                        : "text-slate-600"
                    }`}
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 513.07 515.83"
                  >
                    <path d="M65.79 0h301.26c36.19 0 65.79 29.63 65.79 65.79v384.26c0 36.15-29.63 65.78-65.79 65.78H65.79C29.63 515.83 0 486.23 0 450.05V65.79C0 29.6 29.6 0 65.79 0zm386.16 337.23h46.62c1.76 0 3.42.29 5.06.87 2.13.75 3.86 1.84 5.29 3.27l-.01.01c1.48 1.46 2.58 3.23 3.28 5.25h-.01l.01.04c.58 1.67.88 3.38.88 5.06v67.94c0 1.18-.16 2.36-.48 3.56-.08.32-.17.65-.28.99-.66 1.97-1.72 3.68-3.14 5.11a13.582 13.582 0 01-3.5 2.55c-1.84.93-3.75 1.39-5.72 1.39h-48v-96.04zm0-254.67h46.63c2.17 0 4.2.47 6.15 1.38 2.21 1.04 3.93 2.47 5.29 4.29l-.03.02c1.05 1.41 1.84 2.88 2.35 4.49l-.05.01c.52 1.61.78 3.19.78 4.79v68.04c0 1.47-.27 2.94-.82 4.37-.2.58-.46 1.15-.76 1.71-.82 1.5-1.96 2.87-3.42 4-.75.61-1.55 1.12-2.39 1.55l-.01-.01-.04.01c-1.85.93-3.74 1.4-5.67 1.4h-48.01V82.56zm0 126.07l46.62.01c2.2 0 4.24.46 6.2 1.38l-.01.02c2.19 1.03 3.9 2.45 5.26 4.26l-.03.02c.92 1.24 1.63 2.51 2.12 3.82.64 1.7.96 3.39.96 5.07v68.44c0 1.97-.46 3.87-1.4 5.72a13.33 13.33 0 01-2.51 3.49l-.02-.02c-1.1 1.09-2.27 1.95-3.51 2.57l-.03-.04c-1.85.93-3.73 1.39-5.65 1.39h-48v-96.13zm-291.62 43.29c-4.91-7.72-14.06-18.32-14.06-27.5.22-6.08 4.16-11.41 9.91-13.41-.45-7.72-.76-15.59-.76-23.38 0-4.6 0-9.24.26-13.8.24-2.89.76-5.75 1.55-8.55a49.153 49.153 0 0121.95-27.88 64.81 64.81 0 0111.91-5.7c7.6-2.73 3.84-15.43 12.11-15.6 19.32-.5 51.08 17.18 63.47 30.6a49.034 49.034 0 0112.66 31.78l-.79 33.84c3.71.77 6.78 3.38 8.13 6.93 2.64 10.7-8.44 23.97-13.59 32.48-4.76 7.84-22.92 33.19-22.92 33.36 2.57 38.29 90.7 8.29 90.7 89.18H91.98c0-79.02 92.03-53.54 91.08-89.25 0-.5-20.87-30.02-22.73-33v-.1z" />
                  </svg>

                  // <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  //   <path
                  //     className={`fill-current ${
                  //       newPathName.includes(ROUTES.contactUs)
                  //         ? "text-indigo-500"
                  //         : "text-slate-600"
                  //     }`}
                  //     d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                  //   />
                  //   <path
                  //     className={`fill-current ${
                  //       newPathName.includes(ROUTES.contactUs)
                  //         ? "text-indigo-300"
                  //         : "text-slate-400"
                  //     }`}
                  //     d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                  //   />
                  // </svg>
                ),
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <div className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className="flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Logo />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          {links.map(({ title, children }, index) => {
            return (
              <div key={`${title}-${index}`}>
                <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                  <span
                    className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                    aria-hidden="true"
                  >
                    •••
                  </span>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    {title}
                  </span>
                </h3>
                <ul className="mt-3">
                  {/* Dashboard */}
                  {children.map(
                    (
                      { title, children, route, conditionRoute, icon },
                      subChildIndex
                    ) => {
                      const isOpen = newPathName.includes(conditionRoute);
                      if (route !== "#") {
                        const isOpen =
                          newPathName === route ||
                          newPathName.startsWith(route);
                        return (
                          <li
                            className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 group is-link-group ${
                              isOpen && "text-indigo-600"
                            }`}
                            key={`${title}-${index}-${subChildIndex}`}
                          >
                            <SidebarLink href={route}>
                              <div className="flex items-center gap-3">
                                {icon}
                                <span
                                  className={clsx(
                                    "text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200",
                                    {
                                      "text-indigo-600": isOpen,
                                    }
                                  )}
                                >
                                  {title}
                                </span>
                              </div>
                            </SidebarLink>
                          </li>
                        );
                      }

                      return (
                        <SidebarLinkGroup
                          open={isOpen}
                          key={`${title}-${index}-${subChildIndex}`}
                        >
                          {(handleClick, open) => {
                            return (
                              <>
                                <a
                                  href="#0"
                                  className={`block text-slate-200 truncate transition duration-150 ${
                                    isOpen
                                      ? "hover:text-slate-200"
                                      : "hover:text-white"
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    expandOnly
                                      ? setSidebarExpanded(true)
                                      : handleClick();
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      {icon}
                                      <span
                                        className={clsx(
                                          "text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200",
                                          {
                                            "text-indigo-600": isOpen,
                                            "text-slate-400  hover:text-slate-200":
                                              !isOpen,
                                          }
                                        )}
                                      >
                                        {title}
                                      </span>
                                    </div>
                                    {/* Icon */}
                                    <div className="flex shrink-0 ml-2">
                                      <svg
                                        className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                          open && "rotate-180"
                                        }`}
                                        viewBox="0 0 12 12"
                                      >
                                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>

                                {!!children?.length && (
                                  <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                    <ul
                                      className={`pl-9 mt-1 ${
                                        !open && "hidden"
                                      }`}
                                    >
                                      {children?.map(
                                        ({ title, route }, childIndex) => {
                                          const isOpen =
                                            newPathName === route ||
                                            newPathName.startsWith(route);
                                          return (
                                            <li
                                              className="mb-1 last:mb-0"
                                              key={`${title}-${index}-${subChildIndex}-${childIndex}`}
                                            >
                                              <SidebarLink href={route}>
                                                <span
                                                  className={clsx(
                                                    "text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200",
                                                    {
                                                      "text-indigo-600": isOpen,
                                                    }
                                                  )}
                                                >
                                                  {title}
                                                </span>
                                              </SidebarLink>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </>
                            );
                          }}
                        </SidebarLinkGroup>
                      );
                    }
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
