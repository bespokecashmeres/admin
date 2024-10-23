"use client";

import React from "react";
import { AuthFooter } from "../auth-footer";
import { ROUTES } from "@/constants";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const SignInFooter = () => {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    pathname.includes(`${ROUTES.ws}`) && (
      <AuthFooter
        linkLabel={t("SIGNUP.TITLE")}
        message={`${t("SIGNIN.DONT_HAVE_AN_ACCOUNT")}?`}
        path={ROUTES.signup}
      />
    )
  );
};

export default SignInFooter;
