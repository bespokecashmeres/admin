import { ListComponent } from "@/components";
import { ROUTES } from "@/constants";
import {
  LOOKBOOK_LIST_URL,
  LOOKBOOK_ROW_REORDER_URL,
  LOOKBOOK_STATUS_URL
} from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("COMMON");
  const title = t("LOOKBOOK");
  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "title", header: "COMMON.TITLE", cellType: "default" },
  { accessor: "image", header: "COMMON.IMAGE", cellType: "image" },
  { accessor: "pdf", header: "COMMON.PDF", cellType: "pdf" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  { accessor: "_id", header: "COMMON.ACTION", cellType: "action" },
];

const LookBook = () => {
  return (
      <ListComponent
        fetchUrl={LOOKBOOK_LIST_URL}
        statusUrl={LOOKBOOK_STATUS_URL}
        pageRoute={ROUTES.lookbook}
        searchPlaceholder="COMMON.SEARCH"
        title="COMMON.LOOKBOOK"
        columnConfigs={columnConfigs}
        reorderUrl={LOOKBOOK_ROW_REORDER_URL}
        showReorder
        showLanguageFilter
      />
  );
};

export default LookBook;
