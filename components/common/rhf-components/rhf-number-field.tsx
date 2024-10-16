import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberField from '../inputs/number-input-field';

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
  infoText = '',
  rules = {},
  disabled = false,
  step = 1, // Default step is 1
  endorsement, // Pass endorsement to NumberField
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
        <NumberField
          {...field}
          label={label}
          error={error?.message}
          required={required}
          infoText={infoText}
          disabled={disabled} // Pass disabled state to NumberField
          step={step} // Pass the step value to NumberField
          endorsement={endorsement} // Pass endorsement value to NumberField
        />
      )}
    />
  );
};

export default RHFNumberField;
