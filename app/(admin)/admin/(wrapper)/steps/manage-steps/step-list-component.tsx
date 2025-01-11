import { ListComponent } from "@/components";
import CONFIG from "@/config";
import { FULL_PATH_ROUTES, ROUTES } from "@/constants";
import {
  STEP_CARD_GET_URL,
  STEP_CARD_LIST_URL,
  STEP_CARD_ROW_REORDER_URL,
  STEP_CARD_STATUS_URL,
} from "@/constants/apis";
import { CellType, ColumnConfig } from "@/types";
import { FC } from "react";

const columnConfigs: ColumnConfig[] = [
  { accessor: "title", header: "COMMON.TITLE", cellType: "default" },
  { accessor: "slug", header: "COMMON.SLUG", cellType: "default" },
  { accessor: "graphImage", header: "COMMON.GRAPH_IMAGE", cellType: "image" },
  { accessor: "realImage", header: "COMMON.REAL_IMAGE", cellType: "image" },
  ...(CONFIG.developmentMode ? [{ accessor: "status", header: "COMMON.STATUS", cellType: "toggle" as CellType }] : []),
  {
    accessor: "_id",
    header: "COMMON.ACTION",
    cellType: "action",
    showDeleteBtn: CONFIG.developmentMode,
  },
];

const StepListComponent: FC<{ activeStep: string }> = ({ activeStep }) => {
  return (
    <ListComponent
      fetchUrl={`${STEP_CARD_LIST_URL}/${activeStep}`}
      createButtonUrl={`${FULL_PATH_ROUTES.adminSteps}/${ROUTES.add}/${activeStep}`}
      deleteUrl={STEP_CARD_GET_URL}
      statusUrl={STEP_CARD_STATUS_URL}
      pageRoute={ROUTES.steps}
      searchPlaceholder="COMMON.SEARCH"
      title="STEP_CARD.TITLE"
      columnConfigs={columnConfigs}
      reorderUrl={STEP_CARD_ROW_REORDER_URL}
      showReorder
      showLanguageFilter
    />
  );
};

export default StepListComponent;
