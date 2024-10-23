"use client";

import { MESSAGES } from "@/constants";
import { useTranslations } from "next-intl";
import React, { Fragment } from "react";

const LoadingMessage = () => {
  const t = useTranslations();
  return <Fragment>{t(MESSAGES.LOADING)}...</Fragment>;
};

export default LoadingMessage;
