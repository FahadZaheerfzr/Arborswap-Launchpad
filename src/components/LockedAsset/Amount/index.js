import React, { useMemo } from 'react'
import Timer from './Timer/Timer'
import { formatUnits } from 'ethers/lib/utils'
export default function Amount({ type, asset, tokenInfo, lpInfo }) {
  const amount = useMemo(() => {
    return asset && tokenInfo ? formatUnits(asset?.info?.amount, tokenInfo?.decimals) * 1 : 0
  }, [asset, tokenInfo])

  return (
    <div className="flex flex-col p-9 font-gilroy bg-white dark:bg-dark-1 rounded-[20px]">
      <span className="text-sm font-medium text-gray dark:text-gray-dark">Amount</span>

      <div className="flex items-center mt-3">
        {/* <img className="w-7 h-7" src={icon1} alt="quote-pair" />
        <img className="w-7 h-7 -ml-5" src={icon2} alt="base-pair" /> */}

        <span className="text-2xl font-bold text-dark-text dark:text-light-text ml-3">{amount.toLocaleString()}</span>
      </div>

      <div className="flex mt-10">
        <button className="w-full cursor-pointer bg-primary-green bg-opacity-100 hover:bg-opacity-90 disabled:bg-opacity-60  rounded-md text-white dark:text-dim-text-dark font-bold py-4">
          Claim
        </button>
      </div>

      <div className="flex justify-center mt-7">
        <span className="text-sm font-medium text-gray dark:text-gray-dark">Unlocks in</span>
      </div>

      <Timer date={asset?.info?.unlockDate?.toNumber() * 1000} />
    </div>
  )
}
