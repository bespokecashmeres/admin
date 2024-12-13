import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getProductTypeList, getStepTypeData } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import ManageSteps from "./manage-steps/manage-steps";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("STEP_TYPE");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

export default async function Page() {
  const [stepTypesResult, productTypesResult] = await Promise.allSettled([getStepTypeData(), getProductTypeList()]);

  const stepTypes = stepTypesResult.status === "fulfilled" ? stepTypesResult.value : [];
  const productTypes = productTypesResult.status === "fulfilled" ? productTypesResult.value : [];

  return <ManageSteps stepTypes={stepTypes} productTypes={productTypes} />;
}
