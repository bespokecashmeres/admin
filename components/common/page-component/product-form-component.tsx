"use client";

import {
  CancelLinkButton,
  CreateLinkButton,
  DeleteButtonWithConfirmation,
  LocaleTabs,
  RHFFileField,
  RHFFormDropdownField,
  RHFInputField,
  RHFMultiFileField,
  RHFMultiSelectDropdownField,
  RHFNumberField,
  RHFTextareaField,
  SubmitButton,
} from "@/components";
import CONFIG from "@/config";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { DEFAULT_LOCALE_VALUE, FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import {
  CHILD_CATEGORY_DROPDOWN_URL,
  MAIN_CATEGORY_DROPDOWN_URL,
  PRODUCT_ADD_URL,
  PRODUCT_UPDATE_URL,
  SUB_CATEGORY_DROPDOWN_URL,
  SUB_CHILD_CATEGORY_DROPDOWN_URL,
} from "@/constants/apis";
import { SLUG_REGEX } from "@/constants/regex";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType, Locale } from "@/types/index";
import {
  getAWSImageUrl,
  initializeLocalizedObject,
  validateFileSize,
  validateImageFileType,
} from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Container from "../DragAndDrop/container";

type ProductFormType = {
  mainCategoryId: string;
  subCategoryId?: string;
  childCategoryId?: string;
  subChildCategoryId?: string;
  productTypeId: string;
  name: Record<string, string>;
  price: number;
  discountedPrice?: number;
  slug: string;
  genderId: string;
  sizeId: string;
  relatedProducts: string[];
  noOfQuantity: number;
  quantityDiscount: number;
  colors: {
    colorId: string;
    yarnId: string;
    image: FileList | null;
    images: File[];
    description: Record<string, string>;
  }[];
  design: {
    name: Record<string, string>;
    value: Record<string, string>;
    tooltip: Record<string, string>;
  }[];
  shippingAndReturnPolicy: Record<string, string>;
};

type EditProductFormType = {
  mainCategoryId: string;
  subCategoryId?: string;
  childCategoryId?: string;
  subChildCategoryId?: string;
  productTypeId: string;
  name: Record<string, string>;
  price: number;
  discountedPrice?: number;
  slug: string;
  genderId: string;
  sizeId: string;
  relatedProducts: string[];
  noOfQuantity: number;
  quantityDiscount: number;
  colors: {
    colorId: string;
    yarnId: string;
    image: string;
    images: string[];
    description: Record<string, string>;
  }[];
  design: {
    name: Record<string, string>;
    value: Record<string, string>;
    tooltip: Record<string, string>;
  }[];
  shippingAndReturnPolicy: Record<string, string>;
  _id: string;
};

