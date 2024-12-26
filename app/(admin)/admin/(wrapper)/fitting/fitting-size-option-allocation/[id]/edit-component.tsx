"use client";

import { LoadingMessage } from "@/components";
import FittingSizeOptionAllocationComponent from "@/components/common/page-component/fitting-size-option-allocation-component";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { FULL_PATH_ROUTES, MESSAGES } from "@/constants";
import {
  FITTING_SIZE_OPTION_ALLOCATION_ADD_URL,
  FITTING_SIZE_OPTION_ALLOCATION_GET_URL,
  FITTING_SIZE_OPTION_ALLOCATION_UPDATE_URL,
} from "@/constants/apis";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditComponent = ({
  id,
  productTypeData,
  fittingSizeData,
  stepTypes,
}: {
  id: string;
  fittingSizeData: DropDownOptionType[];
  productTypeData: DropDownOptionType[];
  stepTypes: DropDownOptionType[];
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${FITTING_SIZE_OPTION_ALLOCATION_GET_URL}/${id}`)
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
    <FittingSizeOptionAllocationComponent
      editData={editData}
      addApi={FITTING_SIZE_OPTION_ALLOCATION_ADD_URL}
      redirectUrl={FULL_PATH_ROUTES.adminFittingFittingSizeOptionAllocation}
      updateApi={FITTING_SIZE_OPTION_ALLOCATION_UPDATE_URL}
      productTypeList={productTypeData}
      fittingSizeList={fittingSizeData}
      stepTypes={stepTypes}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
