import clsx from "clsx";
import React from "react";

interface RadioFieldProps {
  label: string;
  value: string;
  name: string;
  error?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: (value: string) => void; // Function to handle changes
}

const RadioField = React.forwardRef<HTMLInputElement, RadioFieldProps>(
  ({ label, name, value, checked, onChange, error, disabled }, ref) => {
    return (
      <div className="flex items-center mb-2">
        {/* Start */}
        <label className="flex items-center">
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            className={clsx("form-radio", { "form-radio-error": !!error })}
            disabled={disabled}
            checked={checked} // Manage checked state
            onChange={() => onChange(value)} // Update value on change
          />
          <span className="text-sm ml-2">{label}</span>
        </label>
        {/* End */}
      </div>
    );
  }
);

export default RadioField;
