"use client";

import { FittingSizeOptionsComponent, LoadingMessage } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import {
  FITTING_SIZE_OPTIONS_ADD_URL,
  FITTING_SIZE_OPTIONS_GET_URL,
  FITTING_SIZE_OPTIONS_UPDATE_URL,
} from "@/constants/apis";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditComponent = ({
  id,
  productTypeData,
  fittingSizeData,
}: {
  id: string;
  fittingSizeData: DropDownOptionType[];
  productTypeData: DropDownOptionType[];
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${FITTING_SIZE_OPTIONS_GET_URL}/${id}`)
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
    <FittingSizeOptionsComponent
      editData={editData}
      addApi={FITTING_SIZE_OPTIONS_ADD_URL}
      redirectUrl={FULL_PATH_ROUTES.adminFittingFittingSizeOptions}
      updateApi={FITTING_SIZE_OPTIONS_UPDATE_URL}
      productTypeList={productTypeData}
      fittingSizeList={fittingSizeData}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
