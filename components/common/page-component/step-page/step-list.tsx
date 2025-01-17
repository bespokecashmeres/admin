"use client";

import { ROUTES } from '@/constants';
import { getAWSImageUrl } from '@/utils/common.utils';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const StepPageList = ({ list = [], steps = [], step, nextStepSlug }: { list: any[]; steps: any[]; step: string; nextStepSlug: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations();

    const handleStepSelect = (id: string) => {
        const parseStep = parseInt(step);
        if (steps.length + 1 > parseStep) {
            const params = new URLSearchParams(searchParams?.toString() || "");
            params.set(nextStepSlug, id);
            router.push(`/${ROUTES.admin}/${ROUTES.createProduct}/${parseStep + 1}?${params.toString()}`)
        } else if (steps.length + 1 === parseStep) {
            const params = new URLSearchParams(searchParams?.toString() || "");
            params.set(nextStepSlug, id);
            router.push(`/${ROUTES.admin}/${ROUTES.createProduct}/${ROUTES.lastStep}/${parseStep + 1}?${params.toString()}`)
        }
    }

    return (
        <div className="grid grid-cols-12 gap-6">
            {list?.map((step: any) => {
                return (
                    <div key={step?._id} className="col-span-full md:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="flex flex-col h-full">
                            <div className="relative cursor-pointer group" onClick={() => handleStepSelect(step?._id)}>
                                <img
                                    src={getAWSImageUrl(step.graphImage)}
                                    className='h-[300px] w-full group-hover:hidden'
                                    alt='step img'
                                />
                                <img
                                    src={getAWSImageUrl(step.realImage)}
                                    className='h-[300px] w-full hidden group-hover:block'
                                    alt='step hover img'
                                />
                            </div>
                            <div className="grow flex flex-col p-5">
                                {/* Card body */}
                                <div className="grow">
                                    <header>
                                        <h3 className="text-lg text-slate-800 dark:text-slate-100 font-semibold">
                                            {step.title}
                                        </h3>
                                    </header>
                                </div>
                                <div>
                                    <div className="inline-flex text-sm font-medium text-center py-1">
                                        {step.description}
                                    </div>
                                </div>

                            </div>
                            <div>
                                <button
                                    className="w-full bg-indigo-500 text-white py-3 rounded-b-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                    onClick={() => handleStepSelect(step?._id)}
                                >
                                    {t("COMMON.SELECT")}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default StepPageList