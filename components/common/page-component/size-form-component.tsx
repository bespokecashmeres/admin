"use client";

import {
  CancelLinkButton,
  CreateLinkButton,
  DeleteButtonWithConfirmation,
  LocaleTabs,
  RHFFormDropdownField,
  RHFInputField,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, FULL_PATH_ROUTES, MESSAGES, ROUTES } from "@/constants";
import { FABRICS_ADD_URL, FABRICS_UPDATE_URL, SIZE_ADD_URL, SIZE_UPDATE_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType, Locale } from "@/types/index";
import { initializeLocalizedObject } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type SizeFormType = {
  productTypeId: string;
  sizes: {
    sectionName: Record<string, string>;
    info: Record<string, string>;
    fields: {
      value: Record<string, string>;
      label: Record<string, string>;
    }[];
  }[];
};

const SizeFormComponent = ({
  editData,
  productTypes,
}: {
  editData?: SizeFormType & { _id: string };
  productTypes: DropDownOptionType[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<SizeFormType>({
    defaultValues: {
      productTypeId: "",
      sizes: [
        {
          sectionName: DEFAULT_LOCALE_VALUE,
          info: DEFAULT_LOCALE_VALUE,
          fields: [
            {
              value: DEFAULT_LOCALE_VALUE,
              label: DEFAULT_LOCALE_VALUE,
            },
          ],
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: methods.control,
    name: "sizes",
  });

  useEffect(() => {
    if (editData) {
      const defaultSize = editData.sizes.map((size) => ({
        sectionName: initializeLocalizedObject(size.sectionName),
        info: initializeLocalizedObject(size.info),
        fields: size.fields.map((field) => ({
          value: initializeLocalizedObject(field.value),
          label: initializeLocalizedObject(field.label),
        })),
      }));
      methods.reset({
        productTypeId: editData.productTypeId || "",
        sizes: defaultSize,
      });
    }
  }, [editData]);

  const onSubmit = async (data: SizeFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? SIZE_UPDATE_URL : SIZE_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: {
          productTypeId: data.productTypeId,
          sizes: JSON.stringify(data.sizes),
          _id: editData?._id,
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminProductSize);
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

  const handleInnerRemove = (indexes: string) => {
    const [index, subIndex] = indexes.split("_").map(Number);

    const field = methods.getValues(`sizes.${index}`);
    const newFields = field.fields.filter(
      (innerField, index) => index !== subIndex
    );
    update(index, {
      ...field,
      fields: newFields,
    });
  };

  const handleInnerAdd = (index: number) => {
    const field = methods.getValues(`sizes.${index as unknown as number}`);
    const newFields = [...field.fields];
    newFields.push({
      value: DEFAULT_LOCALE_VALUE,
      label: DEFAULT_LOCALE_VALUE,
    });
    update(index as unknown as number, {
      ...field,
      fields: newFields,
    });
  };

  const renderLanguageFields = (language: Locale) => (
    <div key={language} className="space-y-4">
      <div className="mb-4">
        <div className="relative">
          {fields.map((item: any, index) => (
            <fieldset
              key={index}
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
                    name={`sizes.${index}.sectionName.${language}`}
                    label={`${t("COMMON.SECTION_NAME")} (${language})`}
                    required
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <RHFInputField
                    name={`sizes.${index}.info.${language}`}
                    label={`${t("COMMON.INFO")} (${language})`}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="relative">
                  {fields[index].fields.map((item: any, subIndex) => (
                    <fieldset
                      key={`${index}_${subIndex}`}
                      className="mb-4 rounded-lg border-[3px] border-dashed border-gray-300 dark:border-gray-600 p-3"
                    >
                      <legend>
                        <DeleteButtonWithConfirmation
                          deleteId={`${index}_${subIndex}`}
                          handleDelete={handleInnerRemove}
                        />
                      </legend>
                      <div className="mb-4.5 flex flex-col gap-2 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <RHFInputField
                            name={`sizes.${index}.fields.${subIndex}.label.${language}`}
                            label={`${t("COMMON.LABEL")} (${language})`}
                            required
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <RHFInputField
                            name={`sizes.${index}.fields.${subIndex}.value.${language}`}
                            label={`${t("COMMON.VALUE")} (${language})`}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>
                  ))}
                  <CreateLinkButton
                    label={t("COMMON.ADD_MORE_FIELDS")}
                    onClick={() => handleInnerAdd(index)}
                  />
                </div>
              </div>
            </fieldset>
          ))}
          <CreateLinkButton
            label={t("COMMON.ADD_MORE_FIELDS")}
            onClick={() =>
              append({
                sectionName: DEFAULT_LOCALE_VALUE,
                info: DEFAULT_LOCALE_VALUE,
                fields: [
                  {
                    value: DEFAULT_LOCALE_VALUE,
                    label: DEFAULT_LOCALE_VALUE,
                  },
                ],
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
          <RHFFormDropdownField
            label={t("COMMON.PRODUCT_TYPE")}
            name="productTypeId"
            options={productTypes}
            required
          />
          {renderLanguageFields(activeTab)}
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={FULL_PATH_ROUTES.adminProductSize}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default SizeFormComponent;
