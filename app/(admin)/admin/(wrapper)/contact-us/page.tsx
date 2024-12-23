import { ListComponent } from "@/components";
import {
  PRE_USER_REGISTRATION_GET_URL,
  PRE_USER_REGISTRATION_LIST_URL
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
  const t = await getTranslations("CONTACT_US");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "first_name", header: "COMMON.FIRST_NAME", cellType: "default" },
  { accessor: "last_name", header: "COMMON.LAST_NAME", cellType: "default" },
  { accessor: "email", header: "COMMON.EMAIL_ADDRESS", cellType: "default" },
  { accessor: "mobile_number", header: "COMMON.MOBILE_NUMBER", cellType: "default" },
  {
    accessor: "gender",
    header: "COMMON.GENDER",
    cellType: "default",
  },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action", showDeleteBtn: true, hideEditBtn: true },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={PRE_USER_REGISTRATION_LIST_URL}
      deleteUrl={PRE_USER_REGISTRATION_GET_URL}
      searchPlaceholder="COMMON.SEARCH"
      title="CONTACT_US.TITLE"
      columnConfigs={columnConfigs}
      showStatusFilter={false}
    />
  );
}
