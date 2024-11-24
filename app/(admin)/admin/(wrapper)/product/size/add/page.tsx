import {
  AddEditWrapper,
  FabricFormComponent,
  SizeFormComponent,
} from "@/components";
import { PRODUCT_TYPE_DROPDOWN_URL } from "@/constants/apis";
import { getProductTypeList, handleApiCall } from "@/utils/common.utils";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIZE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const filteredRes = await getProductTypeList();

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <SizeFormComponent productTypes={filteredRes} />
    </AddEditWrapper>
  );
};

export default Add;
