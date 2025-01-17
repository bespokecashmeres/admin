"use client";

import { FittingSizeOptionsComponent, LoadingMessage } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import {
  SIZE_MEASUREMENT_FIELDS_ADD_URL,
  SIZE_MEASUREMENT_FIELDS_GET_URL,
  SIZE_MEASUREMENT_FIELDS_UPDATE_URL,
} from "@/constants/apis";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditComponent = ({
  id,
  productTypeData,
}: {
  id: string;
  productTypeData: DropDownOptionType[];
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${SIZE_MEASUREMENT_FIELDS_GET_URL}/${id}`)
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
      addApi={SIZE_MEASUREMENT_FIELDS_ADD_URL}
      redirectUrl={FULL_PATH_ROUTES.adminSizeMeasurementFields}
      updateApi={SIZE_MEASUREMENT_FIELDS_UPDATE_URL}
      productTypeList={productTypeData}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
