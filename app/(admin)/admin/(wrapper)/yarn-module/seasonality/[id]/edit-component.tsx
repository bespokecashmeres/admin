"use client";

import { LoadingMessage } from "@/components";
import YarnModuleFormComponent from "@/components/common/page-component/yarn-module-form-component";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import {
  SEASONALITY_ADD_URL,
  SEASONALITY_GET_URL,
  SEASONALITY_UPDATE_URL,
} from "@/constants/apis";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditComponent = ({ id }: { id: string }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${SEASONALITY_GET_URL}/${id}`)
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
    <YarnModuleFormComponent
      editData={editData}
      addApi={SEASONALITY_ADD_URL}
      redirectUrl={FULL_PATH_ROUTES.adminYarnModuleSeasonality}
      updateApi={SEASONALITY_UPDATE_URL}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
