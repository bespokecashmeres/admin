"use client";
import {
  CancelLinkButton,
  LocaleTabs,
  RHFFileField,
  RHFFormDropdownField,
  RHFInputField,
  RHFTextareaField,
  SubmitButton
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { LOCALES, MESSAGES, ROUTES } from "@/constants";
import {
  MAIN_CATEGORY_ADD_URL,
  MAIN_CATEGORY_UPDATE_URL
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType, Locale } from "@/types/index";
import { validateFileSize, validateImageFileType } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type MainCategoryFormType = {
  name: Record<string, string>;
  description: Record<string, string>;
  slug: string;
  genderId: string;
  image?: FileList | null;
};

const MainCategoryFormComponent = ({
  editData,
  genderList,
}: {
  editData?: any;
  genderList: DropDownOptionType[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const [image, setImage] = useState<string>("");
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<MainCategoryFormType>({
    defaultValues: {
      name: LOCALES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
      description: LOCALES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
      image: null,
      slug: "",
      genderId: "",
    },
  });

  useEffect(() => {
    if (editData) {
      const defaultTitle = LOCALES.reduce((acc, lang) => {
        acc[lang] = editData.name?.[lang] || "";
        return acc;
      }, {} as Record<string, string>);

      const defaultDescription = LOCALES.reduce((acc, lang) => {
        acc[lang] = editData.description?.[lang] || "";
        return acc;
      }, {} as Record<string, string>);

      methods.reset({
        name: defaultTitle,
        description: defaultDescription,
        slug: editData.slug || "",
        genderId: editData.genderId || "",
      });
      setImage(editData?.image);
    }
  }, [editData]);

  const onSubmit = async (data: MainCategoryFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const formData = new FormData();
      formData.append("name", JSON.stringify(data.name));
      formData.append("description", JSON.stringify(data.description));
      formData.append("slug", data.slug);
      formData.append("genderId", data.genderId);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (editData?._id) {
        formData.append("_id", editData._id);
      }

      const registrationResponse = await adminAxiosInstance({
        url: editData ? MAIN_CATEGORY_UPDATE_URL : MAIN_CATEGORY_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(
          `/${ROUTES.admin}/${ROUTES.categories}/${ROUTES.mainCategory}`
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
        name={`name.${language}`}
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

          <div className="grid gap-5 mt-4 md:grid-cols-2">
            <RHFInputField name="slug" label={t("COMMON.SLUG")} required />
            <RHFFormDropdownField
              name="genderId"
              label={t("COMMON.GENDER")}
              options={genderList}
              required
            />
          </div>

          <div className="grid gap-5 mt-4">
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
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={`/${ROUTES.admin}/${ROUTES.categories}/${ROUTES.mainCategory}`}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default MainCategoryFormComponent;
