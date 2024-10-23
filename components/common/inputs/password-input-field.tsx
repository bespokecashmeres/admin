"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Tooltip from "@/components/tooltip";
import { EyeOpenIcon, EyeCloseIcon } from "@/components";

interface PasswordFieldProps {
  label: string;
  name: string;
  required?: boolean;
  infoText?: string;
  error?: string;
  disabled?: boolean;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, name, error, required, infoText, disabled, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative">
          <input
            ref={ref}
            id={name}
            name={name}
            type={showPassword ? "text" : "password"} // Show or hide password
            disabled={disabled}
            className={clsx(
              "w-full p-2 border rounded outline-none pr-10", // Add padding on the right for the eye button
              "bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600",
              error
                ? "border-red-500 dark:border-red-500"
                : "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
              disabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:cursor-not-allowed"
                : ""
            )}
            {...rest}
          />
          <button
            type="button"
            className="absolute right-2 top-2 min-w-[2rem] flex justify-center items-center"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default PasswordField;
