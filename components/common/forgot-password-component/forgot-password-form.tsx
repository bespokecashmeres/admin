"use client";

import { MESSAGES, ROUTES, USER_TYPES } from "@/constants";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SubmitButton, RHFInputField } from "@/components";
import { useDispatch } from "react-redux";
import { setLoadingState } from "@/framework/redux/reducers";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { REQUEST_FORGOT_PASSWORD_LINK_URL } from "@/constants/apis";
import { useTranslations } from "next-intl";

type ForgotPasswordFormType = {
  email: string;
};

const ForgotPasswordForm = () => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const methods = useForm<ForgotPasswordFormType>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const loginResponse = await (isAdmin
        ? adminAxiosInstance
        : wsAxiosInstance
      ).post(REQUEST_FORGOT_PASSWORD_LINK_URL, {
        ...data,
        user_type: USER_TYPES[isAdmin ? "admin" : "ws"],
      });
      if (loginResponse.data.success) {
        toast.success(loginResponse.data.message || t(MESSAGES.SUCCESS));
      } else {
        toast.error(loginResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG));
      }
    } catch (error) {
      console.error(error);
      toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
    } finally {
      dispatch(setLoadingState(false));
      setDisableSubmit(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <RHFInputField
            name="email"
            label={t("COMMON.EMAIL_ADDRESS")}
            required
            type="email"
          />
        </div>
        <div className="flex justify-center mt-6">
          <SubmitButton label={t("FORGOT_PASSWORD.SEND_FORGOT_LINK")} disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
