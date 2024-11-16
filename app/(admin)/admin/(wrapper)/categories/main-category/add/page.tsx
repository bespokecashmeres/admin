import {
  AddEditWrapper,
  MainCategoryFormComponent
} from "@/components";
import { getGenderList} from "@/utils/common.utils";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MAIN_CATEGORY");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const genderList = await getGenderList();

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <MainCategoryFormComponent genderList={genderList} />
    </AddEditWrapper>
  );
};

export default Add;
