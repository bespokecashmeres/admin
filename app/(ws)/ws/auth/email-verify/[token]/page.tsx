import React from "react";
import EmailVerifyComponent from "./page-component";
import { EMAIL_VERIFY_URL } from "@/constants/apis";
import { handleApiCall } from "@/utils/common.utils";
import { Viewport } from "next";
import { generateAdminPageMetadata, viewportData } from "@/utils/generateMetaData.util";
import { getTranslations } from "next-intl/server";

interface PostPageProps {
  params: {
    token: string;
  };
}

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("EMAIL_VERIFY");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}


const EmailVerify = async ({ params }: PostPageProps) => {
  const { token } = params;

  const res = await handleApiCall(
    EMAIL_VERIFY_URL,
    "POST",
    null,
    { Authorization: token },
    false
  );

  return <EmailVerifyComponent result={res} />;
};

export default EmailVerify;
