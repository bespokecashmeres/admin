import React from "react";

interface RHFCheckboxProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  rules?: object;
  disabled?: boolean;
  value: boolean;
}

const CheckboxField = React.forwardRef<HTMLInputElement, RHFCheckboxProps>(
  ({ label, name, error, required, disabled, value, ...rest }, ref) => {
    return (
      <div>
        {/* Start */}
        <label className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="form-checkbox"
            disabled={disabled}
            checked={!!value}
            {...rest}
          />
          <span className="text-sm ml-2">{label}</span>
        </label>
        {/* Error message */}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {/* End */}
      </div>
    );
  }
);

export default CheckboxField;
