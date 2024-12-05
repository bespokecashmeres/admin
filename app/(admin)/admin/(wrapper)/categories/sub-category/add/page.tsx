import {
  AddEditWrapper,
  SubCategoryFormComponent
} from "@/components";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { getGenderList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SUB_CATEGORY");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const genderList = await getGenderList();

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <SubCategoryFormComponent genderList={genderList} />
    </AddEditWrapper>
  );
};

export default Add;
