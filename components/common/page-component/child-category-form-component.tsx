"use client";
import {
  CancelLinkButton,
  LocaleTabs,
  RHFFileField,
  RHFFormDropdownField,
  RHFInputField,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { FULL_PATH_ROUTES, LOCALES, MESSAGES } from "@/constants";
import {
  CHILD_CATEGORY_ADD_URL,
  CHILD_CATEGORY_UPDATE_URL,
  MAIN_CATEGORY_DROPDOWN_URL,
  SUB_CATEGORY_DROPDOWN_URL,
} from "@/constants/apis";
import { SLUG_REGEX } from "@/constants/regex";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType, Locale } from "@/types/index";
import {
  getAWSImageUrl,
  validateFileSize,
  validateImageFileType,
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type ChildCategoryFormType = {
  name: Record<string, string>;
  mainCategoryId: string;
  subCategoryId: string;
  description: Record<string, string>;
  slug: string;
  genderId: string;
  image?: FileList | null;
};

const ChildCategoryFormComponent = ({
  editData,
  genderList,
}: {
  editData?: any;
  genderList: DropDownOptionType[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const [mainCategoryList, setMainCategoryList] = useState<
    DropDownOptionType[]
  >([]);
  const [subCategoryList, setSubCategoryList] = useState<DropDownOptionType[]>(
    []
  );
  const [image, setImage] = useState<string>("");
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<ChildCategoryFormType>({
    defaultValues: {
      name: LOCALES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
      description: LOCALES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
      image: null,
      slug: "",
      genderId: "",
      mainCategoryId: "",
      subCategoryId: "",
    },
  });

  useEffect(() => {
    if (editData) {
      const fetchData = async () => {
        const defaultTitle = LOCALES.reduce((acc, lang) => {
          acc[lang] = editData.name?.[lang] || "";
          return acc;
        }, {} as Record<string, string>);

        const defaultDescription = LOCALES.reduce((acc, lang) => {
          acc[lang] = editData.description?.[lang] || "";
          return acc;
        }, {} as Record<string, string>);
        dispatch(setLoadingState(true));
        const [mainCategoryRes, subCategoryRes] = await Promise.all([
          adminAxiosInstance.post(MAIN_CATEGORY_DROPDOWN_URL, {
            genderId: editData.genderId,
          }),
          adminAxiosInstance.post(SUB_CATEGORY_DROPDOWN_URL, {
            genderId: editData.genderId,
            mainCategoryId: editData.mainCategoryId,
          }),
        ]);

        const mainCategoriesData = mainCategoryRes.data as any;
        const subCategoriesData = subCategoryRes.data as any;

        if (mainCategoriesData.success) {
          setMainCategoryList(
            mainCategoriesData.data.map((category: any) => ({
              label: category.label,
              value: category.value,
              image: getAWSImageUrl(category.image),
            }))
          );
        }
        if (subCategoriesData.success) {
          setSubCategoryList(
            subCategoriesData.data.map((category: any) => ({
              label: category.label,
              value: category.value,
              image: getAWSImageUrl(category.image),
            }))
          );
        }

        methods.reset({
          name: defaultTitle,
          description: defaultDescription,
          slug: editData.slug || "",
          genderId: editData.genderId || "",
          mainCategoryId: editData.mainCategoryId || "",
          subCategoryId: editData.subCategoryId || "",
        });
        setImage(editData?.image);
        dispatch(setLoadingState(false));
      };
      fetchData();
    }
  }, [editData]);

  const handleGenderChange = (option: any) => {
    if (option) {
      dispatch(setLoadingState(true));
      methods.setValue("mainCategoryId", "");
      methods.setValue("subCategoryId", "");
      adminAxiosInstance
        .post(MAIN_CATEGORY_DROPDOWN_URL, {
          genderId: option,
        })
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setMainCategoryList(
              result.data.map((category: any) => ({
                label: category.label,
                value: category.value,
                image: getAWSImageUrl(category.image),
              }))
            );
          } else {
            toast.error(result?.message || t(MESSAGES.SOMETHING_WENT_WRONG));
            return;
          }
        })
        .catch((err) => {
          console.log("eee", err);
          toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
        })
        .finally(() => {
          dispatch(setLoadingState(false));
        });
    }
  };

  const handleMainCategoryChange = (option: any) => {
    if (option) {
      const gender = methods.getValues("genderId");
      dispatch(setLoadingState(true));
      methods.setValue("subCategoryId", "");
      adminAxiosInstance
        .post(SUB_CATEGORY_DROPDOWN_URL, {
          genderId: gender,
          mainCategoryId: option,
        })
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setSubCategoryList(
              result.data.map((category: any) => ({
                label: category.label,
                value: category.value,
                image: getAWSImageUrl(category.image),
              }))
            );
          } else {
            toast.error(result?.message || t(MESSAGES.SOMETHING_WENT_WRONG));
            return;
          }
        })
        .catch((err) => {
          console.log("eee", err);
          toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
        })
        .finally(() => {
          dispatch(setLoadingState(false));
        });
    }
  };

  const onSubmit = async (data: ChildCategoryFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const formData = new FormData();
      formData.append("name", JSON.stringify(data.name));
      formData.append("description", JSON.stringify(data.description));
      formData.append("slug", data.slug);
      formData.append("genderId", data.genderId);
      formData.append("mainCategoryId", data.mainCategoryId);
      formData.append("subCategoryId", data.subCategoryId);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (editData?._id) {
        formData.append("_id", editData._id);
      }

      const registrationResponse = await adminAxiosInstance({
        url: editData ? CHILD_CATEGORY_UPDATE_URL : CHILD_CATEGORY_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminCategoriesChildCategory);
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
      slug: {
        pattern: {
          value: SLUG_REGEX,
          message: t(MESSAGES.INVALID_SLUG),
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
          <div className="grid gap-5 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <RHFFormDropdownField
              name="genderId"
              label={t("COMMON.GENDER")}
              options={genderList}
              required
              handleOptionSelect={handleGenderChange}
            />
            <RHFFormDropdownField
              name="mainCategoryId"
              label={t("MAIN_CATEGORY.TITLE")}
              options={mainCategoryList}
              required
              handleOptionSelect={handleMainCategoryChange}
            />
            <RHFFormDropdownField
              name="subCategoryId"
              label={t("SUB_CATEGORY.TITLE")}
              options={subCategoryList}
              required
            />
          </div>

          {renderLanguageFields(activeTab)}

          <div className="grid gap-5 mt-4 md:grid-cols-2">
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
            <RHFInputField
              name="slug"
              label={t("COMMON.SLUG")}
              required
              rules={validationRules.slug}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={FULL_PATH_ROUTES.adminCategoriesChildCategory}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default ChildCategoryFormComponent;
