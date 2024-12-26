import { ListComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  FITTING_SIZE_OPTION_ALLOCATION_GET_URL,
  FITTING_SIZE_OPTION_ALLOCATION_LIST_URL,
  FITTING_SIZE_OPTION_ALLOCATION_STATUS_URL,
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
  const t = await getTranslations("FITTING_SIZE_OPTION_ALLOCATION");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "value", header: "COMMON.VALUE", cellType: "default" },
  {
    accessor: "stepType",
    header: "COMMON.STEP_TYPE",
    cellType: "default",
  },
  {
    accessor: "stepCard",
    header: "COMMON.STEP_CARD",
    cellType: "default",
  },
  {
    accessor: "fittingSize",
    header: "COMMON.FITTING_SIZE",
    cellType: "default",
  },
  {
    accessor: "fittingSizeOption",
    header: "COMMON.FITTING_SIZE_OPTION",
    cellType: "default",
  },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action", showDeleteBtn: true },
];

export default async function Page() {
  return (
    <>
      <ListComponent
        fetchUrl={FITTING_SIZE_OPTION_ALLOCATION_LIST_URL}
        statusUrl={FITTING_SIZE_OPTION_ALLOCATION_STATUS_URL}
        pageRoute={FULL_PATH_ROUTES.yarnFittingFittingOptionAllocation}
        searchPlaceholder="COMMON.SEARCH"
        title="FITTING_SIZE_OPTION_ALLOCATION.TITLE"
        columnConfigs={columnConfigs}
        deleteUrl={FITTING_SIZE_OPTION_ALLOCATION_GET_URL}
      />
    </>
  );
}
