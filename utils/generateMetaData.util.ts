import { APP_NAME, ADMIN_GENERAL_INFO } from "@/constants";
import { getTranslations } from "next-intl/server";

export const viewportData = {
  width: "device-width",
  initialScale: 1,
};

export async function generateAdminPageMetadata({ title }: { title: string }) {
  const metaT = await getTranslations("META_DATA");
  const description = metaT("DESCRIPTION", { title, APP_NAME });

  return {
    title,
    description,
    openGraph: {
      title: APP_NAME,
      description,
      images: [{ url: ADMIN_GENERAL_INFO?.logo }],
      url: ADMIN_GENERAL_INFO?.website,
      type: "website",
    },
  };
}

// export async function generatePageMetadata({ title }: { title: string }) {
//   const metaT = await getTranslations("FRONT.META_DATA");
//   const description = metaT("DESCRIPTION", { title, APP_NAME });
//   return {
//     title,
//     description,
//     keywords: "Custom-made suits, Tailored clothing, Personalized garments, Men's and women's fashion, Bespoke tailoring, High-quality materials, Custom shirts, Tailored coats, Event packages (wedding, corporate), Søren John Hansen, Fashion consultation, Danish fashion brand, Sustainable fashion, Tailor-made shoes, Modern production techniques",
//     alternates: {
//       canonical: GENERAL_INFO?.website,
//     },
//     openGraph: {
//       title: APP_NAME,
//       description,
//       images: [{ url: GENERAL_INFO?.adminLogo }],
//       url: GENERAL_INFO?.website,
//       type: "website",
//     },
//   };
// }
