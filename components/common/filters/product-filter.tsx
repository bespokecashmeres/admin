"use client";

import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import {
  CHILD_CATEGORY_DROPDOWN_URL,
  GENDER_DROPDOWN_URL,
  MAIN_CATEGORY_DROPDOWN_URL,
  PRODUCT_TYPE_DROPDOWN_URL,
  SUB_CATEGORY_DROPDOWN_URL,
  SUB_CHILD_CATEGORY_DROPDOWN_URL
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType } from "@/types";
import { getAWSImageUrl } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { DropdownField } from "../inputs";

interface ProductFilterProps {
  filter: Record<string, any>;
  handleFilter: (filter: Record<string, any>) => void;
}

const ProductFilter: FC<ProductFilterProps> = ({ filter, handleFilter }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [genders, setGenders] = useState<DropDownOptionType[]>([]);
  const [gender, setGender] = useState("");
  const [mainCategories, setMainCategories] = useState<DropDownOptionType[]>(
    []
  );
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<DropDownOptionType[]>([]);
  const [subCategory, setSubCategory] = useState("");
  const [childCategories, setChildCategories] = useState<DropDownOptionType[]>(
    []
  );
  const [childCategory, setChildCategory] = useState("");
  const [subChildCategories, setSubChildCategories] = useState<
    DropDownOptionType[]
  >([]);
  const [subChildCategory, setSubChildCategory] = useState("");
  const [productTypes, setProductTypes] = useState<DropDownOptionType[]>([]);
  const [productType, setProductType] = useState("");

  const handleGenderChange = (value: string) => {
    setGender(value);
    setMainCategory("");
    setSubCategory("");
    setChildCategory("");
    setSubChildCategory("");
    if (!value) {
      handleFilter({
        genderId: undefined,
        mainCategoryId: undefined,
        subCategoryId: undefined,
        childCategoryId: undefined,
        subChildCategoryId: undefined,
      });
      setMainCategories([]);
      setSubCategories([]);
      setChildCategories([]);
      setSubChildCategories([]);
      return;
    }
    dispatch(setLoadingState(true));
    adminAxiosInstance
      .post(MAIN_CATEGORY_DROPDOWN_URL, {
        genderId: value,
      })
      .then((response) => {
        const result = response.data as any;
        if (result.success) {
          setMainCategories(
            result.data.map((category: any) => ({
              label: category.label,
              value: category.value,
              image: getAWSImageUrl(category.image),
            }))
          );

          handleFilter({
            genderId: value,
            mainCategoryId: undefined,
            subCategoryId: undefined,
            childCategoryId: undefined,
            subChildCategoryId: undefined,
          });
        } else {
          toast.error(result?.message || t(MESSAGES.SOMETHING_WENT_WRONG));
          return;
        }
      })
      .catch((err) => {
        console.log("eee", err);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      })
      .finally(() => {
        dispatch(setLoadingState(false));
      });
  };

  const handleMainCategoryChange = (value: string) => {
    setMainCategory(value);
    setSubCategory("");
    setChildCategory("");
    setSubChildCategory("");
    if (!value) {
      handleFilter({
        mainCategoryId: undefined,
        subCategoryId: undefined,
        childCategoryId: undefined,
        subChildCategoryId: undefined,
      });
      setSubCategories([]);
      setChildCategories([]);
      setSubChildCategories([]);
      return;
    }
    dispatch(setLoadingState(true));
    adminAxiosInstance
      .post(SUB_CATEGORY_DROPDOWN_URL, {
        genderId: gender,
        mainCategoryId: value,
      })
      .then((response) => {
        const result = response.data as any;
        if (result.success) {
          setSubCategories(
            result.data.map((category: any) => ({
              label: category.label,
              value: category.value,
              image: getAWSImageUrl(category.image),
            }))
          );

          handleFilter({
            mainCategoryId: value,
            subCategoryId: undefined,
            childCategoryId: undefined,
            subChildCategoryId: undefined,
          });
        } else {
          toast.error(result?.message || t(MESSAGES.SOMETHING_WENT_WRONG));
          return;
        }
      })
      .catch((err) => {
        console.log("eee", err);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      })
      .finally(() => {
        dispatch(setLoadingState(false));
      });
  };

  const handleSubCategoryChange = (value: string) => {
    setSubCategory(value);
    setChildCategory("");
    setSubChildCategory("");
    if (!value) {
      handleFilter({
        subCategoryId: undefined,
        childCategoryId: undefined,
        subChildCategoryId: undefined,
      });
      setChildCategories([]);
      setSubChildCategories([]);
      return;
    }
    dispatch(setLoadingState(true));
    adminAxiosInstance
      .post(CHILD_CATEGORY_DROPDOWN_URL, {
        genderId: gender,
        mainCategoryId: mainCategory,
        subCategoryId: value,
      })
      .then((response) => {
        const result = response.data as any;
        if (result.success) {
          setChildCategories(
            result.data.map((category: any) => ({
              label: category.label,
              value: category.value,
              image: getAWSImageUrl(category.image),
            }))
          );

          handleFilter({
            subCategoryId: value,
            childCategoryId: undefined,
            subChildCategoryId: undefined,
          });
        } else {
          toast.error(result?.message || t(MESSAGES.SOMETHING_WENT_WRONG));
          return;
        }
      })
      .catch((err) => {
        console.log("eee", err);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      })
      .finally(() => {
        dispatch(setLoadingState(false));
      });
  };

  const handleChildCategoryChange = (value: string) => {
    setChildCategory(value);
    setSubChildCategory("");
    if (!value) {
      handleFilter({
        childCategoryId: undefined,
        subChildCategoryId: undefined,
      });
      setSubChildCategories([]);
      return;
    }
    dispatch(setLoadingState(true));
    adminAxiosInstance
      .post(SUB_CHILD_CATEGORY_DROPDOWN_URL, {
        genderId: gender,
        mainCategoryId: mainCategory,
        subCategoryId: subCategory,
        childCategoryId: value,
      })
      .then((response) => {
        const result = response.data as any;
        if (result.success) {
          setSubChildCategories(
            result.data.map((category: any) => ({
              label: category.label,
              value: category.value,
              image: getAWSImageUrl(category.image),
            }))
          );
          handleFilter({
            childCategoryId: value,
            subChildCategoryId: undefined,
          });
        } else {
          toast.error(result?.message || t(MESSAGES.SOMETHING_WENT_WRONG));
          return;
        }
      })
      .catch((err) => {
        console.log("eee", err);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      })
      .finally(() => {
        dispatch(setLoadingState(false));
      });
  };

  const handleSubChildCategoryChange = (value: string) => {
    setSubChildCategory(value);
    if (!value) {
      handleFilter({
        subChildCategoryId: undefined,
      });
      return;
    }
    handleFilter({
      subChildCategoryId: value,
    });
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        dispatch(setLoadingState(true));
        const [genderResponse, productTypeResponse] = await Promise.all([
          adminAxiosInstance.post(`${GENDER_DROPDOWN_URL}`),
          adminAxiosInstance.post(`${PRODUCT_TYPE_DROPDOWN_URL}`),
        ]);

        if (genderResponse.data.success) {
          const filteredGenderList = genderResponse.data?.data?.map(
            (gender: { value: string; label: string }) => ({
              value: gender.value,
              label: gender.label,
            })
          );
          setGenders(filteredGenderList);
        }

        if (productTypeResponse.data.success) {
          const filteredProductTypeList = productTypeResponse.data?.data?.map(
            (productType: any) => ({
              value: productType?.value,
              label: `${productType?.label}`,
            })
          );
          setProductTypes(filteredProductTypeList);
        }
      } catch (err) {
        console.log("Error fetching dropdown data:", err);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      } finally {
        dispatch(setLoadingState(false));
      }
    };

    fetchDropdownData();
  }, []);

  const handleProductTypeChange = (value: string) => {
    setProductType(value);
    if (!value) {
      handleFilter({
        productTypeId: undefined,
      });
      return;
    }
    handleFilter({
      productTypeId: value,
    });
  };

  return (
    <div className="flex flex-wrap w-full gap-2">
      <div className="flex-col md:flex-row flex gap-2 w-full">
        {!CONFIG.hideProductType && (
          <DropdownField
            name="product_type_dropdown"
            label={t("PRODUCT_TYPE.TITLE")}
            options={productTypes}
            value={productType}
            onChange={handleProductTypeChange}
          />
        )}
        <DropdownField
          name="gender_dropdown"
          label={t("COMMON.GENDER")}
          options={genders}
          value={gender}
          onChange={handleGenderChange}
        />
        <DropdownField
          name="main_category_dropdown"
          label={t("MAIN_CATEGORY.TITLE")}
          options={mainCategories}
          value={mainCategory}
          onChange={handleMainCategoryChange}
        />
      </div>
      <div className="flex-col md:flex-row flex gap-2 w-full">
        <DropdownField
          name="sub_category_dropdown"
          label={t("SUB_CATEGORY.TITLE")}
          options={subCategories}
          value={subCategory}
          onChange={handleSubCategoryChange}
        />
        <DropdownField
          name="child_category_dropdown"
          label={t("CHILD_CATEGORY.TITLE")}
          options={childCategories}
          value={childCategory}
          onChange={handleChildCategoryChange}
        />
        <DropdownField
          name="sub_child_category_dropdown"
          label={t("SUB_CHILD_CATEGORY.TITLE")}
          options={subChildCategories}
          value={subChildCategory}
          onChange={handleSubChildCategoryChange}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
