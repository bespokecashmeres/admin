import { AddEditWrapper, DefaultLayout } from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";
import { handleApiCall } from "@/utils/common.utils";
import { COUNTRY_LIST_API } from "@/constants/apis";
import EditComponent from "./edit-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("USERS");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();
  const res: any = await handleApiCall(COUNTRY_LIST_API, "GET", null, {});

  const filteredRes = res?.data?.map((country: any) => ({
    value: country?._id,
    label: `${country?.phoneCode}`,
  }));

  return (
    <DefaultLayout>
      <AddEditWrapper title={t("COMMON.EDIT")}>
        <EditComponent countries={filteredRes} id={params.id} />
      </AddEditWrapper>
    </DefaultLayout>
  );
};

export default Edit;
