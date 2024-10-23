import { DefaultLayout } from "@/components";
import { Viewport } from "next";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import PageComponent from "./page-component";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("WHOLE_SALER");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

export default async function Dashboard() {
  return (
    <DefaultLayout>
      <PageComponent />
    </DefaultLayout>
  );
}
