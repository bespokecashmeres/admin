"use client";

import {
  FabricFormComponent,
  LoadingMessage,
  SizeFormComponent,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import { FABRICS_GET_URL, SIZE_GET_URL } from "@/constants/apis";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditComponent = ({
  id,
  productTypes,
}: {
  id: string;
  productTypes: DropDownOptionType[];
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${SIZE_GET_URL}/${id}`)
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
    <SizeFormComponent editData={editData} productTypes={productTypes} />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
