"use client";

import { ROUTES, SITE_SETTINGS } from '@/constants';
import { getAWSImageUrl } from '@/utils/common.utils';
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const StepCard = ({ steps, stepPageData }: { steps: any[]; stepPageData: any }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handlePrevStepClick = (currentSlug: string, stepNumber: string) => {
        const currentStep = steps.find(step => step.slug === currentSlug);
        if (!currentStep) return;
        const updatedSteps = steps.filter(step => step.rowOrder < currentStep.rowOrder);
        const params = new URLSearchParams(searchParams.toString());
        steps.forEach(step => {
            if (!updatedSteps.some(updatedStep => updatedStep.slug === step.slug) && step.slug !== 'yarn') {
                params.delete(step.slug);
            }
        });
        router.push(`/${ROUTES.admin}/${ROUTES.createProduct}/${stepNumber}?${params.toString()}`);
    }

    return (
        <>
            {
                steps.map((step: any, index: number) => {
                    const isDataExists = stepPageData.hasOwnProperty(step.slug);
                    return (
                        <div key={step.slug} onClick={() => isDataExists && handlePrevStepClick(step.slug, `${index + 2}`)} className={`border border-black dark:border-white flex gap-2 items-center min-w-[200px] p-4 ${isDataExists ? "cursor-pointer" : ""}`}>
                            {!isDataExists && step.label}
                            {isDataExists && (
                                <div className='flex gap-2 items-center'>
                                    <div className='h-full w-14'>
                                        <img src={getAWSImageUrl(stepPageData?.[step?.slug]?.image)} alt='yarn img' className='w-full h-full object-cover' />
                                    </div>
                                    <div className="flex-1 ml-1">
                                        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{stepPageData?.[step?.slug]?.name}</h2>
                                        <p className="text-xs text-slate-500">Change &gt;</p>
                                    </div>
                                    <div className="text-right mr-2">
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{SITE_SETTINGS.CURRENCY}{stepPageData?.yarn?.price}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </>
    )
}

export default StepCard