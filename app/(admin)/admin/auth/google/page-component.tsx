"use client";

import { FULL_PATH_ROUTES, LOCAL_STORAGE, ROUTES } from "@/constants";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PageComponent = () => {
  const t = useTranslations();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      const sessionData: any = session;
      localStorage.setItem(LOCAL_STORAGE.aToken, sessionData?.accessToken);
      localStorage.setItem(LOCAL_STORAGE.admin, sessionData?.userData);
      router.push(FULL_PATH_ROUTES.adminDashboard);
    }
  }, [session]);

  return <div>{t("COMMON.LOADING")}...</div>;
};

export default PageComponent;
