"use client";

import {
  CancelLinkButton,
  LocaleTabs,
  RHFFormDropdownField,
  RHFInputField,
  RHFNumberField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, MESSAGES } from "@/constants";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType, Locale } from "@/types/index";
import { initializeLocalizedObject } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type FittingSizeOptionsType = {
  name: Record<string, string>;
  minRange: number;
  maxRange: number;
  productTypeId: string;
};

const FittingSizeOptionsComponent = ({
  editData,
  updateApi,
  addApi,
  redirectUrl,
  productTypeList,
}: {
  editData?: FittingSizeOptionsType & { _id: string };
  updateApi: string;
  addApi: string;
  redirectUrl: string;
  productTypeList: DropDownOptionType[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<FittingSizeOptionsType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      productTypeId: "",
      maxRange: 0,
      minRange: 0
    },
  });

  useEffect(() => {
    if (editData) {
      const defaultTitle = initializeLocalizedObject(editData.name);

      methods.reset({
        name: defaultTitle,
        maxRange: editData.maxRange,
        minRange: editData.minRange
      });
    }
  }, [editData]);

  const onSubmit = async (data: FittingSizeOptionsType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? updateApi : addApi,
        method: editData ? "PUT" : "POST",
        data: {
          name: JSON.stringify(data.name),
          productTypeId: productTypeList?.[0]?.value,
          minRange: data.minRange,
          maxRange: data.maxRange,
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

  const minRange = methods.watch("minRange");

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <LocaleTabs active={activeTab} handleTabChange={handleTabChange} />
          {renderLanguageFields(activeTab)}
          <RHFNumberField label={t("COMMON.MIN_RANGE")} name="minRange" required />
          <RHFNumberField label={t("COMMON.MAX_RANGE")} name="maxRange" required rules={{
            validate: (value: number) => {
              if (value <= minRange) {
                return "Max range must be greater than min range"
              }
              return true;
            }
          }} />
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton label={t("COMMON.CANCEL")} href={redirectUrl} />
          <SubmitButton label={t("COMMON.SUBMIT")} disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default FittingSizeOptionsComponent;
