import {
  AddEditWrapper,
  DefaultLayout,
  AccountFormComponent,
  SettingWrapper,
} from "@/components";
import { COUNTRY_LIST_API } from "@/constants/apis";
import { handleApiCall } from "@/utils/common.utils";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("COMMON");
  const title = t("ACCOUNT");
  return generateAdminPageMetadata({ title });
}

const Account = async () => {
  const t = await getTranslations();
  const res: any = await handleApiCall(COUNTRY_LIST_API, "GET", null, {});

  const filteredRes = res?.data?.map((country: any) => ({
    value: country?._id,
    label: `${country?.phoneCode}`,
  }));

  return (
    <DefaultLayout>
      <SettingWrapper title={t("COMMON.ACCOUNT")}>
        <AccountFormComponent countries={filteredRes} />
      </SettingWrapper>
    </DefaultLayout>
  );
};

export default Account;
