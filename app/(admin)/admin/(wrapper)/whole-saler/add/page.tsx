import { AddEditWrapper, WholeSalerFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getCountryList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("WHOLE_SALER");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const filteredRes: any = await getCountryList();

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <WholeSalerFormComponent countries={filteredRes} />
    </AddEditWrapper>
  );
};

export default Add;
