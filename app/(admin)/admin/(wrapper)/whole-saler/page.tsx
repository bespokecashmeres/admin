import { ListComponent } from "@/components";
import { Viewport } from "next";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { getTranslations } from "next-intl/server";
import { ADMIN_WHOLE_SALER_STATUS_UPDATE_URL, ADMIN_WHOLE_SALER_URL } from "@/constants/apis";
import { ROUTES } from "@/constants";
import { ColumnConfig } from "@/types/index";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("WHOLE_SALER");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "first_name", header: "COMMON.FIRST_NAME", cellType: "default" },
  { accessor: "middle_name", header: "COMMON.MIDDLE_NAME", cellType: "default" },
  { accessor: "last_name", header: "COMMON.LAST_NAME", cellType: "default" },
  { accessor: "email", header: "COMMON.EMAIL_ADDRESS", cellType: "default" },
  { accessor: "mobile_number", header: "COMMON.MOBILE_NUMBER", cellType: "phone" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" }
];

export default async function Dashboard() {
  return (
      <ListComponent
        fetchUrl={ADMIN_WHOLE_SALER_URL}
        statusUrl={ADMIN_WHOLE_SALER_STATUS_UPDATE_URL}
        pageRoute={`${ROUTES.wholeSaler}`}
        searchPlaceholder="COMMON.SEARCH"
        title="WHOLE_SALER.TITLE"
        columnConfigs={columnConfigs}
      />
  );
}
