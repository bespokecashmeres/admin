import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES, ROUTES } from "@/constants";
import { SIZE_LIST_URL, SIZE_STATUS_URL } from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIZE");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  {
    accessor: "productType",
    header: "COMMON.PRODUCT_TYPE",
    cellType: "default",
  },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={SIZE_LIST_URL}
      statusUrl={SIZE_STATUS_URL}
      pageRoute={FULL_PATH_ROUTES.productSize}
      searchPlaceholder="COMMON.SEARCH"
      title="SIZE.TITLE"
      columnConfigs={columnConfigs}
      showLanguageFilter
    />
  );
}
