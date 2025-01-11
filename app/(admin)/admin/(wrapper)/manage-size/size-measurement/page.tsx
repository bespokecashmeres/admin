import { FittingSizeOptionAllocations, ListComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  SIZE_MEASUREMENT_GET_URL,
  SIZE_MEASUREMENT_LIST_URL,
  SIZE_MEASUREMENT_STATUS_URL,
} from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getFittingSizesList,
  getProductTypeList,
  getSizeMeasurementFieldsList,
  getStepTypesList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIZE_MEASUREMENT");
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
    accessor: "sizeMeasurementField",
    header: "COMMON.SIZE_MEASUREMENT_FIELD",
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
  const sizeMeasurementFieldData = await getSizeMeasurementFieldsList(productTypeId);

  return (
    <>
      <ListComponent
        fetchUrl={SIZE_MEASUREMENT_LIST_URL}
        statusUrl={SIZE_MEASUREMENT_STATUS_URL}
        pageRoute={FULL_PATH_ROUTES.sizeMeasurement}
        searchPlaceholder="COMMON.SEARCH_BY_VALUE"
        title="SIZE_MEASUREMENT.TITLE"
        columnConfigs={columnConfigs}
        deleteUrl={SIZE_MEASUREMENT_GET_URL}
        showLanguageFilter
        customFilters={[
          {
            component: FittingSizeOptionAllocations,
            props: {
              fittingSizes: fittingSizeData,
              stepTypes: stepTypes,
              productTypeId: productTypeId,
              sizeMeasurementFieldData: sizeMeasurementFieldData
            },
          },
        ]}
      />
    </>
  );
}
