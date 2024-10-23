import React, { Fragment } from "react";
import { ROUTES } from "@/constants";
import SignupForm from "./signup-form";
import { AuthFooter, AuthHeader, AuthImage, AuthWrapper } from "@/components";
import { getTranslations } from "next-intl/server";

const SignupComponent = async ({ countries }: { countries: any }) => {
  const t = await getTranslations();
  return (
    <AuthWrapper title={t("SIGNUP.CREATE_YOUR_ACCOUNT")}>
      <Fragment>
        {/* Form */}
        <SignupForm countries={countries} />
        {/* Footer */}
        <AuthFooter
          linkLabel={t("SIGNIN.TITLE")}
          message={`${t("SIGNUP.HAVE_AN_ACCOUNT")}?`}
          path={ROUTES.signin}
        />
      </Fragment>
    </AuthWrapper>
  );
};

export default SignupComponent;
