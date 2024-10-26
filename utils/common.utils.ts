import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { getUserLocale } from "@/config/locale";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { LOCAL_STORAGE, MESSAGES } from "@/constants";
import { AxiosRequestConfig, AxiosResponse } from "axios";
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