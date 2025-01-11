import { AddEditWrapper, FittingSizeOptionsComponent } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  SIZE_MEASUREMENT_FIELDS_ADD_URL,
  SIZE_MEASUREMENT_FIELDS_UPDATE_URL,
} from "@/constants/apis";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getProductTypeList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIZE_MEASUREMENT_FIELDS");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const productTypeData = await getProductTypeList();

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <FittingSizeOptionsComponent
        addApi={SIZE_MEASUREMENT_FIELDS_ADD_URL}
        redirectUrl={FULL_PATH_ROUTES.adminSizeMeasurementFields}
        updateApi={SIZE_MEASUREMENT_FIELDS_UPDATE_URL}
        productTypeList={productTypeData}
      />
    </AddEditWrapper>
  );
};

export default Add;
