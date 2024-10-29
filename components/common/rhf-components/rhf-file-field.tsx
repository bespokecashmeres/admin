"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { FileField } from "@/components";
import { useTranslations } from "next-intl";

interface RHFFileFieldProps {
  name: string;
  label: string;
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean;
  accept?: string;
  url?: string;
  fileType?: "image" | "pdf";
}

const RHFFileField: React.FC<RHFFileFieldProps> = ({
  name,
  label,
  required = false,
  infoText = "",
  rules = {},
  disabled = false,
  accept = "*",
  url,
  fileType
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
      required: required ? t("COMMON.REQUIRED_MESSAGE", {label}) : false,
      ...rules,
    },
  });

  return (
    <FileField
      label={label}
      name={name}
      value={field.value}
      required={required}
      infoText={infoText}
      error={error?.message}
      disabled={disabled}
      accept={accept}
      onChange={(file) => field.onChange(file)}
      url={url}
      fileType={fileType}
    />
  );
};

export default RHFFileField;
