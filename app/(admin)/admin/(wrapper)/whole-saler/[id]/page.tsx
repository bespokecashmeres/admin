import { AddEditWrapper } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { getCountryList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import EditComponent from "./edit-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("WHOLE_SALER");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();
  const filteredRes: any = await getCountryList();

  return (
      <AddEditWrapper title={t("COMMON.EDIT")}>
        <EditComponent countries={filteredRes} id={params.id} />
      </AddEditWrapper>
  );
};

export default Edit;
