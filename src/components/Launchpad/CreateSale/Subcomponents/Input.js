import Tooltip from "components/Common/Tooltip";
import React, { useState } from "react";
import HeadingTags from "../../../TokenLocker/Subcomponents/HeadingTags";

export default function Input({
  heading,
  tooltip,
  icon,
  value,
  disabled,
  currencies,
  currencySelected,
  nothing,
  text,
  changeState,
  placeholder,
  whitelist,
}) {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="w-full">
      <div className="flex items-center">
        <HeadingTags name={heading} required />
        {tooltip && <Tooltip text={tooltip} />}
      </div>

        <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
          <input
            className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
            type={"text"}
            value={value}
            disabled={disabled}
            onChange={(e) => changeState(e.target.value)}
            placeholder={placeholder || "70"}
          />
          {currencySelected ? (
            <img
              className="w-5 h-5"
              src={currencies[currencySelected - 1].icon}
              alt="currency-icon"
            />
          ) : icon ? (
            <img
              className="w-5 h-5"
              src={icon}
              alt="currency-icon"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            />
          ) : !nothing ? (
            text ? (
              <span className="font-semibold">{text}</span>
            ) : (
              <span>%</span>
            )
          ) : whitelist?(
            null
            ): (
            null
            
          )}
        </div>
      {dropdown && (
        <div className="relative z-10">
          <div className="absolute top-0  mt-1 rounded-lg  w-full bg-white dark:bg-dark-3">
            {["Burn", "Refund"].map((item, index) => (
              <div
                key={index}
                className="w-full text-white  py-3 flex border-b border-dashed border-dark-2 justify-center items-center hover:bg-white hover:text-dark-1"
                onClick={() => changeState(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
