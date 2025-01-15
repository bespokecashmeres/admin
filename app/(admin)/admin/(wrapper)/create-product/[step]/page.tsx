import { StepCard, StepPageList, YarnCard } from '@/components';
import { SITE_SETTINGS } from '@/constants';
import { getAWSImageUrl } from '@/utils/common.utils';
import { generateAdminPageMetadata, viewportData } from '@/utils/generateMetaData.util';
import { getCurrentStepDetails, getProductTypeList, getStepTypesList } from '@/utils/server-api.utils';
import { Viewport } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import React from 'react'

export const viewport: Viewport = viewportData;

export async function generateMetadata() {
    const t = await getTranslations("CREATE_A_PRODUCT");
    const title = t("TITLE");

    return generateAdminPageMetadata({ title });
}

const StepPage = async ({
    params,
    searchParams,
}: {
    params: any;
    searchParams: { [key: string]: string };
}) => {
    const t = await getTranslations();
    const productTypeData = await getProductTypeList();
    console.log("productTypeData: ", productTypeData)
    const productTypeId = productTypeData?.[0]?.value;
    const step = params.step;
    const [steps, stepPageData] = await Promise.all([
        getStepTypesList(productTypeId),
        getCurrentStepDetails({ searchParams, productTypeId, nextStepSlug: step })
    ]);
    if (!(steps.length + 1 >= step)) {
        redirect("/");
    }
    const stepData = steps[step - 2];

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            <div className="mb-5">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                    {t("COMMON.STEP")} {step}: {t("COMMON.CHOOSE_A")} {stepData.label} ✨
                </h1>
            </div>
            <div className='mb-5 flex gap-2 flex-wrap'>
                <YarnCard yarn={stepPageData?.yarn} />
                <StepCard stepPageData={stepPageData} steps={steps} />
            </div>
            <div className='mt-5'>
                <StepPageList list={stepPageData?.list} steps={steps} step={step} nextStepSlug={stepData?.slug} />
            </div>
        </div>
    )
}

export default StepPage