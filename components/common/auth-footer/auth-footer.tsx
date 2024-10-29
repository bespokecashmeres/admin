"use client";

import { ROUTES } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthFooter = ({
  message,
  linkLabel,
  path,
}: {
  message: string;
  linkLabel: string;
  path: typeof ROUTES.signin | typeof ROUTES.signup;
}) => {
  const pathname = usePathname();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  return (
    <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
      <div className="text-sm">
        {message}{" "}
        <Link
          className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
          href={`/${isAdmin ? ROUTES.admin : ROUTES.ws}/${ROUTES.auth}/${path}`}
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};

export default AuthFooter;
