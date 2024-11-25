import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { getUserLocale } from "@/config/locale";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import {
  BIND_LANGUAGE_TRANSLATE_KEY,
  IMAGE_ALLOWED_TYPES,
  LOCAL_STORAGE,
  LOCALES,
  MAX_FILE_UPLOAD_SIZE,
  MESSAGES,
  PDF_ALLOWED_TYPES,
} from "@/constants";
import {
  COLOR_DROPDOWN_URL,
  COUNTRY_LIST_API,
  YARN_DROPDOWN_URL,
  GENDER_LIST_API,
  PRODUCT_RELATED_OPTIONS_DROPDOWN_URL,
  PRODUCT_TYPE_DROPDOWN_URL,
  SIZE_DROPDOWN_URL,
} from "@/constants/apis";
import {
  AllowedImageFileType,
  AllowedPdfFileType,
  BindLanguageTranslateKeyType,
} from "@/types/index";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getLocale, getTranslations } from "next-intl/server";
import toast from "react-hot-toast";

type KeyValueObject = { [key: string]: any };

interface FetchApiConfig extends AxiosRequestConfig {
  url: string;
}

export const pickProperties = (
  obj: KeyValueObject = {},
  keys: string[]
): KeyValueObject => {
  return keys.reduce((result, key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {} as KeyValueObject);
};

export const handleApiCall = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data: any = null,
  headers: Record<string, string> = {},
  isAdmin: boolean = true
): Promise<T | {}> => {
  try {
    const locale = await getUserLocale();
    const config: FetchApiConfig = {
      url,
      method,
      headers: {
        ...headers,
        "Accept-Language": locale,
      },
    };

    if (data) {
      config.data = data;
    }
    const response: AxiosResponse<T> = await (isAdmin
      ? adminAxiosInstance
      : wsAxiosInstance)(config);
    return response.data;
  } catch (error) {
    console.log("Fetch API error:", error);
    return {};
  }
};

export const clearLocalStorageTokenAndData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE.aToken);
    localStorage.removeItem(LOCAL_STORAGE.admin);
    localStorage.removeItem(LOCAL_STORAGE.wToken);
    localStorage.removeItem(LOCAL_STORAGE.ws);
  }
};

export const statusChangeHandler = async ({
  setLoading,
  apiUrl,
  status,
  _id,
  t,
  fetchRows,
}: {
  setLoading: (value: React.SetStateAction<boolean>) => void;
  apiUrl: string;
  status: boolean;
  _id: string;
  fetchRows: () => Promise<void>;
  t: any;
}) => {
  try {
    setLoading(true);
    const response = await adminAxiosInstance.patch(apiUrl, { status, _id });
    if (response.data.success) {
      toast.success(response.data.message || t(MESSAGES.SUCCESS));
      fetchRows();
    } else {
      toast.error(response.data.message || t(MESSAGES.SOMETHING_WENT_WRONG));
      setLoading(false);
    }
  } catch (error) {
    console.error(error);
    setLoading(false);
    toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
  }
};

/**
 * Constructs a complete AWS image URL based on the provided image key.
 *
 * If no image key is provided, an empty string is returned.
 *
 * @param {string} imageKey - The key of the image in the AWS S3 bucket.
 * @returns {string} The complete URL to the image, or an empty string if no image key is provided.
 */
export const getAWSImageUrl = (imageKey?: string): string => {
  if (!imageKey) return "/images/no-image.png";
  return `${CONFIG.bucketDomain}${imageKey}`;
};

export const validateImageFileType = (
  files: FileList | null,
  message: string,
  requiredMessage: string
) => {
  if (!files || files.length === 0) {
    return requiredMessage || true; // Return the message if no file is present
  }

  const allValidTypes = Array.from(files).every((file) =>
    IMAGE_ALLOWED_TYPES.includes(file.type as AllowedImageFileType)
  );

  return allValidTypes || message; // Return true or the message
};

