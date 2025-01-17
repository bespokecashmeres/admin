import { ListComponent } from "@/components";
import { Viewport } from "next";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { getTranslations } from "next-intl/server";
import { MEASUREMENT_TYPE_LIST_URL, MEASUREMENT_TYPE_STATUS_URL } from "@/constants/apis";
import { FULL_PATH_ROUTES, ROUTES } from "@/constants";
import { ColumnConfig } from "@/types/index";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MEASUREMENT_TYPE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" }
];


export default async function List() {
  return (
      <ListComponent
        fetchUrl={MEASUREMENT_TYPE_LIST_URL}
        statusUrl={MEASUREMENT_TYPE_STATUS_URL}
        pageRoute={FULL_PATH_ROUTES.usersMeasurementType}
        searchPlaceholder="COMMON.SEARCH"
        title="MEASUREMENT_TYPE.TITLE"
        columnConfigs={columnConfigs}
      />
  );
}
