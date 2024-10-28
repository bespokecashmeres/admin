"use client";

import { CancelLinkButton, RHFPasswordField, SubmitButton } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { MESSAGES, ROUTES } from "@/constants";
import { RESET_PASSWORD_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { clearLocalStorageTokenAndData } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type ChangePasswordFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordFormComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.includes(`/${ROUTES.admin}`);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const dispatch = useDispatch();
  const methods = useForm<ChangePasswordFormType>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const changePasswordResponse = await (isAdmin
        ? adminAxiosInstance
        : wsAxiosInstance)({
        url: RESET_PASSWORD_URL,
        method: "POST",
        data: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      });
      if (changePasswordResponse.data.success) {
        toast.success(
          changePasswordResponse.data.message || t(MESSAGES.SUCCESS)
        );
        clearLocalStorageTokenAndData();
        router.push(
          `/${ROUTES[isAdmin ? "admin" : "ws"]}/${ROUTES.auth}/${ROUTES.signin}`
        );
      } else {
        toast.error(
          changePasswordResponse.data.message ||
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
      <div className="grow">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            <div className="grid gap-5 md:grid-cols-3">
              <RHFPasswordField
                name="oldPassword"
                label={t("COMMON.OLD_PASSWORD")}
                required
              />
              <RHFPasswordField
                name="newPassword"
                label={t("COMMON.NEW_PASSWORD")}
              />
              <RHFPasswordField
                name="confirmPassword"
                label={t("COMMON.CONFIRM_PASSWORD")}
                required
                rules={{
                  validate: (value: string) =>
                    value === password || t("COMMON.PASSWORDS_DO_NOT_MATCH"),
                }}
              />
            </div>
          </div>
          <footer>
            <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
              <div className="flex self-end gap-4">
                <CancelLinkButton
                  label={t("COMMON.CANCEL")}
                  href={`/${ROUTES[isAdmin ? "admin" : "ws"]}/${
                    ROUTES.dashboard
                  }`}
                />
                <SubmitButton
                  label={t("COMMON.SUBMIT")}
                  disabled={disableSubmit}
                />
              </div>
            </div>
          </footer>
        </form>
      </div>
    </FormProvider>
  );
};

export default ChangePasswordFormComponent;
