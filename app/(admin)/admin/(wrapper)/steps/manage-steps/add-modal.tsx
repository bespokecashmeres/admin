"use client";
import {
  LocaleTabs,
  NormalCancelButton,
  RHFInputField,
  SubmitButton
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, MESSAGES } from "@/constants";
import { STEP_TYPE_ADD_URL, STEP_TYPE_UPDATE_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType, Locale } from "@/types";
import { useTranslations } from "next-intl";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type AddStepFormType = {
  name: Record<string, string>;
  info: Record<string, string>;
  slug: string;
  productTypeId: string;
};

export type EditStepFormType = AddStepFormType & { _id: string };

const AddModal: FC<{
  handleAddSuccess: (args: DropDownOptionType) => void;
  toggleModal: (isOpen: boolean, editStep?: EditStepFormType | null) => void;
  productTypes: DropDownOptionType[];
  editStep: EditStepFormType | null;
}> = ({ toggleModal, productTypes, handleAddSuccess, editStep }) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);

  const methods = useForm<AddStepFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      info: DEFAULT_LOCALE_VALUE,
      productTypeId: "",
      slug: "",
    },
  });

  // Reset form when editStep changes
  useEffect(() => {
    if (editStep) {
      methods.reset({
        info: editStep.info,
        name: editStep.name,
        productTypeId: editStep.productTypeId,
        slug: editStep.slug,
      });
    }
  }, [editStep, methods]);

  const handleClose = useCallback(() => {
    toggleModal(false);
  }, [toggleModal]);

  const handleTabChange = useCallback((lang: Locale) => {
    setActiveTab(lang);
  }, []);

  const onSubmit = useCallback(
    async (data: AddStepFormType) => {
      const productTypeId = productTypes?.[0]?.value;

      try {
        setDisableSubmit(true);
        dispatch(setLoadingState(true));

        const payload = {
          name: JSON.stringify(data.name),
          info: JSON.stringify(data.info),
          ...(!editStep || CONFIG.developmentMode ? { slug: data.slug } : {}),
          ...(editStep ? { _id: editStep._id } : { productTypeId }),
        };

        const addStepResponse = await adminAxiosInstance({
          url: editStep ? STEP_TYPE_UPDATE_URL : STEP_TYPE_ADD_URL,
          method: editStep ? "PUT" : "POST",
          data: payload,
        });

        if (addStepResponse.data.success) {
          toast.success(addStepResponse.data.message || t(MESSAGES.SUCCESS));
          const result = addStepResponse.data.data;
          if (result) {
            handleAddSuccess({
              label: result.name?.en ?? "",
              value: result._id,
              status: result.status,
            });
          }
        } else {
          toast.error(
            addStepResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
          );
        }
      } catch (error) {
        console.error(error);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      } finally {
        dispatch(setLoadingState(false));
        setDisableSubmit(false);
      }
    },
    [dispatch, editStep, handleAddSuccess, productTypes, t]
  );

  const renderLanguageFields = useCallback(
    (language: Locale) => (
      <div key={language} className="space-y-4">
        <RHFInputField
          name={`name.${language}`}
          label={`${t("COMMON.NAME")} (${language})`}
          required
        />
        <RHFInputField
          name={`info.${language}`}
          label={`${t("COMMON.INFO")} (${language})`}
        />
      </div>
    ),
    [t]
  );

  const localeTabsMemo = useMemo(() => {
    return <LocaleTabs active={activeTab} handleTabChange={handleTabChange} />;
  }, [activeTab, handleTabChange]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="px-5 py-4">
          <div className="space-y-3">
            {localeTabsMemo}
            {renderLanguageFields(activeTab)}
            {(CONFIG.developmentMode || !editStep) && <RHFInputField
              name="slug"
              label={t("COMMON.SLUG")}
              required
            />}
          </div>
        </div>
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap justify-end space-x-2">
            <NormalCancelButton
              label={t("COMMON.CANCEL")}
              onClick={handleClose}
            />
            <SubmitButton label={t("COMMON.SUBMIT")} disabled={disableSubmit} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddModal;
