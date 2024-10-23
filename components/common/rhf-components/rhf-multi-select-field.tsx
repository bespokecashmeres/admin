"use client";

// components/FormMultiSelect.tsx
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { MultiSelectField } from "@/components";
import { useTranslations } from "next-intl";

interface FormMultiSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string; image?: string }[];
  rules?: any; // Validation rules
  required?: boolean;
  infoText?: string;
  disabled?: boolean;
}

const RHFMultiSelectDropdownField: React.FC<FormMultiSelectProps> = ({
  label,
  name,
  options,
  rules = {},
  required = false,
  infoText = "",
  disabled = false,
}) => {
  const t = useTranslations();
  const { control } = useFormContext(); // Hook form context
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? t("COMMON.REQUIRED_MESSAGE", { label }) : false,
      ...rules, // Spread the passed rules object
    },
  });

  return (
    <MultiSelectField
      label={label}
      options={options}
      value={value || []} // Handle default value as an empty array
      onChange={onChange} // Hook Form handles this
      required={required}
      infoText={infoText}
      error={error?.message}
      disabled={disabled}
    />
  );
};

export default RHFMultiSelectDropdownField;
