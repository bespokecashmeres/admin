"use client";

import React from "react";
import clsx from "clsx";
import Tooltip from "@/components/tooltip";
import { EyeOpenIcon } from "../icons";
import { useTranslations } from "next-intl";
import { getAWSImageUrl } from "@/utils/common.utils";

interface MultiFileFieldProps {
  label: string;
  name: string;
  required?: boolean;
  infoText?: string;
  error?: string;
  disabled?: boolean;
  accept?: string;
  onChange: (files: FileList | null) => void;
  urls?: string[]; // URLs for already uploaded files
  fileType?: "image" | "pdf";
  value: FileList | null;
}

const MultiFileField = React.forwardRef<HTMLInputElement, MultiFileFieldProps>(
  (
    {
      label,
      name,
      required,
      infoText,
      error,
      disabled,
      accept,
      onChange,
      urls,
      fileType,
      value,
    },
    ref
  ) => {
    const t = useTranslations();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files ?? null;
      onChange(files);
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files ?? null;
      if (files?.length) onChange(files);
    };

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

        <label
          htmlFor={name}
          className={clsx(
            "flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer",
            "bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600",
            error
              ? "border-red-500 dark:border-red-500"
              : "hover:border-blue-500 focus:outline-none",
            disabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:cursor-not-allowed"
              : ""
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span>
            {disabled
              ? t("COMMON.UPLOAD_DISABLED")
              : value && value.length
              ? Array.from(value)
                  .map((file) => file.name)
                  .join(", ")
              : t("COMMON.CLICK_DRAG_DROP_UPLOAD")}
          </span>
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          type="file"
          accept={accept}
          multiple // Allow multiple file selection
          disabled={disabled}
          onChange={handleFileChange}
          className="hidden"
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

        {/* Preview uploaded files */}
        {urls && (
          <div className="mt-2 flex flex-wrap gap-2">
            {urls.map((url, index) =>
              fileType === "image" ? (
                <img
                  src={getAWSImageUrl(url)}
                  alt={`Preview ${index}`}
                  className="max-w-full h-32 w-32 rounded"
                />
              ) : (
                <a
                  href={getAWSImageUrl(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EyeOpenIcon />
                </a>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

MultiFileField.displayName = "MultiFileField";
export default MultiFileField;
