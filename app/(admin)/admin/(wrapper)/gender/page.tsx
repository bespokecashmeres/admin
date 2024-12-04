import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  GENDER_LIST_URL,
  GENDER_STATUS_URL,
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
  const t = await getTranslations("GENDER");
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
        fetchUrl={GENDER_LIST_URL}
        statusUrl={GENDER_STATUS_URL}
        pageRoute={FULL_PATH_ROUTES.yarnGender}
        searchPlaceholder="COMMON.SEARCH"
        title="GENDER.TITLE"
        columnConfigs={columnConfigs}
        showLanguageFilter
      />
    </>
  );
}
