"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { PasswordField } from "@/components";
import { useTranslations } from "next-intl";

interface RHFPasswordFieldProps {
  name: string;
  label: string;
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean; // Prop for disabling the field
}

const RHFPasswordField: React.FC<RHFPasswordFieldProps> = ({
  name,
  label,
  required = false,
  infoText = "",
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
      ...rules, // Spread the passed rules object
    },
  });
  return (
    <PasswordField
      {...field}
      label={label}
      error={error?.message}
      required={required}
      infoText={infoText}
      disabled={disabled} // Pass disabled state to PasswordField
    />
  );
};

export default RHFPasswordField;
