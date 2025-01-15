import { getAdminToken } from "@/config/locale";
import {
  COLOR_DROPDOWN_URL,
  COLOUR_DROPDOWN_URL,
  COUNTRY_LIST_API,
  FITTING_SIZES_DROPDOWN_URL,
  GENDER_DROPDOWN_URL,
  MATERIAL_DROPDOWN_URL,
  MODULE_INFO_GET_BY_TYPE_URL,
  PATTERN_DROPDOWN_URL,
  PRODUCT_RELATED_OPTIONS_DROPDOWN_URL,
  PRODUCT_TYPE_DROPDOWN_URL,
  SIZE_DROPDOWN_URL,
  SIZE_MEASUREMENT_FIELDS_DROPDOWN_URL,
  STEP_TYPE_DETAILS_URL,
  STEP_TYPE_DROPDOWN_URL,
  STEP_TYPE_GET_URL,
  STEP_TYPE_TABS_URL,
  YARN_CARD_LIST_URL,
  YARN_DROPDOWN_URL,
} from "@/constants/apis";
import { getLocale, getTranslations } from "next-intl/server";
import { handleApiCall } from "./common.utils";

export const getGenderList = async () => {
  const locale = await getLocale();
  const t = await getTranslations();
  const res: any = await handleApiCall(GENDER_DROPDOWN_URL, "POST", null, {
    "Accept-Language": locale,
  });

  const filteredGenderList = res?.data?.map(
    (gender: { value: string; label: string }) => ({
      value: gender?.value,
      label: gender?.label,
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

export const getFittingSizesList = async () => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const res: any = await handleApiCall(
    FITTING_SIZES_DROPDOWN_URL,
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


export const getSizeMeasurementFieldsList = async (productTypeId: string) => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const res: any = await handleApiCall(
    SIZE_MEASUREMENT_FIELDS_DROPDOWN_URL,
    "POST",
    {
      productTypeId,
    },
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

export const getStepTypesList = async (value?: string) => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const res: any = await handleApiCall(
    `${STEP_TYPE_DROPDOWN_URL}/${value}`,
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
      slug: country?.slug,
      rowOrder: country?.rowOrder,
      label: `${country?.label}`,
    })) ?? [];

  return filteredRes;
};


export const getCurrentStepDetails = async ({ nextStepSlug, productTypeId, searchParams }: { searchParams: any, productTypeId: string, nextStepSlug: string }) => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const payload = {
    ...searchParams,
    productTypeId,
    nextStepSlug
  }
  console.log("payload: ", payload);
  const res: any = await handleApiCall(
    STEP_TYPE_DETAILS_URL,
    "POST",
    payload,
    {
      "Accept-Language": locale,
      Authorization: token,
    }
  );

  return res.data;
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

export const getStepTypeData = async () => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const res: any = await handleApiCall(
    `${STEP_TYPE_TABS_URL}`,
    "POST",
    undefined,
    {
      "Accept-Language": locale,
      Authorization: token,
    }
  );

  if (res.code === 200) {
    return res?.data;
  } else {
    return null;
  }
};

export const getSingleStepTypeData = async (_id: string) => {
  const locale = await getLocale();
  const token = await getAdminToken();
  const res: any = await handleApiCall(
    `${STEP_TYPE_GET_URL}/${_id}`,
    "GET",
    undefined,
    {
      "Accept-Language": locale,
      Authorization: token,
    }
  );

  if (res.code === 200) {
    return res?.data;
  } else {
    return null;
  }
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

export const getColourList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    COLOUR_DROPDOWN_URL,
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

export const getMaterialList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    MATERIAL_DROPDOWN_URL,
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

export const getPatternList = async () => {
  const locale = await getLocale();
  const res: any = await handleApiCall(
    PATTERN_DROPDOWN_URL,
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

export const getYarnCardList = async (searchParams: {
  [key: string]: string;
}) => {
  const {
    filter,
    search = "",
    gender,
    colour,
    material,
    pattern,
    page = 1
  } = searchParams;
  let sortBy = undefined,
    sortOrder = undefined;
  if (filter === "price-low-to-high") {
    sortBy = "price";
    sortOrder = "asc";
  } else if (filter === "price-high-to-low") {
    sortBy = "price";
    sortOrder = "desc";
  }

  const filterObj: Record<string, string> = {};

  if (gender && gender.length) {
    filterObj["genderId"] = gender;
  }

  if (colour && colour.length) {
    filterObj["colourId"] = colour;
  }

  if (material && material.length) {
    filterObj["materialId"] = material;
  }

  if (pattern && pattern.length) {
    filterObj["patternId"] = pattern;
  }

  const locale = await getLocale();
  const res: any = await handleApiCall(
    YARN_CARD_LIST_URL,
    "POST",
    {
      page,
      perPage: 10,
      search,
      sortBy,
      sortOrder,
      filter: filterObj,
    },
    {
      "Accept-Language": locale,
    }
  );

  if (res.code === 200) {
    return res?.data;
  } else {
    return {};
  }
};
