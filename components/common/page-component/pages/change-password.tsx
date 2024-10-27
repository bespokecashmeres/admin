import React from "react";
import { getTranslations } from "next-intl/server";
import { DefaultLayout } from "../../layout";
import { SettingWrapper } from "../../settings";
import ChangePasswordFormComponent from "../change-password-form-component";

const ChangePasswordPage = async () => {
  const t = await getTranslations();

  return (
    <DefaultLayout>
      <SettingWrapper title={t("COMMON.CHANGE_PASSWORD")}>
        <ChangePasswordFormComponent />
      </SettingWrapper>
    </DefaultLayout>
  );
};

export default ChangePasswordPage;
