"use client";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DropdownField } from "../inputs";

interface FittingSizeOptionFilterProps {
  filter: Record<string, any>;
  handleFilter: (filter: Record<string, any>) => void;
  options: DropDownOptionType[];
}

const FittingSizeOptions = ({
  options,
  filter,
  handleFilter,
}: FittingSizeOptionFilterProps) => {
  const t = useTranslations();
  const [fittingSize, setFittingSize] = useState("");

  const handleChange = (value: string) => {
    const newValue = value || undefined;
    setFittingSize(newValue ?? "");
    handleFilter({
      fittingSizeId: newValue,
    });
  };

  return (
    <div className="flex w-[200px]">
      <DropdownField
        name="sub_category_dropdown"
        label={t("COMMON.FITTING_SIZE")}
        options={options}
        value={fittingSize}
        onChange={handleChange}
      />
    </div>
  );
};

export default FittingSizeOptions;
