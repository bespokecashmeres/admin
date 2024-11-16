import { AccountPage } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("COMMON");
  const title = t("ACCOUNT");
  return generateAdminPageMetadata({ title });
}

const Account = async () => {
  return <AccountPage />;
};

export default Account;
