"use client";

import {
  CancelLinkButton,
  LocaleTabs,
  RHFFileField,
  RHFInputField,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { FULL_PATH_ROUTES, LOCALES, MESSAGES } from "@/constants";
import { STEP_CARD_ADD_URL, STEP_CARD_UPDATE_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { Locale } from "@/types/index";
import { validateFileSize, validateImageFileType } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type StepCardFormType = {
  title: Record<string, string>;
  description: Record<string, string>;
  graphImage?: FileList | null;
  realImage?: FileList | null;
};

type EditStepCardFormType = {
  title: Record<string, string>;
  description: Record<string, string>;
  graphImage: string;
  realImage: string;
  stepTypeId: string;
  _id: string;
};

const StepCardFormComponent = ({
  editData,
  stepTypeId,
}: {
  editData?: EditStepCardFormType;
  stepTypeId?: string;
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<StepCardFormType>({
    defaultValues: {
      title: LOCALES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
      description: LOCALES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
      graphImage: null,
      realImage: null,
    },
  });

  useEffect(() => {
    if (editData) {
      const defaultTitle = LOCALES.reduce((acc, lang) => {
        acc[lang] = editData.title?.[lang] || "";
        return acc;
      }, {} as Record<string, string>);

      const defaultDescription = LOCALES.reduce((acc, lang) => {
        acc[lang] = editData.description?.[lang] || "";
        return acc;
      }, {} as Record<string, string>);

      methods.reset({
        title: defaultTitle,
        description: defaultDescription,
      });
    }
  }, [editData]);

  const onSubmit = async (data: StepCardFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const formData = new FormData();
      formData.append("title", JSON.stringify(data.title));
      formData.append("description", JSON.stringify(data.description));

      if (data.graphImage && data.graphImage[0]) {
        formData.append("graphImage", data.graphImage[0]);
      }
      if (data.realImage && data.realImage[0]) {
        formData.append("realImage", data.realImage[0]);
      }
      if (stepTypeId) {
        formData.append("stepTypeId", stepTypeId);
      }

      if (editData?._id) {
        formData.append("_id", editData._id);
        formData.append("stepTypeId", editData.stepTypeId);
      }

      const registrationResponse = await adminAxiosInstance({
        url: editData ? STEP_CARD_UPDATE_URL : STEP_CARD_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminSteps);
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
              !editData
                ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.IMAGE") })
                : ""
            );
          },
          validateImageFileSize: (file: FileList) => {
            return validateFileSize(
              file,
              t("COMMON.FILE_SIZE_MESSAGE"),
              !editData
                ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.IMAGE") })
                : ""
            );
          },
        },
      },
    };
  }, [t, editData]);

  const handleTabChange = (lang: Locale) => {
    setActiveTab(lang);
  };

  const renderLanguageFields = (language: Locale) => (
    <div key={language} className="space-y-4">
      <RHFInputField
        name={`title.${language}`}
        label={`${t("COMMON.TITLE")} (${language})`}
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

          <div className="grid gap-5 md:grid-cols-2 mt-4">
            <RHFFileField
              label={t("COMMON.GRAPH_IMAGE")}
              name="graphImage"
              required={!editData?.graphImage}
              accept="image/jpeg, image/png"
              infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
              fileType="image"
              url={editData?.graphImage}
              rules={validationRules.image}
            />
            <RHFFileField
              label={t("COMMON.REAL_IMAGE")}
              name="realImage"
              required={!editData?.realImage}
              accept="image/jpeg, image/png"
              infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
              fileType="image"
              url={editData?.realImage}
              rules={validationRules.image}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton label="Cancel" href={FULL_PATH_ROUTES.adminSteps} />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default StepCardFormComponent;
