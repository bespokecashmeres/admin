"use client";

import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { MESSAGES, ROUTES } from "@/constants";
import { setLoadingState } from "@/framework/redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { SIGNOUT_API_URL } from "@/constants/apis";
import toast from "react-hot-toast";
import {
  clearLocalStorageTokenAndData,
  getAWSImageUrl,
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { CommonSliceTypes } from "@/types/redux";
import UserProfile from "./user-profile";
import { useMemo } from "react";

export default function DropdownProfile({
  align,
}: {
  align?: "left" | "right";
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const userData = useSelector(
    (state: CommonSliceTypes) => state.common[isAdmin ? "adminUser" : "wsUser"]
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      dispatch(setLoadingState(true));
      const logoutResponse = await (isAdmin
        ? adminAxiosInstance
        : wsAxiosInstance
      ).get(SIGNOUT_API_URL);
      if (logoutResponse.data.success) {
        clearLocalStorageTokenAndData();
        toast.success(logoutResponse.data.message || t(MESSAGES.SUCCESS));
        router.push(
          `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.auth}/${ROUTES.signin}`
        );
      } else {
        toast.error(
          logoutResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  const url = userData?.profile_picture ?? "";
  const profileUrl = useMemo(
    () =>
      url?.startsWith("https://") ? url : url.length ? getAWSImageUrl(url) : "",
    [url]
  );

  return (
    <Menu as="div" className="relative inline-flex">
      <Menu.Button className="inline-flex justify-center items-center group">
        <UserProfile
          firstName={userData?.first_name}
          lastName={userData?.last_name}
          profile={profileUrl}
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
            {userData?.first_name}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </Menu.Button>
      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-[11rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {userData?.first_name} {userData?.last_name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 italic">
            {t(`COMMON.${isAdmin ? "ADMIN" : "WHOLE_SALER"}`)}
          </div>
        </div>
        <Menu.Items as="ul" className="focus:outline-none">
          <Menu.Item as="li">
            {({ active }) => (
              <Link
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active ||
                  pathname ===
                    `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.settings}/${
                      ROUTES.account
                    }/`
                    ? "text-indigo-600 bg-indigo-200"
                    : "text-indigo-500"
                }`}
                href={`/${ROUTES[isAdmin ? "admin" : "ws"]}/${
                  ROUTES.settings
                }/${ROUTES.account}`}
              >
                {t("COMMON.SETTINGS")}
              </Link>
            )}
          </Menu.Item>
          <Menu.Item as="li">
            {({ active }) => (
              <button
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-indigo-500"
                }`}
                onClick={handleSignout}
              >
                {t("COMMON.SIGNOUT")}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
