import { FittingSizeOptions, ListComponent } from "@/components";
import CONFIG from "@/config";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  SIZE_MEASUREMENT_FIELDS_GET_URL,
  SIZE_MEASUREMENT_FIELDS_LIST_URL,
  SIZE_MEASUREMENT_FIELDS_ROW_REORDER_URL,
  SIZE_MEASUREMENT_FIELDS_STATUS_URL,
  SIZE_MEASUREMENT_GET_URL,
} from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getFittingSizesList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIZE_MEASUREMENT_FIELDS");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action", showDeleteBtn: CONFIG.developmentMode },
];

export default async function Page() {
  return (
    <>
      <ListComponent
        fetchUrl={SIZE_MEASUREMENT_FIELDS_LIST_URL}
        statusUrl={SIZE_MEASUREMENT_FIELDS_STATUS_URL}
        deleteUrl={SIZE_MEASUREMENT_FIELDS_GET_URL}
        pageRoute={FULL_PATH_ROUTES.sizeMeasurementFields}
        searchPlaceholder="COMMON.SEARCH_BY_NAME"
        title="SIZE_MEASUREMENT_FIELDS.TITLE"
        columnConfigs={columnConfigs}
        showLanguageFilter
        showReorder
        reorderUrl={SIZE_MEASUREMENT_FIELDS_ROW_REORDER_URL}
      />
    </>
  );
}
