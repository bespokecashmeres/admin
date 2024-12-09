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
  genders,
  countries,
  colours,
  patterns,
  occassions,
  seasonalities,
  perceivedWeights,
  fittings,
  materials,
}: // priceRanges,
{
  id: string;
  genders: DropDownOptionType[];
  colours: DropDownOptionType[];
  countries: DropDownOptionType[];
  patterns: DropDownOptionType[];
  occassions: DropDownOptionType[];
  seasonalities: DropDownOptionType[];
  perceivedWeights: DropDownOptionType[];
  fittings: DropDownOptionType[];
  materials: DropDownOptionType[];
  // priceRanges: DropDownOptionType[];
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
      genders={genders}
      countries={countries}
      colours={colours}
      patterns={patterns}
      occassions={occassions}
      seasonalities={seasonalities}
      perceivedWeights={perceivedWeights}
      fittings={fittings}
      materials={materials}
      // priceRanges={priceRanges}
    />
  ) : (
    <LoadingMessage />
  );
};

export default EditComponent;
