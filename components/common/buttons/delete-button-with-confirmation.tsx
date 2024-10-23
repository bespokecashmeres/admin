"use client";

import { ModalBlank } from "@/components/ui";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const DeleteButtonWithConfirmation = ({
  deleteId,
  handleDelete,
}: {
  handleDelete: (deleteId: string) => void;
  deleteId: string;
}) => {
  const t = useTranslations();
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        className="text-rose-500 hover:text-rose-600 rounded-full"
        onClick={() => {
          setInfoModalOpen(true);
          handleDelete(deleteId);
        }}
      >
        <span className="sr-only">{t("COMMON.DELETE")}</span>
        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
          <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
          <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
        </svg>
      </button>
      <ModalBlank isOpen={infoModalOpen} setIsOpen={setInfoModalOpen}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100 dark:bg-indigo-500/30">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-indigo-500"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {t("COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_ITEM")}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                onClick={() => {
                  setInfoModalOpen(false);
                }}
              >
                {t("COMMON.CANCEL")}
              </button>
              <button
                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => {
                  setInfoModalOpen(false);
                }}
              >
                {t("COMMON.YES")}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
    </div>
  );
};

export default DeleteButtonWithConfirmation;
