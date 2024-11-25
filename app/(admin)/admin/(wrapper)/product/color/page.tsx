import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import { COLOR_LIST_URL, COLOR_STATUS_URL } from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("COLOR");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  {
    accessor: "code",
    header: "COMMON.CODE",
    cellType: "default",
    showCopyButton: true,
  },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={COLOR_LIST_URL}
      statusUrl={COLOR_STATUS_URL}
      pageRoute={FULL_PATH_ROUTES.productColor}
      searchPlaceholder="COMMON.SEARCH"
      title="COLOR.TITLE"
      columnConfigs={columnConfigs}
      showLanguageFilter
    />
  );
}
