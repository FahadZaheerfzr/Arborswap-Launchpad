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

  const finalizeSale = async () => {
    let contract
    if (sale.currency.symbol==="BNB"){
        if (sale.saleType==="standard"){
            contract = new Contract(sale.saleAddress, PublicSaleAbi, library.getSigner());
        }
        else if (sale.saleType==="private"){
            contract = new Contract(sale.saleAddress, PrivateSaleAbi, library.getSigner());
        }
        else if (sale.saleType==="fairlaunch"){
            contract = new Contract(sale.saleAddress, FairLaunchAbi, library.getSigner());
        }
    }
    else{
        if (sale.saleType==="standard"){
            contract = new Contract(sale.saleAddress, PublicSaleErcAbi, library.getSigner());
        }
        else if (sale.saleType==="private"){
            contract = new Contract(sale.saleAddress, PrivateSaleErcAbi, library.getSigner());
        }
        else if (sale.saleType==="fairlaunch"){
            contract = new Contract(sale.saleAddress, FairLaunchErcAbi, library.getSigner());
        }
    }

    try {
      const tx = await contract.finishSale();
      await tx.wait();
      console.log(tx);
    } catch (err) {
//      alert("Something went wrong");
      setShowModal(false);
      console.log(err);
    }

    //update the isFinised in database
    try {
        const res = await axios.put(`${BACKEND_URL}/api/sale/${sale.saleId}`, {
            isFinished: true,
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }


    setShowModal(false);
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

        <div className="mt-7">
          <button
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
      </div>
      {showModal && (
        <div className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white dark:bg-dark-1 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-green sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-dark"
                      id="modal-headline"
                    >
                      Finalize Sale
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-white">
                        Are you sure you want to finalize the sale? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-2 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={finalizeSale}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-green text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Finalize
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-dark-1 text-base font-medium text-white hover:bg-gray-50 dark:hover:bg-dark-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
