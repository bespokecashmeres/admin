"use client";

import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { useTranslations } from "next-intl";
import TextareaField from "../inputs/text-area-field";

interface RHFTextareaFieldProps {
  name: string;
  label: string;
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean;
  readOnly?: boolean;
}

const RHFTextareaField: React.FC<RHFTextareaFieldProps> = ({
  name,
  label,
  required = false,
  infoText = "",
  rules = {},
  disabled = false,
  readOnly = false,
}) => {
  const t = useTranslations();
  const { control } = useFormContext();
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

  return (
    <TextareaField
      {...field}
      label={label}
      error={error?.message}
      required={required}
      infoText={infoText}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

export default RHFTextareaField;
