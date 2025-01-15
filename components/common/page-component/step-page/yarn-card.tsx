"use client";

import { ROUTES, SITE_SETTINGS } from '@/constants'
import { getAWSImageUrl } from '@/utils/common.utils'
import { useRouter } from 'next/navigation'
import React from 'react'

const YarnCard = ({ yarn }: { yarn: any }) => {
    const router = useRouter();
    const handleYarnCardClick = () => {
        router.push(`/${ROUTES.admin}/${ROUTES.createProduct}`);
    }
    return (
        <div className='border border-black dark:border-white flex gap-2 items-center min-w-[200px] cursor-pointer' onClick={handleYarnCardClick}>
            <div className='h-full w-14'>
                <img src={getAWSImageUrl(yarn?.image)} alt='yarn img' className='w-full h-full object-cover' />
            </div>
            <div className="flex-1 ml-1">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{yarn?.name}</h2>
                <p className="text-xs text-slate-500">Colour: {yarn?.colour}</p>
            </div>
            <div className="text-right mr-2">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{SITE_SETTINGS.CURRENCY}{yarn?.price}</p>
            </div>
        </div>
    )
}

export default YarnCard