"use client";

import { COOKIES, FULL_PATH_ROUTES } from "@/constants";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PageComponent = () => {
  const t = useTranslations();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      const sessionData: any = session;
      Cookies.set(COOKIES.aToken, sessionData?.accessToken);
      Cookies.set(COOKIES.admin, sessionData?.userData);
      router.push(FULL_PATH_ROUTES.adminDashboard);
    }
  }, [session]);

  return <div>{t("COMMON.LOADING")}...</div>;
};

export default PageComponent;
