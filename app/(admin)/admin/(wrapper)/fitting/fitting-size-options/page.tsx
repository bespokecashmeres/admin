import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  FITTING_SIZE_OPTIONS_LIST_URL,
  FITTING_SIZE_OPTIONS_ROW_REORDER_URL,
  FITTING_SIZE_OPTIONS_STATUS_URL,
} from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("FITTING_SIZE_OPTIONS");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  {
    accessor: "fittingSize",
    header: "COMMON.FITTING_SIZE",
    cellType: "default",
  },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default async function Page() {
  return (
    <>
      <ListComponent
        fetchUrl={FITTING_SIZE_OPTIONS_LIST_URL}
        statusUrl={FITTING_SIZE_OPTIONS_STATUS_URL}
        pageRoute={FULL_PATH_ROUTES.yarnFittingFittingOptionSizes}
        searchPlaceholder="COMMON.SEARCH"
        title="FITTING_SIZE_OPTIONS.TITLE"
        columnConfigs={columnConfigs}
        showLanguageFilter
        showReorder
        reorderUrl={FITTING_SIZE_OPTIONS_ROW_REORDER_URL}
      />
    </>
  );
}
