"use client";

import {
  CancelLinkButton,
  LocaleTabs,
  RHFFileField,
  RHFFormDropdownField,
  RHFInputField,
  RHFNumberField,
  RHFPasswordField,
  RHFRadioGroup,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import {
  IMAGE_ALLOWED_TYPES,
  LOCALES,
  MAX_FILE_UPLOAD_SIZE,
  MESSAGES,
  ROUTES,
  USER_TYPES,
} from "@/constants";
import {
  ADMIN_ADD_WHOLE_SALER_URL,
  ADMIN_UPDATE_WHOLE_SALER_DATA_URL,
  LOOKBOOK_ADD_URL,
  LOOKBOOK_UPDATE_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { AllowedImageFileType, LanguageContent, Locale } from "@/types";
import {
  validateFileSize,
  validateImageFileType,
  validatePdfFileType,
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type LookBookFormType = {
  title: LanguageContent[];
  description: LanguageContent[];
  image?: FileList | null;
  pdf?: FileList | null;
};

const LookBookFormComponent = ({ editData }: { editData?: any }) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const [image, setImage] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm<LookBookFormType>({
    defaultValues: {
      title: LOCALES.map((lang) => ({ language: lang, text: "" })),
      description: LOCALES.map((lang) => ({ language: lang, text: "" })),
      image: null,
      pdf: null,
    },
  });

  useEffect(() => {
    if (editData) {
      const defaultTitle = LOCALES.map((lang) => {
        const langEntry = editData.title?.find(
          (t: LanguageContent) => t.language === lang
        );
        return {
          language: lang,
          text: langEntry ? langEntry.text : "",
        };
      });

      const defaultDescription = LOCALES.map((lang) => {
        const langEntry = editData.description?.find(
          (d: LanguageContent) => d.language === lang
        );
        return {
          language: lang,
          text: langEntry ? langEntry.text : "",
        };
      });
      methods.reset({
        title: defaultTitle,
        description: defaultDescription,
      });
      setImage(editData?.image);
      setPdf(editData?.pdf);
    }
  }, [editData]);

  const onSubmit = async (data: LookBookFormType) => {
    console.log("data: ", data);
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const formData = new FormData();
      formData.append("title", JSON.stringify(data.title));
      formData.append("description", JSON.stringify(data.description));

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      if (data.pdf && data.pdf[0]) {
        formData.append("pdf", data.pdf[0]);
      }

      if (editData?._id) {
        formData.append("_id", editData._id);
      }

      const registrationResponse = await adminAxiosInstance({
        url: editData ? LOOKBOOK_UPDATE_URL : LOOKBOOK_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(`/${ROUTES.admin}/${ROUTES.lookbook}`);
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

  const validationRules = useMemo(() => {
    return {
      image: {
        validate: {
          validateImageFileType: (file: FileList) => {
            return validateImageFileType(
              file,
              t("COMMON.FILE_TYPE_NOT_ALLOWED_MESSAGE"),
              !editData ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.IMAGE") }) : "",
            );
          },
          validateImageFileSize: (file: FileList) => {
            return validateFileSize(
              file,
              t("COMMON.FILE_SIZE_MESSAGE"),
              !editData ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.IMAGE") }) : ""
            );
          },
        },
      },
      pdf: {
        validate: {
          validatePdfFileType: (file: FileList) => {
            return validatePdfFileType(
              file,
              t("COMMON.FILE_TYPE_FOR_PDF_NOT_ALLOWED_MESSAGE"),
              !editData ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.PDF") }): ""
            );
          },
          validatePdfFileSize: (file: FileList) => {
            return validateFileSize(
              file,
              t("COMMON.FILE_SIZE_MESSAGE"),
              !editData ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.PDF") }): ""
            );
          },
        },
      },
    };
  }, [t, editData]);

  const handleTabChange = (lang: Locale) => {
    setActiveTab(lang);
  };

  const renderLanguageFields = (language: Locale) => {
    const languageIndex = methods
      .getValues("title")
      .findIndex((title) => title.language === language);
    return (
      <div key={language} className="space-y-4">
        <RHFInputField
          name={`title.${languageIndex}.text`}
          label={`${t("COMMON.TITLE")} (${language})`}
          required
        />
        <RHFTextareaField
          name={`description.${languageIndex}.text`}
          label={`${t("COMMON.DESCRIPTION")} (${language})`}
          required
        />
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <LocaleTabs active={activeTab} handleTabChange={handleTabChange} />

          {renderLanguageFields(activeTab)}

          <div className="grid gap-5 md:grid-cols-2 mt-4">
            <RHFFileField
              label={t("COMMON.IMAGE")}
              name="image"
              required={!image}
              accept="image/jpeg, image/png"
              infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
              fileType="image"
              url={image}
              rules={validationRules.image}
            />
            <RHFFileField
              label={t("COMMON.PDF")}
              name="pdf"
              required={!pdf}
              accept="application/pdf"
              infoText={t("COMMON.PDF_ACCEPTED_FORMAT")}
              fileType="pdf"
              url={pdf}
              rules={validationRules.pdf}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={`/${ROUTES.admin}/${ROUTES.lookbook}`}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default LookBookFormComponent;