import React from 'react'

export default function ModalField({text, icon, currency}) {
    return (
        <div className='flex justify-between items-center'>
            <div className='w-1/3'>
                <span className='text-dark-text dark:text-light-text font-semibold text-sm'>
                    {text}
                </span>
            </div>
            <div className='w-2/3 flex items-center bg-[#FAF8F5] dark:bg-dark-2 rounded-md pl-5 py-[10px]'>
                <img src={icon} alt='arb' className='mr-2 w-6 h-6' />
                <span className='text-dark-text dark:text-light-text font-bold'>
                    {currency}
                </span>
            </div>
        </div>
    )
}
