import { Locale } from "@/types/index";

const CONFIG = {
  defaultLocale: "en" as Locale,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  adminDomainURL: process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL,
  bucketDomain: process.env.NEXT_PUBLIC_BUCKET_DOMAIN,
} as const;

export default CONFIG;
