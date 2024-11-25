import { AddEditWrapper, YarnFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("YARN");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  return (
      <AddEditWrapper title={t("COMMON.CREATE")}>
        <YarnFormComponent />
      </AddEditWrapper>
  );
};

export default Add;
