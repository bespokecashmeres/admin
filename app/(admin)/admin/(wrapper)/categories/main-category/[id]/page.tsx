import { AddEditWrapper} from "@/components";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import EditComponent from "./edit-component";
import { getGenderList} from "@/utils/common.utils";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MAIN_CATEGORY");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();
  const genderList = await getGenderList();

  return (
    <AddEditWrapper title={t("COMMON.EDIT")}>
      <EditComponent id={params.id} genderData={genderList} />
    </AddEditWrapper>
  );
};

export default Edit;
