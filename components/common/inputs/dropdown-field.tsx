"use client";

import React, { useMemo } from "react";
import Select from "react-select";
import clsx from "clsx";
import Tooltip from "@/components/tooltip";

interface DropdownFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  options: { value: string; label: string }[]; // Array of options for the dropdown
  required?: boolean;
  infoText?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (value: any) => void; // Optional onChange handler
  value: any; // Controlled value from react-hook-form
  isClearable?: boolean;
}

const CustomOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center py-2 pl-2 bg-gray-100 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200"
    >
      {data.image && (
        <img src={data.image} alt={data.label} className="w-6 h-6 mr-2" />
      )}
      <span>{data.label}</span>
    </div>
  );
};

const DropdownField = React.forwardRef<HTMLInputElement, DropdownFieldProps>(
  (
    {
      label,
      name,
      placeholder = "",
      error,
      required,
      infoText,
      disabled,
      options,
      value,
      onChange,
      isClearable = true
    },
    ref
  ) => {
    const selectedOption = useMemo(
      () => options.find((option) => value.includes(option.value)),
      [value]
    );

    // Handle change event
    const handleChange = (selectedOption: any) => {
      if (onChange) {
        onChange(selectedOption?.value ?? ""); // Call the onChange handler if provided
      }
    };

    return (
      <div className="w-full mb-4">
        {label && <label
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
        </label>}
        <Select
          id={name}
          name={name}
          value={selectedOption} // Controlled value
          onChange={handleChange} // Update state on change
          options={options} // Pass options for dropdown
          isDisabled={disabled} // Disable the dropdown if necessary
          isClearable={isClearable}
          placeholder={placeholder}
          hideSelectedOptions
          components={{ Option: CustomOption }}
          className="react-select-container shadow-none focus:shadow-none text-white"
          classNames={{
            indicatorsContainer: () => "fill-black dark:fill-white",
            clearIndicator: () => "fill-black dark:fill-white",
            dropdownIndicator: () => "fill-black dark:fill-white",
            control: () =>
              clsx(
                "text-white border-stroke pr-1 py-0.5 dark:border-gray-600 dark:bg-gray-800 outline-none",
                error
                  ? "border-red-500 dark:border-red-500 text-red-500 dark:text-red-500"
                  : "",
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:cursor-not-allowed"
                  : ""
              ),
            menuList: () =>
              "text-gray-800 bg-gray-100 dark:border-gray-200 dark:text-gray-200 dark:bg-gray-800",
            singleValue: () => "text-gray-800 dark:text-gray-200",
            valueContainer: () => "text-dark dark:text-white",
            placeholder: () => "text-gray-800 dark:text-gray-300"
          }}
          classNamePrefix="react-select" // Class prefix for custom styling
          styles={{
            menu: (provided: any) => ({
              ...provided,
              zIndex: 9999,
            }),
            input: (provided: any) => ({
              ...provided,
              boxShadow: "none",
              "& input": {
                boxShadow: "none !important",
                color: "#B0B0B0 !important",
              },
              color: "unset"
            }),
            valueContainer: (provided: any) => ({
              ...provided,
              paddingLeft: "6px",
            }),
          }}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default DropdownField;
