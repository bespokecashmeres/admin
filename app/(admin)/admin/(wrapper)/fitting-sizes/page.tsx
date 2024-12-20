import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  FITTING_SIZES_LIST_URL,
  FITTING_SIZES_STATUS_URL,
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
  const t = await getTranslations("FITTING_SIZES");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default async function Page() {
  return (
    <>
      <ListComponent
        fetchUrl={FITTING_SIZES_LIST_URL}
        statusUrl={FITTING_SIZES_STATUS_URL}
        pageRoute={FULL_PATH_ROUTES.yarnFittingSizes}
        searchPlaceholder="COMMON.SEARCH"
        title="FITTING_SIZES.TITLE"
        columnConfigs={columnConfigs}
        showLanguageFilter
      />
    </>
  );
}
