import PreviewDetails from "components/Common/PreviewDetails";
import React from "react";
import { useEffect, useState } from "react";
import { Contract} from "ethers";
import { useEthers } from "@usedapp/core";
import PublicSaleAbi from "../../../config/abi/PublicSale.json";
import PublicSaleErcAbi from "../../../config/abi/PublicSaleErcAbi.json";
import PrivateSaleAbi from "../../../config/abi/PrivateSale.json";
import PrivateSaleErcAbi from "../../../config/abi/PrivateSaleErcAbi.json";
import FairLaunchAbi from "../../../config/abi/FairlaunchSale.json";
import FairLaunchErcAbi from "../../../config/abi/FairlaunchErcAbi.json";
import { BACKEND_URL } from "config/constants/LaunchpadAddress";
import axios from "axios";
import getSuccessPublic from "utils/successfulPublic";
import ConfirmModal from "./subComponents/ConfirmModal";
import getIsFinished from "utils/getFinished";
import { useModal } from "react-simple-modal-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PercentFilled from "../Pools/Subcomponents/PercentFilled";

export default function AdminPanel({
  status,
  hard_cap,
  filled_percent,
  soft_cap,
  finished,
  sale,
}) {
  console.log(filled_percent)
  const { library } = useEthers();
  const [showModal, setShowModal] = useState(false);
  const [isFinished, setIsFinished] = useState(null);
  const [saleInfo, setSaleInfo] = useState(null);
  //LoadingModal
  const { open: openLoadingModal, close: closeLoadingModal } =
    useModal("LoadingModal");


  async function getFinished() {
    const res = await getIsFinished(sale.saleAddress).then((res) => {
      setIsFinished(res);
    });
  }
  async function getSaleInfo() {
    const res = await getSuccessPublic(sale.saleAddress).then((res) => {
      setSaleInfo(res);
    });
  }

  useEffect(() => {
    getFinished();
    getSaleInfo();
  }, []);


  const withdrawEarnings = async () => {
    setShowModal(false);
    openLoadingModal();
    if (isFinished[0] === false) {
      toast.error("The sale is not finished yet");
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
      toast.success("Earnings withdrawn successfully");
      closeLoadingModal();
    } catch (err) {
      toast.error("You Have Already Withdrawn Your Earnings");
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
    } catch (err) {
      console.log(err);
      closeLoadingModal();
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
          <span className="font-bold text-dark-text dark:text-light-text text-2xl">
            {soft_cap} - {hard_cap} {sale.currency.symbol}
          </span>
        </div>

        {status !== "Upcoming" && (
          <div className="mt-7">
            <div className="flex items-center justify-between">
              {hard_cap && filled_percent && (
                <span className="text-xs  text-gray dark:text-gray-dark">
                  {(hard_cap * (filled_percent / 100)).toLocaleString()} {sale.currency.symbol}
                </span>
              )}

              <span className="text-xs  text-dim-text dark:text-dim-text-dark">
                {hard_cap} {sale.currency.symbol}
              </span>
            </div>

            <PercentFilled address={sale.saleAddress} />
          </div>
        )}
        {status === "Upcoming" &&
          (sale.whitelisting != null || sale.whitelisting !== false) &&
          sale.whiteListedAddresses.map((address, index) => {
            return (
              <div className="mt-7" key={index}>
                <PreviewDetails name={"Whitelisted Address"} value={address} />
              </div>
            );
          })}

        {status !== "Upcoming" && (
          <div className="mt-7">
            <PreviewDetails name={"Contributors"} value={"1,041"} />
          </div>
        )}
        {saleInfo != null &&
          (saleInfo === false ? (
            <div className="mt-7">
              <button
                disabled={status === "Upcoming" && status === "Live"}
                onClick={() => {
                  if (status === "Ended" || finished) {
                    setShowModal(true);
                  }
                }}
                className={`w-full ${
                  status === "Upcoming"
                    ? "bg-light dark:bg-dark text-dark-text dark:text-light-text"
                    : "bg-primary-green text-white opacity-50"
                } rounded-md font-bold py-4`}
              >
                {/* if sale is not finished then show manage adress too */}
                {status === "Upcoming" ? "Manage Address" : "Finalize Sale"}
              </button>
            </div>
          ) : null)}
        {saleInfo != null &&
          (saleInfo === true ? (
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
            saleInfo != null
              ? saleInfo === true
                ? withdrawEarnings
                : finalizeSale
              : finalizeSale
          }
          title={
            saleInfo != null
              ? saleInfo === true
                ? "Withdraw Earnings"
                : "Finalize Sale"
              : "Finalize Sale"
          }
          description={
            saleInfo != null
              ? saleInfo === true
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
