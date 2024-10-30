import { COUNTRY_LIST_API } from "@/constants/apis";
import { handleApiCall } from "@/utils/common.utils";
import { getTranslations } from "next-intl/server";
import React from "react";
import { DefaultLayout } from "../../layout";
import { SettingWrapper } from "../../settings";
import AccountFormComponent from "../account-form-component";

const AccountPage = async () => {
  const t = await getTranslations();
  const res: any = await handleApiCall(COUNTRY_LIST_API, "GET", null, {});

  const filteredRes = res?.data?.map((country: any) => ({
    value: country?._id,
    label: `${country?.phoneCode}`,
    image: `${country?.flag}`
  }));

  return (
    <DefaultLayout>
      <SettingWrapper title={t("COMMON.ACCOUNT")}>
        <AccountFormComponent countries={filteredRes} />
      </SettingWrapper>
    </DefaultLayout>
  );
};

export default AccountPage;
