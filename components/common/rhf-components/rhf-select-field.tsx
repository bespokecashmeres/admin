import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DropdownField from '../inputs/dropdown-field';

interface RHFFormDropdownFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[]; // Options for the dropdown
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean; // Prop for disabling the field
}

const RHFFormDropdownField: React.FC<RHFFormDropdownFieldProps> = ({
  name,
  label,
  options,
  required = false,
  infoText = '',
  rules = {},
  disabled = false,
}) => {
  const {
    control,
  } = useFormContext(); // Hook form context

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? `${label} is required` : false,
        ...rules, // Spread the passed rules object
      }}
      render={({ field, fieldState: { error } }) => (
        <DropdownField
          {...field} // Pass all field props from react-hook-form
          label={label}
          error={error?.message}
          options={options} // Pass the options to DropdownField
          required={required}
          infoText={infoText}
          disabled={disabled} // Pass disabled state to DropdownField
        />
      )}
    />
  );
};

export default RHFFormDropdownField;
