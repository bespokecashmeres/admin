import { AddEditWrapper, FittingSizeOptionsComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  FITTING_SIZE_OPTIONS_ADD_URL,
  FITTING_SIZE_OPTIONS_UPDATE_URL,
} from "@/constants/apis";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getFittingSizesList,
  getProductTypeList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("FITTING_SIZE_OPTIONS");
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

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <FittingSizeOptionsComponent
        addApi={FITTING_SIZE_OPTIONS_ADD_URL}
        redirectUrl={FULL_PATH_ROUTES.adminFittingFittingSizeOptions}
        updateApi={FITTING_SIZE_OPTIONS_UPDATE_URL}
        productTypeList={productTypeData}
        fittingSizeList={fittingSizeData}
      />
    </AddEditWrapper>
  );
};

export default Add;
