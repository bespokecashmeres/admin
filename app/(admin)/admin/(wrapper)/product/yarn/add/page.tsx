import { AddEditWrapper, YarnFormComponent } from "@/components";
import {
  COLOUR_DROPDOWN_URL,
  FITTING_DROPDOWN_URL,
  MATERIAL_DROPDOWN_URL,
  OCCASSION_DROPDOWN_URL,
  PATTERN_DROPDOWN_URL,
  PERCEIVED_WEIGHT_DROPDOWN_URL,
  PRICE_RANGE_DROPDOWN_URL,
  SEASONALITY_DROPDOWN_URL,
} from "@/constants/apis";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import { getCountryNameList, getDropdownList } from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("YARN");
  const title = t("TITLE");
  return generateAdminPageMetadata({ title });
}

const Add = async () => {
  const t = await getTranslations();
  const [
    countriesResult,
    coloursResult,
    patternsResult,
    occassionsResult,
    seasonalityResult,
    perceivedWeightResult,
    fittingResult,
    materialResult,
    priceRangeResult,
  ] = await Promise.allSettled([
    getCountryNameList(),
    getDropdownList(COLOUR_DROPDOWN_URL),
    getDropdownList(PATTERN_DROPDOWN_URL),
    getDropdownList(OCCASSION_DROPDOWN_URL),
    getDropdownList(SEASONALITY_DROPDOWN_URL),
    getDropdownList(PERCEIVED_WEIGHT_DROPDOWN_URL),
    getDropdownList(FITTING_DROPDOWN_URL),
    getDropdownList(MATERIAL_DROPDOWN_URL),
    getDropdownList(PRICE_RANGE_DROPDOWN_URL),
  ]);

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
  const priceRanges =
    priceRangeResult.status === "fulfilled" ? priceRangeResult.value : [];
  const countries =
    countriesResult.status === "fulfilled" ? countriesResult.value : [];

  // Log resolved values
  console.log("colours:", colours);
  console.log("patterns:", patterns);
  console.log("occassions:", occassions);
  console.log("seasonalities:", seasonalities);
  console.log("perceivedWeights:", perceivedWeights);
  console.log("fittings:", fittings);
  console.log("materials:", materials);
  console.log("priceRanges:", priceRanges);
  console.log("countries:", countries);

  // Add error handling for all results
  if (coloursResult.status === "rejected") {
    console.error("Failed to fetch colours list:", coloursResult.reason);
  }
  if (patternsResult.status === "rejected") {
    console.error("Failed to fetch patterns list:", patternsResult.reason);
  }
  if (occassionsResult.status === "rejected") {
    console.error("Failed to fetch occassions list:", occassionsResult.reason);
  }
  if (seasonalityResult.status === "rejected") {
    console.error(
      "Failed to fetch seasonality list:",
      seasonalityResult.reason
    );
  }
  if (perceivedWeightResult.status === "rejected") {
    console.error(
      "Failed to fetch perceived weight list:",
      perceivedWeightResult.reason
    );
  }
  if (fittingResult.status === "rejected") {
    console.error("Failed to fetch fittings list:", fittingResult.reason);
  }
  if (materialResult.status === "rejected") {
    console.error("Failed to fetch materials list:", materialResult.reason);
  }
  if (priceRangeResult.status === "rejected") {
    console.error(
      "Failed to fetch price ranges list:",
      priceRangeResult.reason
    );
  }
  if (countriesResult.status === "rejected") {
    console.error("Failed to fetch countries list:", countriesResult.reason);
  }
  return (
    <AddEditWrapper title={t("COMMON.CREATE")}>
      <YarnFormComponent
        countries={countries}
        colours={colours}
        patterns={patterns}
        occassions={occassions}
        seasonalities={seasonalities}
        perceivedWeights={perceivedWeights}
        fittings={fittings}
        materials={materials}
        priceRanges={priceRanges}
      />
    </AddEditWrapper>
  );
};

export default Add;
