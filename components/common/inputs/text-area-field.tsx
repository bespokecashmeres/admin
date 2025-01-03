import Tooltip from "@/components/tooltip";
import clsx from "clsx";
import React from "react";

interface TextareaFieldProps {
  label: string;
  name: string;
  required?: boolean;
  infoText?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement, Element>) => void;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      name,
      error,
      required,
      infoText,
      disabled,
      readOnly,
      onChange,
      value,
      onBlur,
      ...rest
    },
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
            disabled ? "opacity-50 cursor-not-allowed" : ""
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
        <textarea
          ref={ref}
          id={name}
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx(
            "w-full p-2 border rounded outline-none",
            "bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600",
            error
              ? "border-red-500 dark:border-red-500"
              : "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            disabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:cursor-not-allowed"
              : ""
          )}
          readOnly={readOnly}
          {...rest}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default TextareaField;
