import React, { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

export default function Button({ buttonText, dropDownItems, filter, setFilter }) {
  const [dropDownToggle, setDropDownToggle] = useState(false)
  const toggleDropDown = () => {
    setDropDownToggle(!dropDownToggle)
  }

  const handleAwayFilter = () => {
    setDropDownToggle(false)
  }
  return (
    <ClickAwayListener onClickAway={handleAwayFilter}>
      <div className="flex flex-col">
        <button
          className="flex justify-center h-11 items-center bg-white dark:bg-dark-1  px-5 py-2 font-gilroy font-semibold text-sm"
          onClick={toggleDropDown}
        >
          <span className="text-gray dark:text-gray-dark ">{buttonText}</span>
          <img className="ml-2" src="/images/arrows/arrow-down.svg" alt="arrow-down" />
        </button>

        {dropDownToggle && (
          <div className="absolute  mt-12 rounded-xl w-48 bg-white dark:bg-dark-3">
            {dropDownItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between cursor-pointer px-4 py-3"
                onClick={() => setFilter(item)}
              >
                <span className="font-gilroy font-bold text-sm text-gray dark:text-gray-dark">{item}</span>
                {filter === item && <input className="accent-[#464754]" type="checkbox" defaultChecked />}
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}
