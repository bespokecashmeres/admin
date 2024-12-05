import { AddEditWrapper, ProductFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getColorList,
  getGenderList,
  getProductTypeList,
  getRelatedProductsList,
  getSizeList,
  getYarnList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("PRODUCT");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const [
    genderListResult,
    productTypeListResult,
    sizeListResult,
    colorListResult,
    yarnListResult,
    relatedProductsResult,
  ] = await Promise.allSettled([
    getGenderList(),
    getProductTypeList(),
    getSizeList(),
    getColorList(),
    getYarnList(),
    getRelatedProductsList(),
  ]);

  const relatedProductsList =
    relatedProductsResult.status === "fulfilled"
      ? relatedProductsResult.value
      : null;
  const genderList =
    genderListResult.status === "fulfilled" ? genderListResult.value : null;
  const productTypeList =
    productTypeListResult.status === "fulfilled"
      ? productTypeListResult.value
      : null;
  const sizeList =
    sizeListResult.status === "fulfilled" ? sizeListResult.value : null;
  const colorList =
    colorListResult.status === "fulfilled" ? colorListResult.value : null;
  const yarnList =
    yarnListResult.status === "fulfilled" ? yarnListResult.value : null;

  // Optionally log or handle failures
  if (genderListResult.status === "rejected") {
    console.error("Failed to fetch gender list:", genderListResult.reason);
  }
  if (productTypeListResult.status === "rejected") {
    console.error(
      "Failed to fetch product type list:",
      productTypeListResult.reason
    );
  }
  if (sizeListResult.status === "rejected") {
    console.error("Failed to fetch size list:", sizeListResult.reason);
  }
  if (colorListResult.status === "rejected") {
    console.error("Failed to fetch color list:", colorListResult.reason);
  }
  if (yarnListResult.status === "rejected") {
    console.error("Failed to fetch yarn list:", yarnListResult.reason);
  }
  if (relatedProductsResult.status === "rejected") {
    console.error("Failed to fetch yarn list:", relatedProductsResult.reason);
  }

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <ProductFormComponent
        genderList={genderList}
        productTypeList={productTypeList}
        sizeList={sizeList}
        colorList={colorList}
        yarnList={yarnList}
        relatedProductsList={relatedProductsList}
      />
    </AddEditWrapper>
  );
};

export default Add;
