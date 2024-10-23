import { Locale } from "@/types";

const CONFIG = {
  defaultLocale: "da" as Locale,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  adminDomainURL: process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL
} as const;

export default CONFIG;
