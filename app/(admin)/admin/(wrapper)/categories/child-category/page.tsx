import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES, ROUTES } from "@/constants";
import {
  CHILD_CATEGORY_LIST_URL,
  CHILD_CATEGORY_ROW_REORDER_URL,
  CHILD_CATEGORY_STATUS_URL
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
  const t = await getTranslations("CHILD_CATEGORY");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  {
    accessor: "mainCategory",
    header: "MAIN_CATEGORY.TITLE",
    cellType: "default",
  },
  {
    accessor: "subCategory",
    header: "SUB_CATEGORY.TITLE",
    cellType: "default",
  },
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
      fetchUrl={CHILD_CATEGORY_LIST_URL}
      statusUrl={CHILD_CATEGORY_STATUS_URL}
      pageRoute={FULL_PATH_ROUTES.categoriesChildCategory}
      searchPlaceholder="COMMON.SEARCH"
      title="CHILD_CATEGORY.TITLE"
      columnConfigs={columnConfigs}
      reorderUrl={CHILD_CATEGORY_ROW_REORDER_URL}
      showReorder
      showLanguageFilter
    />
  );
}
