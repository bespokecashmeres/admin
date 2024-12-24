import { AddEditWrapper, StepCardFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getSingleStepTypeData } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("STEP_TYPE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async ({ params }: { params: { stepTypeId: string } }) => {
  const t = await getTranslations();
  const data = await getSingleStepTypeData(params.stepTypeId);

  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <StepCardFormComponent
        stepTypeId={params?.stepTypeId}
        showFittingOption={!!data?.showFittingOption}
      />
    </AddEditWrapper>
  );
};

export default Add;
