import { BigNumber } from "ethers";
import React from "react";
import { useEffect, useState } from "react";
import getSaleInfo from "utils/getSaleInfo";
import { formatBigToNum } from "utils/numberFormat";

export default function PercentFilled(address) {
  const [filled_percent, setFilledPercent] = useState(0);
  const [saleInfo, setSaleInfo] = useState(null);
  const [priceInBNB, setPriceInBNB] = useState(null);
  useEffect(() => {
    const result = getSaleInfo(address.address).then((res) => {
      console.log(res, "res")
      setSaleInfo(res);
    });
  }, []);
  // console.log(sale)
  async function getPrice() {
    if (!saleInfo) return;
    const res = await saleInfo.totalBNBRaised;
    const temp = BigNumber.from((res));
    setPriceInBNB(temp);
  }
  useEffect(() => {
    getPrice();
  }, [saleInfo]);

  useEffect(() => {
    if (priceInBNB === null) return;
    const getFilledPercent = async () => {
      console.log(priceInBNB, "priceInBNB")
      try {
      
      const percents = priceInBNB
        .mul(100)
        .div(saleInfo.hardCap);
      const newPercent = formatBigToNum(percents.toString(), 0, 1);
      console.log(newPercent, "newPercent")
      setFilledPercent(newPercent);
      }
      catch(err){
        console.log(err)
      }
    };
    if (saleInfo) {
      getFilledPercent();
    }
  }, [priceInBNB]);

  return (
    <div className="w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]">
      <div
        className={`h-18px filled rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
        
        style={{ width: `${filled_percent}%`,
        display : `${filled_percent === "0" ? 'none' : ''}`
      }}
      >
        {/* here too where filled percentage */}
        {filled_percent}%
      </div>
    </div>
  );
}
