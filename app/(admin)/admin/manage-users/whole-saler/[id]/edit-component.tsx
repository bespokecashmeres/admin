"use client";

import { LoadingMessage, WholeSalerFormComponent } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES, ROUTES } from "@/constants";
import { setLoadingState } from "@/framework/redux/reducers";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const EditComponent = ({
  id,
  countries,
}: {
  id: string;
  countries: { value: string; label: string }[];
}) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`/${ROUTES.admin}/${ROUTES.wholeSaler}/${id}`)
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
    <WholeSalerFormComponent countries={countries} editData={editData} />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
