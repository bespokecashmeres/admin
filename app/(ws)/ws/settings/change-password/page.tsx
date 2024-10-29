import { ChangePasswordPage } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("COMMON");
  const title = t("CHANGE_PASSWORD");
  return generateAdminPageMetadata({ title });
}

const ChangePassword = async () => {
  return <ChangePasswordPage />;
};

export default ChangePassword;
