"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { MultiFileField } from "../inputs";

interface RHFMultiFileFieldProps {
  name: string;
  label: string;
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean;
  accept?: string;
  urls?: string[]; // URLs for already uploaded files
  fileType?: "image" | "pdf";
}

const RHFMultiFileField: React.FC<RHFMultiFileFieldProps> = ({
  name,
  label,
  required = false,
  infoText = "",
  rules = {},
  disabled = false,
  accept = "*",
  urls,
  fileType,
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
    <MultiFileField
      label={label}
      name={name}
      value={field.value}
      required={required}
      infoText={infoText}
      error={error?.message}
      disabled={disabled}
      accept={accept}
      onChange={(files: any) => field.onChange(files)}
      urls={urls}
      fileType={fileType}
    />
  );
};

export default RHFMultiFileField;
