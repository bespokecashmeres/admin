import { AddEditWrapper } from "@/components";
import YarnModuleFormComponent from "@/components/common/page-component/yarn-module-form-component";
import { FULL_PATH_ROUTES } from "@/constants";
import { PRICE_RANGE_ADD_URL, PRICE_RANGE_UPDATE_URL } from "@/constants/apis";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("PRICE_RANGE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <YarnModuleFormComponent
        addApi={PRICE_RANGE_ADD_URL}
        redirectUrl={FULL_PATH_ROUTES.adminYarnModulePriceRanges}
        updateApi={PRICE_RANGE_UPDATE_URL}
      />
    </AddEditWrapper>
  );
};

export default Add;
