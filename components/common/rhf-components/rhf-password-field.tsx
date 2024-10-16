import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PasswordField from '../inputs/password-input-field';

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
  infoText = '',
  rules = {},
  disabled = false, // Default is not disabled
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
        <PasswordField
          {...field}
          label={label}
          error={error?.message}
          required={required}
          infoText={infoText}
          disabled={disabled} // Pass disabled state to PasswordField
        />
      )}
    />
  );
};

export default RHFPasswordField;
