"use client";
import React, { useEffect } from "react";
import { FULL_PATH_ROUTES, LOCAL_STORAGE, ROUTES } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header/header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes(`/${ROUTES.ws}`)) {
      const wToken = localStorage.getItem(LOCAL_STORAGE.wToken);
      if (!wToken) {
        router.replace(FULL_PATH_ROUTES.wsAuthSignin);
      }
      return;
    }

    const aToken = localStorage.getItem(LOCAL_STORAGE.aToken);
    if (!aToken) {
      router.replace(FULL_PATH_ROUTES.adminAuthSignin);
    }
  }, [pathname]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />

        <main className="grow [&>*:first-child]:scroll-mt-16">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
