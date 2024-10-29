import { AddEditWrapper, DefaultLayout } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";
import EditComponent from "./edit-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("MEASUREMENT_TYPE");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();

  return (
    <DefaultLayout>
      <AddEditWrapper title={t("COMMON.EDIT")}>
        <EditComponent id={params.id} />
      </AddEditWrapper>
    </DefaultLayout>
  );
};

export default Edit;
