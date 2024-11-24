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
import { DEFAULT_LOCALE_VALUE, FULL_PATH_ROUTES, LOCALES, MESSAGES, ROUTES } from "@/constants";
import {
  FABRICS_ADD_URL,
  FABRICS_UPDATE_URL,
  LOOKBOOK_ADD_URL,
  LOOKBOOK_UPDATE_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { Locale } from "@/types/index";
import {
  initializeLocalizedObject,
  validateFileSize,
  validateImageFileType,
  validatePdfFileType,
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type FabricFormType = {
  name: Record<string, string>;
  fabricId: string;
  fabrics: {
    name: Record<string, string>;
    value: Record<string, string>;
    description: Record<string, string>;
  }[];
};

const FabricFormComponent = ({
  editData,
}: {
  editData?: FabricFormType & { _id: string };
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<FabricFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      fabricId: "",
      fabrics: [
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
    name: "fabrics",
  });

  useEffect(() => {
    if (editData) {
      const defaultName = initializeLocalizedObject(editData.name);
      const defaultFabrics = editData.fabrics.map((fabric) => ({
        name: initializeLocalizedObject(fabric.name),
        value: initializeLocalizedObject(fabric.value),
        description: initializeLocalizedObject(fabric.description),
      }));
      methods.reset({
        name: defaultName,
        fabrics: defaultFabrics,
        fabricId: editData.fabricId || "",
      });
    }
  }, [editData]);

  const onSubmit = async (data: FabricFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? FABRICS_UPDATE_URL : FABRICS_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: {
          name: JSON.stringify(data.name),
          fabrics: JSON.stringify(data.fabrics),
          fabricId: data.fabricId,
          _id: editData?._id,
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminProductFabric);
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
                    name={`fabrics.${index}.name.${language}`}
                    label={`${t("COMMON.NAME")} (${language})`}
                    required
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <RHFInputField
                    name={`fabrics.${index}.value.${language}`}
                    label={`${t("COMMON.VALUE")} (${language})`}
                    required
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <RHFTextareaField
                    name={`fabrics.${index}.description.${language}`}
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
          <RHFInputField
            name="fabricId"
            label={t("COMMON.FABRIC_ID")}
            required
          />
          {renderLanguageFields(activeTab)}
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={FULL_PATH_ROUTES.adminProductFabric}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default FabricFormComponent;
