import Timer from 'components/LockedAsset/Amount/Timer/Timer'
import React, { useEffect, useState } from 'react'
import useSaleInfo from 'utils/getSaleInfo';
import { formatBigToNum } from 'utils/numberFormat';

export default function SaleBox({ hard_cap, hard_cap_icon, min_allocation, max_allocation, ends_on, showModal, status,token, presale_address, currency }) {
    const [filled_percent, setFilledPercent] = useState(0)
    const sale = useSaleInfo(presale_address);

    useEffect(()=>{

        const getFilledPercent = async () => {
            const percents = await sale.totalBNBRaised.mul(100).div(sale.hardCap);
            const newRaised = formatBigToNum(sale.totalBNBRaised.toString(), 18, 4)
            const newPercent = formatBigToNum(percents.toString(), 0, 10)
            setFilledPercent(newPercent)
        }
        if(sale){
        getFilledPercent();
        }
    },[sale])

    return (
        <div className="p-9 bg-white dark:bg-dark-1 rounded-[20px]">
            <div className="w-full flex justify-between">
                <span className="text-gray dark:text-gray-dark text-sm font-medium">Soft/Hard Cap</span>

                <div className="bg-primary-green bg-opacity-[0.08] px-3 py-[3px] rounded-[10px] border-[0.5px] border-dashed border-primary-green">
                    <span className="rounded-[10px] text-primary-green">Live</span>
                </div>
            </div>

            <div className="mt-3 flex">
                <img src={currency.icon} alt="hard-cap-currency" className="w-7 h-7" />
                <div className="ml-3">
                    <span className="text-dark-text dark:text-light-text text-2xl font-bold">{hard_cap && hard_cap.toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-7 flex justify-between">
                <span className='font-medium text-sm text-gray dark:text-gray-dark'>
                    Min Allocation
                </span>
                <span className='font-bold text-sm text-dark-text dark:text-light-text'>
                    {min_allocation&& min_allocation.toLocaleString()} {currency.symbol}
                </span>
            </div>

            <div className="mt-5 flex justify-between">
                <span className='font-medium text-sm text-gray dark:text-gray-dark'>
                    Max Allocation
                </span>
                <span className='font-bold text-sm text-dark-text dark:text-light-text'>
                    {max_allocation && max_allocation.toLocaleString()} {currency.symbol}
                </span>
            </div>

            <div className="flex items-center justify-between mt-5">
            {hard_cap && filled_percent &&
                <span className="text-xs  text-gray dark:text-gray-dark">
                    {(hard_cap * (filled_percent / 100)).toLocaleString()} {currency.symbol}
                </span>
            }

                <span className="text-xs  text-dim-text dark:text-dim-text-dark">
                    {hard_cap} {currency.symbol}
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

            <div className="flex mt-10">
                <button className={`w-full ${status!=="Ended" ? "bg-primary-green" : "bg-dim-text bg-opacity-50 dark:bg-dim-text-dark"} rounded-md text-white font-bold py-4`}
                    onClick={()=>showModal(true)}>
                    {status!=="Ended" ? "Join Sale" : "Ended"}
                </button>
            </div>

            <div className="flex justify-center mt-7">
                <span className="text-sm font-medium text-gray dark:text-gray-dark">
                    {status!=="Ended" ? "Sale Ends in" : "Sale Ended"}
                </span>
            </div>
            
            <Timer date={new Date(ends_on*1000)} />
        </div>
    )
}
