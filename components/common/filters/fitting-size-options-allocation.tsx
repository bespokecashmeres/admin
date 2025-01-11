"use client";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import {
  SIZE_MEASUREMENT_FIELDS_DROPDOWN_URL,
  STEP_CARD_DROPDOWN_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { DropdownField } from "../inputs";

interface FittingSizeOptionFilterProps {
  filter: Record<string, any>;
  handleFilter: (filter: Record<string, any>) => void;
  fittingSizes: DropDownOptionType[];
  stepTypes: DropDownOptionType[];
  productTypeId: string;
  sizeMeasurementFieldData: DropDownOptionType[];
}

const FittingSizeOptionAllocations = ({
  fittingSizes,
  stepTypes,
  productTypeId,
  filter,
  handleFilter,
  sizeMeasurementFieldData
}: FittingSizeOptionFilterProps) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [fittingSize, setFittingSize] = useState("");
  const [stepType, setStepType] = useState("");
  const [stepCard, setStepCard] = useState("");
  const [fittingSizeOption, setFittingSizeOption] = useState("");
  const [stepCardList, setStepCardList] = useState<DropDownOptionType[]>([]);

  const handleFittingSizeChange = (value: string) => {
    setFittingSize(value);
    setFittingSizeOption("");
    if (!value) {
      handleFilter({
        fittingSizeId: undefined,
        sizeMeasurementFieldId: fittingSizeOption || undefined,
        stepCardId: stepCard || undefined,
        stepTypeId: stepType || undefined,
      });
      return;
    }
  };

  const handleStepCardChange = (value: string) => {
    const newValue = value || undefined;
    setStepCard(newValue ?? "");
    handleFilter({
      stepTypeId: stepType || undefined,
      stepCardId: newValue,
      fittingSizeId: fittingSize || undefined,
      sizeMeasurementFieldId: fittingSizeOption || undefined,
    });
  };

  const handleFittingSizeOptionChange = (value: string) => {
    const newValue = value || undefined;
    setFittingSizeOption(newValue ?? "");
    handleFilter({
      stepTypeId: stepType || undefined,
      stepCardId: stepCard || undefined,
      fittingSizeId: fittingSize || undefined,
      sizeMeasurementFieldId: newValue,
    });
  };

  const handleStepTypesChange = (value: string) => {
    setStepType(value);
    setStepCard("");
    if (!value) {
      handleFilter({
        stepTypeId: undefined,
        stepCardId: undefined,
        fittingSizeId: fittingSize || undefined,
        sizeMeasurementFieldId: fittingSizeOption || undefined,
      });
      setStepCardList([]);
      return;
    }
    dispatch(setLoadingState(true));
    adminAxiosInstance
      .post(`${STEP_CARD_DROPDOWN_URL}/${value}`)
      .then((response) => {
        const result = response.data as any;
        if (result.success) {
          setStepCardList(
            result.data.map((category: any) => ({
              label: category.label,
              value: category.value,
            }))
          );
          handleFilter({
            stepTypeId: value,
            stepCardId: stepCard || undefined,
            fittingSizeId: fittingSize || undefined,
            sizeMeasurementFieldId: fittingSizeOption || undefined,
          });
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
  };

  return (
    <div className="flex flex-wrap w-full gap-2">
      <div className="flex-col md:flex-row flex gap-2 w-full">
        <DropdownField
          name="step_type_dropdown"
          label={t("COMMON.STEP_TYPE")}
          options={stepTypes}
          value={stepType}
          onChange={handleStepTypesChange}
        />
        <DropdownField
          name="step_card_dropdown"
          label={t("COMMON.STEP_CARD")}
          options={stepCardList}
          value={stepCard}
          onChange={handleStepCardChange}
        />
        <DropdownField
          name="fitting_size_dropdown"
          label={t("COMMON.FITTING_SIZE")}
          options={fittingSizes}
          value={fittingSize}
          onChange={handleFittingSizeChange}
        />
        <DropdownField
          name="fitting_size_option_dropdown"
          label={t("COMMON.SIZE_MEASUREMENT_FIELD")}
          options={sizeMeasurementFieldData}
          value={fittingSizeOption}
          onChange={handleFittingSizeOptionChange}
        />
      </div>
    </div>
  );
};

export default FittingSizeOptionAllocations;
