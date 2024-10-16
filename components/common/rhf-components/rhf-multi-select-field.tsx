// components/FormMultiSelect.tsx
import React from "react";
import { Controller } from "react-hook-form";
import MultiSelectField from "../inputs/multi-select-dropdown-field";

interface FormMultiSelectProps {
  label: string;
  name: string;
  control: any; // React Hook Form control object
  options: { value: string; label: string; image?: string }[];
  rules?: any; // Validation rules
  required?: boolean;
  infoText?: string;
  error?: string;
  disabled?: boolean;
}

const RHFMultiSelectDropdownField: React.FC<FormMultiSelectProps> = ({
  label,
  name,
  control,
  options,
  rules = {},
  required = false,
  infoText = "",
  error = "",
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
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
      )}
    />
  );
};

export default RHFMultiSelectDropdownField;
