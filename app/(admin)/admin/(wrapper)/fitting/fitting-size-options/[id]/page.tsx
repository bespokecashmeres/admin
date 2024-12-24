import { AddEditWrapper } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getFittingSizesList,
  getProductTypeList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import EditComponent from "./edit-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("FITTING_SIZE_OPTIONS");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();
  const productTypeData = await getProductTypeList();
  const fittingSizeData = await getFittingSizesList();

  return (
    <AddEditWrapper title={t("COMMON.EDIT")}>
      <EditComponent
        id={params.id}
        productTypeData={productTypeData}
        fittingSizeData={fittingSizeData}
      />
    </AddEditWrapper>
  );
};

export default Edit;
