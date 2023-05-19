import React, { useState } from "react";
import bscLogo from "../../svgs/bsc.png";
//a drop down logo
import {IoMdArrowDropdown} from "react-icons/io";

export default function SwitchNetworkButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({
    id: 1,
    name: "BSC Testnet",
    icon: bscLogo,
  });

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setIsOpen(false);
  };

  const networkOptions = [
    {
      id: 1,
      name: "BSC Testnet",
      icon: bscLogo,
    },
  ];

  return (
    <div className="relative mr-5">
      <button
        className="py-3 px-5 bg-primary-green hover:opacity-40 rounded-md flex items-center focus:outline-none"
        onClick={handleButtonClick}
      >
        <span className="font-gilroy font-semibold text-[#FAF8F5] flex">
            <img src={selectedNetwork.icon} alt={selectedNetwork.name} className="w-[20px] h-[20px] mr-2" />
          {selectedNetwork.name}
          <IoMdArrowDropdown className="ml-2 my-auto" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 py-2 bg-white rounded-md shadow-lg">
          {networkOptions.map((option) => (
            <button
              key={option.id}
              className=" px-12 text-sm text-gray-700 hover:bg-gray-100 inline-block"
              onClick={() => handleNetworkSelect(option)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
