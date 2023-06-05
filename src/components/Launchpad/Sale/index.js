import Timer from "components/LockedAsset/Amount/Timer/Timer";
import React, { useEffect, useState } from "react";
import getSaleInfo from "utils/getSaleInfo";
import { formatBigToNum } from "utils/numberFormat";
import { Contract, ethers } from "ethers";
import { useEtherBalance, useEthers } from "@usedapp/core";
import PublicSaleAbi from "../../../config/abi/PublicSale.json";
import PublicSaleErcAbi from "../../../config/abi/PublicSaleErcAbi.json";
import PrivateSaleAbi from "../../../config/abi/PrivateSale.json";
import PrivateSaleErcAbi from "../../../config/abi/PrivateSaleErcAbi.json";
import FairLaunchAbi from "../../../config/abi/FairlaunchSale.json";
import FairLaunchErcAbi from "../../../config/abi/FairlaunchErcAbi.json";
import useSuccessPublic from "utils/successfulPublic";
import useParticipated from "utils/getParticipated";
import ConfirmModal from "../Admin/subComponents/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SaleBox({
  hard_cap,
  hard_cap_icon,
  min_allocation,
  max_allocation,
  ends_on,
  showModal,
  status,
  token,
  presale_address,
  currency,
  start_date,
  sale,
}) {
  const [filled_percent, setFilledPercent] = useState(0);
  const [showModal2, setShowModal2] = useState(false);
  const [priceInBNB, setPriceInBNB] = useState(null);
  const { account, library } = useEthers();
  const [saleInfo, setSaleInfo] = useState(null);
  const saleSuccess = useSuccessPublic(presale_address);
  const participated = useParticipated(presale_address, account);
  // console.log("filled_percent", filled_percent);

  useEffect(() => {
    const result = getSaleInfo(presale_address).then((res) => {
      setSaleInfo(res);
    });
  }, []);

  useEffect(() => {
    getPrice();
  }, [saleInfo]);

  async function getPrice() {
    if (!saleInfo) return;
    const res = await saleInfo.totalBNBRaised;
    console.log(res, "res");
    setPriceInBNB(res);
  }
  // console.log(ends_on);
  useEffect(() => {
    if (priceInBNB === null) return;
    const getFilledPercent = async () => {
      const percents = priceInBNB.mul(100).div(saleInfo.hardCap);
      const newPercent = formatBigToNum(percents.toString(), 0, 1);
      setFilledPercent(newPercent);
    };
    if (saleInfo) {
      getFilledPercent();
    }
  }, [priceInBNB]);

  const withdrawFunds = async () => {
    if (participated[0] === false) {
      toast.error("You have not participated in this sale");
      return;
    }
    let contract;
    if (sale.currency.symbol === "BNB") {
      if (sale.saleType === "standard") {
        // console.log("STANDARD NON erc20");
        contract = new Contract(
          sale.saleAddress,
          PublicSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        // console.log("Private NON erc20");

        contract = new Contract(
          sale.saleAddress,
          PrivateSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        // console.log("Fairlaunch NON erc20");
        contract = new Contract(
          sale.saleAddress,
          FairLaunchAbi,
          library.getSigner()
        );
      }
    } else {
      if (sale.saleType === "standard") {
        // console.log("STANDARD erc20");
        contract = new Contract(
          sale.saleAddress,
          PublicSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        // console.log("Private erc20");
        contract = new Contract(
          sale.saleAddress,
          PrivateSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        // console.log("Fairlaunch erc20");
        contract = new Contract(
          sale.saleAddress,
          FairLaunchErcAbi,
          library.getSigner()
        );
      }
    }
    // console.log("contract", contract);
    try {
      const tx = await contract.withdrawUserFundsIfSaleCancelled();
      await tx.wait();
      toast.success("Funds withdrawn successfully");
    } catch (err) {
      // console.log(err);
      toast.error("Error withdrawing funds");
    }
  };

  return (
    <>
      <div className="p-9 bg-white dark:bg-dark-1 rounded-[20px]">
        <div className="w-full flex justify-between">
          <span className="text-gray dark:text-gray-dark text-sm font-medium">
            Soft/Hard Cap
          </span>

          <div className="bg-primary-green bg-opacity-[0.08] px-3 py-[3px] rounded-[10px] border-[0.5px] border-dashed border-primary-green">
            <span className="rounded-[10px] text-primary-green">{status}</span>
          </div>
        </div>

        <div className="mt-3 flex">
          <img
            src={currency.icon}
            alt="hard-cap-currency"
            className="w-7 h-7"
          />
          <div className="ml-3">
            <span className="text-dark-text dark:text-light-text text-2xl font-bold">
              {hard_cap && hard_cap.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-7 flex justify-between">
          <span className="font-medium text-sm text-gray dark:text-gray-dark">
            Min Allocation
          </span>
          <span className="font-bold text-sm text-dark-text dark:text-light-text">
            {min_allocation && min_allocation.toLocaleString()}{" "}
            {currency.symbol}
          </span>
        </div>

        <div className="mt-5 flex justify-between">
          <span className="font-medium text-sm text-gray dark:text-gray-dark">
            Max Allocation
          </span>
          <span className="font-bold text-sm text-dark-text dark:text-light-text">
            {max_allocation && max_allocation.toLocaleString()}{" "}
            {currency.symbol}
          </span>
        </div>

        <div className="flex items-center justify-between mt-5">
          {hard_cap && filled_percent && (
            <span className="text-xs  text-gray dark:text-gray-dark">
              {(hard_cap * (filled_percent / 100)).toLocaleString()}{" "}
              {currency.symbol}
            </span>
          )}

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
        {/* if sale is upcoming then show countdown */}

        {status === "Upcoming" ? (
          <div>
            <div className="flex justify-center mt-7">
              <span className="text-sm font-medium text-gray dark:text-gray-dark ">
                Sale Starts in
              </span>
            </div>
            <Timer date={new Date(start_date * 1000)} />
          </div>
        ) : (
          <div className="flex mt-10">
            <button
              disabled={
                status === "Ended" ||
                (saleInfo &&
                  saleInfo.totalBNBRaised.toString() -
                    saleInfo.hardCap.toString()) === 0
                  ? true
                  : false
              }
              className={`w-full ${
                status !== "Ended"
                  ? "bg-primary-green"
                  : "bg-dim-text bg-opacity-50 dark:bg-dim-text-dark"
              } rounded-md text-white font-bold py-4 disabled:bg-dim-text disabled:opacity-50 disabled:dark:bg-dim-text-dark`}
              onClick={() => showModal(true)}
            >
              {status === "Ended"
                ? "Ended"
                : saleInfo &&
                  saleInfo.totalBNBRaised.toString() -
                    saleInfo.hardCap.toString() ===
                    0
                ? "Hard Cap Reached"
                : "Join Sale"}
            </button>
          </div>
        )}
        {status !== "Upcoming" && status !== "Ended" && (
          <>
            <div className="flex justify-center mt-7">
              <span className="text-sm font-medium text-gray dark:text-gray-dark ">
                Sale Ends in
              </span>
            </div>
          </>
        )}

        {saleSuccess &&
          status === "Ended" &&
          (saleSuccess[0] === false ? (
            <div className="mt-7">
              <button
                onClick={() => setShowModal2(true)}
                className={`w-full ${
                  status === "Upcoming"
                    ? "bg-light dark:bg-dark text-dark-text dark:text-light-text"
                    : "bg-primary-green text-white opacity-50"
                } rounded-md font-bold py-4`}
              >
                Withdraw Funds
              </button>
            </div>
          ) : null)}

        {/* if sale ended then just write Sale has ended */}
        {/* if sale is live then show timer */}
        {status !== "Ended" && status !== "Upcoming" && (
          <Timer date={new Date(ends_on * 1000)} />
        )}
      </div>
      {showModal2 && (
        <ConfirmModal
          runFunction={withdrawFunds}
          title={"Withdraw Funds"}
          description={"Are you sure you want to withdraw funds?"}
          setShowModal={setShowModal2}
        />
      )}
    </>
  );
}
