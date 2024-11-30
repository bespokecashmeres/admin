"use client";

import { TextareaField } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type EditDataType = {
  info: Record<string, string>;
  _id: string;
};

const InfoTextareaField = ({
  language,
  editData = {
    info: {},
    _id: "",
  },
  apiUrl,
  type,
}: {
  language: string;
  editData?: EditDataType;
  apiUrl: string;
  type: string;
}) => {
  const t = useTranslations();
  const [info, setInfo] = useState<string>("");
  const [defaultEditData, setDefaultEditData] =
    useState<EditDataType>(editData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInfo(defaultEditData?.info?.[language] ?? "");
  }, [language]);

  const handleBlur = async () => {
    try {
      setIsLoading(true);
      const payload = {
        info: JSON.stringify({ [language]: info }),
        type,
        ...(editData?._id ? { _id: editData?._id } : {}),
      };

      const response = await adminAxiosInstance.post(apiUrl, payload);

      if (response.data.success) {
        toast.success(response.data?.message || t(MESSAGES.SUCCESS));
        setDefaultEditData(response.data.data);
      } else {
        toast.error(response.data?.message || t("COMMON.SOMETHING_WENT_WRONG"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("COMMON.SOMETHING_WENT_WRONG"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx("relative", {
        "mt-[-60px]": isLoading,
      })}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900 dark:bg-slate-300 bg-opacity-75 dark:bg-opacity-50">
          <div className="w-12 h-12 border-8 border-gray-200 border-t-8 border-t-[#6366F1] rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className={clsx({
          "pt-[60px]": isLoading,
        })}
      >
        <TextareaField
          key={`info.${language}`}
          name={`info.${language}`}
          label={`${t("COMMON.INFO")} (${language})`}
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          onBlur={handleBlur}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default InfoTextareaField;
