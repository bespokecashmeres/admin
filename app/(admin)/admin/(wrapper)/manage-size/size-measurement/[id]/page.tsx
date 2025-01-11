import { AddEditWrapper } from "@/components";
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
import EditComponent from "./edit-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIZE_MEASUREMENT");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();
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
    <AddEditWrapper title={t("COMMON.EDIT")}>
      <EditComponent
        id={params.id}
        productTypeData={productTypeData}
        fittingSizeData={fittingSizeData}
        stepTypes={stepTypes}
        sizeMeasurementFieldData={sizeMeasurementFieldData}
      />
    </AddEditWrapper>
  );
};

export default Edit;
