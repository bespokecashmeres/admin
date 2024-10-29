import { AuthHeader, AuthImage, AuthWrapper } from "@/components";
import React from "react";
import SetNewPasswordForm from "./set-new-password-form";
import { getTranslations } from "next-intl/server";

const SetNewPasswordComponent = async ({ token }: { token: string }) => {
  const t = await getTranslations();
  return (
    <AuthWrapper title={t("SET_NEW_PASSWORD.TITLE")}>
      <SetNewPasswordForm token={token} />
    </AuthWrapper>
  );
};

export default SetNewPasswordComponent;
