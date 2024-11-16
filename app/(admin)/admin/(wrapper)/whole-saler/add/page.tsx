import {
  AddEditWrapper,
  WholeSalerFormComponent
} from "@/components";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { handleApiCall } from "@/utils/common.utils";
import { COUNTRY_LIST_API } from "@/constants/apis";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("WHOLE_SALER");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const res: any = await handleApiCall(COUNTRY_LIST_API, "GET", null, {});

  const filteredRes = res?.data?.map((country: any) => ({
    value: country?._id,
    label: `${country?.phoneCode}`,
    image: `${country?.flag}`
  }));
  return (
      <AddEditWrapper title={t("COMMON.CREATE")}>
        <WholeSalerFormComponent countries={filteredRes} />
      </AddEditWrapper>
  );
};

export default Add;
