"use client";

import { ModalBlank } from "@/components/ui";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES, SITE_SETTINGS } from "@/constants";
import { YARN_GET_DETAIL_URL } from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { getAWSImageUrl } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const CardSelectButton = ({ yarn }: { yarn: any }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [yarnDetails, setYarnDetails] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleOpen = () => {
    dispatch(setLoadingState(true));
    adminAxiosInstance
      .get(`${YARN_GET_DETAIL_URL}/${yarn._id}`)
      .then((response) => {
        const result = response.data as any;
        if (result.success) {
          console.log("result.data: ", result.data);
          setYarnDetails(result.data);
          setModalOpen(true);
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
        dispatch(setLoadingState(false));
      });
  };

  return (
    <>
      <button
        className="w-full bg-indigo-500 text-white py-3 rounded-b-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        onClick={handleOpen}
      >
        {t("COMMON.SELECT")}
      </button>
      <ModalBlank
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        panelClassName="max-w-full"
      >
        <div className="p-5 flex flex-col">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <div>
                <span className="font-semibold text-xl">
                  {yarnDetails?.name}
                </span>
              </div>
              <div>
                <span>{t("COMMON.NAME")}: </span>
                <span>
                  {yarnDetails?.name} - {yarnDetails?.yarnId}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="pt-2">
                <span>
                  {SITE_SETTINGS.CURRENCY}
                  {yarnDetails?.price}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white uppercase">
                  {t("COMMON.SELECT")}
                </button>
                <button
                  className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500 uppercase"
                  onClick={handleClose}
                >
                  {t("COMMON.CLOSE")}
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-col sm:flex-row">
            <img
              className="w-full h-auto sm:w-34 sm:h-34"
              src={getAWSImageUrl(yarnDetails?.image)}
              width={301}
              height={226}
              alt={yarnDetails?.yarnId}
            />
            <div className="flex flex-col w-full text-xs">
              <div className="rounded-sm border border-slate-200 dark:border-slate-700 p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex gap-2">
                    <span>{t("COMMON.GENDER")}: </span>
                    <span>{yarnDetails?.gender}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>{t("COMMON.PATTERN")}: </span>
                    <span>{yarnDetails?.pattern}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>{t("COMMON.COLOUR")}: </span>
                    <span>{yarnDetails?.colour}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>{t("COMMON.MATERIAL")}: </span>
                    <span>{yarnDetails?.material}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-sm border border-slate-200 dark:border-slate-700 p-2 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex gap-2">
                    <span>{t("COMMON.OCCASSION")}: </span>
                    <span>{yarnDetails?.occassion}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>{t("COMMON.SEASONALITY")}: </span>
                    <span>{yarnDetails?.seasonality}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>{t("COMMON.PERCEIVED_WEIGHT")}: </span>
                    <span>{yarnDetails?.perceivedWeight}</span>
                  </div>
                </div>
              </div>
              {yarnDetails?.yarns?.length && (
                <div className="rounded-sm border border-slate-200 dark:border-slate-700 p-2 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {yarnDetails?.yarns?.map((yarnValue: any) => (
                      <div className="flex gap-2">
                        {yarnValue.image && (
                          <img
                            className="w-5 h-5"
                            src={getAWSImageUrl(yarnValue.image)}
                          />
                        )}
                        <span>{yarnValue.name}: </span>
                        <span>{yarnValue?.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ModalBlank>
    </>
  );
};

export default CardSelectButton;
