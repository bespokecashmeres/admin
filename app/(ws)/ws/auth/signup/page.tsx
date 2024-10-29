import { SignupComponent } from "@/components";
import { COUNTRY_LIST_API } from "@/constants/apis";
import { handleApiCall } from "@/utils/common.utils";
import { generateAdminPageMetadata, viewportData } from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("SIGNUP");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

export default async function SignUp() {
  const res: any = await handleApiCall(
    COUNTRY_LIST_API,
    "GET",
    null,
    {},
    false
  )
  
  const filteredRes = res?.data?.map((country: any) => ({
    value: country?._id,
    label: `${country?.phoneCode}`,
  }));

  return <SignupComponent countries={filteredRes} />;
}
