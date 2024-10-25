import React from "react";
import GoogleWrapper from "./google-wrapper";
// import { cookies } from "next/headers";
// import { LOCAL_STORAGE } from "@/constants";
// import { getCookieData } from "@/config/locale";

const GooglePage = async () => {
  //   const cookieData: any = await getCookieData();
  //   const token = cookieData?.get(LOCAL_STORAGE.aToken)?.value ?? '';
  //   const userData = cookieData?.get(LOCAL_STORAGE.admin)?.value ?? '';
  //   console.log(cookieData)
  //   console.log(token)
  //   console.log(userData)
  return <GoogleWrapper />;
};

export default GooglePage;
