import React from "react";
import ModalField from "./ModalField";
import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import { useEtherBalance, useEthers } from "@usedapp/core";
import PublicSaleAbi from "../../../config/abi/PublicSale.json";
import PublicSaleErcAbi from "../../../config/abi/PublicSaleErcAbi.json";
import PrivateSaleAbi from "../../../config/abi/PrivateSale.json";
import PrivateSaleErcAbi from "../../../config/abi/PrivateSaleErcAbi.json";
import FairLaunchAbi from "../../../config/abi/FairlaunchSale.json";
import FairLaunchErcAbi from "../../../config/abi/FairlaunchErcAbi.json";
import { formatEther, parseEther } from "ethers/lib/utils";
import { API_URL, API_KEY } from "config/constants/api";
import axios from "axios";
import getSaleInfo from "utils/getSaleInfo";
import usePublicErcSaleInfo from "utils/getPublicErcSaleInfo";
import usePrivateSaleInfo from "utils/getPrivateSaleInfo";
import usePrivateErcSaleInfo from "utils/getPrivateErcSaleInfo";
import useFairlaunchSaleInfo from "utils/getFairLaunchSaleInfo";
import useFairlaunchErcSaleInfo from "utils/getFairLaunchErcSaleInfo";
import { formatBigToNum } from "utils/numberFormat";
import ERC20 from "config/abi/ERC20.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAmountParticipated from "utils/getAmountParticipated";
import Web3 from "web3";

