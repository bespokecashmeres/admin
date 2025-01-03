import { AddEditWrapper } from "@/components";
import {
  COLOUR_DROPDOWN_URL,
  FITTING_DROPDOWN_URL,
  MATERIAL_DROPDOWN_URL,
  OCCASSION_DROPDOWN_URL,
  PATTERN_DROPDOWN_URL,
  PERCEIVED_WEIGHT_DROPDOWN_URL,
  SEASONALITY_DROPDOWN_URL,
} from "@/constants/apis";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getCountryNameList,
  getDropdownList,
  getGenderList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import EditComponent from "./edit-component";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("YARN");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Edit = async ({ params }: { params: { id: string } }) => {
  const t = await getTranslations();
  const [
    gendersResult,
    countriesResult,
    coloursResult,
    patternsResult,
    occassionsResult,
    seasonalityResult,
    perceivedWeightResult,
    fittingResult,
    materialResult,
    // priceRangeResult,
  ] = await Promise.allSettled([
    getGenderList(),
    getCountryNameList(),
    getDropdownList(COLOUR_DROPDOWN_URL),
    getDropdownList(PATTERN_DROPDOWN_URL),
    getDropdownList(OCCASSION_DROPDOWN_URL),
    getDropdownList(SEASONALITY_DROPDOWN_URL),
    getDropdownList(PERCEIVED_WEIGHT_DROPDOWN_URL),
    getDropdownList(FITTING_DROPDOWN_URL),
    getDropdownList(MATERIAL_DROPDOWN_URL),
    // getDropdownList(PRICE_RANGE_DROPDOWN_URL),
  ]);

  const genders =
    gendersResult.status === "fulfilled" ? gendersResult.value : [];
  const colours =
    coloursResult.status === "fulfilled" ? coloursResult.value : [];
  const patterns =
    patternsResult.status === "fulfilled" ? patternsResult.value : [];
  const occassions =
    occassionsResult.status === "fulfilled" ? occassionsResult.value : [];
  const seasonalities =
    seasonalityResult.status === "fulfilled" ? seasonalityResult.value : [];
  const perceivedWeights =
    perceivedWeightResult.status === "fulfilled"
      ? perceivedWeightResult.value
      : [];
  const fittings =
    fittingResult.status === "fulfilled" ? fittingResult.value : [];
  const materials =
    materialResult.status === "fulfilled" ? materialResult.value : [];
  const countries =
    countriesResult.status === "fulfilled" ? countriesResult.value : [];
  // const priceRanges =
  //   priceRangeResult.status === "fulfilled" ? priceRangeResult.value : [];

  return (
    <AddEditWrapper title={t("COMMON.EDIT")}>
      <EditComponent
        id={params.id}
        genders={genders}
        countries={countries}
        colours={colours}
        patterns={patterns}
        occassions={occassions}
        seasonalities={seasonalities}
        perceivedWeights={perceivedWeights}
        fittings={fittings}
        materials={materials}
        // priceRanges={priceRanges}
      />
    </AddEditWrapper>
  );
};

export default Edit;
