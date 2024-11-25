import { ListComponent, ProductFilter } from "@/components";
import { FULL_PATH_ROUTES } from "@/constants";
import {
  PRODUCT_LIST_URL,
  PRODUCT_ROW_REORDER_URL,
  PRODUCT_STATUS_URL,
} from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("PRODUCT");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "mainImage", header: "COMMON.IMAGE", cellType: "image" },
  { accessor: "price", header: "COMMON.PRICE", cellType: "default" },
  {
    accessor: "discountedPrice",
    header: "COMMON.DISCOUNTED_PRICE",
    cellType: "default",
  },
  { accessor: "slug", header: "COMMON.SLUG", cellType: "default" },
  {
    accessor: "gender",
    header: "COMMON.GENDER",
    cellType: "default",
    shouldTranslate: true,
  },
  {
    accessor: "noOfQuantity",
    header: "COMMON.NO_OF_QUANTITY",
    cellType: "default",
  },
  {
    accessor: "quantityDiscount",
    header: "COMMON.QUANTITY_DISCOUNT",
    cellType: "default",
  },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

export default function Page() {
  return (
    <ListComponent
      fetchUrl={PRODUCT_LIST_URL}
      statusUrl={PRODUCT_STATUS_URL}
      pageRoute={FULL_PATH_ROUTES.productProducts}
      searchPlaceholder="COMMON.SEARCH"
      title="PRODUCT.TITLE"
      columnConfigs={columnConfigs}
      showLanguageFilter
      reorderUrl={PRODUCT_ROW_REORDER_URL}
      showReorder
      customFilters={[
        {
          component: ProductFilter,
        },
      ]}
    />
  );
}
