import { AddEditWrapper } from "@/components";
import YarnModuleFormComponent from "@/components/common/page-component/yarn-module-form-component";
import { FULL_PATH_ROUTES } from "@/constants";
import { FITTING_ADD_URL, FITTING_UPDATE_URL } from "@/constants/apis";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("FITTING");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <YarnModuleFormComponent
        addApi={FITTING_ADD_URL}
        redirectUrl={FULL_PATH_ROUTES.adminYarnModuleFitting}
        updateApi={FITTING_UPDATE_URL}
      />
    </AddEditWrapper>
  );
};

export default Add;
