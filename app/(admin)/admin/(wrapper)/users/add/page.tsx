import { AddEditWrapper, DefaultLayout } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getCountryList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import AddComponent from "./add-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("USERS");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const filteredRes: any = await getCountryList();

  return (
    <DefaultLayout>
      <AddEditWrapper title={t("COMMON.CREATE")}>
        <AddComponent countries={filteredRes} />
      </AddEditWrapper>
    </DefaultLayout>
  );
};

export default Add;
