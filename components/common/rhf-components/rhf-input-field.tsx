"use client";

import React from "react";
import { useFormContext, useController } from "react-hook-form";
import { InputField } from "@/components";
import { useTranslations } from "next-intl";

interface RHFInputFieldProps {
  name: string;
  label: string;
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean;
  type?: string;
  disableTab?: boolean;
  readOnly?: boolean;
}

const RHFInputField: React.FC<RHFInputFieldProps> = ({
  name,
  label,
  required = false,
  infoText = "",
  rules = {},
  disabled = false,
  type,
  disableTab = false,
  readOnly = false
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
    <InputField
      {...field}
      label={label}
      type={type}
      error={error?.message}
      required={required}
      infoText={infoText}
      disabled={disabled} // Pass disabled state to InputField
      disableTab={disableTab}
      readOnly={readOnly}
    />
  );
};

export default RHFInputField;
