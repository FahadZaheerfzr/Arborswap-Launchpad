import PreviewDetails from "components/Common/PreviewDetails";
import React from "react";
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
import { BACKEND_URL } from "config/constants/LaunchpadAddress";
import axios from "axios";
import useSuccessPublic from "utils/successfulPublic";
import useParticipated from "utils/getParticipated";
import ConfirmModal from "./subComponents/ConfirmModal";
import useIsFinished from "utils/getFinished";
import { useModal } from "react-simple-modal-provider";

export default function AdminPanel({
  icon,
  status,
  hard_cap,
  filled_percent,
  soft_cap,
  sale,
}) {
  const { account, library } = useEthers();
  const [showModal, setShowModal] = useState(false);
  const saleInfo = useSuccessPublic(sale.saleAddress);
  const isFinished = useIsFinished(sale.saleAddress);
  //LoadingModal
  const { open: openLoadingModal, close: closeLoadingModal } =
    useModal("LoadingModal");

  console.log("THE SALE WAS FINISHED", isFinished);

  const withdrawEarnings = async () => {
    setShowModal(false);
    openLoadingModal();
    if (isFinished[0]===false)
    {
      alert("The sale is not finished yet");
      setShowModal(false);
      return;
    }
    let contract;
    if (sale.currency.symbol === "BNB") {
      if (sale.saleType === "standard") {
        contract = new Contract(
          sale.saleAddress,
          PublicSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        contract = new Contract(
          sale.saleAddress,
          PrivateSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        contract = new Contract(
          sale.saleAddress,
          FairLaunchAbi,
          library.getSigner()
        );
      }
    } else {
      if (sale.saleType === "standard") {
        contract = new Contract(
          sale.saleAddress,
          PublicSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        contract = new Contract(
          sale.saleAddress,
          PrivateSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        contract = new Contract(
          sale.saleAddress,
          FairLaunchErcAbi,
          library.getSigner()
        );
      }
    }

    try {
      const tx = await contract.withdrawEarnings();
      await tx.wait();
      alert("Earnings withdrawn successfully");
      closeLoadingModal();
      
    } catch (err) {
      alert("Error withdrawing earnings");
      closeLoadingModal();
    }
  };

  const finalizeSale = async () => {
    setShowModal(false);
    openLoadingModal();
    let contract;
    if (sale.currency.symbol === "BNB") {
      if (sale.saleType === "standard") {
        contract = new Contract(
          sale.saleAddress,
          PublicSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        contract = new Contract(
          sale.saleAddress,
          PrivateSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        contract = new Contract(
          sale.saleAddress,
          FairLaunchAbi,
          library.getSigner()
        );
      }
    } else {
      if (sale.saleType === "standard") {
        contract = new Contract(
          sale.saleAddress,
          PublicSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        contract = new Contract(
          sale.saleAddress,
          PrivateSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        contract = new Contract(
          sale.saleAddress,
          FairLaunchErcAbi,
          library.getSigner()
        );
      }
    }

    try {
      const tx = await contract.finishSale();
      await tx.wait();
      console.log(tx);
    } catch (err) {
      //      alert("Something went wrong");
      closeLoadingModal();
      console.log(err);
    }

    //update the isFinised in database
    try {
      const res = await axios.put(`${BACKEND_URL}/api/sale/${sale.saleId}`, {
        isFinished: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      closeLoadingModal()
    }
    closeLoadingModal();

  };

  return (
    <>
      <div className="hidden md:block px-9 pb-9 bg-white dark:bg-dark-1 rounded-[20px]">
        <div className="w-full flex justify-center">
          <div className="w-1/2 py-5 flex justify-center items-center border-b-2 border-primary-green ">
            <span className="font-bold text-primary-green">Admin Panel</span>
          </div>
        </div>

        <div className="w-full flex justify-between mt-7">
          <span className="text-gray dark:text-gray-dark text-sm font-medium">
            Soft/Hard Cap
          </span>

          {status !== "Upcoming" ? (
            <div className="bg-primary-green bg-opacity-[0.08] px-3 py-[0.5px] rounded-[10px] border-[0.5px] border-dashed border-primary-green">
              <span className="rounded-[10px] text-primary-green">
                {status}
              </span>
            </div>
          ) : (
            <div className="bg-[#C89211] bg-opacity-[0.08] px-3 py-[0.5px] rounded-[10px] border-[0.5px] border-dashed border-[#C89211]">
              <span className="rounded-[10px] text-[#C89211]">Upcoming</span>
            </div>
          )}
        </div>

        <div className="w-full flex mt-3">
          <img src={icon} alt="pool-icon" className="w-7 h-7 mr-2" />
          <span className="font-bold text-dark-text dark:text-light-text text-2xl">
            {soft_cap} - {hard_cap}
          </span>
        </div>

        {status !== "Upcoming" && (
          <div className="mt-7">
            <div className="flex items-center justify-between">
              {hard_cap && filled_percent && (
                <span className="text-xs  text-gray dark:text-gray-dark">
                  {(hard_cap * (filled_percent / 100)).toLocaleString()} RBA
                </span>
              )}

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
        )}

        {status === "Upcoming" && (
          <div className="mt-7">
            <PreviewDetails name={"Address Whitelisted"} value={"1,874"} />
          </div>
        )}

        {status !== "Upcoming" && (
          <div className="mt-7">
            <PreviewDetails name={"Contributors"} value={"1,041"} />
          </div>
        )}
        {saleInfo &&
          (saleInfo[0] === false ? (
            <div className="mt-7">
              <button
                disabled={status === "Upcoming" && status === "Live"}
                onClick={() => setShowModal(true)}
                className={`w-full ${
                  status === "Upcoming"
                    ? "bg-light dark:bg-dark text-dark-text dark:text-light-text"
                    : "bg-primary-green text-white opacity-50"
                } rounded-md font-bold py-4`}
              >
                {status === "Upcoming" ? "Manage Address" : "Finalize Sale"}
              </button>
            </div>
          ) : null)}
        {saleInfo &&
          (saleInfo[0] === true ? (
            <div className="mt-7">
              <button
                onClick={() => setShowModal(true)}
                className={`w-full ${
                  status === "Upcoming"
                    ? "bg-light dark:bg-dark text-dark-text dark:text-light-text"
                    : "bg-primary-green text-white opacity-50"
                } rounded-md font-bold py-4`}
              >
                Withdraw your Earnings
              </button>
            </div>
          ) : null)}
      </div>
      {showModal && (
        // in this pass withdrawEarnings function if saleInfo is not null and true
        // else pass finalizeSale function

        <ConfirmModal
          runFunction={
            saleInfo
              ? saleInfo[0] === true
                ? withdrawEarnings
                : finalizeSale
              : finalizeSale
          }
          title={
            saleInfo
              ? saleInfo[0] === true
                ? "Withdraw Earnings"
                : "Finalize Sale"
              : "Finalize Sale"
          }
          description={
            saleInfo
              ? saleInfo[0] === true
                ? "Are you sure you want to withdraw your earnings?"
                : "Are you sure you want to finalize the sale?"
              : "Are you sure you want to finalize the sale?"
          }
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
