import { getAdminToken } from "@/config/locale";
import {
    BIND_LANGUAGE_TRANSLATE_KEY,
} from "@/constants";
import {
    COLOR_DROPDOWN_URL,
    COUNTRY_LIST_API,
    GENDER_LIST_API,
    MODULE_INFO_GET_BY_TYPE_URL,
    PRODUCT_RELATED_OPTIONS_DROPDOWN_URL,
    PRODUCT_TYPE_DROPDOWN_URL,
    SIZE_DROPDOWN_URL,
    YARN_DROPDOWN_URL,
} from "@/constants/apis";
import {
    BindLanguageTranslateKeyType,
} from "@/types/index";
import { getLocale, getTranslations } from "next-intl/server";
import { handleApiCall } from "./common.utils";

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

export const getCountryNameList = async () => {
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

  const filteredRes =
    res?.data?.map((country: any) => ({
      value: country?._id,
      label: `${country?.name}`,
      image: `${country?.flag}`,
    })) ?? [];

  return filteredRes;
};

export const getProductTypeList = async () => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const res: any = await handleApiCall(
    PRODUCT_TYPE_DROPDOWN_URL,
    "POST",
    {},
    {
      "Accept-Language": locale,
      Authorization: token,
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

export const getDropdownList = async (url: string) => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const res: any = await handleApiCall(
    url,
    "POST",
    {},
    {
      "Accept-Language": locale,
      Authorization: token,
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

export const getYarnModuleData = async (type: string) => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    `${MODULE_INFO_GET_BY_TYPE_URL}/${type}`,
    "GET",
    undefined,
    {
      "Accept-Language": locale,
    }
  );

  if (res.code === 200) {
    return res?.data;
  } else {
    return null;
  }
};
