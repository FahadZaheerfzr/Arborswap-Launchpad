import React from "react";
import ModalField from "./ModalField";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { useEtherBalance, useEthers } from "@usedapp/core";
import PublicSaleAbi from "../../../config/abi/PublicSale.json";
import PublicSaleErcAbi from "../../../config/abi/PublicSaleErcAbi.json";
import { formatEther, parseEther } from "ethers/lib/utils";
import { API_URL, API_KEY } from "config/constants/api";
import axios from "axios";
import useSaleInfo from "utils/getSaleInfo";
import usePublicErcSaleInfo from "utils/getPublicErcSaleInfo";
import usePrivateSaleInfo from "utils/getPrivateSaleInfo";
import usePrivateErcSaleInfo from "utils/getPrivateErcSaleInfo";
import useFairlaunchSaleInfo from "utils/getFairLaunchSaleInfo";
import useFairlaunchErcSaleInfo from "utils/getFairLaunchErcSaleInfo";
import { formatBigToNum } from "utils/numberFormat";

export default function Modal({
  showModal,
  from_symbol,
  from_icon,
  to_icon,
  to_symbol,
  sale,
  account,
}) {
  const { library } = useEthers();
  const [amount, setAmount] = useState(sale.minAllocation);
  const [bnbUSD, setBnbUSD] = useState(317);
  const [usdAmount, setUsdAmount] = useState(sale.minAllocation * bnbUSD);
  const sale_info_public_erc = usePublicErcSaleInfo(sale.saleAddress);
  const sale_info_public = useSaleInfo(sale.saleAddress);
  const sale_info_private = usePrivateSaleInfo(sale.saleAddress);
  const sale_info_private_erc = usePrivateErcSaleInfo(sale.saleAddress);
  const sale_info_fairlaunch = useFairlaunchSaleInfo(sale.saleAddress);
  const sale_info_fairlaunch_erc = useFairlaunchErcSaleInfo(sale.saleAddress);

  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);

  // console.log("sale_info_public", sale_info_public)
  // console.log("sale_info_public_erc", sale_info_public_erc)
  // console.log("sale_info_public", sale_info_public)
  // console.log("sale_info_private", sale_info_private)
  // console.log("sale_info_private_erc", sale_info_private_erc)
  // console.log("sale_info_fairlaunch", sale_info_fairlaunch)
  // console.log("sale_info_fairlaunch_erc", sale_info_fairlaunch_erc)

  useEffect(() => {
    if (sale_info_public && sale_info_public_erc && sale_info_private && sale_info_private_erc && sale_info_fairlaunch && sale_info_fairlaunch_erc) {
      if (sale.currency.symbol === "BNB") {
        if (sale.saleType === "standard") {
          console.log("sale_info_public", sale_info_public.tokenPriceInBNB)
          const price = formatBigToNum(
            sale_info_public.tokenPriceInBNB.toString(),
            18,
            4
          );
          setTokenPrice(price);
        }
        // else if (sale.saleType === "private") {
        //   console.log("sale_info_private", sale_info_private)
        //   const price = formatBigToNum(
        //     sale_info_private.tokenPriceInBNB.toString(),
        //     18,
        //     4
        //   );
        //   setTokenPrice(price);
        // }
        // else if (sale.saleType === "fairlaunch") {
        //   const price = formatBigToNum(
        //     sale_info_fairlaunch.tokenPriceInBNB.toString(),
        //     18,
        //     4
        //   );
        //   setTokenPrice(price);
        // }

      }else {
        if (sale.saleType === "standard") {
          console.log("sale_info_public_erc", sale_info_public_erc.tokenPriceInERC20)
          const price = formatBigToNum(
            sale_info_public_erc.tokenPriceInERC20.toString(),
            18,
            4
          );
          setTokenPrice(price);
        }
        // else if (sale.saleType === "private") {
        //   const price = formatBigToNum(
        //     sale_info_private_erc.tokenPriceInERC20.toString(),
        //     18,
        //     4
        //   );
        //   setTokenPrice(price);
        // }
        // else if (sale.saleType === "fairlaunch") {
        //   const price = formatBigToNum(
        //     sale_info_fairlaunch_erc.tokenPriceInERC20.toString(),
        //     18,
        //     4
        //   );
        //   setTokenPrice(price);
        // }
      }
    }
  }, [sale_info_public, sale_info_public_erc]);

  const convertBNBtoUSD = async () => {
    try {
      const res = await axios.get(`${API_URL}`, {
        headers: {
          Accepts: "application/json",
          "X-CMC_PRO_API_KEY": API_KEY,
        },
        params: { slug: "bnb", convert: "USD" },
      });

      //console.log("res",res)
    } catch {
      setBnbUSD(317);
    }
  };

  useEffect(() => {
    convertBNBtoUSD();
  }, []);

  //get user balance

  const balance = useEtherBalance(account);

  const handleSubmit = async () => {
    //user balance

    if (parseEther(amount.toString()).gt(balance)) {
      alert("Insufficient Balance");
      return;
    }
    const saleContractAddress = sale.saleAddress;

    let abi
    if (sale.currency.symbol === "BNB") {
      if (sale.saleType === "standard") {
        abi = PublicSaleAbi
      }
    }
    else {
      if (sale.saleType === "standard") {
        abi = PublicSaleErcAbi
      }
    }

    
    const contract = new Contract(
      saleContractAddress,
      abi,
      library.getSigner()
    );
    console.log("contract", contract);
    const amountBuy = parseEther(amount.toString()).toString();

    try {
      const tx = await contract.participate({
        account,
        value: amountBuy,
      });
      await tx.wait();
      showModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = async (e) => {
    setAmount(Number(e.target.value));
    setUsdAmount((Number(e.target.value) * bnbUSD).toFixed(3));
    setTokenAmount((Number(e.target.value) * tokenPrice).toFixed(2));
  };

  const handleMax = () => {
    //balance to number everything after , is not removed
    let bal = formatEther(balance).substring(0, 6);
    const amt = parseFloat(bal);
    setAmount(amt);
  };
  const handleHalf = () => {
    let bal = formatEther(balance).substring(0, 6);
    const amt = parseFloat(bal);
    setAmount(amt / 2);
  };

  return (
    <div
      className={`w-screen h-screen flex backdrop-blur-[7px] flex-col justify-center items-center bg-[#F2F3F5] dark:bg-dark dark:bg-opacity-40 bg-opacity-40`}
    >
      <div className="w-[90%] max-w-[420px] rounded-[10px] px-9 py-7 bg-white dark:bg-dark-1"> 
        <div className="flex justify-between items-center  ">
          <span className="text-dark-text dark:text-light-text font-gilroy font-semibold text-lg">
            Join Pool
          </span>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => showModal(false)}
          >
            <span className="text-sm font-gilroy font-semibold text-dark-text dark:text-light-text mr-2">
              Close
            </span>
            <div className="flex justify-center items-center bg-[#E56060] text-[#E56060] bg-opacity-10 rounded-full w-[15px] h-[15px]">
              &#10005;
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          <ModalField text={"From"} icon={from_icon} currency={from_symbol} />
        </div>

        <div className="mt-7">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray dark:text-gray-dark">
              Amount
            </span>

            <span className="font-medium text-sm text-dim-text dark:text-dim-text-dark">
              Balance:
              <span className="text-dark-text dark:text-light-text">
                {balance && formatEther(balance).substring(0, 6)}
              </span>
            </span>
          </div>
        </div>
        <div className="mt-[10px] flex justify-between items-center rounded-md bg-[#F5F1EB] dark:bg-dark-3 px-5 py-5">
          <div className="flex flex-col">
            <input
              className="bg-transparent outline-none text-sm font-medium text-dark-text dark:text-light-text"
              type="number"
              placeholder="0.0"
              onChange={handleInput}
              value={amount}
              step={0.001}
              max={sale.maxAllocation}
              min={sale.minAllocation}
            />

            <span className="mt-3 text-sm font-medium text-gray dark:text-gray-dark">
              ~ ${usdAmount}
            </span>
          </div>

          <div className="border-l border-dashed pl-5 border-dim-text dark:border-dim-text-dark ">
            <button
              onClick={handleHalf}
              className="rounded-sm bg-[#C29D46] bg-opacity-[0.08] py-[2px] px-4 text-[#C89211] text-sm onhover:cursor-pointer"
            >
              Half
            </button>

            <div
              onClick={handleMax}
              className="mt-3 rounded-sm bg-primary-green bg-opacity-[0.08] py-[2px] px-4 text-primary-green text-sm"
            >
              Max
            </div>
          </div>
        </div>

        <div className="flex justify-center my-7">
          <img src="/images/arrows/arrow_down_green.svg" alt="arrow down" />
        </div>

        <div className="mt-4">
          <ModalField text={"You'll get"} icon={to_icon} currency={to_symbol} />
        </div>

        <div className="mt-7">
          <span className="font-semibold text-sm text-gray dark:text-gray-dark">
            Amount
          </span>
        </div>

        <div className="mt-[10px]  rounded-md bg-[#F5F1EB] dark:bg-dark-3 px-5 py-5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl text-dark-text dark:text-light-text">
              {tokenAmount}
            </span>
            <span className="text-sm font-medium text-gray dark:text-gray-dark">
              ~ $---
            </span>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[420px]  mt-10">
        <button
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleSubmit}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
