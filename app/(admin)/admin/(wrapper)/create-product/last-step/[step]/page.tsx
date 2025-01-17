import Tooltip from "@/components/tooltip";
import { ROUTES, SITE_SETTINGS } from "@/constants";
import { getAWSImageUrl } from "@/utils/common.utils";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getProductTypeList,
  getStepFullViewDetails,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import StepBox from "./components/step-box";

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
  const t = await getTranslations("CREATE_A_PRODUCT");
  const title = t("TITLE");

  return generateAdminPageMetadata({ title });
}

const options = [
  { label: "Price - Low to High", value: "price-low-to-high" },
  { label: "Price - High to Low", value: "price-high-to-low" },
];

const CreateProduct = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string };
}) => {
  const t = await getTranslations();
  const step = params.step;
  const productTypeData = await getProductTypeList();
  const productTypeId = productTypeData?.[0]?.value;
  const stepData = await getStepFullViewDetails({ productTypeId, searchParams });
  console.log("stepData: ", stepData);
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-5">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          {t("COMMON.STEP")} {step}: {t("COMMON.FULL_VIEW_SWEATER")} ✨
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <span>{t("COMMON.YOUR_SWEATER")}</span>
          </div>
          <div className="flex justify-center">
            <img
              src="/shirt.png"
              alt="graph img"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <span className="my-2">
              {SITE_SETTINGS.CURRENCY}
              {stepData?.yarn?.price}
            </span>
          </div>
          <div className="border-b border-b-slate-400" />
          <div className="flex items-center justify-between py-3">
            <div className="w-24 h-24">
              <img
                src={getAWSImageUrl(stepData?.yarn?.image)}
                alt="Square Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 ml-4">
              <h3 className="text-lg font-bold">{stepData?.yarn?.name}</h3>
              <p className="text-sm text-gray-600">{t("COMMON.NAME")}: {stepData?.yarn?.name} - {stepData?.yarn?.yarnId}</p>
            </div>

            <Link href={`/${ROUTES.admin}/${ROUTES.createProduct}?yarn=${stepData?.yarn?._id}`}>
              <button
                className="border border-slate-800 text-slate-900 px-4 py-2 dark:border-slate-500 dark:text-slate-100">
                {t("COMMON.CHANGE_YARN")}
              </button>
            </Link>
          </div>
          <div>
            <div className="mb-5">
              <span>{t("COMMON.YARN_CHARACTERISTICS")}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex gap-2">
                <span>{t("COMMON.COLOUR")}: </span>
                <span className="font-semibold">{stepData?.yarn?.colour}</span>
              </div>
              <div className="flex gap-2">
                <span>{t("COMMON.MATERIAL")}: </span>
                <span className="font-semibold">{stepData?.yarn?.material}</span>
              </div>
              <div className="flex gap-2">
                <span>{t("COMMON.SEASONALITY")}: </span>
                <span className="font-semibold">{stepData?.yarn?.seasonality}</span>
              </div>
              <div className="flex gap-2">
                <span>{t("COMMON.PERCEIVED_WEIGHT")}: </span>
                <span className="font-semibold">{stepData?.yarn?.perceivedWeight}</span>
              </div>
              {stepData?.yarn?.yarns?.map((yarn: any, index: number) => {
                return (
                  <div className="flex gap-2" key={index}>
                    {yarn?.image && <img
                      className="w-5 h-5"
                      src={getAWSImageUrl(yarn?.image)}
                      alt="Square Image"
                    />}
                    <span>{yarn?.name}: </span>
                    <span className="font-semibold">{yarn?.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="border-b border-b-slate-400 my-3" />
          <div>
            <div className="mb-5">
              <span>{t("COMMON.SWEATER_CHARACTERISTICS")}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {
                stepData?.steps?.map((stepObj: any, index: number) => {
                  const currentStepData = stepData?.[stepObj?.slug] || {};
                  return (
                    <div className="flex gap-2" key={index}>
                      <div className="w-5 h-5">
                        <Tooltip className="ml-2">
                          <div className="text-xs text-slate-600 dark:text-slate-200 text-center">
                            {currentStepData?.stepType?.info}
                          </div>
                        </Tooltip>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>{stepObj?.name}</span>
                        <StepBox currentStepData={currentStepData} steps={stepData?.steps} slug={stepObj?.slug} stepNumber={`${index + 2}`} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
