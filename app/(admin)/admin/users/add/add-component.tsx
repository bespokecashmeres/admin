"use client";

import { LoadingMessage, UserFormComponent } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import { MEASUREMENT_TYPE_ACTIVE_LIST_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const AddComponent = ({
  countries,
}: {
  countries: { value: string; label: string }[];
}) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [measurementTypeOptions, setMeasurementTypeOptions] = useState(null);
  useEffect(() => {
    const fetchMeasurementTypeOptions = async () => {
      adminAxiosInstance
        .get(MEASUREMENT_TYPE_ACTIVE_LIST_URL)
        .then((response) => {
          dispatch(setLoadingState(false));
          const result = response.data as any;
          if (result.success) {
            const options = result?.data?.map((ele: any) => ({
              label: ele?.name,
              value: ele?._id,
              fields: ele?.fields,
            }));
            setMeasurementTypeOptions(options);
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
    fetchMeasurementTypeOptions();
  }, []);

  return measurementTypeOptions ? (
    <UserFormComponent
      countries={countries}
      measurementTypeOptions={measurementTypeOptions}
    />
  ) : (
    <LoadingMessage />
  );
};

export default AddComponent;
