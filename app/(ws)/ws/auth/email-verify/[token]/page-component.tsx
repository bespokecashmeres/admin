"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import NotFoundImage from "@/public/images/404-illustration.svg";
import NotFoundImageDark from "@/public/images/404-illustration-dark.svg";
import Link from "next/link";
import { MESSAGES, ROUTES } from "@/constants";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const EmailVerifyComponent = ({ result }: { result: any }) => {
  const t = useTranslations();

  useEffect(() => {
    if (result?.success) {
      toast.success(result?.message || t(MESSAGES.SUCCESS));
    } else {
      toast.error(
        result?.message || t("EMAIL_VERIFY.VERIFICATION_LINK_EXPIRE_MESSAGE")
      );
    }
  }, [result]);

  return (
    <main className="grow [&>*:first-child]:scroll-mt-16">
      <div className="relative bg-white dark:bg-slate-900 h-full">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
          <div className="max-w-2xl m-auto mt-16">
            <div className="text-center px-4">
              <div className="inline-flex mb-8">
                <Image
                  className="dark:hidden"
                  src={NotFoundImage}
                  width={176}
                  height={176}
                  alt="404 illustration"
                />
                <Image
                  className="hidden dark:block"
                  src={NotFoundImageDark}
                  width={176}
                  height={176}
                  alt="404 illustration dark"
                />
              </div>
              <div className="mb-6">
                {t("EMAIL_VERIFY.EMAIL_VERIFIED_MESSAGE")}!
              </div>
              <Link
                href={`/${ROUTES.ws}/${ROUTES.auth}/${ROUTES.signin}`}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                {t("COMMON.BACK_TO_LOGIN")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmailVerifyComponent;
