"use client";

import { useEffect, useRef, useState } from "react";
import { useAppProvider } from "@/app/app-provider";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { Transition } from "@headlessui/react";
import { getBreakpoint } from "../utils/utils";
import SidebarLinkGroup from "./sidebar-link-group";
import SidebarLink from "./sidebar-link";
import Logo from "./logo";
import clsx from "clsx";

export default function Sidebar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  let newPathName = pathname;
  if (newPathName.endsWith("/")) {
    newPathName = newPathName.slice(0, -1);
  }
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
          title: "Dashboard",
          route: "/admin/dashboard",
          conditionRoute: "dashboard",
          icon: (
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current ${
                  newPathName.includes("/dashboard")
                    ? "text-indigo-500"
                    : "text-slate-400"
                }`}
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
              />
              <path
                className={`fill-current ${
                  newPathName.includes("/dashboard")
                    ? "text-indigo-600"
                    : "text-slate-600"
                }`}
                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
              />
              <path
                className={`fill-current ${
                  newPathName.includes("/dashboard")
                    ? "text-indigo-200"
                    : "text-slate-400"
                }`}
                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
              />
            </svg>
          ),
        },
        {
          title: "Manage Users",
          route: "#",
          conditionRoute: "manage-users",
          icon: (
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current ${
                  newPathName.includes("manage-users")
                    ? "text-indigo-500"
                    : "text-slate-600"
                }`}
                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
              />
              <path
                className={`fill-current ${
                  newPathName.includes("manage-users")
                    ? "text-indigo-300"
                    : "text-slate-400"
                }`}
                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
              />
            </svg>
          ),
          children: [
            {
              title: "Users",
              route: "/admin/manage-users/users",
            },
            {
              title: "Whole Saler",
              route: "/admin/manage-users/whole-saler",
            },
          ],
        },
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
                        const isOpen = newPathName === route;
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
                                          const isOpen = newPathName === route;
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
