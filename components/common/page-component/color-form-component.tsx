"use client";

import {
  CancelLinkButton,
  LocaleTabs,
  RHFInputField,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import { COLOR_ADD_URL, COLOR_UPDATE_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { Locale } from "@/types/index";
import { initializeLocalizedObject } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type ColorFormType = {
  name: Record<string, string>;
  code: string;
};

const ColorFormComponent = ({
  editData,
}: {
  editData?: ColorFormType & { _id: string };
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<ColorFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      code: "",
    },
  });

  useEffect(() => {
    if (editData) {
      const defaultTitle = initializeLocalizedObject(editData.name);

      methods.reset({
        name: defaultTitle,
        code: editData.code,
      });
    }
  }, [editData]);

  const onSubmit = async (data: ColorFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? COLOR_UPDATE_URL : COLOR_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: {
          name: JSON.stringify(data.name),
          code: data.code,
          _id: editData?._id,
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminProductColor);
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

  const handleTabChange = (lang: Locale) => {
    setActiveTab(lang);
  };

  const renderLanguageFields = (language: Locale) => (
    <div key={language} className="space-y-4">
      <RHFInputField
        name={`name.${language}`}
        label={`${t("COMMON.NAME")} (${language})`}
        required
      />
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <LocaleTabs active={activeTab} handleTabChange={handleTabChange} />
          {renderLanguageFields(activeTab)}
          <RHFInputField
            name="code"
            label={t("COMMON.CODE")}
            type="color"
            className="h-20"
            required
          />
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={FULL_PATH_ROUTES.adminProductColor}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default ColorFormComponent;
