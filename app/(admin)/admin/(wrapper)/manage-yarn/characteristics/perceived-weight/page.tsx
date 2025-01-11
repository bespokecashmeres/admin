import { ListComponent } from "@/components";
import ImageUploadField from "@/components/common/page-component/yarn-module-info/image-upload";
import InfoTextareaField from "@/components/common/page-component/yarn-module-info/info-text-area";
import { FULL_PATH_ROUTES, YARN_MODULE_TYPE } from "@/constants";
import {
  MODULE_INFO_UPSERT_IMAGE_URL,
  MODULE_INFO_UPSERT_INFO_URL,
  PERCEIVED_WEIGHT_GET_URL,
  PERCEIVED_WEIGHT_LIST_URL,
  PERCEIVED_WEIGHT_STATUS_URL,
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
  const t = await getTranslations("PERCEIVED_WEIGHT");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const columnConfigs: ColumnConfig[] = [
  { accessor: "name", header: "COMMON.NAME", cellType: "default" },
  { accessor: "status", header: "COMMON.STATUS", cellType: "toggle" },
  {
    accessor: "_id",
    header: "COMMON.ACTION",
    cellType: "action",
    showDeleteBtn: true,
  },
];

export default async function Page() {
  const editData = await getYarnModuleData(YARN_MODULE_TYPE.PERCEIVED_WEIGHT);

  return (
    <>
      <ListComponent
        fetchUrl={PERCEIVED_WEIGHT_LIST_URL}
        statusUrl={PERCEIVED_WEIGHT_STATUS_URL}
        deleteUrl={PERCEIVED_WEIGHT_GET_URL}
        pageRoute={FULL_PATH_ROUTES.manageYarnCharacteristicsPerceivedWeight}
        searchPlaceholder="COMMON.SEARCH"
        title="PERCEIVED_WEIGHT.TITLE"
        columnConfigs={columnConfigs}
        showLanguageFilter
        AboveTableComponent={InfoTextareaField}
        aboveTabComponentProps={{
          type: YARN_MODULE_TYPE.PERCEIVED_WEIGHT,
          editData: editData,
          apiUrl: MODULE_INFO_UPSERT_INFO_URL,
        }}
      />
      <ImageUploadField
        type={YARN_MODULE_TYPE.PERCEIVED_WEIGHT}
        initialUrl={editData?.image ?? ""}
        apiUrl={MODULE_INFO_UPSERT_IMAGE_URL}
        editDataId={editData?._id}
      />
    </>
  );
}
