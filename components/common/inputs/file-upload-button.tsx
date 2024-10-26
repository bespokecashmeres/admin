"use client";

import { useTranslations } from "next-intl";
import React, { useRef } from "react";

type FileUploadButtonProps = {
  onFileChange: (file: File) => void;
  onClearFile: () => void;
  hasSelectedFile: boolean;
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileChange,
  onClearFile,
  hasSelectedFile,
}) => {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (hasSelectedFile) {
      onClearFile();
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
    } else {
      fileInputRef.current?.click(); // Trigger the file input click
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file); // Pass the selected file to the parent
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
        onClick={handleButtonClick}
      >
        {t(`COMMON.${hasSelectedFile ? "CLEAR" : "CHANGE"}`)}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" // Hide the file input
      />
    </div>
  );
};

export default FileUploadButton;
