import React from 'react'

export default function FundRaised({ icon }) {
    return (
        <div className="hidden md:block p-9 bg-white dark:bg-dark-1 rounded-[20px]">
            <div className=''>
                <span className='font-medium text-sm text-gray dark:text-gray-dark'>
                    Fundraised
                </span>
            </div>

            <div className='flex items-center mt-4'>
                <img src={icon} alt="pool-icon" className='w-7 h-7 mr-2' />
                <div className='flex items-end'>
                    <span className='font-bold text-dark-text dark:text-light-text text-2xl'>
                        5,500
                    </span>
                    <span className='text-gray dark:text-gray-dark'>
                        &nbsp;($14,582)
                    </span>
                </div>
            </div>

            <div className="flex mt-10">
                <button className={`w-full bg-gradient-to-r from-primary-green to-[#C89211] rounded-md text-white font-bold py-4`}>
                Claim
                </button>
            </div>
        </div>
    )
}
