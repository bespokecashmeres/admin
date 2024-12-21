"use client";

import {
  CancelLinkButton,
  CreateLinkButton,
  DeleteButtonWithConfirmation,
  LocaleTabs,
  RHFFileField,
  RHFFormDropdownField,
  RHFInputField,
  RHFNumberField,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import { YARN_ADD_URL, YARN_UPDATE_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType, Locale } from "@/types/index";
import {
  initializeLocalizedObject,
  validateFileSize,
  validateImageFileType
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

type YarnFormYarnsType = {
  yarns: {
    uuid: string;
    image?: FileList | null;
    name: Record<string, string>;
    value: Record<string, string>;
    info?: Record<string, string>;
  }[];
};

type YarnFormFieldsType = {
  name: Record<string, string>;
  price: number;
  yarnId: string;
  genderId: string;
  image: string;
  countryId: string;
  colourId: string;
  patternId: string;
  occassionId: string;
  seasonalityId: string;
  perceivedWeightId: string;
  // fittingId: string;
  materialId: string;
  // priceRangeId: string;
};

type YarnYarnsType = {
  uuid: string;
  image: string;
  name: Record<string, string>;
  value: Record<string, string>;
  info: Record<string, string>;
};

type YarnFormType = YarnFormFieldsType & YarnFormYarnsType;
type EditYarnFormType = YarnFormFieldsType & {
  _id: string;
  yarns: YarnYarnsType[];
};

const YarnFormComponent = ({
  editData,
  genders,
  countries,
  colours,
  patterns,
  occassions,
  seasonalities,
  perceivedWeights,
  fittings,
  materials,
}: // priceRanges,
{
  editData?: EditYarnFormType;
  genders: DropDownOptionType[];
  colours: DropDownOptionType[];
  countries: DropDownOptionType[];
  patterns: DropDownOptionType[];
  occassions: DropDownOptionType[];
  seasonalities: DropDownOptionType[];
  perceivedWeights: DropDownOptionType[];
  fittings: DropDownOptionType[];
  materials: DropDownOptionType[];
  // priceRanges: DropDownOptionType[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm<YarnFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      image: "",
      price: 0,
      yarnId: "",
      genderId: "",
      colourId: "",
      countryId: "",
      // fittingId: "",
      materialId: "",
      occassionId: "",
      patternId: "",
      perceivedWeightId: "",
      // priceRangeId: "",
      seasonalityId: "",
      yarns: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "yarns",
  });

  useEffect(() => {
    if (editData) {
      const defaultName = initializeLocalizedObject(editData.name);
      const defaultYarn = editData?.yarns?.map((yarn) => ({
        uuid: yarn.uuid,
        name: initializeLocalizedObject(yarn.name),
        value: initializeLocalizedObject(yarn.value),
        info: initializeLocalizedObject(yarn.info),
      }));
      methods.reset({
        name: defaultName,
        yarnId: editData.yarnId || "",
        genderId: editData.genderId || "",
        price: editData.price || 0,
        yarns: defaultYarn,
        colourId: editData.colourId || "",
        countryId: editData.countryId || "",
        // fittingId: editData.fittingId || "",
        materialId: editData.materialId || "",
        occassionId: editData.occassionId || "",
        patternId: editData.patternId || "",
        perceivedWeightId: editData.perceivedWeightId || "",
        // priceRangeId: editData.priceRangeId || "",
        seasonalityId: editData.seasonalityId || "",
      });
    }
  }, [editData]);

  const onSubmit = async (data: YarnFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const formData = new FormData();
      formData.append("name", JSON.stringify(data.name));
      formData.append("price", `${data.price}`);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      formData.append("yarnId", data.yarnId);
      formData.append("genderId", data.genderId);
      formData.append("colourId", data.colourId);
      formData.append("countryId", data.countryId);
      // formData.append("fittingId", data.fittingId);
      formData.append("materialId", data.materialId);
      formData.append("occassionId", data.occassionId);
      formData.append("patternId", data.patternId);
      formData.append("perceivedWeightId", data.perceivedWeightId);
      // formData.append("priceRangeId", data.priceRangeId);
      formData.append("seasonalityId", data.seasonalityId);
      if (editData?._id) formData.append("_id", editData?._id);
      data.yarns.forEach((yarn, index) => {
        formData.append(`yarns[${index}][uuid]`, yarn.uuid);
        formData.append(`yarns[${index}][name]`, JSON.stringify(yarn.name));
        formData.append(`yarns[${index}][value]`, JSON.stringify(yarn.value));
        formData.append(`yarns[${index}][info]`, JSON.stringify(yarn.info));
        if (yarn?.image?.length) {
          formData.append(`yarns[${index}][image]`, yarn?.image?.[0]);
        }
      });
      const registrationResponse = await adminAxiosInstance({
        url: editData ? YARN_UPDATE_URL : YARN_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          count: `${data.yarns.length}`,
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

  const validationRules = useMemo(() => {
    return {
      image: {
        validate: {
          validateImageFileType: (file: FileList) => {
            return validateImageFileType(
              file,
              t("COMMON.FILE_TYPE_NOT_ALLOWED_MESSAGE"),
              ""
            );
          },
          validateImageFileSize: (file: FileList) => {
            return validateFileSize(file, t("COMMON.FILE_SIZE_MESSAGE"), "");
          },
        },
      },
    };
  }, [t, editData]);

  const addNewYarn = () => {
    // const uniqueUuid = uuidToObjectId(uuidv4());
    append({
      name: DEFAULT_LOCALE_VALUE,
      info: DEFAULT_LOCALE_VALUE,
      value: DEFAULT_LOCALE_VALUE,
      image: null,
      uuid: uuidv4(),
    });
  };

  const renderLanguageFields = (language: Locale) => (
    <div key={language} className="space-y-4">
      <div className="mb-4">
        <div className="relative">
          {fields?.map((item: any, index) => (
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
                  <RHFFileField
                    name={`yarns.${index}.image`}
                    label={t("COMMON.IMAGE")}
                    rules={validationRules.image}
                    accept="image/jpeg, image/png"
                    infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
                    fileType="image"
                    url={editData?.yarns?.[index]?.image ?? ""}
                  />
                </div>
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
                    name={`yarns.${index}.info.${language}`}
                    label={`${t("COMMON.INFO")} (${language})`}
                  />
                </div>
              </div>
            </fieldset>
          ))}
          <CreateLinkButton
            label={t("COMMON.ADD_MORE_FIELDS")}
            onClick={addNewYarn}
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
          <div className="grid gap-5 md:grid-cols-3">
            <RHFInputField
              key="yarnId"
              name="yarnId"
              label={t("COMMON.YARN_ID")}
              required
            />
            <RHFFormDropdownField
              name="genderId"
              label={t("COMMON.GENDER")}
              options={genders}
              required
            />
            <RHFFormDropdownField
              name="countryId"
              label={t("COMMON.ORIGIN")}
              options={countries}
              required
            />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <RHFFormDropdownField
              name="colourId"
              label={t("COMMON.COLOUR")}
              options={colours}
              required
            />
            <RHFFormDropdownField
              name="patternId"
              label={t("COMMON.PATTERN")}
              options={patterns}
              required
            />
            <RHFFormDropdownField
              name="occassionId"
              label={t("COMMON.OCCASSION")}
              options={occassions}
              required
            />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <RHFFormDropdownField
              name="seasonalityId"
              label={t("COMMON.SEASONALITY")}
              options={seasonalities}
              required
            />
            <RHFFormDropdownField
              name="perceivedWeightId"
              label={t("COMMON.PERCEIVED_WEIGHT")}
              options={perceivedWeights}
              required
            />
            <RHFFormDropdownField
              name="materialId"
              label={t("COMMON.MATERIAL")}
              options={materials}
              required
            />
            {/* <RHFFormDropdownField
              name="fittingId"
              label={t("COMMON.FITTING")}
              options={fittings}
              required
            /> */}
          </div>
          {/* <RHFFormDropdownField
            name="priceRangeId"
            label={t("COMMON.PRICE_RANGE")}
            options={priceRanges}
            required
          /> */}
          <div className="grid gap-5 md:grid-cols-3">
            <RHFInputField
              key={`name.${activeTab}`}
              name={`name.${activeTab}`}
              label={`${t("COMMON.NAME")} (${activeTab})`}
              required
            />
            <RHFNumberField label={t("COMMON.PRICE")} name="price" required />
            <RHFFileField
              name="image"
              label={t("COMMON.IMAGE")}
              rules={validationRules.image}
              accept="image/jpeg, image/png"
              infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
              fileType="image"
              url={editData?.image ?? ""}
              required={!editData?.image}
            />
          </div>
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
