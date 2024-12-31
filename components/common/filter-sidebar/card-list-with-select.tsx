import { SITE_SETTINGS } from "@/constants";
import { getAWSImageUrl } from "@/utils/common.utils";
import CardSelectButton from "./card-select-button";

export default function CardListWithSelect({ yarn }: { yarn: any }) {
  return (
    <>
      <div className="col-span-full md:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Image */}
          <div className="relative">
            <img
              className="w-full"
              src={getAWSImageUrl(yarn?.image)}
              width={301}
              height={226}
              alt={yarn?.yarnId}
            />
          </div>
          {/* Card Content */}
          <div className="grow flex flex-col p-5">
            {/* Card body */}
            <div className="grow">
              <header>
                <a href="#0">
                  <h3 className="text-lg text-slate-800 dark:text-slate-100 font-semibold">
                    {yarn?.name}
                  </h3>
                </a>
              </header>
            </div>
            <div>
              <div className="inline-flex text-sm font-medium text-center py-1">
                {SITE_SETTINGS.CURRENCY}
                {yarn.price ?? 0}
              </div>
            </div>
          </div>
          <div>
            <CardSelectButton yarn={yarn} />
          </div>
        </div>
      </div>
    </>
  );
}
