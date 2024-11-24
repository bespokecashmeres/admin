"use client";

import { LoadingMessage, UserFormComponent } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES, ROUTES } from "@/constants";
import { MEASUREMENT_TYPE_ACTIVE_LIST_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { buildPath } from "@/utils/common.utils";
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
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [measurementTypeOptions, setMeasurementTypeOptions] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(buildPath(true, ROUTES.admin, ROUTES.user, id))
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
        });
    };
    const fetchMeasurementTypeOptions = async () => {
      adminAxiosInstance
        .get(MEASUREMENT_TYPE_ACTIVE_LIST_URL)
        .then((response) => {
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
          toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
        });
    };
    const fetchData = async () => {
      try {
        dispatch(setLoadingState(true));
        await Promise.all([fetchMeasurementTypeOptions(), fetchSingleData()]);
      } catch (err) {
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      } finally {
        dispatch(setLoadingState(false));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return !loading && editData && measurementTypeOptions ? (
    <UserFormComponent
      countries={countries}
      editData={editData}
      measurementTypeOptions={measurementTypeOptions}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