export const validatePdfFileType = (
  files: FileList | null,
  message: string,
  requiredMessage: string
) => {
  if (!files || files.length === 0) {
    return requiredMessage || true; // Return the message if no file is present
  }

  const allValidTypes = Array.from(files).every((file) =>
    PDF_ALLOWED_TYPES.includes(file.type as AllowedPdfFileType)
  );

  return allValidTypes || message; // Return true or the message
};

export const validateFileSize = (
  files: FileList | null,
  message: string,
  requiredMessage: string
) => {
  if (!files || files.length === 0) {
    return requiredMessage || true; // Return the message if no file is present
  }

  const allValidSizes = Array.from(files).every(
    (file) => file.size <= MAX_FILE_UPLOAD_SIZE
  );

  return allValidSizes || message; // Return true if valid size, otherwise the message
};

export const initializeLocalizedObject = (
  existingData: Record<string, string>
) => {
  return LOCALES.reduce((acc, lang) => {
    acc[lang] = existingData?.[lang] || "";
    return acc;
  }, {} as Record<string, string>);
};

// Helper Function for Path Construction
export const buildPath = (
  leadingSlash: boolean,
  ...segments: string[]
): string => (leadingSlash ? "/" : "") + segments.join("/");

// Queries

export const getGenderList = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  const res: any = await handleApiCall(GENDER_LIST_API, "GET", null, {
    "Accept-Language": locale,
  });

  const filteredGenderList = res?.data?.map(
    (gender: { _id: string; name: string }) => ({
      value: gender._id,
      label: `${t(
        BIND_LANGUAGE_TRANSLATE_KEY[gender.name as BindLanguageTranslateKeyType]
      )}`,
    })
  );

  return filteredGenderList;
};

export const getCountryList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    COUNTRY_LIST_API,
    "GET",
    null,
    {
      "Accept-Language": locale,
    },
    false
  );

  const filteredRes = res?.data?.map((country: any) => ({
    value: country?._id,
    label: `${country?.phoneCode}`,
    image: `${country?.flag}`,
  }));

  return filteredRes;
};

export const getProductTypeList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    PRODUCT_TYPE_DROPDOWN_URL,
    "POST",
    {},
    {
      "Accept-Language": locale,
    }
  );

  const filteredRes =
    res?.data?.map((country: any) => ({
      value: country?.value,
      label: `${country?.label}`,
    })) ?? [];

  return filteredRes;
};

export const getSizeList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    SIZE_DROPDOWN_URL,
    "POST",
    {},
    {
      "Accept-Language": locale,
    }
  );

  const filteredRes =
    res?.data?.map((country: any) => ({
      value: country?.value,
      label: `${country?.label}`,
    })) ?? [];

  return filteredRes;
};

export const getColorList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    COLOR_DROPDOWN_URL,
    "POST",
    {},
    {
      "Accept-Language": locale,
    }
  );

  const filteredRes =
    res?.data?.map((country: any) => ({
      value: country?.value,
      label: `${country?.label}`,
    })) ?? [];

  return filteredRes;
};

export const getYarnList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    YARN_DROPDOWN_URL,
    "POST",
    {},
    {
      "Accept-Language": locale,
    }
  );

  const filteredRes =
    res?.data?.map((country: any) => ({
      value: country?.value,
      label: `${country?.label}`,
    })) ?? [];

  return filteredRes;
};

export const getRelatedProductsList = async (_id?: string) => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    PRODUCT_RELATED_OPTIONS_DROPDOWN_URL,
    "POST",
    {
      _id,
    },
    {
      "Accept-Language": locale,
    }
  );

  const filteredRes =
    res?.data?.map((country: any) => ({
      value: country?.value,
      label: `${country?.label}`,
    })) ?? [];

  return filteredRes;
};

export const copyToClipboard = (value: string): void => {
  navigator.clipboard.writeText(value).catch((err: any) => {
    console.error("Failed to copy text:", err);
  });
};
