import { FittingSizeOptionAllocations, ListComponent } from "@/components";
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
import {
  getFittingSizesList,
  getProductTypeList,
  getStepTypesList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("FITTING_SIZE_OPTION_ALLOCATION");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
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
  { accessor: "value", header: "COMMON.VALUE", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  {
    accessor: "_id",
    header: "COMMON.ACTION",
    cellType: "action",
    showDeleteBtn: true,
  },
];

export default async function Page() {
  const [productTypeListResult, fittingSizeListResult] =
    await Promise.allSettled([getProductTypeList(), getFittingSizesList()]);

  const productTypeData =
    productTypeListResult.status === "fulfilled"
      ? productTypeListResult.value
      : null;
  const fittingSizeData =
    fittingSizeListResult.status === "fulfilled"
      ? fittingSizeListResult.value
      : null;
  const productTypeId = productTypeData?.[0]?.value;
  const stepTypes = await getStepTypesList(productTypeId);

  return (
    <>
      <ListComponent
        fetchUrl={FITTING_SIZE_OPTION_ALLOCATION_LIST_URL}
        statusUrl={FITTING_SIZE_OPTION_ALLOCATION_STATUS_URL}
        pageRoute={FULL_PATH_ROUTES.yarnFittingFittingOptionAllocation}
        searchPlaceholder="COMMON.SEARCH_BY_VALUE"
        title="FITTING_SIZE_OPTION_ALLOCATION.TITLE"
        columnConfigs={columnConfigs}
        deleteUrl={FITTING_SIZE_OPTION_ALLOCATION_GET_URL}
        showLanguageFilter
        customFilters={[
          {
            component: FittingSizeOptionAllocations,
            props: {
              fittingSizes: fittingSizeData,
              stepTypes: stepTypes,
              productTypeId: productTypeId,
            },
          },
        ]}
      />
    </>
  );
}
