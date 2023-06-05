import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PreviewDetails({
  name,
  value,
  icon,
  verified,
  tokenSymbol,
  enable_copy,
}) {
  function copyText() {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  }
  return (
    <>
      <ToastContainer />
      <div className="py-5 flex gap-x-5 justify-between border-b border-dashed border-dim-text border-opacity-30">
        <span className="font-gilroy text-sm font-medium text-gray dark:text-gray-dark">
          {name}
        </span>

        <div className="flex items-center break-all">
          {icon && <img className="w-5 h-5 mr-1" src={icon} alt="chain-icon" />}
          <span className="font-gilroy  text-sm font-bold text-dark-text dark:text-light-text">
            {value} {tokenSymbol && tokenSymbol}
          </span>

          {verified && (
            <img
              className="w-[14px] h-[14px] ml-1"
              src="/images/home/collections/cards/verified.svg"
              alt="verified"
            />
          )}
          {enable_copy && (
            <button onClick={copyText} className="ml-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4H10C10.5523 4 11 3.55228 11 3C11 2.44772 10.5523 2 10 2H8Z" fill="#4A5568"/> <path d="M3 5C3 3.89543 3.89543 3 5 3C5 4.65685 6.34315 6 8 6H10C11.6569 6 13 4.65685 13 3C14.1046 3 15 3.89543 15 5V11H10.4142L11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13H15V16C15 17.1046 14.1046 18 13 18H5C3.89543 18 3 17.1046 3 16V5Z" fill="#4A5568"/> <path d="M15 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H15V11Z" fill="#4A5568"/> </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
