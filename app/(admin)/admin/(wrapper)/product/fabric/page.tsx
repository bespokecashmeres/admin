import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES, ROUTES } from "@/constants";
import { FABRICS_LIST_URL, FABRICS_STATUS_URL } from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("FABRIC");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "fabricId", header: "COMMON.FABRIC_ID", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={FABRICS_LIST_URL}
      statusUrl={FABRICS_STATUS_URL}
      pageRoute={FULL_PATH_ROUTES.productFabric}
      searchPlaceholder="COMMON.SEARCH"
      title="FABRIC.TITLE"
      columnConfigs={columnConfigs}
      showLanguageFilter
    />
  );
}
