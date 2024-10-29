"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { NumberField } from "@/components";
import { useTranslations } from "next-intl";

interface RHFNumberFieldProps {
  name: string;
  label: string;
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean; // Prop for disabling the field
  step?: number; // Optional step prop
  endorsement?: React.ReactNode; // Prop for endorsement
}

const RHFNumberField: React.FC<RHFNumberFieldProps> = ({
  name,
  label,
  required = false,
  infoText = "",
  rules = {},
  disabled = false,
  step = 1, // Default step is 1
  endorsement, // Pass endorsement to NumberField
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
    <NumberField
      {...field}
      label={label}
      name={name}
      error={error?.message}
      required={required}
      infoText={infoText}
      disabled={disabled} // Pass disabled state to NumberField
      step={step} // Pass the step value to NumberField
      endorsement={endorsement} // Pass endorsement value to NumberField
    />
  );
};

export default RHFNumberField;
