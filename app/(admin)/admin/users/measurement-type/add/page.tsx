import { AddEditWrapper, DefaultLayout, MeasurementTypeFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MEASUREMENT_TYPE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  return (
    <DefaultLayout>
      <AddEditWrapper title={t("COMMON.CREATE")}>
        <MeasurementTypeFormComponent />
      </AddEditWrapper>
    </DefaultLayout>
  );
};

export default Add;
