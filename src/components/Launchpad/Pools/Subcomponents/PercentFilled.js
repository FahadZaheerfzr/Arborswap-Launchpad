import { BigNumber } from "ethers";
import React from "react";
import { useEffect, useState } from "react";
import getSaleInfo from "utils/getSaleInfo";
import { formatBigToNum } from "utils/numberFormat";
import axios from "axios";
import { BACKEND_URL } from "config/constants/LaunchpadAddress";

export default function PercentFilled({ address, setFilled = () => {}, item, showModal }) {
  // console.log(address, "address")
  // console.log(item.sale.saleId, "item")
  const [filled_percent, setFilledPercent] = useState(0);
  const [saleInfo, setSaleInfo] = useState(null);
  const [priceInBNB, setPriceInBNB] = useState(null);
  useEffect(() => {
    const result = getSaleInfo(address).then((res) => {
      // console.log(res, "res")
      setSaleInfo(res);
    });
  }, [showModal]);
  // console.log(sale)
  async function getPrice() {
    if (!saleInfo) return;
    const res = await saleInfo.totalBNBRaised;
    const temp = BigNumber.from(res);
    setPriceInBNB(temp);
  }

  async function store() {
    if (!item) return;
    if(item.visible === false) return;
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/sale/${item._id}`,
        {
          visible: false,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getPrice();
  }, [saleInfo]);

  useEffect(() => {
    if (priceInBNB === null) return;
    const getFilledPercent = async () => {
      console.log(priceInBNB, "priceInBNB");
      try {
        const percents = priceInBNB.mul(100).div(saleInfo.hardCap);
        const newPercent = formatBigToNum(percents.toString(), 0, 1);
        console.log(newPercent, "newPercent");
        setFilledPercent(newPercent);
        setFilled(newPercent);
        //make request to server if newPercent is 100
        console.log(newPercent, "newPercent");
        if (parseFloat(newPercent) === 100) {
          console.log("store");
          store();
        }
      } catch (err) {
        console.log(err);
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
        style={{
          width: `${filled_percent}%`,
          display: `${filled_percent === "0" ? "none" : ""}`,
        }}
      >
        {/* here too where filled percentage */}
        {filled_percent}%
      </div>
    </div>
  );
}