const ProductFormComponent = ({
  editData,
  genderList,
  productTypeList,
  sizeList,
  colorList,
  yarnList,
  relatedProductsList,
}: {
  editData?: EditProductFormType;
  genderList: DropDownOptionType[];
  productTypeList: DropDownOptionType[];
  sizeList: DropDownOptionType[];
  colorList: DropDownOptionType[];
  yarnList: DropDownOptionType[];
  relatedProductsList: DropDownOptionType[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Locale>(CONFIG.defaultLocale);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const [mainCategoryList, setMainCategoryList] = useState<
    DropDownOptionType[]
  >([]);
  const [subCategoryList, setSubCategoryList] = useState<DropDownOptionType[]>(
    []
  );
  const [childCategoryList, setChildCategoryList] = useState<
    DropDownOptionType[]
  >([]);
  const [subChildCategoryList, setSubChildCategoryList] = useState<
    DropDownOptionType[]
  >([]);
  const [colorsImages, setColorsImages] = useState<
    {
      deleteImages: string[];
      images: string[];
    }[]
  >([]);

  const methods = useForm<ProductFormType>({
    defaultValues: {
      name: DEFAULT_LOCALE_VALUE,
      mainCategoryId: "",
      subCategoryId: "",
      childCategoryId: "",
      subChildCategoryId: "",
      productTypeId: "",
      genderId: "",
      sizeId: "",
      relatedProducts: [],
      price: 0,
      discountedPrice: 0,
      noOfQuantity: 0,
      quantityDiscount: 0,
      colors: [
        {
          colorId: "",
          yarnId: "",
          image: null,
          images: [],
          description: DEFAULT_LOCALE_VALUE,
        },
      ],
      design: [
        {
          name: DEFAULT_LOCALE_VALUE,
          value: DEFAULT_LOCALE_VALUE,
          tooltip: DEFAULT_LOCALE_VALUE,
        },
      ],
    },
  });

  const {
    fields: colorFields,
    append: colorAppend,
    remove: colorRemove,
  } = useFieldArray({
    control: methods.control,
    name: "colors",
  });

  const {
    fields: designFields,
    append: designAppend,
    remove: designRemove,
  } = useFieldArray({
    control: methods.control,
    name: "design",
  });

  useEffect(() => {
    if (editData) {
      dispatch(setLoadingState(true));
      const defaultName = initializeLocalizedObject(editData.name);
      const defaultShippingAndReturnPolicy = initializeLocalizedObject(
        editData.shippingAndReturnPolicy
      );
      const defaultDesign = editData.design.map((design) => ({
        name: initializeLocalizedObject(design.name),
        value: initializeLocalizedObject(design.value),
        tooltip: initializeLocalizedObject(design.tooltip ?? {}),
      }));

      const fetchMissingData = async () => {
        const promiseApis = [];

        if (editData.genderId) {
          promiseApis.push(
            adminAxiosInstance.post(MAIN_CATEGORY_DROPDOWN_URL, {
              genderId: editData.genderId,
            })
          );
        } else {
          promiseApis.push(
            new Promise((resolve) => resolve({ success: true, data: [] }))
          );
        }

        if (editData.mainCategoryId) {
          promiseApis.push(
            adminAxiosInstance.post(SUB_CATEGORY_DROPDOWN_URL, {
              genderId: editData.genderId,
              mainCategoryId: editData.mainCategoryId,
            })
          );
        } else {
          promiseApis.push(
            new Promise((resolve) => resolve({ success: true, data: [] }))
          );
        }

        if (editData.subCategoryId) {
          promiseApis.push(
            adminAxiosInstance.post(CHILD_CATEGORY_DROPDOWN_URL, {
              genderId: editData.genderId,
              mainCategoryId: editData.mainCategoryId,
              subCategoryId: editData.subCategoryId,
            })
          );
        } else {
          promiseApis.push(
            new Promise((resolve) => resolve({ success: true, data: [] }))
          );
        }

        if (editData.childCategoryId) {
          promiseApis.push(
            adminAxiosInstance.post(SUB_CHILD_CATEGORY_DROPDOWN_URL, {
              genderId: editData.genderId,
              mainCategoryId: editData.mainCategoryId,
              subCategoryId: editData.subCategoryId,
              childCategoryId: editData.childCategoryId,
            })
          );
        } else {
          promiseApis.push(
            new Promise((resolve) => resolve({ success: true, data: [] }))
          );
        }

        const [
          mainCategories,
          subCategories,
          childCategories,
          subChildCategories,
        ] = await Promise.allSettled(promiseApis);
        const mainCategoryList: any =
          mainCategories.status === "fulfilled" ? mainCategories.value : [];
        const subCategoryList: any =
          subCategories.status === "fulfilled" ? subCategories.value : [];
        const childCategoryList: any =
          childCategories.status === "fulfilled" ? childCategories.value : [];
        const subChildCategoryList: any =
          subChildCategories.status === "fulfilled"
            ? subChildCategories.value
            : [];
        if (mainCategoryList.data.success) {
          setMainCategoryList(mainCategoryList.data.data);
        }
        if (subCategoryList.data.success) {
          setSubCategoryList(subCategoryList.data.data);
        }
        if (childCategoryList.data.success) {
          setChildCategoryList(childCategoryList.data.data);
        }
        if (subChildCategoryList.data.success) {
          setSubChildCategoryList(subChildCategoryList.data.data);
        }

        setColorsImages(
          editData.colors.map((color) => {
            return {
              images: color.images,
              deleteImages: [],
            };
          })
        );

        methods.reset({
          name: defaultName,
          price: editData.price || 0,
          discountedPrice: editData.discountedPrice || 0,
          noOfQuantity: editData.noOfQuantity || 0,
          quantityDiscount: editData.quantityDiscount || 0,
          slug: editData.slug,
          genderId: editData.genderId ?? "",
          mainCategoryId: editData.mainCategoryId ?? "",
          subCategoryId: editData.subCategoryId ?? "",
          childCategoryId: editData.childCategoryId ?? "",
          subChildCategoryId: editData.subChildCategoryId ?? "",
          design: defaultDesign,
          productTypeId: editData.productTypeId ?? "",
          sizeId: editData.sizeId ?? "",
          shippingAndReturnPolicy: defaultShippingAndReturnPolicy,
          relatedProducts: editData.relatedProducts,
          colors: editData.colors.map((color) => {
            return {
              colorId: color.colorId,
              yarnId: color.yarnId,
              description: initializeLocalizedObject(color.description),
              image: null,
              images: [],
            };
          }),
        });
        dispatch(setLoadingState(false));
      };
      fetchMissingData();
    }
  }, [editData]);

  const handleDelete = (image: string, index: number) => {
    const images = colorsImages[index]?.images?.filter(
      (item) => item !== image
    );
    const updatedColorsImages = [...colorsImages];
    updatedColorsImages[index] = {
      ...updatedColorsImages[index],
      images,
      deleteImages: [...updatedColorsImages[index].deleteImages, image],
    };
    setColorsImages(updatedColorsImages);
  };

  const onSubmit = async (data: ProductFormType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const formData = new FormData();
      formData.append("name", JSON.stringify(data.name));
      formData.append("price", data.price.toString());
      formData.append("noOfQuantity", data.noOfQuantity.toString());
      formData.append("quantityDiscount", data.quantityDiscount.toString());
      formData.append("slug", data.slug);
      formData.append(
        "shippingAndReturnPolicy",
        JSON.stringify(data.shippingAndReturnPolicy)
      );
      formData.append(
        "discountedPrice",
        data.discountedPrice?.toString() || ""
      );
      formData.append("mainCategoryId", data.mainCategoryId);
      if (data.subCategoryId) {
        formData.append("subCategoryId", data.subCategoryId);
      }
      if (data.childCategoryId) {
        formData.append("childCategoryId", data.childCategoryId);
      }
      if (data.subChildCategoryId) {
        formData.append("subChildCategoryId", data.subChildCategoryId);
      }
      if (productTypeList.length) {
        formData.append(
          "productTypeId",
          CONFIG.hideProductType ? productTypeList[0].value : data.productTypeId
        );
      }
      formData.append("genderId", data.genderId);
      formData.append("sizeId", data.sizeId);

      data.relatedProducts.forEach((relatedProduct, index) => {
        formData.append(`relatedProducts[${index}]`, relatedProduct);
      });
      data.design.forEach((dsign, index) => {
        formData.append(`design[${index}][name]`, JSON.stringify(dsign.name));
        formData.append(`design[${index}][value]`, JSON.stringify(dsign.value));
        formData.append(
          `design[${index}][tooltip]`,
          JSON.stringify(dsign.tooltip)
        );
      });

      data.colors.forEach((color, index) => {
        formData.append(`colors[${index}][colorId]`, color.colorId);
        formData.append(
          `colors[${index}][description]`,
          JSON.stringify(color.description)
        );
        formData.append(`colors[${index}][yarnId]`, color.yarnId);

        if (color.image?.length) {
          formData.append(`colors[${index}][image]`, color.image?.[0]);
        }

        if (color.images?.length) {
          Array.from(color.images).forEach((imageFile, imgIndex) => {
            formData.append(`colors[${index}][images]`, imageFile);
          });
        }
      });

      if (editData?._id) {
        formData.append("_id", editData._id);
        formData.append("colorsImages", JSON.stringify(colorsImages));
      }

      const registrationResponse = await adminAxiosInstance({
        url: editData ? PRODUCT_UPDATE_URL : PRODUCT_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "colors-count": `${data.colors.length}`,
        },
      });

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(FULL_PATH_ROUTES.adminProductProducts);
      } else {
        toast.error(
          registrationResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
    } finally {
      dispatch(setLoadingState(false));
      setDisableSubmit(false);
    }
  };

  const handleTabChange = (lang: Locale) => {
    setActiveTab(lang);
  };

  const validationRules = useMemo(() => {
    return {
      image: {
        validate: {
          validateImageFileType: (file: FileList) => {
            return validateImageFileType(
              file,
              t("COMMON.FILE_TYPE_NOT_ALLOWED_MESSAGE"),
              !editData
                ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.IMAGE") })
                : ""
            );
          },
          validateImageFileSize: (file: FileList) => {
            return validateFileSize(
              file,
              t("COMMON.FILE_SIZE_MESSAGE"),
              !editData
                ? t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.IMAGE") })
                : ""
            );
          },
        },
      },
      slug: {
        pattern: {
          value: SLUG_REGEX,
          message: t(MESSAGES.INVALID_SLUG),
        },
      },
    };
  }, [t, editData]);

  const handleGenderChange = (option: any) => {
    if (option) {
      dispatch(setLoadingState(true));
      methods.setValue("mainCategoryId", "");
      methods.setValue("subCategoryId", "");
      methods.setValue("childCategoryId", "");
      methods.setValue("subChildCategoryId", "");
      adminAxiosInstance
        .post(MAIN_CATEGORY_DROPDOWN_URL, {
          genderId: option,
        })
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setMainCategoryList(
              result.data.map((category: any) => ({
                label: category.label,
                value: category.value,
                image: getAWSImageUrl(category.image),
              }))
            );
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
    }
  };

  const handleMainCategoryChange = (option: any) => {
    if (option) {
      const gender = methods.getValues("genderId");
      dispatch(setLoadingState(true));
      methods.setValue("subCategoryId", "");
      methods.setValue("childCategoryId", "");
      adminAxiosInstance
        .post(SUB_CATEGORY_DROPDOWN_URL, {
          genderId: gender,
          mainCategoryId: option,
        })
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setSubCategoryList(
              result.data.map((category: any) => ({
                label: category.label,
                value: category.value,
                image: getAWSImageUrl(category.image),
              }))
            );
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
    }
  };

  const handleSubCategoryChange = (option: any) => {
    if (option) {
      const gender = methods.getValues("genderId");
      const mainCategoryId = methods.getValues("mainCategoryId");
      dispatch(setLoadingState(true));
      methods.setValue("childCategoryId", "");
      adminAxiosInstance
        .post(CHILD_CATEGORY_DROPDOWN_URL, {
          genderId: gender,
          mainCategoryId: mainCategoryId,
          subCategoryId: option,
        })
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setChildCategoryList(
              result.data.map((category: any) => ({
                label: category.label,
                value: category.value,
                image: getAWSImageUrl(category.image),
              }))
            );
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
    }
  };

  const handleChildCategoryChange = (option: any) => {
    if (option) {
      const gender = methods.getValues("genderId");
      const mainCategoryId = methods.getValues("mainCategoryId");
      const subCategoryId = methods.getValues("subCategoryId");
      dispatch(setLoadingState(true));
      methods.setValue("subChildCategoryId", "");
      adminAxiosInstance
        .post(SUB_CHILD_CATEGORY_DROPDOWN_URL, {
          genderId: gender,
          mainCategoryId: mainCategoryId,
          subCategoryId: subCategoryId,
          childCategoryId: option,
        })
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setSubChildCategoryList(
              result.data.map((category: any) => ({
                label: category.label,
                value: category.value,
                image: getAWSImageUrl(category.image),
              }))
            );
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
    }
  };

  const handleColorRemove = (index: string) => {
    const deleteKeyIndex = index as unknown as number;
    colorRemove(deleteKeyIndex);
    if (editData && colorsImages.length) {
      const updatedColorsImages = [...colorsImages];
      updatedColorsImages.splice(deleteKeyIndex, 1);
      setColorsImages(updatedColorsImages);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <LocaleTabs active={activeTab} handleTabChange={handleTabChange} />
          <div className="flex flex-col gap-x-2 gap-y-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <RHFFormDropdownField
                label={t("COMMON.GENDER")}
                name="genderId"
                options={genderList}
                handleOptionSelect={handleGenderChange}
                required
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFFormDropdownField
                label={t("MAIN_CATEGORY.TITLE")}
                name="mainCategoryId"
                options={mainCategoryList}
                handleOptionSelect={handleMainCategoryChange}
                required
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFFormDropdownField
                label={t("SUB_CATEGORY.TITLE")}
                name="subCategoryId"
                handleOptionSelect={handleSubCategoryChange}
                options={subCategoryList}
              />
            </div>
          </div>
          <div className="flex flex-col gap-x-2 gap-y-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <RHFFormDropdownField
                label={t("CHILD_CATEGORY.TITLE")}
                name="childCategoryId"
                options={childCategoryList}
                handleOptionSelect={handleChildCategoryChange}
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFFormDropdownField
                label={t("SUB_CHILD_CATEGORY.TITLE")}
                name="subChildCategoryId"
                options={subChildCategoryList}
              />
            </div>
            {!CONFIG.hideProductType && (
              <div className="w-full xl:w-1/2">
                <RHFFormDropdownField
                  label={t("COMMON.PRODUCT_TYPE")}
                  name="productTypeId"
                  options={productTypeList}
                  required
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-x-2 gap-y-4 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <RHFFormDropdownField
                label={t("SIZE.TITLE")}
                name="sizeId"
                options={sizeList}
                required
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFMultiSelectDropdownField
                label={t("COMMON.RELATED_PRODUCTS")}
                name="relatedProducts"
                options={relatedProductsList}
              />
            </div>
          </div>
          <div className="flex flex-col gap-x-2 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <RHFInputField
                name={`name.${activeTab}`}
                label={`${t("COMMON.NAME")} (${activeTab})`}
                key={`name.${activeTab}`}
                required
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFInputField
                name="slug"
                label={t("COMMON.SLUG")}
                rules={validationRules.slug}
                required
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFNumberField label={t("COMMON.PRICE")} name="price" required />
            </div>
          </div>
          <div className="flex flex-col gap-x-2 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <RHFNumberField
                label={t("COMMON.DISCOUNTED_PRICE")}
                name="discountedPrice"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFNumberField
                label={t("COMMON.NO_OF_QUANTITY")}
                name="noOfQuantity"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <RHFNumberField
                label={t("COMMON.QUANTITY_DISCOUNT")}
                name="quantityDiscount"
              />
            </div>
          </div>
          <div className="mb-4">
            <RHFTextareaField
              name={`shippingAndReturnPolicy.${activeTab}`}
              label={`${t("COMMON.SHIPPING_AND_RETURN_POLICY")} (${activeTab})`}
              key={`shippingAndReturnPolicy.${activeTab}`}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="mb-4">
              <DndProvider backend={HTML5Backend}>
                <div className="relative">
                  {colorFields.map((item: any, index) => (
                    <fieldset
                      key={item.id}
                      className="mb-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-3"
                    >
                      <legend>
                        <div className="flex items-center ml-1 mr-1">
                          <span>{t("COLOR.TITLE")}</span>
                          <DeleteButtonWithConfirmation
                            deleteId={`${index}`}
                            handleDelete={handleColorRemove}
                          />
                        </div>
                      </legend>
                      <div className="mb-4.5 flex flex-col gap-2 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <RHFFormDropdownField
                            label={t("COLOR.TITLE")}
                            name={`colors.${index}.colorId`}
                            options={colorList}
                            required
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <RHFFormDropdownField
                            label={t("YARN.TITLE")}
                            name={`colors.${index}.yarnId`}
                            options={yarnList}
                            required
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <RHFFileField
                            label={t("COMMON.IMAGE")}
                            name={`colors.${index}.image`}
                            required={!editData?.colors?.[index]?.image}
                            accept="image/jpeg, image/png"
                            infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
                            fileType="image"
                            url={editData?.colors?.[index]?.image ?? ""}
                            rules={validationRules.image}
                          />
                        </div>
                      </div>
                      <div className="mb-4.5">
                        <RHFMultiFileField
                          label={t("COMMON.IMAGES")}
                          required={!editData?.colors?.[index]?.images?.length}
                          name={`colors.${index}.images`}
                          accept="image/jpeg, image/png"
                          infoText={t("COMMON.IMAGE_ACCEPTED_FORMAT")}
                          rules={validationRules.image}
                        />
                        {!!colorsImages?.[index]?.images?.length && (
                          <Container
                            products={colorsImages[index].images}
                            setPtoductImages={(images) => {
                              setColorsImages((prev) => {
                                const updatedColorsImages = [...prev];
                                updatedColorsImages[index].images = images;
                                return updatedColorsImages;
                              });
                            }}
                            index={index}
                            handleDelete={handleDelete}
                          />
                        )}
                      </div>
                      <div className="mb-4.5">
                        <RHFTextareaField
                          name={`colors.${index}.description.${activeTab}`}
                          label={`${t("COMMON.DESCRIPTION")} (${activeTab})`}
                          key={`colors.${index}.description.${activeTab}`}
                        />
                      </div>
                    </fieldset>
                  ))}
                  <CreateLinkButton
                    label={t("COMMON.ADD_MORE_FIELDS")}
                    onClick={() =>
                      colorAppend({
                        colorId: "",
                        yarnId: "",
                        description: DEFAULT_LOCALE_VALUE,
                        image: null,
                        images: [],
                      })
                    }
                  />
                </div>
              </DndProvider>
            </div>
            <div className="mb-4">
              <div className="relative">
                {designFields.map((item: any, index) => (
                  <fieldset
                    key={item.id}
                    className="mb-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-3"
                  >
                    <legend>
                      <div className="flex items-center ml-1 mr-1">
                        <span>{t("COMMON.DESIGN")}</span>
                        <DeleteButtonWithConfirmation
                          deleteId={`${index}`}
                          handleDelete={(index) =>
                            designRemove(index as unknown as number)
                          }
                        />
                      </div>
                    </legend>
                    <div className="mb-4.5 flex flex-col gap-2 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <RHFInputField
                          name={`design.${index}.name.${activeTab}`}
                          key={`design.${index}.name.${activeTab}`}
                          label={`${t("COMMON.NAME")} (${activeTab})`}
                          required
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <RHFInputField
                          name={`design.${index}.value.${activeTab}`}
                          key={`design.${index}.value.${activeTab}`}
                          label={`${t("COMMON.VALUE")} (${activeTab})`}
                          required
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <RHFInputField
                          name={`design.${index}.tooltip.${activeTab}`}
                          key={`design.${index}.tooltip.${activeTab}`}
                          label={`${t("COMMON.TOOLTIP")} (${activeTab})`}
                        />
                      </div>
                    </div>
                  </fieldset>
                ))}
                <CreateLinkButton
                  label={t("COMMON.ADD_MORE_FIELDS")}
                  onClick={() =>
                    designAppend({
                      name: DEFAULT_LOCALE_VALUE,
                      tooltip: DEFAULT_LOCALE_VALUE,
                      value: DEFAULT_LOCALE_VALUE,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={FULL_PATH_ROUTES.adminProductProducts}
          />
          <SubmitButton label="Submit" disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductFormComponent;
