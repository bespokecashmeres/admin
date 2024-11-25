"use client";

import {
  CancelLinkButton,
  CreateLinkButton,
  DeleteButtonWithConfirmation,
  LocaleTabs,
  RHFInputField,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import { YARN_ADD_URL, YARN_UPDATE_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { Locale } from "@/types/index";
import { initializeLocalizedObject } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type YarnFormType = {
  name: Record<string, string>;
  yarnId: string;
  yarns: {
    name: Record<string, string>;
    value: Record<string, string>;
    description: Record<string, string>;
  }[];
};

const YarnFormComponent = ({
  editData,
}: {
  editData?: YarnFormType & { _id: string };
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<YarnFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      yarnId: "",
      yarns: [
        {
          name: DEFAULT_LOCALE_VALUE,
          description: DEFAULT_LOCALE_VALUE,
          value: DEFAULT_LOCALE_VALUE,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "yarns",
  });

  useEffect(() => {
    if (editData) {
      const defaultName = initializeLocalizedObject(editData.name);
      const defaultYarn = editData.yarns.map((yarn) => ({
        name: initializeLocalizedObject(yarn.name),
        value: initializeLocalizedObject(yarn.value),
        description: initializeLocalizedObject(yarn.description),
      }));
      methods.reset({
        name: defaultName,
        yarns: defaultYarn,
        yarnId: editData.yarnId || "",
      });
    }
  }, [editData]);

  const onSubmit = async (data: YarnFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? YARN_UPDATE_URL : YARN_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: {
          name: JSON.stringify(data.name),
          yarns: JSON.stringify(data.yarns),
          yarnId: data.yarnId,
          _id: editData?._id,
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminProductYarn);
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
      <div className="mb-4">
        <div className="relative">
          {fields.map((item: any, index) => (
            <fieldset
              key={item.id}
              className="mb-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-3"
            >
              <legend>
                <DeleteButtonWithConfirmation
                  deleteId={`${index}`}
                  handleDelete={(index) => remove(index as unknown as number)}
                />
              </legend>
              <div className="mb-4.5 flex flex-col gap-2 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <RHFInputField
                    name={`yarns.${index}.name.${language}`}
                    label={`${t("COMMON.NAME")} (${language})`}
                    required
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <RHFInputField
                    name={`yarns.${index}.value.${language}`}
                    label={`${t("COMMON.VALUE")} (${language})`}
                    required
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <RHFTextareaField
                    name={`yarns.${index}.description.${language}`}
                    label={`${t("COMMON.DESCRIPTION")} (${language})`}
                  />
                </div>
              </div>
            </fieldset>
          ))}
          <CreateLinkButton
            label={t("COMMON.ADD_MORE_FIELDS")}
            onClick={() =>
              append({
                name: DEFAULT_LOCALE_VALUE,
                description: DEFAULT_LOCALE_VALUE,
                value: DEFAULT_LOCALE_VALUE,
              })
            }
          />
        </div>
      </div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <LocaleTabs active={activeTab} handleTabChange={handleTabChange} />
          <RHFInputField name="yarnId" label={t("COMMON.YARN_ID")} required />
          {renderLanguageFields(activeTab)}
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={FULL_PATH_ROUTES.adminProductYarn}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default YarnFormComponent;
