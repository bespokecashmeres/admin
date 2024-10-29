import { AddEditWrapper, DefaultLayout, LookBookFormComponent } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("COMMON");
  const title = t("LOOKBOOK");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  return (
    <DefaultLayout>
      <AddEditWrapper title={t("COMMON.CREATE")}>
        <LookBookFormComponent />
      </AddEditWrapper>
    </DefaultLayout>
  );
};

export default Add;
