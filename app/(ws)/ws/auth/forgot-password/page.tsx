import { ForgotPasswordComponent } from "@/components";
import { generateAdminPageMetadata, viewportData } from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("FORGOT_PASSWORD");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}


export default function ForgotPassword() {
  return <ForgotPasswordComponent />;
}
