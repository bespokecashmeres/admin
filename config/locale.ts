"use server";

import { cookies } from "next/headers";
import { Locale } from "@/types";
import CONFIG from "@/config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getCookieData() {
  const cookieData = cookies()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}

export async function getUserLocale() {
  const cookieData: any = await getCookieData()

  return cookieData?.get(COOKIE_NAME)?.value || CONFIG.defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
