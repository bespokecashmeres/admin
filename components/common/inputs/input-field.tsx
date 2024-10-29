import React from "react";
import clsx from "clsx";
import Tooltip from "@/components/tooltip";

interface InputFieldProps {
  label: string;
  name: string;
  required?: boolean;
  infoText?: string;
  error?: string;
  disabled?: boolean; // New prop for disabling the field
  type?: string;
  disableTab?: boolean;
  readOnly?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, name, type, error, required, infoText, disabled, disableTab, readOnly, ...rest },
    ref
  ) => {
    return (
      <div className="w-full mb-4">
        <label
          htmlFor={name}
          className={clsx(
            "flex items-center mb-1 text-sm font-medium",
            "text-gray-700 dark:text-gray-300",
            error ? "text-red-500 dark:text-red-500" : "",
            disabled ? "opacity-50 cursor-not-allowed" : "" // Handle disabled state for label
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {infoText && (
            <Tooltip className="ml-2">
              <div className="text-xs text-slate-600 dark:text-slate-200 text-center">
                {infoText}
              </div>
            </Tooltip>
          )}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          disabled={disabled} // Apply disabled state to the input
          className={clsx(
            "w-full p-2 border rounded outline-none",
            "bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600",
            error
              ? "border-red-500 dark:border-red-500"
              : "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            disabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:cursor-not-allowed" // Disabled styles
              : ""
          )}
          readOnly={readOnly}
          {...(disableTab ? { tabIndex: -1 } : {})}
          {...rest}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default InputField;
