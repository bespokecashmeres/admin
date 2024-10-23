import { SetNewPasswordComponent } from "@/components";
import { generateAdminPageMetadata, viewportData } from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SET_NEW_PASSWORD");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const SetNewPassword: React.FC<{ params: { token: string } }> = async ({
  params,
}) => {
  return <SetNewPasswordComponent token={params.token} />;
};

export default SetNewPassword;
