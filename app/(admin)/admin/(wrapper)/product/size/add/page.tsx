import { AddEditWrapper, SizeFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getProductTypeList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

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
