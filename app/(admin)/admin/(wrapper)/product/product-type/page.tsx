import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES, ROUTES } from "@/constants";
import { FABRICS_LIST_URL, FABRICS_STATUS_URL, PRODUCT_TYPE_LIST_URL, PRODUCT_TYPE_STATUS_URL } from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("PRODUCT_TYPE");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={PRODUCT_TYPE_LIST_URL}
      statusUrl={PRODUCT_TYPE_STATUS_URL}
      pageRoute={FULL_PATH_ROUTES.productProductType}
      searchPlaceholder="COMMON.SEARCH"
      title="PRODUCT_TYPE.TITLE"
      columnConfigs={columnConfigs}
      showLanguageFilter
    />
  );
}
