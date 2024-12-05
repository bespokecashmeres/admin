import { getCountryList } from "@/utils/server-api.utils";
import { getTranslations } from "next-intl/server";
import { SettingWrapper } from "../../settings";
import AccountFormComponent from "../account-form-component";

const AccountPage = async () => {
  const t = await getTranslations();
  const filteredRes: any = await getCountryList();

  return (
    <SettingWrapper title={t("COMMON.ACCOUNT")}>
      <AccountFormComponent countries={filteredRes} />
    </SettingWrapper>
  );
};

export default AccountPage;
