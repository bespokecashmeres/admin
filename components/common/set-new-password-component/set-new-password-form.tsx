"use client";

import { RHFPasswordField, SubmitButton } from "@/components";
import { MESSAGES, ROUTES } from "@/constants";
import { SET_NEW_PASSWORD_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import {
  clearLocalStorageTokenAndData,
  handleApiCall,
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const SetNewPasswordForm = ({ token }: { token: string }) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const methods = useForm<FormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      clearLocalStorageTokenAndData();
      const setNewPasswordResponse: any = await handleApiCall(
        SET_NEW_PASSWORD_URL,
        "POST",
        {
          newPassword: data.newPassword,
        },
        { Authorization: token },
        isAdmin
      );
      if (setNewPasswordResponse?.success) {
        toast.success(setNewPasswordResponse?.message || t(MESSAGES.SUCCESS));
        router?.replace(
          `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.auth}/${ROUTES.signin}`
        );
      } else {
        toast.error(
          setNewPasswordResponse?.message ||
            t(MESSAGES.SOMETHING_WENT_WRONG)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
    } finally {
      dispatch(setLoadingState(false));
      setDisableSubmit(false);
    }
  };

  const password = methods.watch("newPassword");

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <RHFPasswordField
            label={t("COMMON.NEW_PASSWORD")}
            name="newPassword"
            required
            rules={{
              minLength: {
                value: 8,
                message: t("COMMON.PASSWORD_AT_LEAST_EIGHT", {
                  label: t("COMMON.NEW_PASSWORD"),
                }),
              },
            }}
          />
          <RHFPasswordField
            label={t("COMMON.CONFIRM_PASSWORD")}
            name="confirmPassword"
            required
            rules={{
              validate: (value: string) =>
                value === password || t("COMMON.PASSWORDS_DO_NOT_MATCH"),
            }}
          />
        </div>
        <div className="flex justify-center mt-6">
          <SubmitButton label={t("COMMON.SUBMIT")} disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default SetNewPasswordForm;
