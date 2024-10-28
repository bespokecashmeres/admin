"use client";

import React, { useState } from "react";
import { SubmitButton } from "../buttons";
import {
  RHFInputField,
  RHFPasswordField,
  RHFCheckboxField,
  RHFRadioGroup,
  RHFFormDropdownField,
  RHFNumberField,
} from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoadingState } from "@/framework/redux/reducers";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { REGISTARTION_URL } from "@/constants/apis";
import { MESSAGES, ROUTES, USER_TYPES } from "@/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type SignUpFormType = {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  news_letter: boolean;
  mobile_number: string;
  gender: string;
  country_id: string;
};

const SignupForm = ({ countries }: { countries: any }) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm<SignUpFormType>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      news_letter: false,
      mobile_number: "",
      country_id: "",
      password: "",
      gender: "men",
    },
  });

  const onSubmit = async (data: SignUpFormType) => {
    const { confirmPassword, ...rest } = data;
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const registrationResponse = await wsAxiosInstance.post(
        REGISTARTION_URL,
        {
          ...rest,
          user_type: USER_TYPES.ws,
        }
      );
      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(`/${ROUTES.ws}/${ROUTES.auth}/${ROUTES.signin}`);
      } else {
        toast.error(
          registrationResponse.data.message ||
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

  const password = methods.watch("password");
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid gap-5 md:grid-cols-3">
            <RHFInputField name="first_name" label={t("COMMON.FIRST_NAME")} required />
            <RHFInputField name="middle_name" label={t("COMMON.MIDDLE_NAME")} />
            <RHFInputField name="last_name" label={t("COMMON.LAST_NAME")} required />
          </div>
          <RHFInputField
            name="email"
            label={t("COMMON.EMAIL_ADDRESS")}
            required
            type="email"
          />
          <div className="grid gap-5 md:grid-cols-[120px_auto]">
            <RHFFormDropdownField
              label={t("COMMON.CODE")}
              name="country_id"
              placeholder={t("COMMON.CODE")}
              options={countries}
              isClearable={false}
              required
            />
            <RHFNumberField
              name="mobile_number"
              label={t("COMMON.MOBILE_NUMBER")}
              required
            />
          </div>
          <RHFPasswordField
            label={t("COMMON.PASSWORD")}
            name="password"
            required
            rules={{
              minLength: {
                value: 8,
                message: t("COMMON.PASSWORD_AT_LEAST_EIGHT", {
                  label: t("COMMON.PASSWORD"),
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
          <RHFRadioGroup
            name="gender"
            label={t("COMMON.GENDER")}
            options={[
              { value: "men", label: t("COMMON.MEN") },
              { value: "women", label: t("COMMON.WOMEN") },
            ]}
            required
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <RHFCheckboxField
            label={`${t("COMMON.SUBSCRIBE_TO_OUR_NEWSLETTER")}.`}
            name="news_letter"
          />

          <SubmitButton label={t("SIGNUP.TITLE")} disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
