import React from 'react'
import PreviewDetails from '../../../Common/PreviewDetails';

export default function SaleBox({ icon }) {

    return (
        <div className="px-9 pb-9 bg-white dark:bg-dark-1 rounded-[20px]">
            <div className="w-full flex justify-center">
                <div className='w-1/2 py-5 flex justify-center items-center border-b-2 border-primary-green '>
                    <span className='font-bold text-primary-green'>
                        User Panel
                    </span>
                </div>
            </div>

            <PreviewDetails name={"Amount Allocated"} value={"5,000 RBA"} />
            <PreviewDetails name={"Amount Bought"} value={"411,285 SXP"} />


            <div className="flex flex-col items-center">
                <span className='font-medium text-gray dark:text-gray-dark text-sm mt-5'>
                    Available to Claim
                </span>

                <div className='mt-3 flex'>
                    <img src={icon} alt="pool-icon" className='w-6 h-6 mr-2' />
                    <span className='font-bold text-dark-text dark:text-light-text text-xl'>
                        ---
                    </span>
                </div>
            </div>

            <div className="mt-7">
                <button className="w-full opacity-50 bg-primary-green rounded-md text-white font-bold py-4">
                    Claim
                </button>
            </div>
        </div>
    )
}
