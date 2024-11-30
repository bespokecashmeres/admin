"use client";

import { FileField } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import {
  validateFileSize,
  validateImageFileType
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

const ImageUploadField = ({
  initialUrl = "",
  apiUrl,
  editDataId,
  type,
}: {
  initialUrl: string;
  apiUrl: string;
  editDataId?: string;
  type: string;
}) => {
  const t = useTranslations();
  const [fileUrl, setFileUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (file: FileList | null) => {
    if (!file || !file[0]) return;

    const fileValidationError =
      validateImageFileType(
        file,
        t("COMMON.FILE_TYPE_NOT_ALLOWED_MESSAGE"),
        ""
      ) || validateFileSize(file, t("COMMON.FILE_SIZE_MESSAGE"), "");

    if (typeof fileValidationError === "string") {
      toast.error(fileValidationError);
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file[0]);
      formData.append("type", type);
      if (editDataId) {
        formData.append("_id", editDataId);
      }

      const response = await adminAxiosInstance.post(apiUrl, formData);

      if (response.data.success) {
        toast.success(response.data?.message || t(MESSAGES.SUCCESS));
        setFileUrl(response.data?.data?.image ?? "");
      } else {
        toast.error(response.data?.message || t(MESSAGES.SOMETHING_WENT_WRONG));
      }
    } catch (error) {
      console.error(error);
      toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900 dark:bg-slate-300 bg-opacity-75 dark:bg-opacity-50">
          <div className="w-12 h-12 border-8 border-gray-200 border-t-8 border-t-[#6366F1] rounded-full animate-spin"></div>
        </div>
      )}
      <FileField
        label={t("COMMON.IMAGE")}
        name="image"
        accept="image/jpeg, image/png"
        infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
        fileType="image"
        url={fileUrl}
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </div>
  );
};

export default ImageUploadField;
