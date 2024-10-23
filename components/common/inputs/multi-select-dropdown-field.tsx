"use client";

// components/MultiSelectField.tsx
import React, { useMemo } from "react";
import Select from "react-select";
import clsx from "clsx";
import Tooltip from "@/components/tooltip";

interface OptionType {
  value: string;
  label: string;
  image?: string;
}

interface MultiSelectFieldProps {
  label: string;
  options: OptionType[];
  value: string[]; // Array of values for multi-select
  onChange?: (value: string[]) => void; // Optional callback for when the value changes
  required?: boolean;
  infoText?: string;
  error?: string;
  disabled?: boolean;
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

const MultiSelectField = React.forwardRef<
  HTMLInputElement,
  MultiSelectFieldProps
>(
  (
    { label, error, required, infoText, disabled, options, value, onChange },
    ref
  ) => {
    // Convert values (e.g., ["option1", "option2"]) to full objects for react-select
    const selectedOptions = useMemo(
      () => options.filter((option) => value.includes(option.value)),
      [value]
    );

    // Handle change event
    const handleChange = (selectedOptions: any) => {
      const values = selectedOptions.map((option: any) => option.value);
      if (onChange) {
        onChange(values); // Only pass the values array back
      }
    };

    return (
      <div className="w-full mb-4">
        <label
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

        <Select
          isMulti
          value={selectedOptions} // Display the full object
          onChange={handleChange} // Handle value change
          options={options}
          isDisabled={disabled}
          components={{ Option: CustomOption }}
          className="react-select-container shadow-none focus:shadow-none"
          classNames={{
            indicatorsContainer: () => "fill-black dark:fill-white",
            control: () =>
              clsx(
                "border-stroke pr-1 py-0.5 dark:border-gray-600 dark:bg-gray-800 outline-none",
                error
                  ? "border-red-500 dark:border-red-500 text-red-500 dark:text-red-500"
                  : "",
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:cursor-not-allowed"
                  : ""
              ),
            menuList: () =>
              "text-gray-800 bg-gray-100 dark:border-gray-200 dark:text-gray-200 dark:bg-gray-800",
            multiValueLabel: () => "text-gray-800 dark:text-gray-200",
            multiValue: () => "dark:bg-gray-600",
          }}
          classNamePrefix="react-select"
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
              },
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

export default MultiSelectField;
