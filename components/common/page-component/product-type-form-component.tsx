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
import {
  DEFAULT_LOCALE_VALUE,
  FULL_PATH_ROUTES,
  MESSAGES,
  ROUTES,
} from "@/constants";
import {
  PRODUCT_TYPE_ADD_URL,
  PRODUCT_TYPE_UPDATE_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { Locale } from "@/types/index";
import { initializeLocalizedObject } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type ProductTypeFormType = {
  name: Record<string, string>;
  description: Record<string, string>;
};

const ProductTypeFormComponent = ({
  editData,
}: {
  editData?: ProductTypeFormType & { _id: string };
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<ProductTypeFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      description: DEFAULT_LOCALE_VALUE,
    },
  });

  useEffect(() => {
    if (editData) {
      const defaultTitle = initializeLocalizedObject(editData.name);
      const defaultDescription = initializeLocalizedObject(
        editData.description
      );

      methods.reset({
        name: defaultTitle,
        description: defaultDescription,
      });
    }
  }, [editData]);

  const onSubmit = async (data: ProductTypeFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? PRODUCT_TYPE_UPDATE_URL : PRODUCT_TYPE_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: {
          name: JSON.stringify(data.name),
          description: JSON.stringify(data.description),
          _id: editData?._id,
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminProductProductType);
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
      <RHFTextareaField
        name={`description.${language}`}
        label={`${t("COMMON.DESCRIPTION")} (${language})`}
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
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={FULL_PATH_ROUTES.adminProductProductType}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductTypeFormComponent;