export default function Modal({
  showModal,
  from_symbol,
  from_icon,
  to_icon,
  to_symbol,
  sale,
  // account,
}) {
  const [saleInfoPublic, setSaleInfoPublic] = useState(null);
  const { library } = useEthers();
  const [amount, setAmount] = useState(sale.minAllocation);
  const [bnbUSD, setBnbUSD] = useState(317);
  const [usdAmount, setUsdAmount] = useState(sale.minAllocation * bnbUSD);
  const [priceInBNB, setPriceInBNB] = useState(null);
  const sale_info_public_erc = usePublicErcSaleInfo(sale.saleAddress);

  const sale_info_private = usePrivateSaleInfo(sale.saleAddress);
  const sale_info_private_erc = usePrivateErcSaleInfo(sale.saleAddress);
  const sale_info_fairlaunch = useFairlaunchSaleInfo(sale.saleAddress);
  const sale_info_fairlaunch_erc = useFairlaunchErcSaleInfo(sale.saleAddress);
  let account = "";
  const [balanceBNB, setBalanceBNB] = useState(null);
  const [balance, setBalance] = useState(0);
  let bought = "";

  useEffect(() => {
    async function connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        // Instance web3 with the provided information
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.enable();
          // Wallet connected successfully
          // You can perform further actions here
          account = await web3.eth.getAccounts();
          // console.log(bought[0], "bought")
          web3.eth.getBalance(account[0]).then((res) => {
            setBalanceBNB(res);
          });


        } catch (e) {
          // User denied access or error occurred
          // Handle the error or show appropriate message
        }
      }
    }

    connectWallet();
  }, []);

  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);

  useEffect(() => {
    const result = getSaleInfo(sale.saleAddress).then((res) => {
      setSaleInfoPublic(res);
    });
  }, []);

  useEffect(() => {
    // console.log("sale", sale);

    if (sale.currency.symbol !== "BNB") {
      const contract = new Contract(
        sale.currency.address,
        ERC20,
        library.getSigner()
      );
      const getBalance = async () => {
        const balance = await contract.balanceOf(account);
        setBalance(formatBigToNum(balance, 18, 4));
      };
      getBalance();
    } else {
      if (!balanceBNB) return;
      setBalance(formatEther(balanceBNB).substring(0, 6));
    }
  }, [balanceBNB]);

  async function getPrice() {
    const res = await saleInfoPublic.totalBNBRaised;
    console.log(res, "res");
    setPriceInBNB(res);
  }
  useEffect(() => {
    getPrice();
  }, [saleInfoPublic]);

  useEffect(() => {
    // console.log("saleInfoPublic", saleInfoPublic);
    if (priceInBNB === null) return;
    if (
      saleInfoPublic &&
      sale_info_public_erc &&
      sale_info_private &&
      sale_info_private_erc &&
      sale_info_fairlaunch &&
      sale_info_fairlaunch_erc
    ) {
      if (sale.currency.symbol === "BNB") {
        if (sale.saleType === "standard") {
          console.log("priceInBNB", priceInBNB);
          const price = formatBigToNum(priceInBNB?.toString(), 18, 4);
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
      } else {
        if (sale.saleType === "standard") {
          // console.log(
          //   "sale_info_public_erc",
          //   sale_info_public_erc.tokenPriceInERC20
          // );
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
  }, [priceInBNB, sale_info_public_erc]);

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

  //get user balanceBNB
  const handleSubmit = async () => {
    //user balanceBNB
    //check if sale started
    bought = await getAmountParticipated(sale.saleAddress);
    console.log("SALEEEESO", bought)
    const userAllocation = formatBigToNum(bought[0].toString(), 18, 4);
    if (userAllocation >= sale.maxAllocation) {
      toast.error("You have reached the maximum allocation");
      return;
    }
    // console.log(sale)
    const start = new Date(sale.startDate);
    const now = new Date();
    // console.log("start", start, "now", now);
    if (now < start) {
      toast.error("Sale not started yet");
      return;
    }

    if (parseFloat(amount) > parseFloat(balance)) {
      toast.error("Insufficient balance");
      return;
    }
    const saleContractAddress = sale.saleAddress;

    let abi;
    if (sale.currency.symbol === "BNB") {
      if (sale.saleType === "standard") {
        abi = PublicSaleAbi;
      } else if (sale.saleType === "private") {
        abi = PrivateSaleAbi;
      } else {
        abi = FairLaunchAbi;
      }
    } else {
      if (sale.saleType === "standard") {
        abi = PublicSaleErcAbi;
      } else if (sale.saleType === "private") {
        abi = PrivateSaleErcAbi;
      } else {
        abi = FairLaunchErcAbi;
      }
    }

    const contract = new Contract(
      saleContractAddress,
      abi,
      library.getSigner()
    );
    // console.log("contract", contract);
    const amountBuy = parseEther(amount.toString()).toString();

    try {
      if (sale.currency.symbol !== "BNB") {
        const approvalContract = new Contract(
          sale.currency.address,
          ERC20,
          library.getSigner()
        );
        const approval = await approvalContract.approve(
          sale.saleAddress,
          ethers.constants.MaxUint256
        );
        await approval.wait();
      }

      if (sale.currency.symbol === "BNB") {
        const tx = await contract.participate({
          value: amountBuy,
        });
        await tx.wait();
      } else {
        const tx = await contract.participate(account, amountBuy);
        await tx.wait();
      }

      showModal(false);
    } catch (err) {
      toast.error("Transaction failed");
      // console.log(err);
    }
  };

  const handleInput = async (e) => {
    setAmount(Number(e.target.value));
    setUsdAmount((Number(e.target.value) * bnbUSD).toFixed(3));
    setTokenAmount((Number(e.target.value) * tokenPrice).toFixed(2));
  };

  const handleMax = () => {
    //balanceBNB to number everything after , is not removed
    if (balanceBNB===null) {
      toast.error("Connect wallet first");
      return;
    }
    //if balance is less than max allocation show error
    if (parseFloat(balance) < parseFloat(sale.maxAllocation)) {
      toast.error("Insufficient balance");
      return;
    }
    let bal = balance;
    const amt = parseFloat(sale.maxAllocation);
    setAmount(amt);
  };
  const handleHalf = () => {
    if (balanceBNB===null) {
      toast.error("Connect wallet first");
      return;
    }
    //if balance is less than max allocation show error
    console.log(balance);
    if (parseFloat(balance) < parseFloat(sale.maxAllocation)) {
      toast.error("Insufficient balance");
      return;
    }
    let bal = balance;
    const amt = parseFloat(sale.maxAllocation);
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
                {balance && balance}
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
      <ToastContainer />
    </div>
  );
}
