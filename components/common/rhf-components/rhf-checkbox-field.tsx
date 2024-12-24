"use client";

import { CheckboxField } from "@/components";
import { useTranslations } from "next-intl";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

interface RHFCheckboxProps {
  name: string;
  label: string;
  required?: boolean;
  rules?: object;
  disabled?: boolean;
}

const RHFCheckboxField: React.FC<RHFCheckboxProps> = ({
  name,
  label,
  required = false,
  rules = {},
  disabled = false, // Default is not disabled
}) => {
  const t = useTranslations();
  const { control } = useFormContext(); // Hook form context
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? t("COMMON.REQUIRED_MESSAGE", { label }) : false,
      ...rules,
    },
  });

  console.log({field});

  return (
    <CheckboxField
      {...field}
      label={label}
      error={error?.message}
      required={required}
      disabled={disabled}
    />
  );
};

export default RHFCheckboxField;
