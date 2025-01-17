"use client";

import { ROUTES } from '@/constants';
import { getAWSImageUrl } from '@/utils/common.utils'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const StepBox = ({ currentStepData, steps, slug, stepNumber }: { currentStepData: any; steps: any[]; slug: string; stepNumber: string }) => {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handlePrevStepClick = () => {
        const currentStep = steps.find(step => step.slug === slug);
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
        <div className="border border-black dark:border-white flex gap-2 items-center min-h-[75px] cursor-pointer" onClick={handlePrevStepClick}>
            <div className='flex gap-2 items-center p-2'>
                <div className='h-full w-14'>
                    <img src={getAWSImageUrl(currentStepData?.stepCard?.realImage)} alt='yarn img' className='w-full h-full object-cover' />
                </div>
                <div className="flex-1 ml-1">
                    <h2 className="text-xs font-semibold text-slate-800 dark:text-slate-100">{currentStepData?.stepCard?.title}</h2>
                    <p className="text-xs text-slate-500 cursor-pointer">{t("COMMON.CHANGE")} &gt;</p>
                </div>
            </div>
        </div>
    )
}

export default StepBox