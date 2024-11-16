import { getTranslations } from "next-intl/server";
import { SettingWrapper } from "../../settings";
import ChangePasswordFormComponent from "../change-password-form-component";

const ChangePasswordPage = async () => {
  const t = await getTranslations();

  return (
    <SettingWrapper title={t("COMMON.CHANGE_PASSWORD")}>
      <ChangePasswordFormComponent />
    </SettingWrapper>
  );
};

export default ChangePasswordPage;
