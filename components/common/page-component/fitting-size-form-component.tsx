"use client";

import {
  CancelLinkButton,
  LocaleTabs,
  RHFInputField,
  RHFNumberField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, MESSAGES } from "@/constants";
import { setLoadingState } from "@/framework/redux/reducers";
import { Locale } from "@/types/index";
import { initializeLocalizedObject } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type YarnModuleFormType = {
  name: Record<string, string>;
  slug: string;
};

const FittingSizeFormComponent = ({
  editData,
  updateApi,
  addApi,
  redirectUrl,
}: {
  editData?: YarnModuleFormType & { _id: string };
  updateApi: string;
  addApi: string;
  redirectUrl: string;
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<YarnModuleFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      slug: ''
    },
  });

  useEffect(() => {
    if (editData) {
      const defaultTitle = initializeLocalizedObject(editData.name);

      methods.reset({
        name: defaultTitle,
        slug: editData?.slug ?? '',
      });
    }
  }, [editData]);

  const onSubmit = async (data: YarnModuleFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? updateApi : addApi,
        method: editData ? "PUT" : "POST",
        data: {
          name: JSON.stringify(data.name),
          ...(!editData ? {
            slug: data.slug,
          } : {}),
          _id: editData?._id,
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(redirectUrl);
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
          {(CONFIG.developmentMode || !editData) && <RHFInputField
            name="slug"
            label={t("COMMON.SLUG")}
            required
          />}
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton label={t("COMMON.CANCEL")} href={redirectUrl} />
          <SubmitButton label={t("COMMON.SUBMIT")} disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default FittingSizeFormComponent;
