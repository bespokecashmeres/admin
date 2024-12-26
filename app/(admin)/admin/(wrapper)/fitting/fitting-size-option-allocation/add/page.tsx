import { AddEditWrapper } from "@/components";
import FittingSizeOptionAllocationComponent from "@/components/common/page-component/fitting-size-option-allocation-component";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  FITTING_SIZE_OPTION_ALLOCATION_ADD_URL,
  FITTING_SIZE_OPTION_ALLOCATION_UPDATE_URL,
} from "@/constants/apis";
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

const Add = async () => {
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
  const stepTypes = await getStepTypesList(productTypeData?.[0]?.value);

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <FittingSizeOptionAllocationComponent
        addApi={FITTING_SIZE_OPTION_ALLOCATION_ADD_URL}
        redirectUrl={FULL_PATH_ROUTES.adminFittingFittingSizeOptionAllocation}
        updateApi={FITTING_SIZE_OPTION_ALLOCATION_UPDATE_URL}
        productTypeList={productTypeData}
        fittingSizeList={fittingSizeData}
        stepTypes={stepTypes}
      />
    </AddEditWrapper>
  );
};

export default Add;
