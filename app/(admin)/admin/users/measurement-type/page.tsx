import { DefaultLayout } from "@/components";
import { Viewport } from "next";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getTranslations } from "next-intl/server";
import PageComponent from "./page-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MEASUREMENT_TYPE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

export default async function List() {
  return (
    <DefaultLayout>
      <PageComponent />
    </DefaultLayout>
  );
}
