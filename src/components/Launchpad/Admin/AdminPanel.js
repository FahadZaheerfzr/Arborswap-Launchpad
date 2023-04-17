import React from 'react'
import PreviewDetails from '../../../Common/PreviewDetails';

export default function AdminPanel({ icon, status, hard_cap, filled_percent }) {

    return (
        <div className="hidden md:block px-9 pb-9 bg-white dark:bg-dark-1 rounded-[20px]">
            <div className="w-full flex justify-center">
                <div className='w-1/2 py-5 flex justify-center items-center border-b-2 border-primary-green '>
                    <span className='font-bold text-primary-green'>
                        Admin Panel
                    </span>
                </div>
            </div>

            <div className="w-full flex justify-between mt-7">
                <span className="text-gray dark:text-gray-dark text-sm font-medium">Soft/Hard Cap</span>

                {status !== "Upcoming" ?
                    <div className="bg-primary-green bg-opacity-[0.08] px-3 py-[0.5px] rounded-[10px] border-[0.5px] border-dashed border-primary-green">
                        <span className="rounded-[10px] text-primary-green">{status}</span>
                    </div>
                    : <div className="bg-[#C89211] bg-opacity-[0.08] px-3 py-[0.5px] rounded-[10px] border-[0.5px] border-dashed border-[#C89211]">
                        <span className="rounded-[10px] text-[#C89211]">Upcoming</span>
                    </div>
                }
            </div>



            <div className="w-full flex mt-3">
                <img src={icon} alt="pool-icon" className='w-7 h-7 mr-2' />
                <span className='font-bold text-dark-text dark:text-light-text text-2xl'>
                    2,000 - 10,000
                </span>
            </div>

            {status !== "Upcoming" &&
                <div className='mt-7'>
                    <div className="flex items-center justify-between">
                        <span className="text-xs  text-gray dark:text-gray-dark">
                            {(hard_cap * (filled_percent / 100)).toLocaleString()} RBA
                        </span>

                        <span className="text-xs  text-dim-text dark:text-dim-text-dark">
                            {hard_cap} RBA
                        </span>
                    </div>

                    <div className="w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]">
                        <div
                            className={`h-18px filled rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
                            style={{ width: `${filled_percent}%` }}
                        >
                            {filled_percent}%
                        </div>
                    </div>
                </div>
            }

            {status === "Upcoming" &&
                <div className='mt-7'>
                    <PreviewDetails name={"Address Whitelisted"} value={"1,874"} />
                </div>
            }

            {status !== "Upcoming" &&
                <div className='mt-7'>
                    <PreviewDetails name={"Contributors"} value={"1,041"} />
                </div>
            }


            <div className="mt-7">
                <button className={`w-full ${status === "Upcoming" ? "bg-light dark:bg-dark text-dark-text dark:text-light-text" : "bg-primary-green text-white opacity-50"} rounded-md font-bold py-4`}>
                    {status === "Upcoming" ? "Manage Address" : "Finalize Sale"}
                </button>
            </div>
        </div>
    )
}
