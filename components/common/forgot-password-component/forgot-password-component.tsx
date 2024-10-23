import React, { Fragment } from "react";
import ForgotPasswordForm from "./forgot-password-form";
import { ROUTES } from "@/constants";
import { AuthHeader, AuthImage, AuthFooter, AuthWrapper } from "@/components";
import { getTranslations } from "next-intl/server";

const ForgotPasswordComponent = async () => {
  const t = await getTranslations();
  return (
    <AuthWrapper title={t("FORGOT_PASSWORD.FORGOT_YOUR_PASSWORD")}>
      <Fragment>
        {/* Form */}
        <ForgotPasswordForm />
        {/* Footer */}
        <AuthFooter
          linkLabel={t("SIGNIN.TITLE")}
          message={`${t("FORGOT_PASSWORD.REMEMBERED_YOUR_PASSWORD")}?`}
          path={ROUTES.signin}
        />
      </Fragment>
    </AuthWrapper>
  );
};

export default ForgotPasswordComponent;
