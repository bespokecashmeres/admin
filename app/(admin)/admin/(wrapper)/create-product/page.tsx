import {
  CardListWithSelect,
  FilterButtons,
  FilterSidebar,
  PaginationNumeric,
} from "@/components";
import {
  generateAdminPageMetadata,
  viewportData,
} from "@/utils/generateMetaData.util";
import {
  getColourList,
  getMaterialList,
  getYarnCardList,
} from "@/utils/server-api.utils";
import { Viewport } from "next";
import { getTranslations } from "next-intl/server";

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
  console.log("params: ", params);
  console.log("searchParams: ", searchParams);
  const t = await getTranslations();
  const [
    // gendersResult,
    colourResult,
    materialList,
    yarnListResult,
  ] = await Promise.allSettled([
    // getGenderList(),
    getColourList(),
    getMaterialList(),
    getYarnCardList(searchParams),
  ]);
  // const genders =
  //   gendersResult.status === "fulfilled" ? gendersResult.value : [];
  const colours = colourResult.status === "fulfilled" ? colourResult.value : [];
  const materials =
    materialList.status === "fulfilled" ? materialList.value : [];
  const yarnList =
    yarnListResult.status === "fulfilled" ? yarnListResult.value : {};

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-5">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          {t("COMMON.STEP")} 1: {t("COMMON.CHOOSE_A_YARN")} ✨
        </h1>
      </div>
      <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
        {/* Sidebar */}
        <FilterSidebar
          // genders={genders}
          colours={colours}
          materials={materials}
        />

        {/* Content */}
        <div>
          {/* Filters */}
          <div className="mb-5">
            <FilterButtons options={options} />
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-400 italic mb-4">
            {yarnList?.totalCount ?? 0} {t("COMMON.YARN_FOUND")}
          </div>

          {/* Cards 1 (Video Courses) */}
          <div>
            <div className="grid grid-cols-12 gap-6">
              {yarnList?.data?.map((yarn: any) => (
                <CardListWithSelect yarn={yarn} key={yarn?.yarnId} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <PaginationNumeric
              rowsPerPage={10}
              totalRows={yarnList.totalCount ?? 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
