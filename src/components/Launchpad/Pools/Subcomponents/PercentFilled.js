import React from 'react'
import { useEffect,useState } from 'react'
import useSaleInfo from 'utils/getSaleInfo';
import { formatBigToNum } from 'utils/numberFormat';

export default function PercentFilled(address) {
    console.log(address.address)
    const [filled_percent, setFilledPercent] = useState(0);
    const sale = useSaleInfo(address.address);
    // console.log(sale)
    useEffect(() => {
        const getFilledPercent = async () => {
            const percents = await sale.totalBNBRaised.mul(100).div(sale.hardCap);
            const newPercent = formatBigToNum(percents.toString(), 0, 1)
            setFilledPercent(newPercent)
        }
        if (sale) {
            getFilledPercent();
        }
    }, [sale])
    
  return (
    <div className="w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]">
    <div
      className={`h-18px filled rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
      style={{ width: `${filled_percent}%` }}
    >
      {/* here too where filled percentage */}
      {filled_percent}%
    </div>
  </div>
  )
}
