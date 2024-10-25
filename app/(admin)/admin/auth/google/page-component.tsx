"use client";

import { LOCAL_STORAGE, ROUTES } from "@/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PageComponent = () => {
  const { data: session } = useSession();
  console.log("session: ", session);
  const router = useRouter();
  useEffect(() => {
    console.log("session: ", session);
    if (session) {
      const sessionData: any = session;
      localStorage.setItem(LOCAL_STORAGE.aToken, sessionData?.accessToken);
      localStorage.setItem(LOCAL_STORAGE.admin, sessionData?.userData);
      router.push(`/${ROUTES.admin}/${ROUTES.dashboard}`);
    }
  }, [session]);

  return <div>Loading...</div>;
};

export default PageComponent;
