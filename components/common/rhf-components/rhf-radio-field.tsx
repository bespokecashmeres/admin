"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { RadioField } from "@/components";
import { useTranslations } from "next-intl";

interface RHFRadioGroupProps {
  label?: string;
  name: string;
  options: { value: string; label: string }[]; // Array of options with value and label
  required?: boolean;
  rules?: object;
  disabled?: boolean;
}

const RHFRadioGroup: React.FC<RHFRadioGroupProps> = ({
  label,
  name,
  options,
  required = false,
  rules = {},
  disabled = false,
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
      required: required ? t("COMMON.REQUIRED_MESSAGE", { label: label ?? name }) : false,
      ...rules, // Spread the passed rules object
    },
  });

  return (
    <div className="mb-4 text-center">
      <div className="flex justify-center gap-4 flex-wrap">
        {options.map((option) => (
          <RadioField
            key={option.value}
            label={option.label}
            value={option.value}
            error={error?.message}
            name={name}
            disabled={disabled}
            checked={field.value === option.value} // Set checked state
            onChange={field.onChange} // Pass the change handler
          />
        ))}
      </div>
      {error?.message && (
        <p className="text-sm text-red-500">{error?.message}</p>
      )}
    </div>
  );
};

export default RHFRadioGroup;
