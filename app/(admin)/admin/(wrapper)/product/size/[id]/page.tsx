import { AddEditWrapper } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import EditComponent from "./edit-component";
import { getProductTypeList, handleApiCall } from "@/utils/common.utils";
import { PRODUCT_TYPE_DROPDOWN_URL } from "@/constants/apis";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIZE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();
  const filteredRes = await getProductTypeList();
  return (
    <AddEditWrapper title={t("COMMON.EDIT")}>
      <EditComponent id={params.id} productTypes={filteredRes} />
    </AddEditWrapper>
  );
};

export default Edit;
