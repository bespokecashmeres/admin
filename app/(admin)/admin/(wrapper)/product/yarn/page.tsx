import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import { YARN_LIST_URL, YARN_STATUS_URL } from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("YARN");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "yarnId", header: "COMMON.YARN_ID", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={YARN_LIST_URL}
      statusUrl={YARN_STATUS_URL}
      pageRoute={FULL_PATH_ROUTES.productYarn}
      searchPlaceholder="COMMON.SEARCH"
      title="YARN.TITLE"
      columnConfigs={columnConfigs}
      showLanguageFilter
    />
  );
}