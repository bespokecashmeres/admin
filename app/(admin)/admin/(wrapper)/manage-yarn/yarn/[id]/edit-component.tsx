"use client";

import { LoadingMessage, YarnFormComponent } from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import { YARN_GET_URL } from "@/constants/apis";
import { DropDownOptionType } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditComponent = ({
  id,
  countries,
  colours,
  seasonalities,
  perceivedWeights,
  materials,
}:
{
  id: string;
  colours: DropDownOptionType[];
  countries: DropDownOptionType[];
  seasonalities: DropDownOptionType[];
  perceivedWeights: DropDownOptionType[];
  materials: DropDownOptionType[];
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchSingleData = async () => {
      adminAxiosInstance
        .get(`${YARN_GET_URL}/${id}`)
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
    <YarnFormComponent
      editData={editData}
      countries={countries}
      colours={colours}
      seasonalities={seasonalities}
      perceivedWeights={perceivedWeights}
      materials={materials}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
