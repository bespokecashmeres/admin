import { SignupComponent } from "@/components";
import { generateAdminPageMetadata, viewportData } from "@/utils/generateMetaData.util";
import { getCountryList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIGNUP");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

export default async function SignUp() {
  const filteredRes: any = await getCountryList();

  return <SignupComponent countries={filteredRes} />;
}
