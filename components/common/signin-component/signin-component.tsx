import { Fragment } from "react";
import SigninForm from "./signin-form";
import { AuthWrapper } from "@/components";
import SignInFooter from "./signin-footer";
import { getTranslations } from "next-intl/server";

const SigninComponent = async () => {
  const t = await getTranslations();
  return (
    <AuthWrapper title={t("SIGNIN.WELCOME_BACK")}>
      <Fragment>
        {/* Tab */}
        {/* <AuthTabs path={ROUTES.signin} /> */}
        {/* Form */}
        <SigninForm />
        {/* Footer */}
        <SignInFooter />
      </Fragment>
    </AuthWrapper>
  );
};

export default SigninComponent;
