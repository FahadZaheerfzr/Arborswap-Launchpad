import React from "react";
import { useEffect, useState } from "react";
import getSaleInfo from "utils/getSaleInfo";
import { formatBigToNum } from "utils/numberFormat";

export default function PercentFilled(address) {
  const [filled_percent, setFilledPercent] = useState(0);
  const [saleInfo, setSaleInfo] = useState(null);
  const [priceInBNB, setPriceInBNB] = useState(null);
  useEffect(() => {
    const result = getSaleInfo(address).then((res) => {
      setSaleInfo(res);
    });
  }, []);
  // console.log(sale)
  async function getPrice() {
    const res = await saleInfo.totalBNBRaised;
    console.log(res, "res");
    setPriceInBNB(res);
  }
  useEffect(() => {
    getPrice();
  }, [saleInfo]);

  useEffect(() => {
    if (priceInBNB === null) return;
    const getFilledPercent = async () => {
      const percents = priceInBNB
        .mul(100)
        .div(saleInfo.hardCap);
      const newPercent = formatBigToNum(percents.toString(), 0, 1);
      setFilledPercent(newPercent);
    };
    if (saleInfo) {
      getFilledPercent();
    }
  }, [priceInBNB]);

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
  );
}
