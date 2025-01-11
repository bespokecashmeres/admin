"use client";

import {
  CancelLinkButton,
  RHFFormDropdownField,
  RHFInputField,
  SubmitButton,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import {
  SIZE_MEASUREMENT_FIELDS_DROPDOWN_URL,
  STEP_CARD_DROPDOWN_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType } from "@/types/index";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type FittingSizeOptionAllocationType = {
  value: number;
  productTypeId: string;
  stepTypeId: string;
  stepCardId: string;
  fittingSizeId: string;
  sizeMeasurementFieldId: string;
};

const FittingSizeOptionAllocationComponent = ({
  editData,
  updateApi,
  addApi,
  redirectUrl,
  productTypeList,
  fittingSizeList,
  stepTypes,
  sizeMeasurementFields
}: {
  editData?: FittingSizeOptionAllocationType & { _id: string };
  updateApi: string;
  addApi: string;
  redirectUrl: string;
  productTypeList: DropDownOptionType[];
  fittingSizeList: DropDownOptionType[];
  stepTypes: DropDownOptionType[];
  sizeMeasurementFields: DropDownOptionType[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const [stepCardList, setStepCardList] = useState<DropDownOptionType[]>([]);

  const methods = useForm<FittingSizeOptionAllocationType>({
    defaultValues: {
      value: 0,
      fittingSizeId: "",
      stepTypeId: "",
      stepCardId: "",
      sizeMeasurementFieldId: "",
      productTypeId: "",
    },
  });

  useEffect(() => {
    if (editData) {
      const fetchData = async () => {
        dispatch(setLoadingState(true));
        const stepCardRes = await adminAxiosInstance.post(
          `${STEP_CARD_DROPDOWN_URL}/${editData.stepTypeId}`
        );

        const stepCardData = stepCardRes.data as any;

        if (stepCardData?.success) {
          setStepCardList(
            stepCardData.data.map((category: any) => ({
              label: category.label,
              value: category.value,
            }))
          );
        }

        methods.reset({
          value: editData.value,
          fittingSizeId: editData.fittingSizeId,
          stepTypeId: editData.stepTypeId,
          stepCardId: editData.stepCardId,
          sizeMeasurementFieldId: editData.sizeMeasurementFieldId,
        });
        dispatch(setLoadingState(false));
      };
      fetchData();
    }
  }, [editData]);

  const onSubmit = async (data: FittingSizeOptionAllocationType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));

      const registrationResponse = await adminAxiosInstance({
        url: editData ? updateApi : addApi,
        method: editData ? "PUT" : "POST",
        data: {
          ...data,
          productTypeId: productTypeList?.[0]?.value,
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

  const handleStepCard = (option: any) => {
    if (option) {
      dispatch(setLoadingState(true));
      methods.setValue("stepCardId", "");
      setStepCardList([]);
      adminAxiosInstance
        .post(`${STEP_CARD_DROPDOWN_URL}/${option}`)
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setStepCardList(
              result.data.map((category: any) => ({
                label: category.label,
                value: category.value,
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <RHFFormDropdownField
            name="stepTypeId"
            label={t("COMMON.STEP_TYPE")}
            options={stepTypes}
            required
            disabled={!!editData}
            handleOptionSelect={handleStepCard}
          />
          <RHFFormDropdownField
            name="stepCardId"
            label={t("COMMON.STEP_CARD")}
            options={stepCardList}
            required
            disabled={!!editData}
          />
          <RHFFormDropdownField
            name="fittingSizeId"
            label={t("COMMON.FITTING_SIZE")}
            options={fittingSizeList}
            required
            disabled={!!editData}
          />
          <RHFFormDropdownField
            name="sizeMeasurementFieldId"
            label={t("COMMON.SIZE_MEASUREMENT_FIELD")}
            options={sizeMeasurementFields}
            required
            disabled={!!editData}
          />
          <div className="space-y-4">
            <RHFInputField name="value" label={t("COMMON.VALUE")} required />
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton label={t("COMMON.CANCEL")} href={redirectUrl} />
          <SubmitButton label={t("COMMON.SUBMIT")} disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default FittingSizeOptionAllocationComponent;
