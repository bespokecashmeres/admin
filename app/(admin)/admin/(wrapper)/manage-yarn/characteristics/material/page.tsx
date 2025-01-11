import { ListComponent } from "@/components";
import ImageUploadField from "@/components/common/page-component/yarn-module-info/image-upload";
import InfoTextareaField from "@/components/common/page-component/yarn-module-info/info-text-area";
import CONFIG from "@/config";
import { FULL_PATH_ROUTES, YARN_MODULE_TYPE } from "@/constants";
import {
  MATERIAL_GET_URL,
  MATERIAL_LIST_URL,
  MATERIAL_STATUS_URL,
  MODULE_INFO_UPSERT_IMAGE_URL,
  MODULE_INFO_UPSERT_INFO_URL,
} from "@/constants/apis";
import { ColumnConfig } from "@/types/index";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getYarnModuleData } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MATERIAL");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  {
    accessor: "slug", header: "COMMON.SLUG", cellType: "default",
  },
  { accessor: "price", header: "COMMON.PRICE", cellType: "default" },
  {
    accessor: "_id",
    header: "COMMON.ACTION",
    cellType: "action",
    showDeleteBtn: CONFIG.developmentMode,
  },
];

export default async function Page() {
  const editData = await getYarnModuleData(YARN_MODULE_TYPE.MATERIAL);

  return (
    <>
      <ListComponent
        fetchUrl={MATERIAL_LIST_URL}
        statusUrl={MATERIAL_STATUS_URL}
        deleteUrl={MATERIAL_GET_URL}
        pageRoute={FULL_PATH_ROUTES.manageYarnCharacteristicsMaterial}
        searchPlaceholder="COMMON.SEARCH"
        title="MATERIAL.TITLE"
        columnConfigs={columnConfigs}
        showLanguageFilter
        AboveTableComponent={InfoTextareaField}
        aboveTabComponentProps={{
          type: YARN_MODULE_TYPE.MATERIAL,
          editData: editData,
          apiUrl: MODULE_INFO_UPSERT_INFO_URL,
        }}
      />
      <ImageUploadField
        type={YARN_MODULE_TYPE.MATERIAL}
        initialUrl={editData?.image ?? ""}
        apiUrl={MODULE_INFO_UPSERT_IMAGE_URL}
        editDataId={editData?._id}
      />
    </>
  );
}
