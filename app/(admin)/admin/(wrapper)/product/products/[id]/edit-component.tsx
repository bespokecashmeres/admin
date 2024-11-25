"use client";

import {
  LoadingMessage,
  ProductFormComponent,
  ProductTypeFormComponent,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import { PRODUCT_GET_URL, PRODUCT_TYPE_GET_URL } from "@/constants/apis";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type EditComponentProps = {
  id: string;
  genderList: DropDownOptionType[];
  productTypeList: DropDownOptionType[];
  sizeList: DropDownOptionType[];
  colorList: DropDownOptionType[];
  yarnList: DropDownOptionType[];
  relatedProductsList: DropDownOptionType[];
};

const EditComponent: FC<EditComponentProps> = ({
  id,
  colorList,
  yarnList,
  genderList,
  productTypeList,
  sizeList,
  relatedProductsList,
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${PRODUCT_GET_URL}/${id}`)
        .then((response) => {
          const result = response.data as any;
          if (result.success) {
            setEditData(result.data);
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
          setLoading(false);
        });
    };
    fetchSingleData();
  }, [id]);

  return !loading && editData ? (
    <ProductFormComponent
      editData={editData}
      genderList={genderList}
      productTypeList={productTypeList}
      sizeList={sizeList}
      colorList={colorList}
      yarnList={yarnList}
      relatedProductsList={relatedProductsList}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
