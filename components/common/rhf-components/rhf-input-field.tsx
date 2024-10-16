import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from '../inputs/input-field';

interface RHFInputFieldProps {
  name: string;
  label: string;
  required?: boolean;
  infoText?: string;
  rules?: object;
  disabled?: boolean; // New prop for disabling the field
}

const RHFInputField: React.FC<RHFInputFieldProps> = ({
  name,
  label,
  required = false,
  infoText = '',
  rules = {},
  disabled = false, // Default is not disabled
}) => {
  const {
    control,
    formState: { errors },
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
        <InputField
          {...field}
          label={label}
          error={error?.message}
          required={required}
          infoText={infoText}
          disabled={disabled} // Pass disabled state to InputField
        />
      )}
    />
  );
};

export default RHFInputField;
