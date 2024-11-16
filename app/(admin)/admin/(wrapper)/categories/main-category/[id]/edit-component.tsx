"use client";

import {
  LoadingMessage,
  MainCategoryFormComponent,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import { MAIN_CATEGORY_GET_URL } from "@/constants/apis";
import { DropDownOptionType } from "@/types/index";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditComponent = ({ id, genderData }: { id: string; genderData: DropDownOptionType[] }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${MAIN_CATEGORY_GET_URL}/${id}`)
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
        }).finally(() => {
          setLoading(false);
        });
    };
    fetchSingleData();
  }, [id]);

  return !loading && editData && genderData ? (
    <MainCategoryFormComponent editData={editData} genderList={genderData} />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
