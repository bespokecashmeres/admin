"use client";

import { LoadingMessage, MeasurementTypeFormComponent } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import { MEASUREMENT_TYPE_GET_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const EditComponent = ({ id }: { id: string }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${MEASUREMENT_TYPE_GET_URL}/${id}`)
        .then((response) => {
          dispatch(setLoadingState(false));
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
          dispatch(setLoadingState(false));
          toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
        });
    };
    fetchSingleData();
  }, [id]);

  return editData ? (
    <MeasurementTypeFormComponent editData={editData} />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
