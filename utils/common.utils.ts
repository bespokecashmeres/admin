import adminAxiosInstance from "@/config/adminAxiosInstance";
import { getUserLocale } from "@/config/locale";
import wsAxiosInstance from "@/config/wsAxiosInstance";
import { LOCAL_STORAGE } from "@/constants";
import { AxiosRequestConfig, AxiosResponse } from "axios";

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
        "Accept-Language": locale
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
}