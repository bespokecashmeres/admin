import { ListComponent } from "@/components";
import { ROUTES } from "@/constants";
import {
  MAIN_CATEGORY_LIST_URL,
  MAIN_CATEGORY_ROW_REORDER_URL,
  MAIN_CATEGORY_STATUS_URL
} from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MAIN_CATEGORY");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "image", header: "COMMON.IMAGE", cellType: "image" },
  { accessor: "slug", header: "COMMON.SLUG", cellType: "default" },
  {
    accessor: "gender",
    header: "COMMON.GENDER",
    cellType: "default",
    shouldTranslate: true,
  },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={MAIN_CATEGORY_LIST_URL}
      statusUrl={MAIN_CATEGORY_STATUS_URL}
      pageRoute={`${ROUTES.categories}/${ROUTES.mainCategory}`}
      searchPlaceholder="COMMON.SEARCH"
      title="MAIN_CATEGORY.TITLE"
      columnConfigs={columnConfigs}
      reorderUrl={MAIN_CATEGORY_ROW_REORDER_URL}
      showReorder
      showLanguageFilter
    />
  );
}
