import { AddEditWrapper, ProductTypeFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("PRODUCT_TYPE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  return (
      <AddEditWrapper title={t("COMMON.CREATE")}>
        <ProductTypeFormComponent />
      </AddEditWrapper>
  );
};

export default Add;
