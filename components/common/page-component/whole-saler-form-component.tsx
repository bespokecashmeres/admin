"use client";

import {
  CancelLinkButton,
  RHFFormDropdownField,
  RHFInputField,
  RHFNumberField,
  RHFPasswordField,
  RHFRadioGroup,
  SubmitButton,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES, ROUTES, USER_TYPES } from "@/constants";
import {
  ADMIN_ADD_WHOLE_SALER_URL,
  ADMIN_UPDATE_WHOLE_SALER_DATA_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type WholeFormType = {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  mobile_number: string;
  gender: string;
  country_id: string;
};

const WholeSalerFormComponent = ({
  countries,
  editData,
}: {
  countries: { value: string; label: string }[];
  editData?: any;
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm<WholeFormType>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      mobile_number: "",
      country_id: "",
      password: "",
      gender: "men",
    },
  });

  useEffect(() => {
    if (editData) {
      methods.reset({
        country_id: editData.country_id ?? "",
        email: editData.email ?? "",
        first_name: editData.first_name ?? "",
        middle_name: editData.middle_name ?? "",
        gender: editData.gender ?? "",
        last_name: editData.last_name ?? "",
        mobile_number: editData.mobile_number ?? "",
      });
    }
  }, [editData]);

  const onSubmit = async (data: WholeFormType) => {
    const { password, ...rest } = data;
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const registrationResponse = await adminAxiosInstance({
        url: editData
          ? ADMIN_UPDATE_WHOLE_SALER_DATA_URL
          : ADMIN_ADD_WHOLE_SALER_URL,
        method: editData ? "PUT" : "POST",
        data: {
          ...rest,
          ...(editData
            ? { _id: editData?._id }
            : { password, user_type: USER_TYPES.ws }),
        },
      });
      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(
          `/${ROUTES.admin}/${ROUTES.wholeSaler}`
        );
      } else {
        toast.error(
          registrationResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid gap-5 md:grid-cols-3">
            <RHFInputField
              name="first_name"
              label={t("COMMON.FIRST_NAME")}
              required
            />
            <RHFInputField name="middle_name" label={t("COMMON.MIDDLE_NAME")} />
            <RHFInputField
              name="last_name"
              label={t("COMMON.LAST_NAME")}
              required
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            <RHFInputField
              name="email"
              label={t("COMMON.EMAIL_ADDRESS")}
              required
              type="email"
            />
            {!editData && (
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
            )}
          </div>
          <div>
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
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={`/${ROUTES.admin}/${ROUTES.wholeSaler}`}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default WholeSalerFormComponent;
